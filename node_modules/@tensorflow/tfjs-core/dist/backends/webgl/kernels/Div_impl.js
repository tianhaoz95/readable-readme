"use strict";
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
var environment_1 = require("../../../environment");
var binaryop_gpu = require("../binaryop_gpu");
var binaryop_gpu_1 = require("../binaryop_gpu");
var binaryop_packed_gpu = require("../binaryop_packed_gpu");
var binaryop_packed_gpu_1 = require("../binaryop_packed_gpu");
function divImpl(a, b, backend) {
    var program = new binaryop_gpu_1.BinaryOpProgram(binaryop_gpu.DIV, a.shape, b.shape);
    if (environment_1.env().getBool('WEBGL_PACK_BINARY_OPERATIONS')) {
        program = new binaryop_packed_gpu_1.BinaryOpPackedProgram(binaryop_packed_gpu.DIV, a.shape, b.shape, true);
    }
    var output = backend.runWebGLProgram(program, [a, b], 'float32');
    return output;
}
exports.divImpl = divImpl;
//# sourceMappingURL=Div_impl.js.map