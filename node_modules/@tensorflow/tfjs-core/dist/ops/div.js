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
var binary_ops_1 = require("./binary_ops");
var operation_1 = require("./operation");
/**
 * Divides two `tf.Tensor`s element-wise, A / B. Supports broadcasting.
 *
 * We also expose `tf.divStrict` which has the same signature as this op and
 * asserts that `a` and `b` are the same shape (does not broadcast).
 *
 * ```js
 * const a = tf.tensor1d([1, 4, 9, 16]);
 * const b = tf.tensor1d([1, 2, 3, 4]);
 *
 * a.div(b).print();  // or tf.div(a, b)
 * ```
 *
 * ```js
 * // Broadcast div a with b.
 * const a = tf.tensor1d([2, 4, 6, 8]);
 * const b = tf.scalar(2);
 *
 * a.div(b).print();  // or tf.div(a, b)
 * ```
 *
 * @param a The first tensor as the numerator.
 * @param b The second tensor as the denominator. Must have the same dtype as
 * `a`.
 */
/** @doc {heading: 'Operations', subheading: 'Arithmetic'} */
function div_(a, b) {
    var _a;
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'div');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'div');
    _a = tensor_util_1.makeTypesMatch($a, $b), $a = _a[0], $b = _a[1];
    if ($a.dtype === 'int32' && $b.dtype === 'int32') {
        return binary_ops_1.floorDiv($a, $b);
    }
    var forward = function (backend, save) {
        var res = backend.realDivide($a, $b);
        save([$a, $b]);
        return res;
    };
    var inputs = { a: $a, b: $b };
    var attrs = {};
    return engine_1.ENGINE.runKernelFunc(forward, inputs, null /* gradient */, kernel_names_1.Div, attrs);
}
exports.div = operation_1.op({ div_: div_ });
//# sourceMappingURL=div.js.map