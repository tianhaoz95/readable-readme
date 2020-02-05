"use strict";
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 * =============================================================================
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Normalization layers.
 */
var tfc = require("@tensorflow/tfjs-core");
var tfjs_core_1 = require("@tensorflow/tfjs-core");
var constraints_1 = require("../constraints");
var topology_1 = require("../engine/topology");
var errors_1 = require("../errors");
var initializers_1 = require("../initializers");
var regularizers_1 = require("../regularizers");
var generic_utils = require("../utils/generic_utils");
var math_utils = require("../utils/math_utils");
var types_utils_1 = require("../utils/types_utils");
/**
 * Applies batch normalization on x given mean, var, beta and gamma.
 *
 * I.e. returns:
 *   `output = (x - mean) / (sqrt(var) + epsilon) * gamma + beta`
 *
 * @param x Input tensor.
 * @param mean Mean of batch.
 * @param variance Variance of batch.
 * @param beta Tensor with which to center the input.
 * @param gamma Tensor by which to scale the input.
 * @param epsilon Fuzz factor.
 * @returns The result of the batch normalization.
 */
function batchNormalization(x, mean, variance, beta, gamma, epsilon) {
    if (epsilon === void 0) { epsilon = 1e-3; }
    var out;
    if (x.rank === 2) {
        out = tfc.batchNorm2d(x, mean, variance, beta, gamma, epsilon);
    }
    else if (x.rank === 3) {
        // TODO(cais): Check rank; give proper error message.
        out = tfc.batchNorm3d(x, mean, variance, beta, gamma, epsilon);
    }
    else if (x.rank === 4) {
        out = tfc.batchNorm4d(x, mean, variance, beta, gamma, epsilon);
    }
    else {
        throw new errors_1.NotImplementedError("batchNormalization is not implemented for array of rank " + x.rank + " " +
            "yet");
    }
    return out;
}
exports.batchNormalization = batchNormalization;
/**
 * Non-broadcasting batch normalization for use in training (not inference).
 *
 * The input is normalized to zero mean and unit variance along the
 * `reductionAxes`, followed by scaling with `gamma` and shifted by `beta`.
 * The result of that is returned as the first element
 * of the returned `Array`. The other two elements are the mean and variance,
 * respectively.
 *
 * @param x Input tensor to be normalized.
 * @param gamma Tensor by which to scale the input.
 * @param beta Tensor by which to center the input.
 * @param reductionAxes Axes over which to normalize.
 * @param epsilon Fuzz factor.
 * @returns An `Array` of three `Tensors`:
 *   [normalized tensor, mean of input, variance of input].
 */
function regularNormalizeBatchInTraining(x, gamma, beta, reductionAxes, epsilon) {
    if (epsilon === void 0) { epsilon = 1e-3; }
    return tfjs_core_1.tidy(function () {
        var meanAndVariance = tfc.moments(x, reductionAxes);
        var mean = meanAndVariance.mean;
        var variance = meanAndVariance.variance;
        var normed = batchNormalization(x, mean, variance, beta, gamma, epsilon);
        return [normed, mean, variance];
    });
}
/**
 * Broadcasting batch normalization for use in training (not inference).
 *
 * The input is normalized to zero mean and unit variance along the
 * `reductionAxes`, followed by scaling with `gamma` and shifted by `beta`.
 * The result of that is returned as the first element
 * of the returned `Array`. The other two elements are the mean and variance,
 * respectively.
 *
 * @param x Input tensor to be normalized.
 * @param gamma Tensor by which to scale the input.
 * @param beta Tensor by which to center the input.
 * @param reductionAxes Axes over which to normalize.
 * @param epsilon Fuzz factor.
 * @returns An `Array` of three `Tensors`:
 *   [normalized tensor, mean of input, variance of input].
 */
function broadcastNormalizeBatchInTraining(x, gamma, beta, reductionAxes, epsilon) {
    if (epsilon === void 0) { epsilon = 1e-3; }
    return tfjs_core_1.tidy(function () {
        var meanAndVariance = tfc.moments(x, reductionAxes);
        var mean = meanAndVariance.mean;
        var variance = meanAndVariance.variance;
        var targetShape = [];
        for (var _i = 0, _a = math_utils.range(0, x.rank); _i < _a.length; _i++) {
            var axis = _a[_i];
            if (reductionAxes.indexOf(axis) !== -1) {
                targetShape.push(1);
            }
            else {
                targetShape.push(x.shape[axis]);
            }
        }
        var broadcastMean = mean.reshape(targetShape);
        var broadcastVariance = variance.reshape(targetShape);
        var broadcastGamma = gamma == null ? null : gamma.reshape(targetShape);
        var broadcastBeta = beta == null ? null : beta.reshape(targetShape);
        var normed = batchNormalization(x, broadcastMean, broadcastVariance, broadcastBeta, broadcastGamma, epsilon);
        return [normed, mean, variance];
    });
}
/**
 * Batch normalization for use in training (not inference).
 *
 * @param x Input tensor to be normalized.
 * @param gamma Tensor by which to scale the input.
 * @param beta Tensor by which to center the input.
 * @param reductionAxes Axes over which to normalize.
 * @param epsilon Fuzz factor.
 * @returns An `Array` of three `Tensors`:
 *   [normalized tensor, mean of input, variance of input].
 */
function normalizeBatchInTraining(x, gamma, beta, reductionAxes, epsilon) {
    if (epsilon === void 0) { epsilon = 1e-3; }
    if (tfjs_core_1.util.arraysEqual(reductionAxes.slice().sort(), math_utils.range(0, x.rank - 1))) {
        return regularNormalizeBatchInTraining(x, gamma, beta, reductionAxes, epsilon);
    }
    else {
        return broadcastNormalizeBatchInTraining(x, gamma, beta, reductionAxes, epsilon);
    }
}
exports.normalizeBatchInTraining = normalizeBatchInTraining;
var BatchNormalization = /** @class */ (function (_super) {
    __extends(BatchNormalization, _super);
    function BatchNormalization(args) {
        var _this = this;
        if (args == null) {
            args = {};
        }
        _this = _super.call(this, args) || this;
        _this.supportsMasking = true;
        _this.axis = args.axis == null ? -1 : args.axis;
        _this.momentum = args.momentum == null ? 0.99 : args.momentum;
        _this.epsilon = args.epsilon == null ? 1e-3 : args.epsilon;
        _this.center = args.center == null ? true : args.center;
        _this.scale = args.scale == null ? true : args.scale;
        _this.betaInitializer = initializers_1.getInitializer(args.betaInitializer || 'zeros');
        _this.gammaInitializer = initializers_1.getInitializer(args.gammaInitializer || 'ones');
        _this.movingMeanInitializer =
            initializers_1.getInitializer(args.movingMeanInitializer || 'zeros');
        _this.movingVarianceInitializer =
            initializers_1.getInitializer(args.movingVarianceInitializer || 'ones');
        _this.betaConstraint = constraints_1.getConstraint(args.betaConstraint);
        _this.gammaConstraint = constraints_1.getConstraint(args.gammaConstraint);
        _this.betaRegularizer = regularizers_1.getRegularizer(args.betaRegularizer);
        _this.gammaRegularizer = regularizers_1.getRegularizer(args.gammaRegularizer);
        return _this;
    }
    BatchNormalization.prototype.build = function (inputShape) {
        var _a;
        inputShape = types_utils_1.getExactlyOneShape(inputShape);
        var axis = this.axis >= 0 ? this.axis : (this.axis + inputShape.length);
        var dim = inputShape[axis];
        if (dim == null) {
            throw new errors_1.ValueError("Axis " + axis + " of input tensor should have a defined dimension but " +
                "the layer received an input with shape " +
                (JSON.stringify(inputShape) + "."));
        }
        this.inputSpec =
            [new topology_1.InputSpec({ ndim: inputShape.length, axes: (_a = {}, _a[axis] = dim, _a) })];
        var shape = [dim];
        if (this.scale) {
            this.gamma = this.addWeight('gamma', shape, null, this.gammaInitializer, this.gammaRegularizer, true, this.gammaConstraint);
        }
        if (this.center) {
            this.beta = this.addWeight('beta', shape, null, this.betaInitializer, this.betaRegularizer, true, this.betaConstraint);
        }
        this.movingMean = this.addWeight('moving_mean', shape, null, this.movingMeanInitializer, null, false);
        this.movingVariance = this.addWeight('moving_variance', shape, null, this.movingVarianceInitializer, null, false);
        this.built = true;
    };
    BatchNormalization.prototype.call = function (inputs, kwargs) {
        var _this = this;
        return tfjs_core_1.tidy(function () {
            var training = kwargs['training'] == null ? false : kwargs['training'];
            var input = types_utils_1.getExactlyOneTensor(inputs);
            var inputShape = input.shape;
            var ndim = inputShape.length;
            var reductionAxes = math_utils.range(0, ndim);
            var axis = _this.axis >= 0 ? _this.axis : (_this.axis + ndim);
            reductionAxes.splice(axis, 1);
            var broadcastShape = generic_utils.pyListRepeat(1, ndim);
            broadcastShape[axis] = inputShape[axis];
            var sortedReductionAxes = reductionAxes.slice();
            sortedReductionAxes.sort();
            var needsBroadcasting = !tfjs_core_1.util.arraysEqual(sortedReductionAxes, math_utils.range(0, ndim).slice(0, ndim - 1));
            var normalizeInference = function () {
                if (needsBroadcasting) {
                    var broadcastMovingMean = _this.movingMean.read().reshape(broadcastShape);
                    var broadcastMovingVariance = _this.movingVariance.read().reshape(broadcastShape);
                    var broadcastBeta = _this.center ? _this.beta.read().reshape(broadcastShape) : null;
                    var broadcastGamma = _this.scale ? _this.gamma.read().reshape(broadcastShape) : null;
                    return batchNormalization(input, broadcastMovingMean, broadcastMovingVariance, broadcastBeta, broadcastGamma, _this.epsilon);
                }
                else {
                    return batchNormalization(input, _this.movingMean.read(), _this.movingVariance.read(), _this.beta == null ? null : _this.beta.read(), _this.gamma == null ? null : _this.gamma.read(), _this.epsilon);
                }
            };
            if (!training) {
                return normalizeInference();
            }
            var _a = normalizeBatchInTraining(input, _this.gamma.read(), _this.beta.read(), reductionAxes, _this.epsilon), normedTraining = _a[0], mean = _a[1], variance = _a[2];
            var doMovingAverage = function (variable, value, momentum) {
                tfc.tidy(function () {
                    var decay = 1 - momentum;
                    var origValue = variable.read();
                    var updateDelta = origValue.sub(value).mul(decay);
                    variable.write(origValue.sub(updateDelta));
                });
            };
            // Perform updates to moving mean and moving variance for training.
            // Porting Note: In PyKeras, these updates to `movingMean` and
            //   `movingAverage` are done as a deferred Graph, added to the `Layer`'s
            //   `update`s using the `add_update()` method. Here we do it imperatively
            //   and encapsulate the updates in a function that is invoked
            //   immediately.
            var updateMovingMeanAndVariance = function () {
                doMovingAverage(_this.movingMean, mean, _this.momentum);
                doMovingAverage(_this.movingVariance, variance, _this.momentum);
            };
            updateMovingMeanAndVariance();
            return normedTraining;
        });
    };
    BatchNormalization.prototype.getConfig = function () {
        var config = {
            axis: this.axis,
            momentum: this.momentum,
            epsilon: this.epsilon,
            center: this.center,
            scale: this.scale,
            betaInitializer: initializers_1.serializeInitializer(this.betaInitializer),
            gammaInitializer: initializers_1.serializeInitializer(this.gammaInitializer),
            movingMeanInitializer: initializers_1.serializeInitializer(this.movingMeanInitializer),
            movingVarianceInitializer: initializers_1.serializeInitializer(this.movingVarianceInitializer),
            betaRegularizer: regularizers_1.serializeRegularizer(this.betaRegularizer),
            gammaRegularizer: regularizers_1.serializeRegularizer(this.gammaRegularizer),
            betaConstraint: constraints_1.serializeConstraint(this.betaConstraint),
            gammaConstraint: constraints_1.serializeConstraint(this.gammaConstraint)
        };
        var baseConfig = _super.prototype.getConfig.call(this);
        Object.assign(config, baseConfig);
        return config;
    };
    /** @nocollapse */
    BatchNormalization.className = 'BatchNormalization';
    return BatchNormalization;
}(topology_1.Layer));
exports.BatchNormalization = BatchNormalization;
tfjs_core_1.serialization.registerClass(BatchNormalization);
var LayerNormalization = /** @class */ (function (_super) {
    __extends(LayerNormalization, _super);
    function LayerNormalization(args) {
        var _this = this;
        if (args == null) {
            args = {};
        }
        _this = _super.call(this, args) || this;
        _this.axis = args.axis == null ? -1 : args.axis;
        if (typeof _this.axis === 'number') {
            if (!Number.isInteger(_this.axis)) {
                throw new Error("Expected axis to be an integer, but received " + _this.axis);
            }
        }
        else if (Array.isArray(_this.axis)) {
            for (var _i = 0, _a = _this.axis; _i < _a.length; _i++) {
                var axis = _a[_i];
                if (!Number.isInteger(axis)) {
                    throw new Error("Expected axis to be an array of integers, " +
                        ("but received " + JSON.stringify(_this.axis)));
                }
            }
        }
        else {
            throw new Error("Expected axis to be an integer or an array of integers, " +
                ("but received " + JSON.stringify(_this.axis)));
        }
        _this.epsilon = args.epsilon == null ? 1e-3 : args.epsilon;
        _this.center = args.center == null ? true : args.center;
        _this.scale = args.scale == null ? true : args.scale;
        _this.betaInitializer = initializers_1.getInitializer(args.betaInitializer || 'zeros');
        _this.gammaInitializer = initializers_1.getInitializer(args.gammaInitializer || 'ones');
        _this.betaRegularizer = regularizers_1.getRegularizer(args.betaRegularizer);
        _this.gammaRegularizer = regularizers_1.getRegularizer(args.gammaRegularizer);
        _this.supportsMasking = true;
        return _this;
    }
    LayerNormalization.prototype.build = function (inputShape) {
        inputShape = types_utils_1.getExactlyOneShape(inputShape);
        var nDims = inputShape.length;
        // Convert axis to array and resolve negatives.
        if (typeof this.axis === 'number') {
            this.axis = [this.axis];
        }
        for (var i = 0; i < this.axis.length; ++i) {
            if (this.axis[i] < 0) {
                this.axis[i] += nDims;
            }
        }
        // Further validate axes.
        for (var _i = 0, _a = this.axis; _i < _a.length; _i++) {
            var axis = _a[_i];
            if (axis < 0 || axis >= nDims) {
                throw new Error("Invalid axis: " + axis);
            }
        }
        if (this.axis.length !== generic_utils.unique(this.axis).length) {
            throw new Error("Found duplicate axes in: " + this.axis);
        }
        var paramShape = this.axis.map(function (axis) { return inputShape[axis]; });
        var trainable = true;
        if (this.scale) {
            this.gamma = this.addWeight('gamma', paramShape, 'float32', this.gammaInitializer, this.gammaRegularizer, trainable);
        }
        else {
            this.gamma = null;
        }
        if (this.center) {
            this.beta = this.addWeight('beta', paramShape, 'float32', this.betaInitializer, this.betaRegularizer, trainable);
        }
        else {
            this.beta = null;
        }
        this.built = true;
    };
    LayerNormalization.prototype.call = function (inputs, kwargs) {
        var _this = this;
        var input = types_utils_1.getExactlyOneTensor(inputs);
        var inputShape = input.shape;
        var nDims = inputShape.length;
        return tfjs_core_1.tidy(function () {
            var keepDims = true;
            var _a = tfjs_core_1.moments(input, _this.axis, keepDims), mean = _a.mean, variance = _a.variance;
            var broadcastShape = generic_utils.pyListRepeat(1, nDims);
            for (var _i = 0, _b = _this.axis; _i < _b.length; _i++) {
                var dim = _b[_i];
                broadcastShape[dim] = inputShape[dim];
            }
            var broadcast = function (v) {
                if (v != null && v.shape.length !== nDims &&
                    _this.axis !== [nDims - 1]) {
                    return v.reshape(broadcastShape);
                }
                else {
                    return v;
                }
            };
            var scale = broadcast(_this.gamma.read());
            var offset = broadcast(_this.beta.read());
            // TODO(https://github.com/tensorflow/tfjs/issues/2120): The tiling below
            // is a workaround for the limitation of core's batchNormalization?d don't
            // support broadcasting in their gradients. In addition, the tiling is
            // necessary to ensure correctness on the browser CPU backend regardless
            // of forward or backward computation. Remove this workaround once the
            // limitation is addressed. See .
            var momentsTiling = [];
            var scaleOffsetTiling = [];
            for (var i = 0; i < nDims; ++i) {
                if (_this.axis.indexOf(i) !== -1) {
                    momentsTiling.push(inputShape[i]);
                    scaleOffsetTiling.push(1);
                }
                else {
                    momentsTiling.push(1);
                    scaleOffsetTiling.push(inputShape[i]);
                }
            }
            mean = mean.tile(momentsTiling);
            variance = variance.tile(momentsTiling);
            scale = scale.tile(scaleOffsetTiling);
            offset = offset.tile(scaleOffsetTiling);
            return batchNormalization(input, mean, variance, offset, scale, _this.epsilon);
        });
    };
    LayerNormalization.prototype.getConfig = function () {
        var config = {
            axis: this.axis,
            epsilon: this.epsilon,
            center: this.center,
            scale: this.scale,
            betaInitializer: initializers_1.serializeInitializer(this.betaInitializer),
            gammaInitializer: initializers_1.serializeInitializer(this.gammaInitializer),
            betaRegularizer: regularizers_1.serializeRegularizer(this.betaRegularizer),
            gammaRegularizer: regularizers_1.serializeRegularizer(this.gammaRegularizer)
        };
        var baseConfig = _super.prototype.getConfig.call(this);
        Object.assign(config, baseConfig);
        return config;
    };
    /** @nocollapse */
    LayerNormalization.className = 'LayerNormalization';
    return LayerNormalization;
}(topology_1.Layer));
exports.LayerNormalization = LayerNormalization;
tfjs_core_1.serialization.registerClass(LayerNormalization);
//# sourceMappingURL=normalization.js.map