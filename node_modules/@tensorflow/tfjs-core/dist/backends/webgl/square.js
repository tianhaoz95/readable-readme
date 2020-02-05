"use strict";
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
var kernel_registry_1 = require("../../kernel_registry");
var unaryop_gpu_1 = require("./unaryop_gpu");
kernel_registry_1.registerKernel({
    kernelName: 'Square',
    backendName: 'webgl',
    kernelFunc: function (_a) {
        var inputs = _a.inputs, backend = _a.backend;
        var x = inputs.x;
        var webglBackend = backend;
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unaryop_gpu_1.SQUARE);
        return webglBackend.runWebGLProgram(program, [x], x.dtype);
    }
});
//# sourceMappingURL=square.js.map