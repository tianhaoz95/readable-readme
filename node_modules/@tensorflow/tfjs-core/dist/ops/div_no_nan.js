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
var tensor_util_1 = require("../tensor_util");
var tensor_util_env_1 = require("../tensor_util_env");
var div_1 = require("./div");
var logical_ops_1 = require("./logical_ops");
var operation_1 = require("./operation");
var tensor_ops_1 = require("./tensor_ops");
/**
 * Divides two `tf.Tensor`s element-wise, A / B. Supports broadcasting. Return 0
 * if denominator is 0.
 *
 * We also expose `tf.divStrict` which has the same signature as this op and
 * asserts that `a` and `b` are the same shape (does not broadcast).
 *
 * ```js
 * const a = tf.tensor1d([1, 4, 9, 16]);
 * const b = tf.tensor1d([1, 2, 3, 4]);
 * const c = tf.tensor1d([0, 0, 0, 0]);
 *
 * a.divNoNan(b).print();  // or tf.divNoNan(a, b)
 * a.divNoNan(c).print();  // or tf.divNoNan(a, c)
 * ```
 *
 * ```js
 * // Broadcast div a with b.
 * const a = tf.tensor1d([2, 4, 6, 8]);
 * const b = tf.scalar(2);
 * const c = tf.scalar(0);
 *
 * a.divNoNan(b).print();  // or tf.divNoNan(a, b)
 * a.divNoNan(c).print();  // or tf.divNoNan(a, c)
 * ```
 *
 * @param a The first tensor as the numerator.
 * @param b The second tensor as the denominator. Must have the same dtype as
 * `a`.
 */
/** @doc {heading: 'Operations', subheading: 'Arithmetic'} */
function divNoNan_(a, b) {
    var _a;
    // TODO: Make this into its own kernel.
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'div');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'div');
    _a = tensor_util_1.makeTypesMatch($a, $b), $a = _a[0], $b = _a[1];
    var divResult = div_1.div($a, $b);
    var zeros = tensor_ops_1.zerosLike(divResult);
    var bEqualsZero = $b.equal(zeros);
    return logical_ops_1.where(bEqualsZero, zeros, divResult);
}
exports.divNoNan = operation_1.op({ divNoNan_: divNoNan_ });
//# sourceMappingURL=div_no_nan.js.map