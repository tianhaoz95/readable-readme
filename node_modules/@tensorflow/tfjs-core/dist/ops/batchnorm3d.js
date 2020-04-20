"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tensor_util_env_1 = require("../tensor_util_env");
var util = require("../util");
var batchnorm_1 = require("./batchnorm");
var batchnorm_util_1 = require("./batchnorm_util");
var operation_1 = require("./operation");
/**
 * Batch normalization, strictly for 3D. For the more relaxed version, see
 * `tf.batchNorm`.
 *
 * @param x The input Tensor.
 * @param mean A mean Tensor.
 * @param variance A variance Tensor.
 * @param offset An offset Tensor.
 * @param scale A scale Tensor.
 * @param varianceEpsilon A small float number to avoid dividing by 0.
 */
function batchNorm3d_(x, mean, variance, offset, scale, varianceEpsilon) {
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
    util.assert($x.rank === 3, function () { return "Error in batchNorm3D: x must be rank 3 but got rank " +
        ($x.rank + "."); });
    util.assert($mean.rank === 3 || $mean.rank === 1, function () { return "Error in batchNorm3D: mean must be rank 3 or rank 1 but " +
        ("got rank " + $mean.rank + "."); });
    util.assert($variance.rank === 3 || $variance.rank === 1, function () { return "Error in batchNorm3D: variance must be rank 3 or rank 1 " +
        ("but got rank " + $variance.rank + "."); });
    if ($scale != null) {
        util.assert($scale.rank === 3 || $scale.rank === 1, function () { return "Error in batchNorm3D: scale must be rank 3 or rank 1 " +
            ("but got rank " + $scale.rank + "."); });
    }
    if ($offset != null) {
        util.assert($offset.rank === 3 || $offset.rank === 1, function () { return "Error in batchNorm3D: offset must be rank 3 or rank 1 " +
            ("but got rank " + $offset.rank + "."); });
    }
    return batchnorm_1.batchNorm($x, $mean, $variance, $offset, $scale, varianceEpsilon);
}
/**
 * @deprecated Please use `tf.batchNorm3d` instead and note the positional
 *     argument change of scale, offset, and varianceEpsilon.
 */
function batchNormalization3d_(x, mean, variance, varianceEpsilon, scale, offset) {
    if (varianceEpsilon === void 0) { varianceEpsilon = .001; }
    batchnorm_util_1.warnDeprecation();
    return batchNorm3d_(x, mean, variance, offset, scale, varianceEpsilon);
}
// todo(yassogba): Remove batchNormalization3d since it is deprecated.
exports.batchNormalization3d = operation_1.op({ batchNormalization3d_: batchNormalization3d_ });
exports.batchNorm3d = operation_1.op({ batchNorm3d_: batchNorm3d_ });
//# sourceMappingURL=batchnorm3d.js.map