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
var conv_util = require("../../../ops/conv_util");
var cpu_util_1 = require("../cpu_util");
var MaxPoolWithArgmax_impl_1 = require("./MaxPoolWithArgmax_impl");
exports.maxPoolWithArgmaxConfig = {
    kernelName: kernel_names_1.MaxPoolWithArgmax,
    backendName: 'cpu',
    kernelFunc: function (_a) {
        var inputs = _a.inputs, attrs = _a.attrs, backend = _a.backend;
        var x = inputs.x;
        var _b = attrs, filterSize = _b.filterSize, strides = _b.strides, pad = _b.pad, includeBatchInIndex = _b.includeBatchInIndex;
        var cpuBackend = backend;
        cpu_util_1.assertNotComplex(x, 'MaxPoolWithArgmax');
        var values = cpuBackend.data.get(x.dataId).values;
        var convInfo = conv_util.computePool2DInfo(x.shape, filterSize, strides, [1, 1], pad);
        var _c = MaxPoolWithArgmax_impl_1.maxPoolWithArgmaxImpl(values, x.shape, x.dtype, includeBatchInIndex, convInfo), pooled = _c[0], indexes = _c[1];
        var pooledDataId = cpuBackend.write(pooled, convInfo.outShape, x.dtype);
        var indexesDataId = cpuBackend.write(indexes, convInfo.outShape, x.dtype);
        return [
            { dataId: pooledDataId, shape: convInfo.outShape, dtype: x.dtype },
            { dataId: indexesDataId, shape: convInfo.outShape, dtype: 'int32' }
        ];
    }
};
//# sourceMappingURL=MaxPoolWithArgmax.js.map