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
var kernel_names_1 = require("../../../kernel_names");
var cpu_util_1 = require("../cpu_util");
var Transpose_impl_1 = require("./Transpose_impl");
exports.transposeConfig = {
    kernelName: kernel_names_1.Transpose,
    backendName: 'cpu',
    kernelFunc: function (_a) {
        var inputs = _a.inputs, attrs = _a.attrs, backend = _a.backend;
        var x = inputs.x;
        var perm = attrs.perm;
        var cpuBackend = backend;
        cpu_util_1.assertNotComplex(x, 'transpose');
        var xRank = x.shape.length;
        var newShape = new Array(xRank);
        for (var i = 0; i < newShape.length; i++) {
            newShape[i] = x.shape[perm[i]];
        }
        var values = cpuBackend.data.get(x.dataId).values;
        var result = Transpose_impl_1.transposeImpl(values, x.shape, x.dtype, perm, newShape);
        var dataId = cpuBackend.write(result, newShape, x.dtype);
        return { dataId: dataId, shape: newShape, dtype: x.dtype };
    }
};
//# sourceMappingURL=Transpose.js.map