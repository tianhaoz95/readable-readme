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
 * Creates a `tf.Tensor` with values sampled from a uniform distribution.
 *
 * The generated values follow a uniform distribution in the range [minval,
 * maxval). The lower bound minval is included in the range, while the upper
 * bound maxval is excluded.
 *
 * ```js
 * tf.randomUniform([2, 2]).print();
 * ```
 *
 * @param shape An array of integers defining the output tensor shape.
 * @param minval The lower bound on the range of random values to generate.
 *   Defaults to 0.
 * @param maxval The upper bound on the range of random values to generate.
 *   Defaults to 1.
 * @param dtype The data type of the output tensor. Defaults to 'float32'.
 */
/** @doc {heading: 'Tensors', subheading: 'Random'} */
function randomUniform_(shape, minval, maxval, dtype, seed) {
    if (minval === void 0) { minval = 0; }
    if (maxval === void 0) { maxval = 1; }
    if (dtype === void 0) { dtype = 'float32'; }
    var res = array_ops_1.buffer(shape, dtype);
    var random = new rand_util_1.UniformRandom(minval, maxval, null, seed);
    for (var i = 0; i < res.values.length; i++) {
        res.values[i] = random.nextValue();
    }
    return res.toTensor();
}
exports.randomUniform = operation_1.op({ randomUniform_: randomUniform_ });
//# sourceMappingURL=random_uniform.js.map