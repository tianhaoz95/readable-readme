"use strict";
/**
 * @license
 * Copyright 2019 Google Inc. All Rights Reserved.
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
var tensor_util_env_1 = require("../tensor_util_env");
var operation_1 = require("./operation");
/**
 * Computes square of `x` element-wise: `x ^ 2`
 *
 * ```js
 * const x = tf.tensor1d([1, 2, Math.sqrt(2), -1]);
 *
 * x.square().print();  // or tf.square(x)
 * ```
 * @param x The input Tensor.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function square_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'square');
    var attrs = {};
    var inputsToSave = [$x];
    var outputsToSave = [];
    return engine_1.ENGINE.runKernelFunc(function (backend, save) {
        save([$x]);
        return backend.square($x);
    }, { x: $x }, null /* grad */, 'Square', attrs, inputsToSave, outputsToSave);
}
exports.square = operation_1.op({ square_: square_ });
//# sourceMappingURL=square.js.map