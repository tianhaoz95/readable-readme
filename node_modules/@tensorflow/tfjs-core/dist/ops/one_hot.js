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
 * Creates a one-hot `tf.Tensor`. The locations represented by `indices` take
 * value `onValue` (defaults to 1), while all other locations take value
 * `offValue` (defaults to 0). If `indices` is rank `R`, the output has rank
 * `R+1` with the last axis of size `depth`.
 *
 * ```js
 * tf.oneHot(tf.tensor1d([0, 1], 'int32'), 3).print();
 * ```
 *
 * @param indices `tf.Tensor` of indices with dtype `int32`.
 * @param depth The depth of the one hot dimension.
 * @param onValue A number used to fill in the output when the index matches
 * the location.
 * @param offValue A number used to fill in the output when the index does
 *     not match the location.
 */
/** @doc {heading: 'Tensors', subheading: 'Creation'} */
function oneHot_(indices, depth, onValue, offValue) {
    if (onValue === void 0) { onValue = 1; }
    if (offValue === void 0) { offValue = 0; }
    if (depth < 2) {
        throw new Error("Error in oneHot: depth must be >=2, but it is " + depth);
    }
    var $indices = tensor_util_env_1.convertToTensor(indices, 'indices', 'oneHot', 'int32');
    var outShape = $indices.shape.concat([depth]);
    $indices = $indices.flatten();
    var forward = function (backend, save) {
        save([$indices]);
        return backend.oneHot($indices, depth, onValue, offValue);
    };
    var inputs = { indices: $indices };
    var attrs = { depth: depth, onValue: onValue, offValue: offValue };
    var result = engine_1.ENGINE.runKernelFunc(forward, inputs, null /* grad */, kernel_names_1.OneHot, attrs);
    return result.reshape(outShape);
}
exports.oneHot = operation_1.op({ oneHot_: oneHot_ });
//# sourceMappingURL=one_hot.js.map