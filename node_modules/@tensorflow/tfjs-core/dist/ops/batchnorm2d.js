"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tensor_util_env_1 = require("../tensor_util_env");
var util = require("../util");
var batchnorm_1 = require("./batchnorm");
var batchnorm_util_1 = require("./batchnorm_util");
var operation_1 = require("./operation");
/**
 * Batch normalization, strictly for 2D. For the more relaxed version, see
 * `tf.batchNorm`.
 *
 * @param x The input Tensor.
 * @param mean A mean Tensor.
 * @param variance A variance Tensor.
 * @param offset An offset Tensor.
 * @param scale A scale Tensor.
 * @param varianceEpsilon A small float number to avoid dividing by 0.
 */
function batchNorm2d_(x, mean, variance, offset, scale, varianceEpsilon) {
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
    util.assert($x.rank === 2, function () { return "Error in batchNorm3D: x must be rank 3 but got rank " +
        ($x.rank + "."); });
    util.assert($mean.rank === 2 || $mean.rank === 1, function () { return "Error in batchNorm2D: mean must be rank 2 or rank 1 but " +
        ("got rank " + $mean.rank + "."); });
    util.assert($variance.rank === 2 || $variance.rank === 1, function () { return "Error in batchNorm2D: variance must be rank 2 or rank 1 " +
        ("but got rank " + $variance.rank + "."); });
    if ($scale != null) {
        util.assert($scale.rank === 2 || $scale.rank === 1, function () { return "Error in batchNorm2D: scale must be rank 2 or rank 1 " +
            ("but got rank " + $scale.rank + "."); });
    }
    if ($offset != null) {
        util.assert($offset.rank === 2 || $offset.rank === 1, function () { return "Error in batchNorm2D: offset must be rank 2 or rank 1 " +
            ("but got rank " + $offset.rank + "."); });
    }
    return batchnorm_1.batchNorm($x, $mean, $variance, $offset, $scale, varianceEpsilon);
}
/**
 * @deprecated Please use `tf.batchNorm2d` instead and note the positional
 *     argument change of scale, offset, and varianceEpsilon.
 */
function batchNormalization2d_(x, mean, variance, varianceEpsilon, scale, offset) {
    if (varianceEpsilon === void 0) { varianceEpsilon = .001; }
    batchnorm_util_1.warnDeprecation();
    return batchNorm2d_(x, mean, variance, offset, scale, varianceEpsilon);
}
// todo(yassogba): Remove batchNormalization2d since it is deprecated.
exports.batchNormalization2d = operation_1.op({ batchNormalization2d_: batchNormalization2d_ });
exports.batchNorm2d = operation_1.op({ batchNorm2d_: batchNorm2d_ });
//# sourceMappingURL=batchnorm2d.js.map