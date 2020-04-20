"use strict";
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
var ops = require("../../ops/ops");
var ops_1 = require("../../ops/ops");
function pool(xValues, xShape, dtype, strides, convInfo, poolType) {
    var strideHeight = convInfo.strideHeight;
    var strideWidth = convInfo.strideWidth;
    var dilationHeight = convInfo.dilationHeight;
    var dilationWidth = convInfo.dilationWidth;
    var effectiveFilterHeight = convInfo.effectiveFilterHeight;
    var effectiveFilterWidth = convInfo.effectiveFilterWidth;
    var padTop = convInfo.padInfo.top;
    var padLeft = convInfo.padInfo.left;
    var initialValue = (poolType === 'max' ? Number.NEGATIVE_INFINITY :
        Number.POSITIVE_INFINITY);
    var output = ops.buffer(convInfo.outShape, dtype);
    var outputVals = output.values;
    var outputBatchStrides = convInfo.outShape[1] * convInfo.outShape[2] * convInfo.outShape[3];
    var outputRowStrides = convInfo.outShape[2] * convInfo.outShape[3];
    var outputColStrides = convInfo.outShape[3];
    for (var b = 0; b < convInfo.batchSize; ++b) {
        var outputBatchOffset = b * outputBatchStrides;
        var inputBatchOffset = b * strides[0];
        for (var d = 0; d < convInfo.inChannels; ++d) {
            for (var yR = 0; yR < convInfo.outHeight; ++yR) {
                var xRCorner = yR * strideHeight - padTop;
                var xRMin = Math.max(0, xRCorner);
                var xRMax = Math.min(convInfo.inHeight, effectiveFilterHeight + xRCorner);
                var outputRowOffset = outputBatchOffset + yR * outputRowStrides;
                for (var yC = 0; yC < convInfo.outWidth; ++yC) {
                    var xCCorner = yC * strideWidth - padLeft;
                    var xCMin = Math.max(0, xCCorner);
                    var xCMax = Math.min(convInfo.inWidth, effectiveFilterWidth + xCCorner);
                    var minMaxValue = initialValue;
                    var avgValue = 0;
                    var count = 0;
                    for (var xR = xRMin; xR < xRMax; xR += dilationHeight) {
                        var xROffset = inputBatchOffset + xR * strides[1];
                        for (var xC = xCMin; xC < xCMax; xC += dilationWidth) {
                            var xCOffset = xROffset + xC * strides[2];
                            var pixel = xValues[xCOffset + d];
                            if ((poolType === 'max' && pixel > minMaxValue)) {
                                minMaxValue = pixel;
                            }
                            else if (poolType === 'avg') {
                                avgValue += pixel;
                                count++;
                            }
                        }
                        if (isNaN(minMaxValue)) {
                            break;
                        }
                    }
                    var outputOffset = outputRowOffset + yC * outputColStrides + d;
                    outputVals[outputOffset] =
                        poolType === 'avg' ? avgValue / count : minMaxValue;
                }
            }
        }
    }
    return output;
}
exports.pool = pool;
function maxPoolPositions(xValues, xShape, dtype, convInfo, flattenPositions, includeBatchInIndex) {
    if (flattenPositions === void 0) { flattenPositions = false; }
    if (includeBatchInIndex === void 0) { includeBatchInIndex = false; }
    var maxPositions = ops.buffer(convInfo.outShape, 'int32');
    var strideHeight = convInfo.strideHeight;
    var strideWidth = convInfo.strideWidth;
    var dilationHeight = convInfo.dilationHeight;
    var dilationWidth = convInfo.dilationWidth;
    var effectiveFilterHeight = convInfo.effectiveFilterHeight;
    var effectiveFilterWidth = convInfo.effectiveFilterWidth;
    var padTop = convInfo.padInfo.top;
    var padLeft = convInfo.padInfo.left;
    var xBuf = ops_1.buffer(xShape, dtype, xValues);
    for (var b = 0; b < convInfo.batchSize; ++b) {
        for (var d = 0; d < convInfo.inChannels; ++d) {
            for (var yR = 0; yR < convInfo.outHeight; ++yR) {
                var xRCorner = yR * strideHeight - padTop;
                var xRMin = xRCorner;
                while (xRMin < 0) {
                    xRMin += dilationHeight;
                }
                // const xRMin = Math.max(0, xRCorner);
                var xRMax = Math.min(convInfo.inHeight, effectiveFilterHeight + xRCorner);
                for (var yC = 0; yC < convInfo.outWidth; ++yC) {
                    var xCCorner = yC * strideWidth - padLeft;
                    var xCMin = xCCorner;
                    while (xCMin < 0) {
                        xCMin += dilationWidth;
                    }
                    var xCMax = Math.min(convInfo.inWidth, effectiveFilterWidth + xCCorner);
                    var maxValue = Number.NEGATIVE_INFINITY;
                    var maxPosition = -1;
                    for (var xR = xRMin; xR < xRMax; xR += dilationHeight) {
                        var wR = xR - xRCorner;
                        for (var xC = xCMin; xC < xCMax; xC += dilationWidth) {
                            var wC = xC - xCCorner;
                            var pixel = xBuf.get(b, xR, xC, d);
                            if (pixel > maxValue) {
                                maxValue = pixel;
                                if (flattenPositions) {
                                    maxPosition = includeBatchInIndex ?
                                        ((b * convInfo.inHeight + xR) * convInfo.inWidth + xC) *
                                            convInfo.inChannels +
                                            d :
                                        (xR * convInfo.inWidth + xC) * convInfo.inChannels + d;
                                }
                                else {
                                    maxPosition = wR * effectiveFilterWidth + wC;
                                }
                            }
                        }
                    }
                    maxPositions.set(maxPosition, b, yR, yC, d);
                }
            }
        }
    }
    return maxPositions;
}
exports.maxPoolPositions = maxPoolPositions;
//# sourceMappingURL=pool_utils.js.map