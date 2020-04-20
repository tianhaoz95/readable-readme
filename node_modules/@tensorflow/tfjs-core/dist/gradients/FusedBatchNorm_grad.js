"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var kernel_names_1 = require("../kernel_names");
var batchnorm_util_1 = require("../ops/batchnorm_util");
var broadcast_util_1 = require("../ops/broadcast_util");
var ops_1 = require("../ops/ops");
var reduction_ops_1 = require("../ops/reduction_ops");
var tensor_ops_1 = require("../ops/tensor_ops");
var tile_1 = require("../ops/tile");
var unary_ops_1 = require("../ops/unary_ops");
exports.fusedBatchNormGradConfig = {
    kernelName: kernel_names_1.FusedBatchNorm,
    inputsToSave: ['x', 'mean', 'variance', 'scale'],
    gradFunc: function (dy, saved, attrs) {
        var batchNormalizationAttrs = attrs;
        var varianceEpsilon = batchNormalizationAttrs.varianceEpsilon;
        var x = saved[0], mean = saved[1], variance = saved[2], scale = saved[3];
        var x4D = batchnorm_util_1.xAs4D(x);
        var scaleValue = scale == null ? tensor_ops_1.scalar(1) : scale;
        var reductionAxes = broadcast_util_1.getReductionAxes(mean.shape, x4D.shape);
        var tileShape = [];
        if (mean.rank === 1) {
            for (var i = 0; i < x4D.shape.length - 1; ++i) {
                tileShape.push(x4D.shape[i]);
            }
            tileShape.push(1);
        }
        var xMinusMean = ops_1.sub(x, mean);
        var dyTimesScaleValue = ops_1.mul(dy, scaleValue);
        var oneOverSqrtVariance = unary_ops_1.rsqrt(ops_1.add(variance, tensor_ops_1.scalar(varianceEpsilon)));
        var minusHalfRCube = ops_1.mul(ops_1.mul(ops_1.mul(oneOverSqrtVariance, oneOverSqrtVariance), oneOverSqrtVariance), tensor_ops_1.scalar(-0.5));
        var derX = function () {
            if (mean.rank === 1) {
                return ops_1.reshape(ops_1.mul(ops_1.mul(dy, tile_1.tile(oneOverSqrtVariance.as4D(1, 1, 1, mean.shape[0]), tileShape)), scaleValue), x.shape);
            }
            else {
                return ops_1.reshape(ops_1.mul(ops_1.mul(dy, oneOverSqrtVariance), scaleValue), x.shape);
            }
        };
        var derMean = function () {
            var meanDer = ops_1.mul(ops_1.mul(oneOverSqrtVariance, tensor_ops_1.scalar(-1)), dyTimesScaleValue);
            if (mean.rank === 1) {
                meanDer = reduction_ops_1.sum(meanDer, reductionAxes);
            }
            return ops_1.reshape(meanDer, mean.shape);
        };
        var derVariance = function () {
            var varianceDer = ops_1.mul(ops_1.mul(minusHalfRCube, xMinusMean), dyTimesScaleValue);
            if (mean.rank === 1) {
                varianceDer = reduction_ops_1.sum(varianceDer, reductionAxes);
            }
            return ops_1.reshape(varianceDer, mean.shape);
        };
        var derScale = function () {
            var xMinusMean2TimesRsqrt = ops_1.mul(xMinusMean, oneOverSqrtVariance);
            var scaleDer = ops_1.mul(dy, xMinusMean2TimesRsqrt);
            if (mean.rank === 1) {
                scaleDer = reduction_ops_1.sum(scaleDer, reductionAxes);
            }
            return ops_1.reshape(scaleDer, mean.shape);
        };
        var derOffset = function () {
            var offsetDer = dy;
            if (mean.rank === 1) {
                offsetDer = reduction_ops_1.sum(offsetDer, reductionAxes);
            }
            return ops_1.reshape(offsetDer, mean.shape);
        };
        return {
            x: derX,
            mean: derMean,
            variance: derVariance,
            scale: derScale,
            offset: derOffset
        };
    }
};
//# sourceMappingURL=FusedBatchNorm_grad.js.map