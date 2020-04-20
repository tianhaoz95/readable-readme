"use strict";
/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
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
var tensor_1 = require("../tensor");
var tensor_util_env_1 = require("../tensor_util_env");
var util = require("../util");
var dropout_util_1 = require("./dropout_util");
var operation_1 = require("./operation");
var random_uniform_1 = require("./random_uniform");
/**
 * Computes dropout.
 *
 * ```js
 * const x = tf.tensor1d([1, 2, 2, 1]);
 * const rate = 0.75;
 * const output = tf.dropout(x, rate);
 * output.print();
 * ```
 *
 * @param x A floating point Tensor or TensorLike.
 * @param rate A float in the range [0, 1). The probability that each element
 *   of x is discarded.
 * @param noiseShape An array of numbers of type int32, representing the
 * shape for randomly generated keep/drop flags. If the noiseShape has null
 * value, it will be automatically replaced with the x's relative dimension
 * size. Optional.
 * @param seed Used to create random seeds. Optional.
 * @returns A Tensor of the same shape of x.
 */
/** @doc {heading: 'Operations', subheading: 'Dropout'} */
function dropout_(x, rate, noiseShape, seed) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'dropout');
    util.assert($x.dtype === 'float32', function () { return "x has to be a floating point tensor since it's going to be " +
        ("scaled, but got a " + $x.dtype + " tensor instead."); });
    util.assert(rate >= 0 && rate < 1, function () { return "rate must be a float in the range [0, 1), but got " + rate + "."; });
    if (rate === 0) {
        return x instanceof tensor_1.Tensor ? $x.clone() : $x;
    }
    var $noiseShape = dropout_util_1.getNoiseShape($x, noiseShape);
    var keepProb = 1 - rate;
    var multiplier = random_uniform_1.randomUniform($noiseShape, 0, 1, 'float32', seed)
        .add(keepProb)
        .floor()
        .div(keepProb);
    return $x.mul(multiplier);
}
exports.dropout = operation_1.op({ dropout_: dropout_ });
//# sourceMappingURL=dropout.js.map