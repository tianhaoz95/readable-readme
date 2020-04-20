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
 * Pads a `tf.Tensor` with a given value and paddings.
 *
 * This operation currently only implements the `CONSTANT` mode.
 *
 * Also available are stricter rank-specific methods with the same signature
 * as this method that assert that `paddings` is of given length.
 *   - `tf.pad1d`
 *   - `tf.pad2d`
 *   - `tf.pad3d`
 *   - `tf.pad4d`
 *
 * ```js
 * const x = tf.tensor1d([1, 2, 3, 4]);
 * x.pad([[1, 2]]).print();
 * ```
 * @param x The tensor to pad.
 * @param paddings An array of length `R` (the rank of the tensor), where
 * each element is a length-2 tuple of ints `[padBefore, padAfter]`,
 * specifying how much to pad along each dimension of the tensor.
 * @param constantValue The pad value to use. Defaults to 0.
 */
/** @doc {heading: 'Tensors', subheading: 'Transformations'} */
function pad_(x, paddings, constantValue) {
    if (constantValue === void 0) { constantValue = 0; }
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'pad');
    if ($x.rank === 0) {
        throw new Error('pad(scalar) is not defined. Pass non-scalar to pad');
    }
    var forward = function (backend, save) {
        save([$x]);
        return backend.pad($x, paddings, constantValue);
    };
    var attrs = { paddings: paddings, constantValue: constantValue };
    var inputs = { x: $x };
    return engine_1.ENGINE.runKernelFunc(forward, inputs, null /* grad */, kernel_names_1.PadV2, attrs);
}
exports.pad = operation_1.op({ pad_: pad_ });
//# sourceMappingURL=pad.js.map