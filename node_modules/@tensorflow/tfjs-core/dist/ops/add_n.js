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
var engine_1 = require("../engine");
var tensor_util_env_1 = require("../tensor_util_env");
var util = require("../util");
var operation_1 = require("./operation");
/**
 * Adds a list of `tf.Tensor`s element-wise, each with the same shape and dtype.
 *
 * ```js
 * const a = tf.tensor1d([1, 2]);
 * const b = tf.tensor1d([3, 4]);
 * const c = tf.tensor1d([5, 6]);
 *
 * tf.addN([a, b, c]).print();
 * ```
 * @param tensors A list of tensors with the same shape and dtype.
 */
/** @doc {heading: 'Operations', subheading: 'Arithmetic'} */
function addN_(tensors) {
    util.assert(Array.isArray(tensors), function () { return 'The argument passed to tf.addN() must be a list of tensors'; });
    util.assert(tensors.length >= 1, function () { return "Must pass at least one tensor to tf.addN(), but got " +
        ("" + tensors.length); });
    var $tensors = tensors.map(function (t, i) { return tensor_util_env_1.convertToTensor(t, "tensors" + i, 'addN'); });
    var firstTensor = $tensors[0];
    $tensors.forEach(function (t) {
        if (t.dtype !== firstTensor.dtype) {
            throw new Error('All tensors passed to tf.addN() must have the same dtype');
        }
    });
    $tensors.forEach(function (t) {
        if (!util.arraysEqual(t.shape, firstTensor.shape)) {
            throw new Error('All tensors passed to tf.addN() must have the same shape');
        }
    });
    var forward = function (backend, save) {
        return backend.addN($tensors);
    };
    var inputs = $tensors;
    return engine_1.ENGINE.runKernelFunc(forward, inputs, null /* grad */, 'AddN');
}
exports.addN = operation_1.op({ addN_: addN_ });
//# sourceMappingURL=add_n.js.map