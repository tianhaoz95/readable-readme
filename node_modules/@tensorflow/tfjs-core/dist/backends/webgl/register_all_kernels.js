"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var kernel_registry_1 = require("../../kernel_registry");
var Div_1 = require("./kernels/Div");
var FromPixels_1 = require("./kernels/FromPixels");
var MaxPoolWithArgmax_1 = require("./kernels/MaxPoolWithArgmax");
var NonMaxSuppressionV5_1 = require("./kernels/NonMaxSuppressionV5");
var Square_1 = require("./kernels/Square");
var SquaredDifference_1 = require("./kernels/SquaredDifference");
var Transpose_1 = require("./kernels/Transpose");
// List all kernel configs here
var kernelConfigs = [
    FromPixels_1.fromPixelsConfig, Div_1.divConfig, NonMaxSuppressionV5_1.nonMaxSuppressionV5Config, Square_1.squareConfig,
    SquaredDifference_1.squaredDifferenceConfig, Transpose_1.transposeConfig, MaxPoolWithArgmax_1.maxPoolWithArgmaxConfig
];
for (var _i = 0, kernelConfigs_1 = kernelConfigs; _i < kernelConfigs_1.length; _i++) {
    var kernelConfig = kernelConfigs_1[_i];
    kernel_registry_1.registerKernel(kernelConfig);
}
//# sourceMappingURL=register_all_kernels.js.map