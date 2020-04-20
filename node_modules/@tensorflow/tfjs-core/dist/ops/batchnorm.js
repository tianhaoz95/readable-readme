"use strict";
/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
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
var engine_1 = require("../engine");
var tensor_util_env_1 = require("../tensor_util_env");
var util = require("../util");
var batchnorm_util_1 = require("./batchnorm_util");
var operation_1 = require("./operation");
/**
 * @deprecated Please use `tf.batchNorm` instead and note the positional
 *     argument change of scale, offset, and varianceEpsilon.
 */
function batchNormalization_(x, mean, variance, varianceEpsilon, scale, offset) {
    if (varianceEpsilon === void 0) { varianceEpsilon = .001; }
    batchnorm_util_1.warnDeprecation();
    return batchNorm_(x, mean, variance, offset, scale, varianceEpsilon);
}
/**
 * Batch normalization.
 *
 * As described in
 * [http://arxiv.org/abs/1502.03167](http://arxiv.org/abs/1502.03167).
 *
 * Mean, variance, scale, and offset can be of two shapes:
 *   - The same shape as the input.
 *   - In the common case, the depth dimension is the last dimension of x, so
 *     the values would be an `tf.Tensor1D` of shape [depth].
 *
 * Also available are stricter rank-specific methods with the same signature
 * as this method that assert that parameters passed are of given rank
 *   - `tf.batchNorm2d`
 *   - `tf.batchNorm3d`
 *   - `tf.batchNorm4d`
 *
 * @param x The input Tensor.
 * @param mean A mean Tensor.
 * @param variance A variance Tensor.
 * @param offset An offset Tensor.
 * @param scale A scale Tensor.
 * @param varianceEpsilon A small float number to avoid dividing by 0.
 */
/** @doc {heading: 'Operations', subheading: 'Normalization'} */
function batchNorm_(x, mean, variance, offset, scale, varianceEpsilon) {
    if (varianceEpsilon == null) {
        varianceEpsilon = 0.001;
    }
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'batchNorm');
    var $mean = tensor_util_env_1.convertToTensor(mean, 'mean', 'batchNorm');
    var $variance = tensor_util_env_1.convertToTensor(variance, 'variance', 'batchNorm');
    var $scale;
    if (scale != null) {
        $scale = tensor_util_env_1.convertToTensor(scale, 'scale', 'batchNorm');
    }
    var $offset;
    if (offset != null) {
        $offset = tensor_util_env_1.convertToTensor(offset, 'offset', 'batchNorm');
    }
    util.assert($mean.rank === $variance.rank, function () { return 'Batch normalization gradient requires mean and variance to have ' +
        'equal ranks.'; });
    util.assert($offset == null || $mean.rank === $offset.rank, function () { return 'Batch normalization gradient requires mean and offset to have ' +
        'equal ranks.'; });
    util.assert($scale == null || $mean.rank === $scale.rank, function () { return 'Batch normalization gradient requires mean and scale to have ' +
        'equal ranks.'; });
    var forward = function (backend, save) {
        var x4D = batchnorm_util_1.xAs4D($x);
        var res = backend.batchNormalization(x4D, as1DOr4D($mean), as1DOr4D($variance), varianceEpsilon, as1DOr4D($scale), as1DOr4D($offset));
        save([$x, $mean, $variance, $scale]);
        return res;
    };
    var inputs = { x: $x, scale: $scale, offset: $offset, mean: $mean, variance: $variance };
    var attrs = { varianceEpsilon: varianceEpsilon };
    var res = engine_1.ENGINE.runKernelFunc(forward, inputs, null /* gradient */, 'FusedBatchNorm', attrs);
    return res.reshape($x.shape);
}
function as1DOr4D(x) {
    if (x == null) {
        return null;
    }
    if (x.rank === 0) {
        return x.as1D();
    }
    else if (x.rank === 1) {
        return x;
    }
    else if (x.rank === 2) {
        return x.as4D(1, 1, x.shape[0], x.shape[1]);
    }
    else if (x.rank === 3) {
        return x.as4D(1, x.shape[0], x.shape[1], x.shape[2]);
    }
    return x;
}
// todo(yassogba): Remove batchNormalization since it is deprecated.
exports.batchNormalization = operation_1.op({ batchNormalization_: batchNormalization_ });
exports.batchNorm = operation_1.op({ batchNorm_: batchNorm_ });
//# sourceMappingURL=batchnorm.js.map