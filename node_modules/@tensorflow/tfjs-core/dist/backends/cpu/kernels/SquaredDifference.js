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
var kernel_utils_1 = require("../utils/kernel_utils");
exports.squaredDifferenceConfig = {
    kernelName: kernel_names_1.SquaredDifference,
    backendName: 'cpu',
    kernelFunc: function (_a) {
        var inputs = _a.inputs, backend = _a.backend;
        var _b = inputs, a = _b.a, b = _b.b;
        var cpuBackend = backend;
        cpu_util_1.assertNotComplex([a, b], kernel_names_1.SquaredDifference);
        var aVals = cpuBackend.data.get(a.dataId).values;
        var bVals = cpuBackend.data.get(b.dataId).values;
        var _c = kernel_utils_1.broadcastedBinaryOp(a.shape, b.shape, aVals, bVals, a.dtype, function (aVal, bVal) {
            var diff = aVal - bVal;
            return diff * diff;
        }), resultData = _c[0], resultShape = _c[1];
        var dataId = cpuBackend.write(resultData, resultShape, a.dtype);
        return { dataId: dataId, shape: resultShape, dtype: a.dtype };
    }
};
//# sourceMappingURL=SquaredDifference.js.map