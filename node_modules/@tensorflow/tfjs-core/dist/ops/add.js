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
var kernel_names_1 = require("../kernel_names");
var tensor_util_1 = require("../tensor_util");
var tensor_util_env_1 = require("../tensor_util_env");
var operation_1 = require("./operation");
/**
 * Adds two `tf.Tensor`s element-wise, A + B. Supports broadcasting.
 *
 * We also expose `tf.addStrict` which has the same signature as this op and
 * asserts that `a` and `b` are the same shape (does not broadcast).
 *
 * ```js
 * const a = tf.tensor1d([1, 2, 3, 4]);
 * const b = tf.tensor1d([10, 20, 30, 40]);
 *
 * a.add(b).print();  // or tf.add(a, b)
 * ```
 *
 * ```js
 * // Broadcast add a with b.
 * const a = tf.scalar(5);
 * const b = tf.tensor1d([10, 20, 30, 40]);
 *
 * a.add(b).print();  // or tf.add(a, b)
 * ```
 * @param a The first `tf.Tensor` to add.
 * @param b The second `tf.Tensor` to add. Must have the same type as `a`.
 */
/** @doc {heading: 'Operations', subheading: 'Arithmetic'} */
function add_(a, b) {
    var _a;
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'add');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'add');
    _a = tensor_util_1.makeTypesMatch($a, $b), $a = _a[0], $b = _a[1];
    var forward = function (backend, save) {
        var res = backend.add($a, $b);
        save([$a, $b]);
        return res;
    };
    var inputs = { a: $a, b: $b };
    return engine_1.ENGINE.runKernelFunc(forward, inputs, null /* gradient */, kernel_names_1.Add);
}
exports.add = operation_1.op({ add_: add_ });
//# sourceMappingURL=add.js.map