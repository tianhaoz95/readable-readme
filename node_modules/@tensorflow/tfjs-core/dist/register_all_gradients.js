"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var Square_grad_1 = require("./gradients/Square_grad");
var SquaredDifference_grad_1 = require("./gradients/SquaredDifference_grad");
var kernel_registry_1 = require("./kernel_registry");
// Export all kernel configs here so that the package can auto register them
var gradConfigs = [
    Square_grad_1.squareGradConfig,
    SquaredDifference_grad_1.squaredDifferenceGradConfig,
];
for (var _i = 0, gradConfigs_1 = gradConfigs; _i < gradConfigs_1.length; _i++) {
    var gradientConfig = gradConfigs_1[_i];
    kernel_registry_1.registerGradient(gradientConfig);
}
//# sourceMappingURL=register_all_gradients.js.map