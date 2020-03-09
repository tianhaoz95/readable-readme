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
var tensor_util_1 = require("../tensor_util");
var tensor_util_env_1 = require("../tensor_util_env");
var broadcast_util_1 = require("./broadcast_util");
var operation_1 = require("./operation");
var tensor_ops_1 = require("./tensor_ops");
/**
 * Returns (a - b) * (a - b) element-wise.
 * Supports broadcasting.
 *
 * We also expose `tf.squaredDifferenceStrict` which has the same signature as
 * this op and asserts that `a` and `b` are the same shape (does not
 * broadcast).
 *
 * ```js
 * const a = tf.tensor1d([1, 4, 3, 16]);
 * const b = tf.tensor1d([1, 2, 9, 4]);
 *
 * a.squaredDifference(b).print();  // or tf.squaredDifference(a, b)
 * ```
 *
 * ```js
 * // Broadcast squared difference  a with b.
 * const a = tf.tensor1d([2, 4, 6, 8]);
 * const b = tf.scalar(5);
 *
 * a.squaredDifference(b).print();  // or tf.squaredDifference(a, b)
 * ```
 *
 * @param a The first tensor.
 * @param b The second tensor. Must have the same type as `a`.
 */
/** @doc {heading: 'Operations', subheading: 'Arithmetic'} */
function squaredDifference_(a, b) {
    var _a;
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'squaredDifference');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'squaredDifference');
    _a = tensor_util_1.makeTypesMatch($a, $b), $a = _a[0], $b = _a[1];
    broadcast_util_1.assertAndGetBroadcastShape($a.shape, $b.shape);
    var der = function (dy, saved) {
        var $a = saved[0], $b = saved[1];
        var two = tensor_ops_1.scalar(2);
        var derA = function () { return dy.mul($a.sub($b).mul(two)); };
        var derB = function () { return dy.mul($b.sub($a).mul(two)); };
        return { a: derA, b: derB };
    };
    var forward = function (backend, save) {
        var res = backend.squaredDifference($a, $b);
        save([$a, $b]);
        return res;
    };
    var inputs = { a: $a, b: $b };
    var attrs = {};
    var inputsToSave = [$a, $b];
    var outputToSave = [];
    return engine_1.ENGINE.runKernelFunc(forward, inputs, der, kernel_names_1.SquaredDifference, attrs, inputsToSave, outputToSave);
}
exports.squaredDifference = operation_1.op({ squaredDifference_: squaredDifference_ });
//# sourceMappingURL=squared_difference.js.map