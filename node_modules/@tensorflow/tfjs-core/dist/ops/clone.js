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
 * Creates a new tensor with the same values and shape as the specified
 * tensor.
 *
 * ```js
 * const x = tf.tensor([1, 2]);
 *
 * x.clone().print();
 * ```
 *
 * @param x The tensor to clone.
 */
/** @doc {heading: 'Tensors', subheading: 'Creation'} */
function clone_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'clone', null);
    var forward = function () {
        return engine_1.ENGINE.makeTensorFromDataId($x.dataId, $x.shape, $x.dtype);
    };
    // Note this op is called tf.identity in python. Hence the kernel name used
    // here.
    return engine_1.ENGINE.runKernelFunc(forward, { x: $x }, null /* grad */, kernel_names_1.Identity);
}
exports.clone = operation_1.op({ clone_: clone_ });
//# sourceMappingURL=clone.js.map