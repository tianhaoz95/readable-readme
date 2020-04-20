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
var array_ops_1 = require("./array_ops");
var operation_1 = require("./operation");
var rand_util_1 = require("./rand_util");
/**
 * Creates a `tf.Tensor` with values sampled from a truncated normal
 * distribution.
 *
 * ```js
 * tf.truncatedNormal([2, 2]).print();
 * ```
 *
 * The generated values follow a normal distribution with specified mean and
 * standard deviation, except that values whose magnitude is more than 2
 * standard deviations from the mean are dropped and re-picked.
 *
 * @param shape An array of integers defining the output tensor shape.
 * @param mean The mean of the normal distribution.
 * @param stdDev The standard deviation of the normal distribution.
 * @param dtype The data type of the output tensor.
 * @param seed The seed for the random number generator.
 */
/** @doc {heading: 'Tensors', subheading: 'Creation'} */
function truncatedNormal_(shape, mean, stdDev, dtype, seed) {
    if (mean === void 0) { mean = 0; }
    if (stdDev === void 0) { stdDev = 1; }
    if (dtype != null && dtype === 'bool') {
        throw new Error("Unsupported data type $ { dtype }");
    }
    var randGauss = new rand_util_1.MPRandGauss(mean, stdDev, dtype, true /* truncated */, seed);
    var res = array_ops_1.buffer(shape, dtype);
    for (var i = 0; i < res.values.length; i++) {
        res.values[i] = randGauss.nextValue();
    }
    return res.toTensor();
}
exports.truncatedNormal = operation_1.op({ truncatedNormal_: truncatedNormal_ });
//# sourceMappingURL=truncated_normal.js.map