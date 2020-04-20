"use strict";
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Linear algebra ops.
 */
var engine_1 = require("../engine");
var globals_1 = require("../globals");
var tensor_util_env_1 = require("../tensor_util_env");
var util_1 = require("../util");
var array_ops_1 = require("./array_ops");
var binary_ops_1 = require("./binary_ops");
var concat_split_1 = require("./concat_split");
var eye_1 = require("./eye");
var logical_ops_1 = require("./logical_ops");
var norm_1 = require("./norm");
var operation_1 = require("./operation");
var reduction_ops_1 = require("./reduction_ops");
var tensor_ops_1 = require("./tensor_ops");
/**
 * Copy a tensor setting everything outside a central band in each innermost
 * matrix to zero.
 *
 * The band part is computed as follows: Assume input has `k` dimensions
 * `[I, J, K, ..., M, N]`, then the output is a tensor with the same shape where
 * `band[i, j, k, ..., m, n] = in_band(m, n) * input[i, j, k, ..., m, n]`.
 * The indicator function
 * `in_band(m, n) = (num_lower < 0 || (m-n) <= num_lower))`
 * `&& (num_upper < 0 || (n-m) <= num_upper)`
 *
 * ```js
 * const x = tf.tensor2d([[ 0,  1,  2, 3],
 *                        [-1,  0,  1, 2],
 *                        [-2, -1,  0, 1],
 *                        [-3, -2, -1, 0]]);
 * let y = tf.linalg.bandPart(x, 1, -1);
 * y.print(); // [[ 0,  1,  2, 3],
 *            //  [-1,  0,  1, 2],
 *            //  [ 0, -1,  0, 1],
 *            //  [ 0, 0 , -1, 0]]
 * let z = tf.linalg.bandPart(x, 2, 1);
 * z.print(); // [[ 0,  1,  0, 0],
 *            //  [-1,  0,  1, 0],
 *            //  [-2, -1,  0, 1],
 *            //  [ 0, -2, -1, 0]]
 * ```
 *
 * @param x Rank `k` tensor
 * @param numLower Number of subdiagonals to keep.
 *   If negative, keep entire lower triangle.
 * @param numUpper Number of subdiagonals to keep.
 *   If negative, keep entire upper triangle.
 * @returns Rank `k` tensor of the same shape as input.
 *   The extracted banded tensor.
 */
/**
 * @doc {heading:'Operations',
 *       subheading:'Linear Algebra',
 *       namespace:'linalg'}
 */
function bandPart_(a, numLower, numUpper) {
    if (numLower % 1 !== 0) {
        throw new Error("bandPart(): numLower must be an integer, got " + numLower + ".");
    }
    if (numUpper % 1 !== 0) {
        throw new Error("bandPart(): numUpper must be an integer, got " + numUpper + ".");
    }
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'bandPart');
    if ($a.rank < 2) {
        throw new Error("bandPart(): Rank must be at least 2, got " + $a.rank + ".");
    }
    var shape = $a.shape, _a = $a.shape.slice(-2), M = _a[0], N = _a[1];
    if (!(numLower <= M)) {
        throw new Error("bandPart(): numLower (" + numLower + ")" +
            (" must not be greater than the number of rows (" + M + ")."));
    }
    if (!(numUpper <= N)) {
        throw new Error("bandPart(): numUpper (" + numUpper + ")" +
            (" must not be greater than the number of columns (" + N + ")."));
    }
    if (numLower < 0) {
        numLower = M;
    }
    if (numUpper < 0) {
        numUpper = N;
    }
    var i = tensor_ops_1.range(0, M, 1, 'int32').reshape([-1, 1]), j = tensor_ops_1.range(0, N, 1, 'int32'), ij = binary_ops_1.sub(i, j);
    var inBand = logical_ops_1.logicalAnd(ij.lessEqual(tensor_ops_1.scalar(+numLower, 'int32')), ij.greaterEqual(tensor_ops_1.scalar(-numUpper, 'int32')));
    var zero = tensor_ops_1.zeros([M, N], $a.dtype);
    return array_ops_1.stack(array_ops_1.unstack($a.reshape([-1, M, N]))
        .map(function (mat) { return logical_ops_1.where(inBand, mat, zero); }))
        .reshape(shape);
}
/**
 * Gram-Schmidt orthogonalization.
 *
 * ```js
 * const x = tf.tensor2d([[1, 2], [3, 4]]);
 * let y = tf.linalg.gramSchmidt(x);
 * y.print();
 * console.log('Othogonalized:');
 * y.dot(y.transpose()).print();  // should be nearly the identity matrix.
 * console.log('First row direction maintained:');
 * const data = await y.array();
 * console.log(data[0][1] / data[0][0]);  // should be nearly 2.
 * ```
 *
 * @param xs The vectors to be orthogonalized, in one of the two following
 *   formats:
 *   - An Array of `tf.Tensor1D`.
 *   - A `tf.Tensor2D`, i.e., a matrix, in which case the vectors are the rows
 *     of `xs`.
 *   In each case, all the vectors must have the same length and the length
 *   must be greater than or equal to the number of vectors.
 * @returns The orthogonalized and normalized vectors or matrix.
 *   Orthogonalization means that the vectors or the rows of the matrix
 *   are orthogonal (zero inner products). Normalization means that each
 *   vector or each row of the matrix has an L2 norm that equals `1`.
 */
/**
 * @doc {heading:'Operations',
 *       subheading:'Linear Algebra',
 *       namespace:'linalg'}
 */
function gramSchmidt_(xs) {
    var inputIsTensor2D;
    if (Array.isArray(xs)) {
        inputIsTensor2D = false;
        util_1.assert(xs != null && xs.length > 0, function () { return 'Gram-Schmidt process: input must not be null, undefined, or ' +
            'empty'; });
        var dim_1 = xs[0].shape[0];
        var _loop_1 = function (i) {
            util_1.assert(xs[i].shape[0] === dim_1, function () {
                return 'Gram-Schmidt: Non-unique lengths found in the input vectors: ' +
                    ("(" + xs[i].shape[0] + " vs. " + dim_1 + ")");
            });
        };
        for (var i = 1; i < xs.length; ++i) {
            _loop_1(i);
        }
    }
    else {
        inputIsTensor2D = true;
        xs = concat_split_1.split(xs, xs.shape[0], 0).map(function (x) { return array_ops_1.squeeze(x, [0]); });
    }
    util_1.assert(xs.length <= xs[0].shape[0], function () { return "Gram-Schmidt: Number of vectors (" + xs.length + ") exceeds " +
        ("number of dimensions (" + xs[0].shape[0] + ")."); });
    var ys = [];
    var xs1d = xs;
    var _loop_2 = function (i) {
        ys.push(engine_1.ENGINE.tidy(function () {
            var x = xs1d[i];
            if (i > 0) {
                for (var j = 0; j < i; ++j) {
                    var proj = reduction_ops_1.sum(ys[j].mulStrict(x)).mul(ys[j]);
                    x = x.sub(proj);
                }
            }
            return x.div(norm_1.norm(x, 'euclidean'));
        }));
    };
    for (var i = 0; i < xs.length; ++i) {
        _loop_2(i);
    }
    if (inputIsTensor2D) {
        return array_ops_1.stack(ys, 0);
    }
    else {
        return ys;
    }
}
/**
 * Compute QR decomposition of m-by-n matrix using Householder transformation.
 *
 * Implementation based on
 *   [http://www.cs.cornell.edu/~bindel/class/cs6210-f09/lec18.pdf]
 * (http://www.cs.cornell.edu/~bindel/class/cs6210-f09/lec18.pdf)
 *
 * ```js
 * const a = tf.tensor2d([[1, 2], [3, 4]]);
 * let [q, r] = tf.linalg.qr(a);
 * console.log('Q');
 * q.print();
 * console.log('R');
 * r.print();
 * console.log('Orthogonalized');
 * q.dot(q.transpose()).print()  // should be nearly the identity matrix.
 * console.log('Reconstructed');
 * q.dot(r).print(); // should be nearly [[1, 2], [3, 4]];
 * ```
 *
 * @param x The `tf.Tensor` to be QR-decomposed. Must have rank >= 2. Suppose
 *   it has the shape `[..., M, N]`.
 * @param fullMatrices An optional boolean parameter. Defaults to `false`.
 *   If `true`, compute full-sized `Q`. If `false` (the default),
 *   compute only the leading N columns of `Q` and `R`.
 * @returns An `Array` of two `tf.Tensor`s: `[Q, R]`. `Q` is a unitary matrix,
 *   i.e., its columns all have unit norm and are mutually orthogonal.
 *   If `M >= N`,
 *     If `fullMatrices` is `false` (default),
 *       - `Q` has a shape of `[..., M, N]`,
 *       - `R` has a shape of `[..., N, N]`.
 *     If `fullMatrices` is `true` (default),
 *       - `Q` has a shape of `[..., M, M]`,
 *       - `R` has a shape of `[..., M, N]`.
 *   If `M < N`,
 *     - `Q` has a shape of `[..., M, M]`,
 *     - `R` has a shape of `[..., M, N]`.
 * @throws If the rank of `x` is less than 2.
 */
/**
 * @doc {heading:'Operations',
 *       subheading:'Linear Algebra',
 *       namespace:'linalg'}
 */
function qr_(x, fullMatrices) {
    if (fullMatrices === void 0) { fullMatrices = false; }
    if (x.rank < 2) {
        throw new Error("qr() requires input tensor to have a rank >= 2, but got rank " + x.rank);
    }
    else if (x.rank === 2) {
        return qr2d(x, fullMatrices);
    }
    else {
        // Rank > 2.
        // TODO(cais): Below we split the input into individual 2D tensors,
        //   perform QR decomposition on them and then stack the results back
        //   together. We should explore whether this can be parallelized.
        var outerDimsProd = x.shape.slice(0, x.shape.length - 2)
            .reduce(function (value, prev) { return value * prev; });
        var x2ds = array_ops_1.unstack(x.reshape([
            outerDimsProd, x.shape[x.shape.length - 2],
            x.shape[x.shape.length - 1]
        ]), 0);
        var q2ds_1 = [];
        var r2ds_1 = [];
        x2ds.forEach(function (x2d) {
            var _a = qr2d(x2d, fullMatrices), q2d = _a[0], r2d = _a[1];
            q2ds_1.push(q2d);
            r2ds_1.push(r2d);
        });
        var q = array_ops_1.stack(q2ds_1, 0).reshape(x.shape);
        var r = array_ops_1.stack(r2ds_1, 0).reshape(x.shape);
        return [q, r];
    }
}
function qr2d(x, fullMatrices) {
    if (fullMatrices === void 0) { fullMatrices = false; }
    return engine_1.ENGINE.tidy(function () {
        if (x.shape.length !== 2) {
            throw new Error("qr2d() requires a 2D Tensor, but got a " + x.shape.length + "D Tensor.");
        }
        var m = x.shape[0];
        var n = x.shape[1];
        var q = eye_1.eye(m); // Orthogonal transform so far.
        var r = x.clone(); // Transformed matrix so far.
        var one2D = tensor_ops_1.tensor2d([[1]], [1, 1]);
        var w = one2D.clone();
        var iters = m >= n ? n : m;
        var _loop_3 = function (j) {
            var _a;
            // This tidy within the for-loop ensures we clean up temporary
            // tensors as soon as they are no longer needed.
            var rTemp = r;
            var wTemp = w;
            var qTemp = q;
            _a = engine_1.ENGINE.tidy(function () {
                // Find H = I - tau * w * w', to put zeros below R(j, j).
                var rjEnd1 = r.slice([j, j], [m - j, 1]);
                var normX = rjEnd1.norm();
                var rjj = r.slice([j, j], [1, 1]);
                // The sign() function returns 0 on 0, which causes division by zero.
                var s = tensor_ops_1.tensor2d([[-1]]).where(rjj.greater(0), tensor_ops_1.tensor2d([[1]]));
                var u1 = rjj.sub(s.mul(normX));
                var wPre = rjEnd1.div(u1);
                if (wPre.shape[0] === 1) {
                    w = one2D.clone();
                }
                else {
                    w = one2D.concat(wPre.slice([1, 0], [wPre.shape[0] - 1, wPre.shape[1]]), 0);
                }
                var tau = s.matMul(u1).div(normX).neg();
                // -- R := HR, Q := QH.
                var rjEndAll = r.slice([j, 0], [m - j, n]);
                var tauTimesW = tau.mul(w);
                var wT = w.transpose();
                if (j === 0) {
                    r = rjEndAll.sub(tauTimesW.matMul(wT.matMul(rjEndAll)));
                }
                else {
                    var rTimesTau = rjEndAll.sub(tauTimesW.matMul(wT.matMul(rjEndAll)));
                    r = r.slice([0, 0], [j, n]).concat(rTimesTau, 0);
                }
                var tawTimesWT = tauTimesW.transpose();
                var qAllJEnd = q.slice([0, j], [m, q.shape[1] - j]);
                if (j === 0) {
                    q = qAllJEnd.sub(qAllJEnd.matMul(w).matMul(tawTimesWT));
                }
                else {
                    var qTimesTau = qAllJEnd.sub(qAllJEnd.matMul(w).matMul(tawTimesWT));
                    q = q.slice([0, 0], [m, j]).concat(qTimesTau, 1);
                }
                return [w, r, q];
            }), w = _a[0], r = _a[1], q = _a[2];
            globals_1.dispose([rTemp, wTemp, qTemp]);
        };
        for (var j = 0; j < iters; ++j) {
            _loop_3(j);
        }
        if (!fullMatrices && m > n) {
            q = q.slice([0, 0], [m, n]);
            r = r.slice([0, 0], [n, n]);
        }
        return [q, r];
    });
}
exports.bandPart = operation_1.op({ bandPart_: bandPart_ });
exports.gramSchmidt = operation_1.op({ gramSchmidt_: gramSchmidt_ });
exports.qr = operation_1.op({ qr_: qr_ });
//# sourceMappingURL=linalg_ops.js.map