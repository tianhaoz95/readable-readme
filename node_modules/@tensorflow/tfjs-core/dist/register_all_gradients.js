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
var Add_grad_1 = require("./gradients/Add_grad");
var AddN_grad_1 = require("./gradients/AddN_grad");
var BroadcastTo_grad_1 = require("./gradients/BroadcastTo_grad");
var Div_grad_1 = require("./gradients/Div_grad");
var FusedBatchNorm_grad_1 = require("./gradients/FusedBatchNorm_grad");
var Identity_grad_1 = require("./gradients/Identity_grad");
var OneHot_grad_1 = require("./gradients/OneHot_grad");
var PadV2_grad_1 = require("./gradients/PadV2_grad");
var Square_grad_1 = require("./gradients/Square_grad");
var SquaredDifference_grad_1 = require("./gradients/SquaredDifference_grad");
var Tile_grad_1 = require("./gradients/Tile_grad");
var Transpose_grad_1 = require("./gradients/Transpose_grad");
var kernel_registry_1 = require("./kernel_registry");
// Export all kernel configs here so that the package can auto register them
var gradConfigs = [
    Add_grad_1.addGradConfig, AddN_grad_1.addNGradConfig, BroadcastTo_grad_1.broadcastToGradConfig, Div_grad_1.divGradConfig,
    FusedBatchNorm_grad_1.fusedBatchNormGradConfig, Identity_grad_1.identityGradConfig, OneHot_grad_1.oneHotGradConfig,
    PadV2_grad_1.padV2GradConfig, Square_grad_1.squareGradConfig, SquaredDifference_grad_1.squaredDifferenceGradConfig,
    Tile_grad_1.tileGradConfig, Transpose_grad_1.transposeGradConfig
];
for (var _i = 0, gradConfigs_1 = gradConfigs; _i < gradConfigs_1.length; _i++) {
    var gradientConfig = gradConfigs_1[_i];
    kernel_registry_1.registerGradient(gradientConfig);
}
//# sourceMappingURL=register_all_gradients.js.map