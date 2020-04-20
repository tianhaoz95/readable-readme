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
var tfc = require("@tensorflow/tfjs-core");
var utils_1 = require("./utils");
exports.executeOp = function (node, tensorMap, context) {
    switch (node.op) {
        case 'Conv1D': {
            var stride = utils_1.getParamValue('stride', node, tensorMap, context);
            var pad = utils_1.getParamValue('pad', node, tensorMap, context);
            var dataFormat = utils_1.getParamValue('dataFormat', node, tensorMap, context)
                .toUpperCase();
            var dilation = utils_1.getParamValue('dilation', node, tensorMap, context);
            return [tfc.conv1d(utils_1.getParamValue('x', node, tensorMap, context), utils_1.getParamValue('filter', node, tensorMap, context), stride, pad, dataFormat, dilation)];
        }
        case 'Conv2D': {
            var stride = utils_1.getParamValue('strides', node, tensorMap, context);
            var pad = utils_1.getParamValue('pad', node, tensorMap, context);
            var dataFormat = utils_1.getParamValue('dataFormat', node, tensorMap, context)
                .toUpperCase();
            var dilations = utils_1.getParamValue('dilations', node, tensorMap, context);
            return [tfc.conv2d(utils_1.getParamValue('x', node, tensorMap, context), utils_1.getParamValue('filter', node, tensorMap, context), [stride[1], stride[2]], pad, dataFormat, [dilations[1], dilations[2]])];
        }
        case '_FusedConv2D':
        case 'FusedDepthwiseConv2dNative': {
            var _a = utils_1.getParamValue('fusedOps', node, tensorMap, context), extraOp = _a[0], activationFunc = _a[1];
            var isBiasAdd = extraOp === 'biasadd';
            var isPrelu = activationFunc === 'prelu';
            var isBatchNorm = extraOp === 'fusedbatchnorm';
            var numArgs = utils_1.getParamValue('numArgs', node, tensorMap, context);
            if (isBiasAdd) {
                if (isPrelu && numArgs !== 2) {
                    throw new Error('FusedConv2d and DepthwiseConv2d with BiasAdd and Prelu ' +
                        'must have two extra arguments: bias and alpha.');
                }
                if (!isPrelu && numArgs !== 1) {
                    throw new Error('FusedConv2d and DepthwiseConv2d with BiasAdd must have ' +
                        'one extra argument: bias.');
                }
            }
            if (isBatchNorm) {
                throw new Error('FusedConv2d and DepthwiseConv2d with FusedBatchNorm is not supported.');
            }
            var stride = utils_1.getParamValue('strides', node, tensorMap, context);
            var pad = utils_1.getParamValue('pad', node, tensorMap, context);
            var dataFormat = utils_1.getParamValue('dataFormat', node, tensorMap, context)
                .toUpperCase();
            var dilations = utils_1.getParamValue('dilations', node, tensorMap, context);
            var _b = utils_1.getParamValue('args', node, tensorMap, context), biasArg = _b[0], preluArg = _b[1];
            var kernelMethod = node.op === '_FusedConv2D' ?
                tfc.fused.conv2d :
                tfc.fused.depthwiseConv2d;
            return [kernelMethod({
                    x: utils_1.getParamValue('x', node, tensorMap, context),
                    filter: utils_1.getParamValue('filter', node, tensorMap, context),
                    strides: [stride[1], stride[2]],
                    pad: pad,
                    dataFormat: dataFormat,
                    dilations: [dilations[1], dilations[2]],
                    bias: biasArg,
                    activation: activationFunc,
                    preluActivationWeights: preluArg
                })];
        }
        case 'Conv2DBackpropInput':
        case 'Conv2dTranspose': {
            var shape = utils_1.getParamValue('outputShape', node, tensorMap, context);
            var stride = utils_1.getParamValue('strides', node, tensorMap, context);
            var pad = utils_1.getParamValue('pad', node, tensorMap, context);
            return [tfc.conv2dTranspose(utils_1.getParamValue('x', node, tensorMap, context), utils_1.getParamValue('filter', node, tensorMap, context), shape, [stride[1], stride[2]], pad)];
        }
        case 'DepthwiseConv2dNative':
        case 'DepthwiseConv2d': {
            var stride = utils_1.getParamValue('strides', node, tensorMap, context);
            var pad = utils_1.getParamValue('pad', node, tensorMap, context);
            var dilations = utils_1.getParamValue('dilations', node, tensorMap, context);
            var dataFormat = utils_1.getParamValue('dataFormat', node, tensorMap, context)
                .toUpperCase();
            return [tfc.depthwiseConv2d(utils_1.getParamValue('input', node, tensorMap, context), utils_1.getParamValue('filter', node, tensorMap, context), [stride[1], stride[2]], pad, dataFormat, [dilations[1], dilations[2]])];
        }
        case 'Conv3D': {
            var stride = utils_1.getParamValue('strides', node, tensorMap, context);
            var pad = utils_1.getParamValue('pad', node, tensorMap, context);
            var dataFormat = utils_1.getParamValue('dataFormat', node, tensorMap, context)
                .toUpperCase();
            var dilations = utils_1.getParamValue('dilations', node, tensorMap, context);
            return [tfc.conv3d(utils_1.getParamValue('x', node, tensorMap, context), utils_1.getParamValue('filter', node, tensorMap, context), [stride[1], stride[2], stride[3]], pad, dataFormat, [dilations[1], dilations[2], dilations[3]])];
        }
        case 'AvgPool': {
            var stride = utils_1.getParamValue('strides', node, tensorMap, context);
            var pad = utils_1.getParamValue('pad', node, tensorMap, context);
            var kernelSize = utils_1.getParamValue('kernelSize', node, tensorMap, context);
            return [tfc.avgPool(utils_1.getParamValue('x', node, tensorMap, context), [kernelSize[1], kernelSize[2]], [stride[1], stride[2]], pad)];
        }
        case 'MaxPool': {
            var stride = utils_1.getParamValue('strides', node, tensorMap, context);
            var pad = utils_1.getParamValue('pad', node, tensorMap, context);
            var kernelSize = utils_1.getParamValue('kernelSize', node, tensorMap, context);
            return [tfc.maxPool(utils_1.getParamValue('x', node, tensorMap, context), [kernelSize[1], kernelSize[2]], [stride[1], stride[2]], pad)];
        }
        case 'MaxPoolWithArgmax': {
            var stride = utils_1.getParamValue('strides', node, tensorMap, context);
            var pad = utils_1.getParamValue('pad', node, tensorMap, context);
            var kernelSize = utils_1.getParamValue('kernelSize', node, tensorMap, context);
            var includeBatchInIndex = utils_1.getParamValue('includeBatchInIndex', node, tensorMap, context);
            var _c = tfc.maxPoolWithArgmax(utils_1.getParamValue('x', node, tensorMap, context), [kernelSize[1], kernelSize[2]], [stride[1], stride[2]], pad, includeBatchInIndex), result = _c.result, indexes = _c.indexes;
            return [result, indexes];
        }
        case 'AvgPool3D': {
            var stride = utils_1.getParamValue('strides', node, tensorMap, context);
            var pad = utils_1.getParamValue('pad', node, tensorMap, context);
            var kernelSize = utils_1.getParamValue('kernelSize', node, tensorMap, context);
            return [tfc.avgPool3d(utils_1.getParamValue('x', node, tensorMap, context), [kernelSize[1], kernelSize[2], kernelSize[3]], [stride[1], stride[2], stride[3]], pad)];
        }
        case 'MaxPool3D': {
            var stride = utils_1.getParamValue('strides', node, tensorMap, context);
            var pad = utils_1.getParamValue('pad', node, tensorMap, context);
            var kernelSize = utils_1.getParamValue('kernelSize', node, tensorMap, context);
            return [tfc.maxPool3d(utils_1.getParamValue('x', node, tensorMap, context), [kernelSize[1], kernelSize[2], kernelSize[3]], [stride[1], stride[2], stride[3]], pad)];
        }
        default:
            throw TypeError("Node type " + node.op + " is not implemented");
    }
};
exports.CATEGORY = 'convolution';
//# sourceMappingURL=convolution_executor.js.map