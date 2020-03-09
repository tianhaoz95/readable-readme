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
var kernel_names_1 = require("../kernel_names");
var binary_ops_1 = require("../ops/binary_ops");
var tensor_ops_1 = require("../ops/tensor_ops");
exports.squaredDifferenceGradConfig = {
    kernelName: kernel_names_1.SquaredDifference,
    gradFunc: function (dy, saved) {
        var a = saved[0], b = saved[1];
        var two = tensor_ops_1.scalar(2);
        var derA = function () { return binary_ops_1.mul(dy, binary_ops_1.mul(two, binary_ops_1.sub(a, b))); };
        var derB = function () { return binary_ops_1.mul(dy, binary_ops_1.mul(two, binary_ops_1.sub(b, a))); };
        return { a: derA, b: derB };
    }
};
//# sourceMappingURL=SquaredDifference_grad.js.map