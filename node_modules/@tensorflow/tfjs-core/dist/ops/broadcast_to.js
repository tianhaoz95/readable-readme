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
var kernel_names_1 = require("../kernel_names");
var tensor_util_env_1 = require("../tensor_util_env");
var operation_1 = require("./operation");
/**
 * Broadcast an array to a compatible shape NumPy-style.
 *
 * The tensor's shape is compared to the broadcast shape from end to beginning.
 * Ones are prepended to the tensor's shape until is has the same length as
 * the broadcast shape. If input.shape[i]==shape[i], the (i+1)-th axis is
 * already broadcast-compatible. If input.shape[i]==1 and shape[i]==N, then
 * the input tensor is tiled N times along that axis (using tf.tile).
 *
 * @param input The tensor that is to be broadcasted.
 * @param shape The input is to be broadcast to this shape.
 */
/** @doc {heading: 'Tensors', subheading: 'Transformations'} */
function broadcastTo_(x, shape) {
    var input = tensor_util_env_1.convertToTensor(x, 'broadcastTo', 'x');
    var xShape = input.shape;
    if (shape.some(function (d) { return !(d > 0) || d % 1 !== 0; })) {
        throw new Error("broadcastTo(): Invalid broadcast shape [" + shape + "].");
    }
    if (shape.length < input.rank) {
        throw new Error("broadcastTo(): shape.length=" + shape.length + " < input.rank=" + input.rank + ".");
    }
    if (shape.length > input.rank) {
        var newShape = input.shape.slice();
        while (newShape.length < shape.length) {
            newShape.unshift(1);
        }
        input = input.reshape(newShape);
    }
    var inputShape = input.shape;
    var reps = Array.from(shape);
    for (var i = shape.length - 1; i >= 0; i--) {
        if (inputShape[i] === shape[i]) {
            reps[i] = 1;
        }
        else if (input.shape[i] !== 1) {
            throw new Error("broadcastTo(): [" + xShape + "] cannot be broadcast to [" + shape + "].");
        }
    }
    var axes = reps.map(function (n, i) { return n > 1 ? i : -1; }).filter(function (i) { return i >= 0; });
    if (axes.length === 0) {
        return input.clone();
    }
    var forward = function (backend) { return backend.tile(input, reps); };
    var keepDims = true;
    var backward = function (dy) { return ({ x: function () { return dy.sum(axes, keepDims); } }); };
    var inputs = { x: input };
    var attrs = { shape: shape, inputShape: inputShape };
    return engine_1.ENGINE.runKernelFunc(forward, inputs, backward, kernel_names_1.BroadcastTo, attrs);
}
exports.broadcastTo = operation_1.op({ broadcastTo_: broadcastTo_ });
//# sourceMappingURL=broadcast_to.js.map