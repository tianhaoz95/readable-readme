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
var kernel_utils_1 = require("../utils/kernel_utils");
var Div_impl_1 = require("./Div_impl");
exports.divConfig = kernel_utils_1.createBinaryKernelConfig(kernel_names_1.Div, Div_impl_1.divImpl);
//# sourceMappingURL=Div.js.map