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
var cpu_util_1 = require("./cpu_util");
kernel_registry_1.registerKernel({
    kernelName: 'Square',
    backendName: 'cpu',
    kernelFunc: function (_a) {
        var inputs = _a.inputs, backend = _a.backend;
        var x = inputs.x;
        var cpuBackend = backend;
        cpu_util_1.assertNotComplex(x, 'square');
        var values = cpuBackend.data.get(x.dataId).values;
        var newValues = new Float32Array(values.length);
        for (var i = 0; i < values.length; ++i) {
            var value = values[i];
            newValues[i] = value * value;
        }
        var dataId = cpuBackend.write(newValues, x.shape, x.dtype);
        return { dataId: dataId, shape: x.shape, dtype: x.dtype };
    }
});
//# sourceMappingURL=square.js.map