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
var Transpose_impl_1 = require("../../../backends/cpu/kernels/Transpose_impl");
var kernel_names_1 = require("../../../kernel_names");
var Transpose_impl_2 = require("./Transpose_impl");
exports.transposeConfig = {
    kernelName: kernel_names_1.Transpose,
    backendName: 'webgl',
    kernelFunc: function (_a) {
        var inputs = _a.inputs, attrs = _a.attrs, backend = _a.backend;
        var x = inputs.x;
        var perm = attrs.perm;
        var webglBackend = backend;
        var xRank = x.shape.length;
        var newShape = new Array(xRank);
        for (var i = 0; i < newShape.length; i++) {
            newShape[i] = x.shape[perm[i]];
        }
        var out;
        if (webglBackend.shouldExecuteOnCPU([x])) {
            var xTexData = webglBackend.texData.get(x.dataId);
            var values = xTexData.values;
            var outValues = Transpose_impl_1.transposeImpl(values, x.shape, x.dtype, perm, newShape);
            out = webglBackend.makeTensorInfo(newShape, x.dtype);
            var outData = webglBackend.texData.get(out.dataId);
            outData.values = outValues;
        }
        else {
            out = Transpose_impl_2.transposeImpl(x, perm, webglBackend);
        }
        return out;
    }
};
//# sourceMappingURL=Transpose.js.map