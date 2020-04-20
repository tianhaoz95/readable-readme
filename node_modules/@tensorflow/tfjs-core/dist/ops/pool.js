"use strict";
/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
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
var array_ops_1 = require("./array_ops");
var conv_util = require("./conv_util");
var operation_1 = require("./operation");
/**
 * Computes the 2D max pooling of an image.
 *
 * @param x The input tensor, of rank 4 or rank 3 of shape
 *     `[batch, height, width, inChannels]`. If rank 3, batch of 1 is assumed.
 * @param filterSize The filter size: `[filterHeight, filterWidth]`. If
 *     `filterSize` is a single number, then `filterHeight == filterWidth`.
 * @param strides The strides of the pooling: `[strideHeight, strideWidth]`. If
 *     `strides` is a single number, then `strideHeight == strideWidth`.
 * @param dilations The dilation rates: `[dilationHeight, dilationWidth]`
 *     in which we sample input values across the height and width dimensions
 *     in dilated pooling. Defaults to `[1, 1]`. If `dilations` is a single
 *     number, then `dilationHeight == dilationWidth`. If it is greater than
 *     1, then all values of `strides` must be 1.
 * @param pad The type of padding algorithm.
 *    - `same` and stride 1: output will be of same size as input,
 *       regardless of filter size.
 *    - `valid`: output will be smaller than input if filter is larger
 *       than 1x1.
 *    - For more info, see this guide:
 *     [https://www.tensorflow.org/api_guides/python/nn#Convolution](
 *          https://www.tensorflow.org/api_guides/python/nn#Convolution)
 * @param dimRoundingMode The rounding mode used when computing output
 *     dimensions if pad is a number. If none is provided, it will not round
 *     and error if the output is of fractional size.
 */
function maxPoolImpl_(x, filterSize, strides, dilations, pad, dimRoundingMode) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'maxPool');
    var x4D = $x;
    var reshapedTo4D = false;
    if ($x.rank === 3) {
        reshapedTo4D = true;
        x4D = $x.as4D(1, $x.shape[0], $x.shape[1], $x.shape[2]);
    }
    if (dilations == null) {
        dilations = [1, 1];
    }
    util.assert(x4D.rank === 4, function () { return "Error in maxPool: input must be rank 4 but got rank " + x4D.rank + "."; });
    util.assert(conv_util.eitherStridesOrDilationsAreOne(strides, dilations), function () { return 'Error in maxPool: Either strides or dilations must be 1. ' +
        ("Got strides " + strides + " and dilations '" + dilations + "'"); });
    if (dimRoundingMode != null) {
        util.assert(util.isInt(pad), function () { return "Error in maxPool: pad must be an integer when using, " +
            ("dimRoundingMode " + dimRoundingMode + " but got pad " + pad + "."); });
    }
    var convInfo = conv_util.computePool2DInfo(x4D.shape, filterSize, strides, dilations, pad, dimRoundingMode);
    if (convInfo.filterWidth === 1 && convInfo.filterHeight === 1 &&
        util.arraysEqual(convInfo.inShape, convInfo.outShape)) {
        return $x.clone();
    }
    var grad = function (dy, saved) {
        var x4D = saved[0], y = saved[1];
        return {
            x: function () { return maxPoolBackprop(dy, x4D, y, filterSize, strides, dilations, pad); }
        };
    };
    var inputsToSave = [x4D];
    var res = engine_1.ENGINE.runKernelFunc(function (backend, save) {
        var y = backend.maxPool(x4D, convInfo);
        save([x4D, y]);
        return y;
    }, { x: x4D }, grad, 'MaxPool', convInfo, inputsToSave);
    if (reshapedTo4D) {
        return res.as3D(res.shape[1], res.shape[2], res.shape[3]);
    }
    return res;
}
/**
 * Computes the 2D max pooling of an image.
 *
 * @param x The input tensor, of rank 4 or rank 3 of shape
 *     `[batch, height, width, inChannels]`. If rank 3, batch of 1 is assumed.
 * @param filterSize The filter size: `[filterHeight, filterWidth]`. If
 *     `filterSize` is a single number, then `filterHeight == filterWidth`.
 * @param strides The strides of the pooling: `[strideHeight, strideWidth]`. If
 *     `strides` is a single number, then `strideHeight == strideWidth`.
 * @param pad The type of padding algorithm.
 *    - `same` and stride 1: output will be of same size as input,
 *       regardless of filter size.
 *    - `valid`: output will be smaller than input if filter is larger
 *       than 1x1.
 *    - For more info, see this guide:
 *     [https://www.tensorflow.org/api_guides/python/nn#Convolution](
 *          https://www.tensorflow.org/api_guides/python/nn#Convolution)
 * @param dimRoundingMode The rounding mode used when computing output
 *     dimensions if pad is a number. If none is provided, it will not round
 *     and error if the output is of fractional size.
 */
/** @doc {heading: 'Operations', subheading: 'Convolution'} */
function maxPool_(x, filterSize, strides, pad, dimRoundingMode) {
    return maxPoolImpl_(x, filterSize, strides, 1, pad, dimRoundingMode);
}
/**
 * Computes the 2D average pooling of an image.
 *
 * @param x The input tensor, of rank 4 or rank 3 of shape
 *     `[batch, height, width, inChannels]`. If rank 3, batch of 1 is assumed.
 * @param filterSize The filter size: `[filterHeight, filterWidth]`. If
 *     `filterSize` is a single number, then `filterHeight == filterWidth`.
 * @param strides The strides of the pooling: `[strideHeight, strideWidth]`. If
 *     `strides` is a single number, then `strideHeight == strideWidth`.
 * @param dilations The dilation rates: `[dilationHeight, dilationWidth]`
 *     in which we sample input values across the height and width dimensions
 *     in dilated pooling. Defaults to `[1, 1]`. If `dilations` is a single
 *     number, then `dilationHeight == dilationWidth`. If it is greater than
 *     1, then all values of `strides` must be 1.
 * @param pad The type of padding algorithm:
 *    - `same` and stride 1: output will be of same size as input,
 *       regardless of filter size.
 *    - `valid`: output will be smaller than input if filter is larger
 *       than 1x1.
 *    - For more info, see this guide:
 *     [https://www.tensorflow.org/api_guides/python/nn#Convolution](
 *         https://www.tensorflow.org/api_guides/python/nn#Convolution)
 * @param dimRoundingMode The rounding mode used when computing output
 *     dimensions if pad is a number. If none is provided, it will not round
 *     and error if the output is of fractional size.
 */
function avgPoolImpl_(x, filterSize, strides, dilations, pad, dimRoundingMode) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'avgPool', 'float32');
    if (dilations == null) {
        dilations = [1, 1];
    }
    util.assert(conv_util.eitherStridesOrDilationsAreOne(strides, dilations), function () { return 'Error in avgPool: Either strides or dilations must be 1. ' +
        ("Got strides " + strides + " and dilations '" + dilations + "'"); });
    var x4D = $x;
    var reshapedTo4D = false;
    if ($x.rank === 3) {
        reshapedTo4D = true;
        x4D = $x.as4D(1, $x.shape[0], $x.shape[1], $x.shape[2]);
    }
    util.assert(x4D.rank === 4, function () { return "Error in avgPool: x must be rank 4 but got rank " + x4D.rank + "."; });
    if (dimRoundingMode != null) {
        util.assert(util.isInt(pad), function () { return "Error in avgPool: pad must be an integer when using, " +
            ("dimRoundingMode " + dimRoundingMode + " but got pad " + pad + "."); });
    }
    var convInfo = conv_util.computePool2DInfo(x4D.shape, filterSize, strides, dilations, pad, dimRoundingMode);
    if (convInfo.filterWidth === 1 && convInfo.filterHeight === 1 &&
        util.arraysEqual(convInfo.inShape, convInfo.outShape)) {
        return $x.clone();
    }
    var grad = function (dy) {
        return {
            x: function () { return avgPoolBackprop(dy, x4D, filterSize, strides, dilations, pad); }
        };
    };
    var res = engine_1.ENGINE.runKernelFunc(function (backend) { return backend.avgPool(x4D, convInfo); }, { x: x4D }, grad, 'AvgPool', convInfo);
    res = res.cast($x.dtype);
    if (reshapedTo4D) {
        return res.as3D(res.shape[1], res.shape[2], res.shape[3]);
    }
    return res;
}
/**
 * Computes the 2D average pooling of an image.
 *
 * @param x The input tensor, of rank 4 or rank 3 of shape
 *     `[batch, height, width, inChannels]`. If rank 3, batch of 1 is assumed.
 * @param filterSize The filter size: `[filterHeight, filterWidth]`. If
 *     `filterSize` is a single number, then `filterHeight == filterWidth`.
 * @param strides The strides of the pooling: `[strideHeight, strideWidth]`. If
 *     `strides` is a single number, then `strideHeight == strideWidth`.
 * @param pad The type of padding algorithm:
 *    - `same` and stride 1: output will be of same size as input,
 *       regardless of filter size.
 *    - `valid`: output will be smaller than input if filter is larger
 *       than 1x1.
 *    - For more info, see this guide:
 *     [https://www.tensorflow.org/api_guides/python/nn#Convolution](
 *         https://www.tensorflow.org/api_guides/python/nn#Convolution)
 * @param dimRoundingMode The rounding mode used when computing output
 *     dimensions if pad is a number. If none is provided, it will not round
 *     and error if the output is of fractional size.
 */
/** @doc {heading: 'Operations', subheading: 'Convolution'} */
function avgPool_(x, filterSize, strides, pad, dimRoundingMode) {
    return avgPoolImpl_(x, filterSize, strides, 1, pad, dimRoundingMode);
}
/**
 * Performs an N-D pooling operation
 *
 * @param input The input tensor, of rank 4 or rank 3 of shape
 *     `[batch, height, width, inChannels]`. If rank 3, batch of 1 is assumed.
 * @param windowShape The filter size: `[filterHeight, filterWidth]`. If
 *     `filterSize` is a single number, then `filterHeight == filterWidth`.
 * @param poolingType The type of pooling, either 'max' or 'avg'.
 * @param pad The type of padding algorithm:
 *    - `same` and stride 1: output will be of same size as input,
 *       regardless of filter size.
 *    - `valid`: output will be smaller than input if filter is larger
 *       than 1x1.
 *    - For more info, see this guide:
 *     [https://www.tensorflow.org/api_guides/python/nn#Convolution](
 *         https://www.tensorflow.org/api_guides/python/nn#Convolution)
 * @param dilations The dilation rates: `[dilationHeight, dilationWidth]`
 *     in which we sample input values across the height and width dimensions
 *     in dilated pooling. Defaults to `[1, 1]`. If `dilationRate` is a single
 *     number, then `dilationHeight == dilationWidth`. If it is greater than
 *     1, then all values of `strides` must be 1.
 * @param strides The strides of the pooling: `[strideHeight, strideWidth]`. If
 *     `strides` is a single number, then `strideHeight == strideWidth`.
 */
/** @doc {heading: 'Operations', subheading: 'Convolution'} */
function pool_(input, windowShape, poolingType, pad, dilations, strides) {
    if (dilations == null) {
        dilations = [1, 1];
    }
    if (strides == null) {
        strides = 1;
    }
    if (pad === 0) {
        pad = 'valid';
    }
    var $x = tensor_util_env_1.convertToTensor(input, 'x', 'maxPool');
    var x4D = $x;
    var reshapedTo4D = false;
    if ($x.rank === 3) {
        reshapedTo4D = true;
        x4D = $x.as4D(1, $x.shape[0], $x.shape[1], $x.shape[2]);
    }
    util.assert(conv_util.eitherStridesOrDilationsAreOne(strides, dilations), function () { return 'Error in pool: Either strides or dilations must be 1. ' +
        ("Got strides " + strides + " and dilations '" + dilations + "'"); });
    var convInfo = conv_util.computePool2DInfo(x4D.shape, windowShape, strides, dilations, pad);
    var dilation = [convInfo.dilationHeight, convInfo.dilationWidth];
    // The following implementation does batchToSpace(pool(spaceToBatch(x)))
    // whenever dilation > 1 since the TF kernels do not support dilation > 1.
    // tslint:disable-next-line:max-line-length
    // https://github.com/tensorflow/tensorflow/blob/50f6bb67dc98c9b74630b6047aae7a4f8a40fd02/tensorflow/python/ops/nn_ops.py#L1037
    var basePadding;
    if (pad === 'same') {
        basePadding = withSpaceToBatchBasePaddings([convInfo.filterHeight, convInfo.filterWidth], dilation);
    }
    else {
        basePadding = [[0, 0], [0, 0]];
    }
    var isDilationOne = dilation[0] === 1 && dilation[1] === 1;
    var _a = requiredSpaceToBatchPaddings([convInfo.inHeight, convInfo.inWidth], dilation, basePadding), adjustedPadding = _a[0], adjustedCrops = _a[1];
    var convertedPad = isDilationOne ? pad : 'valid';
    var convertedX = isDilationOne ? x4D : array_ops_1.spaceToBatchND(x4D, dilation, adjustedPadding);
    var forwardOp = poolingType === 'avg' ?
        function () { return avgPoolImpl_(convertedX, windowShape, strides, 1 /* dilation */, convertedPad); } :
        function () { return maxPoolImpl_(convertedX, windowShape, strides, 1 /* dilation */, convertedPad); };
    var y = forwardOp();
    var res = isDilationOne ? y : array_ops_1.batchToSpaceND(y, dilation, adjustedCrops);
    if (reshapedTo4D) {
        return res.as3D(res.shape[1], res.shape[2], res.shape[3]);
    }
    return res;
}
/**
 * Computes the backprop of a 2D max pool.
 *
 * @param dy The dy error, of rank 4 or rank 3 of shape
 *     [batchSize, height, width, channels]. If rank 3, batch of 1 is
 * assumed.
 * @param input The original input image, of rank 4, of shape
 *     [batchSize, height, width, channels].
 * @param output The original output image, of rank 4, of shape
 *     [batchSize, outHeight, outWidth, channels].
 * @param filterSize The filter size: `[filterHeight, filterWidth]`. If
 *     `filterSize` is a single number, then `filterHeight == filterWidth`.
 * @param strides The strides of the pooling: `[strideHeight, strideWidth]`. If
 *     `strides` is a single number, then `strideHeight == strideWidth`.
 * @param pad A string from: 'same', 'valid'. The type of padding algorithm
 *     used in the forward prop of the op.
 * @param dimRoundingMode A string from: 'ceil', 'round', 'floor'. The
 *     rounding mode used when computing output dimensions if pad is a
 *     number. If none is provided, it will not round and error if the output
 *     is of fractional size.
 */
function maxPoolBackprop(dy, input, output, filterSize, strides, dilations, pad, dimRoundingMode) {
    var $dy = tensor_util_env_1.convertToTensor(dy, 'dy', 'maxPoolBackprop');
    var $input = tensor_util_env_1.convertToTensor(input, 'input', 'maxPoolBackprop');
    var $output = tensor_util_env_1.convertToTensor(output, 'output', 'maxPoolBackprop');
    util.assert($input.rank === $dy.rank, function () { return "Rank of input (" + $input.rank + ") does not match rank of dy " +
        ("(" + $dy.rank + ")"); });
    if (dilations == null) {
        dilations = [1, 1];
    }
    util.assert(conv_util.eitherStridesOrDilationsAreOne(strides, dilations), function () {
        return 'Error in maxPoolBackProp: Either strides or dilations must be 1. ' +
            ("Got strides " + strides + " and dilations '" + dilations + "'");
    });
    util.assert($dy.rank === 4, function () { return "Error in maxPoolBackprop: dy must be rank 4 but got rank " +
        ($dy.rank + "."); });
    util.assert($input.rank === 4, function () { return "Error in maxPoolBackprop: input must be rank 4 but got rank " +
        ($input.rank + "."); });
    if (dimRoundingMode != null) {
        util.assert(util.isInt(pad), function () { return "Error in maxPoolBackprop: pad must be an integer when using, " +
            ("dimRoundingMode " + dimRoundingMode + " but got pad " + pad + "."); });
    }
    var convInfo = conv_util.computePool2DInfo($input.shape, filterSize, strides, dilations, pad, dimRoundingMode);
    var res = engine_1.ENGINE.runKernelFunc(function (backend) { return backend.maxPoolBackprop($dy, $input, $output, convInfo); }, { $dy: $dy, $input: $input });
    return res;
}
/**
 * Computes the backprop of an 2D avg pool.
 *
 * @param dy The dy error, of rank 4 or rank 3 of shape
 *     [batchSize, height, width, channels]. If rank 3, batch of 1 is
 * assumed.
 * @param input The input image, of rank 4 or rank 3 of shape
 *     [batchSize, height, width, channels]. If rank 3, batch of 1 is
 * assumed.
 * @param filterSize The filter size: `[filterHeight, filterWidth]`. If
 *     `filterSize` is a single number, then `filterHeight == filterWidth`.
 * @param strides The strides of the pooling: `[strideHeight, strideWidth]`. If
 *     `strides` is a single number, then `strideHeight == strideWidth`.
 * @param pad A string from: 'same', 'valid'. The type of padding algorithm
 *     used in the forward prop of the op.
 */
function avgPoolBackprop(dy, input, filterSize, strides, dilations, pad) {
    var $dy = tensor_util_env_1.convertToTensor(dy, 'dy', 'avgPoolBackprop');
    var $input = tensor_util_env_1.convertToTensor(input, 'input', 'avgPoolBackprop');
    util.assert($input.rank === $dy.rank, function () { return "Rank of input (" + $input.rank + ") does not match rank of dy (" + $dy.rank + ")"; });
    if (dilations == null) {
        dilations = [1, 1];
    }
    util.assert(conv_util.eitherStridesOrDilationsAreOne(strides, dilations), function () {
        return 'Error in avgPoolBackprop: Either strides or dilations must be 1. ' +
            ("Got strides " + strides + " and dilations '" + dilations + "'");
    });
    var input4D = $input;
    var dy4D = $dy;
    var reshapedTo4D = false;
    if ($input.rank === 3) {
        reshapedTo4D = true;
        input4D = $input.as4D(1, $input.shape[0], $input.shape[1], $input.shape[2]);
        dy4D = $dy.as4D(1, $dy.shape[0], $dy.shape[1], $dy.shape[2]);
    }
    util.assert(dy4D.rank === 4, function () { return "Error in avgPoolBackprop: dy must be rank 4 but got rank " +
        (dy4D.rank + "."); });
    util.assert(input4D.rank === 4, function () { return "Error in avgPoolBackprop: input must be rank 4 but got rank " +
        (input4D.rank + "."); });
    var convInfo = conv_util.computePool2DInfo(input4D.shape, filterSize, strides, dilations, pad);
    var res = engine_1.ENGINE.runKernelFunc(function (backend) { return backend.avgPoolBackprop(dy4D, input4D, convInfo); }, { dy4D: dy4D, input4D: input4D });
    if (reshapedTo4D) {
        return res.as3D(res.shape[1], res.shape[2], res.shape[3]);
    }
    return res;
}
// Helper function to compute crops and paddings for pool with dilation > 1.
// tslint:disable-next-line:max-line-length
// https://github.com/tensorflow/tensorflow/blob/50f6bb67dc98c9b74630b6047aae7a4f8a40fd02/tensorflow/python/ops/array_ops.py#L2184
function requiredSpaceToBatchPaddings(inputShape, blockShape, basePadding) {
    var padStart = basePadding.map(function (b) { return b[0]; });
    var origPadEnd = basePadding.map(function (b) { return b[1]; });
    var fullInputShape = inputShape.concat(padStart, origPadEnd);
    var padEndExtra = blockShape.map(function (b, i) { return (b - fullInputShape[i] % b) % b; });
    var padEnd = origPadEnd.map(function (s, i) { return s + padEndExtra[i]; });
    var paddings = blockShape.map(function (_, i) { return [padStart[i], padEnd[i]]; });
    var crops = blockShape.map(function (_, i) { return [0, padEndExtra[i]]; });
    return [paddings, crops];
}
// Helper function to compute base paddings for pool with dilation > 1.
// tslint:disable-next-line:max-line-length
// https://github.com/tensorflow/tensorflow/blob/50f6bb67dc98c9b74630b6047aae7a4f8a40fd02/tensorflow/python/ops/nn_ops.py#L524
function withSpaceToBatchBasePaddings(filterShape, dilation) {
    // Spatial dimensions of the filters and the upsampled filters in which we
    // introduce (rate - 1) zeros between consecutive filter values.
    var dilatedFilterShape = filterShape.map(function (s, i) {
        return s + (s - 1) * (dilation[i] - 1);
    });
    var padExtraShape = dilatedFilterShape.map(function (s) { return s - 1; });
    // When padding is odd, we pad more at end, following the same
    // convention as conv2d.
    var padExtraStart = padExtraShape.map(function (s) { return Math.floor(s / 2); });
    var padExtraEnd = padExtraShape.map(function (s, i) { return s - padExtraStart[i]; });
    return padExtraShape.map(function (_, i) {
        return [padExtraStart[i], padExtraEnd[i]];
    });
}
/**
 * Computes the 3D average pooling.
 *
 * ```js
 * const x = tf.tensor5d([1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 2, 2, 1]);
 * const result = tf.avgPool3d(x, 2, 1, 'valid');
 * result.print();
 * ```
 *
 * @param x The input tensor, of rank 5 or rank 4 of shape
 *     `[batch, depth, height, width, inChannels]`.
 * @param filterSize The filter size:
 *     `[filterDepth, filterHeight, filterWidth]`.
 *     If `filterSize` is a single number,
 *     then `filterDepth == filterHeight == filterWidth`.
 * @param strides The strides of the pooling:
 *     `[strideDepth, strideHeight, strideWidth]`.
 *     If `strides` is a single number,
 *     then `strideDepth == strideHeight == strideWidth`.
 * @param pad The type of padding algorithm.
 *    - `same` and stride 1: output will be of same size as input,
 *       regardless of filter size.
 *    - `valid`: output will be smaller than input if filter is larger
 *       than 1*1x1.
 *    - For more info, see this guide:
 *     [https://www.tensorflow.org/api_guides/python/nn#Convolution](
 *          https://www.tensorflow.org/api_guides/python/nn#Convolution)
 * @param dimRoundingMode The rounding mode used when computing output
 *     dimensions if pad is a number. If none is provided, it will not round
 *     and error if the output is of fractional size.
 * @param dataFormat An optional string from: "NDHWC", "NCDHW". Defaults to
 *     "NDHWC". Specify the data format of the input and output data. With the
 *     default format "NDHWC", the data is stored in the order of: [batch,
 *     depth, height, width, channels]. Only "NDHWC" is currently supported.
 * @param dilations The dilation rates:
 *     `[dilationDepth, dilationHeight, dilationWidth]`
 *     in which we sample input values across the depth, height and width
 *     dimensions in dilated pooling.
 *     Defaults to `[1, 1, 1]`. If `dilations` is a single number,
 *     then `dilationDepth == dilationHeight == dilationWidth`.
 *     If it is greater than 1, then all values of `strides` must be 1.
 */
/** @doc {heading: 'Operations', subheading: 'Convolution'} */
function avgPool3d_(x, filterSize, strides, pad, dimRoundingMode, dataFormat, dilations) {
    if (dataFormat === void 0) { dataFormat = 'NDHWC'; }
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'avgPool3d', 'float32');
    var x5D = $x;
    var reshapedTo5D = false;
    if ($x.rank === 4) {
        reshapedTo5D = true;
        x5D = $x.as5D(1, $x.shape[0], $x.shape[1], $x.shape[2], $x.shape[3]);
    }
    if (dilations == null) {
        dilations = [1, 1, 1];
    }
    util.assert(x5D.rank === 5, function () { return "Error in avgPool3d: x must be rank 5 but got rank " + x5D.rank + "."; });
    util.assert(dataFormat === 'NDHWC', function () { return "Error in avgPool3d: Only NDHWC is currently supported, " +
        ("but got dataFormat of " + dataFormat); });
    util.assert(conv_util.eitherStridesOrDilationsAreOne(strides, dilations), function () { return 'Error in avgPool3d: Either strides or dilations must be 1. ' +
        ("Got strides " + strides + " and dilations '" + dilations + "'"); });
    if (dimRoundingMode != null) {
        util.assert(util.isInt(pad), function () { return "Error in avgPool3d: pad must be an integer when using, " +
            ("dimRoundingMode " + dimRoundingMode + " but got pad " + pad + "."); });
    }
    var convInfo = conv_util.computePool3DInfo(x5D.shape, filterSize, strides, dilations, pad, dimRoundingMode, dataFormat);
    var grad = function (dy) {
        return {
            x: function () { return avgPool3dBackprop(dy, x5D, filterSize, strides, dilations, pad, dimRoundingMode); }
        };
    };
    var res = engine_1.ENGINE.runKernelFunc(function (backend) { return backend.avgPool3d(x5D, convInfo); }, { x: x5D }, grad);
    res = res.cast(x5D.dtype);
    if (reshapedTo5D) {
        return res.as4D(res.shape[1], res.shape[2], res.shape[3], res.shape[4]);
    }
    return res;
}
/**
 * Computes the backprop of a 3d avg pool.
 *
 * @param dy The dy error, of rank 5 of shape
 *     [batchSize, depth, height, width, channels].
 * assumed.
 * @param input The original input image, of rank 5 or rank4 of shape
 *     [batchSize, depth, height, width, channels].
 * @param filterSize The filter size:
 *     `[filterDepth, filterHeight, filterWidth]`.
 *     `filterSize` is a single number,
 *     then `filterDepth == filterHeight == filterWidth`.
 * @param strides The strides of the pooling:
 *     `[strideDepth, strideHeight, strideWidth]`. If
 *     `strides` is a single number, then `strideHeight == strideWidth`.
 * @param dilations The dilation rates:
 *     `[dilationDepth, dilationHeight, dilationWidth]`
 *     in which we sample input values across the depth, height and width
 *     dimensions in dilated pooling.
 *     Defaults to `[1, 1, 1]`. If `dilations` is a single number,
 *     then `dilationDepth == dilationHeight == dilationWidth`.
 *     If it is greater than 1, then all values of `strides` must be 1.
 * @param pad A string from: 'same', 'valid'. The type of padding algorithm
 *     used in the forward prop of the op.
 * @param dimRoundingMode A string from: 'ceil', 'round', 'floor'. The
 *     rounding mode used when computing output dimensions if pad is a
 *     number. If none is provided, it will not round and error if the output
 *     is of fractional size.
 */
function avgPool3dBackprop(dy, input, filterSize, strides, dilations, pad, dimRoundingMode) {
    var $dy = tensor_util_env_1.convertToTensor(dy, 'dy', 'avgPool3dBackprop');
    var $input = tensor_util_env_1.convertToTensor(input, 'input', 'avgPool3dBackprop');
    var dy5D = $dy;
    var input5D = $input;
    var reshapedTo5D = false;
    if ($input.rank === 4) {
        reshapedTo5D = true;
        dy5D = $dy.as5D(1, $dy.shape[0], $dy.shape[1], $dy.shape[2], $dy.shape[3]);
        input5D = $input.as5D(1, $input.shape[0], $input.shape[1], $input.shape[2], $input.shape[3]);
    }
    util.assert(dy5D.rank === 5, function () { return "Error in avgPool3dBackprop: dy must be rank 5 but got rank " +
        (dy5D.rank + "."); });
    util.assert(input5D.rank === 5, function () { return "Error in avgPool3dBackprop: input must be rank 5 but got rank " +
        (input5D.rank + "."); });
    if (dilations == null) {
        dilations = [1, 1, 1];
    }
    util.assert(conv_util.eitherStridesOrDilationsAreOne(strides, dilations), function () { return 'Error in avgPool3dBackprop: Either strides or dilations ' +
        ("must be 1. Got strides " + strides + " and dilations '" + dilations + "'"); });
    if (dimRoundingMode != null) {
        util.assert(util.isInt(pad), function () { return "Error in maxPool3dBackprop: pad must be an integer when " +
            ("using, dimRoundingMode " + dimRoundingMode + " but got pad " + pad + "."); });
    }
    var convInfo = conv_util.computePool3DInfo(input5D.shape, filterSize, strides, dilations, pad, dimRoundingMode);
    var res = engine_1.ENGINE.runKernelFunc(function (backend) { return backend.avgPool3dBackprop(dy5D, input5D, convInfo); }, { dy5D: dy5D, input5D: input5D });
    if (reshapedTo5D) {
        return res.as4D(res.shape[1], res.shape[2], res.shape[3], res.shape[4]);
    }
    return res;
}
/**
 * Computes the 3D max pooling.
 *
 * ```js
 * const x = tf.tensor5d([1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 2, 2, 1]);
 * const result = tf.maxPool3d(x, 2, 1, 'valid');
 * result.print();
 * ```
 *
 * @param x The input tensor, of rank 5 or rank 4 of shape
 *     `[batch, depth, height, width, inChannels]`.
 * @param filterSize The filter size:
 *     `[filterDepth, filterHeight, filterWidth]`.
 *     If `filterSize` is a single number,
 *     then `filterDepth == filterHeight == filterWidth`.
 * @param strides The strides of the pooling:
 *     `[strideDepth, strideHeight, strideWidth]`.
 *     If `strides` is a single number,
 *     then `strideDepth == strideHeight == strideWidth`.
 * @param pad The type of padding algorithm.
 *    - `same` and stride 1: output will be of same size as input,
 *       regardless of filter size.
 *    - `valid`: output will be smaller than input if filter is larger
 *       than 1*1x1.
 *    - For more info, see this guide:
 *     [https://www.tensorflow.org/api_guides/python/nn#Convolution](
 *          https://www.tensorflow.org/api_guides/python/nn#Convolution)
 * @param dimRoundingMode The rounding mode used when computing output
 *     dimensions if pad is a number. If none is provided, it will not round
 *     and error if the output is of fractional size.
 * @param dataFormat An optional string from: "NDHWC", "NCDHW". Defaults to
 *     "NDHWC". Specify the data format of the input and output data. With the
 *     default format "NDHWC", the data is stored in the order of: [batch,
 *     depth, height, width, channels]. Only "NDHWC" is currently supported.
 * @param dilations The dilation rates:
 *     `[dilationDepth, dilationHeight, dilationWidth]`
 *     in which we sample input values across the depth, height and width
 *     dimensions in dilated pooling.
 *     Defaults to `[1, 1, 1]`. If `dilations` is a single number,
 *     then `dilationDepth == dilationHeight == dilationWidth`.
 *     If it is greater than 1, then all values of `strides` must be 1.
 */
/** @doc {heading: 'Operations', subheading: 'Convolution'} */
function maxPool3d_(x, filterSize, strides, pad, dimRoundingMode, dataFormat, dilations) {
    if (dataFormat === void 0) { dataFormat = 'NDHWC'; }
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'maxPool3d');
    var x5D = $x;
    var reshapedTo5D = false;
    if ($x.rank === 4) {
        reshapedTo5D = true;
        x5D = $x.as5D(1, $x.shape[0], $x.shape[1], $x.shape[2], $x.shape[3]);
    }
    if (dilations == null) {
        dilations = [1, 1, 1];
    }
    util.assert(x5D.rank === 5, function () { return "Error in maxPool3d: x must be rank 5 but got rank " + x5D.rank + "."; });
    util.assert(dataFormat === 'NDHWC', function () { return "Error in maxPool3d: Only NDHWC is currently supported, " +
        ("but got dataFormat of " + dataFormat); });
    util.assert(conv_util.eitherStridesOrDilationsAreOne(strides, dilations), function () { return 'Error in maxPool3d: Either strides or dilations must be 1. ' +
        ("Got strides " + strides + " and dilations '" + dilations + "'"); });
    if (dimRoundingMode != null) {
        util.assert(util.isInt(pad), function () { return "Error in maxPool3d: pad must be an integer when using, " +
            ("dimRoundingMode " + dimRoundingMode + " but got pad " + pad + "."); });
    }
    var convInfo = conv_util.computePool3DInfo(x5D.shape, filterSize, strides, dilations, pad, dimRoundingMode, dataFormat);
    var grad = function (dy, saved) {
        var x5D = saved[0], y = saved[1];
        return {
            x: function () { return maxPool3dBackprop(dy, x5D, y, filterSize, strides, dilations, pad, dimRoundingMode); }
        };
    };
    var res = engine_1.ENGINE.runKernelFunc(function (backend, save) {
        var y = backend.maxPool3d(x5D, convInfo);
        save([x5D, y]);
        return y;
    }, { x: x5D }, grad);
    if (reshapedTo5D) {
        return res.as4D(res.shape[1], res.shape[2], res.shape[3], res.shape[4]);
    }
    return res;
}
/**
 * Computes the backprop of a 3d max pool.
 *
 * @param dy The dy error, of rank 5 of shape
 *     [batchSize, depth, height, width, channels].
 * assumed.
 * @param input The original input image, of rank 5 or rank 4 of shape
 *     [batchSize, depth, height, width, channels].
 * @param output The original output image, of rank 5 of shape
 *     [batchSize, outDepth, outHeight, outWidth, channels].
 * @param filterSize The filter size:
 *     `[filterDepth, filterHeight, filterWidth]`.
 *     `filterSize` is a single number,
 *     then `filterDepth == filterHeight == filterWidth`.
 * @param strides The strides of the pooling:
 *     `[strideDepth, strideHeight, strideWidth]`. If
 *     `strides` is a single number, then `strideHeight == strideWidth`.
 * @param dilations The dilation rates:
 *     `[dilationDepth, dilationHeight, dilationWidth]`
 *     in which we sample input values across the depth, height and width
 *     dimensions in dilated pooling.
 *     Defaults to `[1, 1, 1]`. If `dilations` is a single number,
 *     then `dilationDepth == dilationHeight == dilationWidth`.
 *     If it is greater than 1, then all values of `strides` must be 1.
 * @param pad A string from: 'same', 'valid'. The type of padding algorithm
 *     used in the forward prop of the op.
 * @param dimRoundingMode A string from: 'ceil', 'round', 'floor'. The
 *     rounding mode used when computing output dimensions if pad is a
 *     number. If none is provided, it will not round and error if the output
 *     is of fractional size.
 */
function maxPool3dBackprop(dy, input, output, filterSize, strides, dilations, pad, dimRoundingMode) {
    var $dy = tensor_util_env_1.convertToTensor(dy, 'dy', 'maxPool3dBackprop');
    var $input = tensor_util_env_1.convertToTensor(input, 'input', 'maxPool3dBackprop');
    var $output = tensor_util_env_1.convertToTensor(output, 'output', 'maxPool3dBackprop');
    var dy5D = $dy;
    var input5D = $input;
    var output5D = $output;
    var reshapedTo5D = false;
    if ($input.rank === 4) {
        reshapedTo5D = true;
        dy5D = $dy.as5D(1, $dy.shape[0], $dy.shape[1], $dy.shape[2], $dy.shape[3]);
        input5D = $input.as5D(1, $input.shape[0], $input.shape[1], $input.shape[2], $input.shape[3]);
        output5D = $output.as5D(1, $output.shape[0], $output.shape[1], $output.shape[2], $output.shape[3]);
    }
    util.assert(dy5D.rank === 5, function () { return "Error in maxPool3dBackprop: dy must be rank 5 but got rank " +
        (dy5D.rank + "."); });
    util.assert(input5D.rank === 5, function () { return "Error in maxPool3dBackprop: input must be rank 5 but got rank " +
        (input5D.rank + "."); });
    util.assert(output5D.rank === 5, function () { return "Error in maxPool3dBackprop: output must be rank 5 but got rank " +
        (output5D.rank + "."); });
    if (dilations == null) {
        dilations = [1, 1, 1];
    }
    util.assert(conv_util.eitherStridesOrDilationsAreOne(strides, dilations), function () { return 'Error in maxPool3dBackprop: Either strides or dilations ' +
        ("must be 1. Got strides " + strides + " and dilations '" + dilations + "'"); });
    if (dimRoundingMode != null) {
        util.assert(util.isInt(pad), function () { return "Error in maxPool3dBackprop: pad must be an integer when " +
            ("using, dimRoundingMode " + dimRoundingMode + " but got pad " + pad + "."); });
    }
    var convInfo = conv_util.computePool3DInfo(input5D.shape, filterSize, strides, dilations, pad, dimRoundingMode);
    var res = engine_1.ENGINE.runKernelFunc(function (backend) { return backend.maxPool3dBackprop(dy5D, input5D, output5D, convInfo); }, { dy5D: dy5D, input5D: input5D });
    if (reshapedTo5D) {
        return res.as4D(res.shape[1], res.shape[2], res.shape[3], res.shape[4]);
    }
    return res;
}
/**
 * Computes the 2D max pooling of an image with Argmax index.
 * The indices in argmax are flattened, so that a maximum value at position `[b,
 * y, x, c]` becomes flattened index: `(y * width + x) * channels + c` if
 * include_batch_in_index is False; `((b * height + y) * width + x) * channels
 * +c` if include_batch_in_index is True.
 *
 * The indices returned are always in `[0, height) x [0, width)` before
 * flattening.
 *
 * @param x The input tensor, of rank 4 or rank 3 of shape
 *     `[batch, height, width, inChannels]`. If rank 3, batch of 1 is assumed.
 * @param filterSize The filter size: `[filterHeight, filterWidth]`. If
 *     `filterSize` is a single number, then `filterHeight == filterWidth`.
 * @param strides The strides of the pooling: `[strideHeight, strideWidth]`. If
 *     `strides` is a single number, then `strideHeight == strideWidth`.
 * @param dataFormat An optional string from: "NDHWC", "NCDHW". Defaults to
 *     "NDHWC". Specify the data format of the input and output data. With the
 *     default format "NDHWC", the data is stored in the order of: [batch,
 *     depth, height, width, channels]. Only "NDHWC" is currently supported.
 * @param pad The type of padding algorithm.
 *    - `same` and stride 1: output will be of same size as input,
 *       regardless of filter size.
 *    - `valid`: output will be smaller than input if filter is larger
 *       than 1x1.
 *    - For more info, see this guide:
 *     [https://www.tensorflow.org/api_guides/python/nn#Convolution](
 *          https://www.tensorflow.org/api_guides/python/nn#Convolution)
 * @param includeBatchIndex Defaults to False. Whether to include batch
 *    dimension in flattened index of argmax.
 */
/** @doc {heading: 'Operations', subheading: 'Convolution'} */
/** @doc {heading: 'Operations', subheading: 'Convolution'} */
function maxPoolWithArgmax_(x, filterSize, strides, pad, includeBatchInIndex) {
    if (includeBatchInIndex === void 0) { includeBatchInIndex = false; }
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'maxPoolWithArgmax');
    var attrs = { filterSize: filterSize, strides: strides, pad: pad, includeBatchInIndex: includeBatchInIndex };
    var result = engine_1.ENGINE.runKernel('MaxPoolWithArgmax', { x: $x }, attrs);
    return { result: result[0], indexes: result[1] };
}
exports.maxPool = operation_1.op({ maxPool_: maxPool_ });
exports.avgPool = operation_1.op({ avgPool_: avgPool_ });
exports.pool = operation_1.op({ pool_: pool_ });
exports.maxPool3d = operation_1.op({ maxPool3d_: maxPool3d_ });
exports.avgPool3d = operation_1.op({ avgPool3d_: avgPool3d_ });
exports.maxPoolWithArgmax = operation_1.op({ maxPoolWithArgmax_: maxPoolWithArgmax_ });
//# sourceMappingURL=pool.js.map