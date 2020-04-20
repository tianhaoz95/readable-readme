"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var kernel_names_1 = require("../kernel_names");
exports.padV2GradConfig = {
    kernelName: kernel_names_1.PadV2,
    inputsToSave: ['x'],
    gradFunc: function (dy, saved, attrs) {
        // Pad introduces values around the original tensor, so the gradient
        // slices the original shape out of the gradient.
        var x = saved[0];
        var paddings = attrs.paddings;
        var begin = paddings.map(function (p) { return p[0]; });
        return { x: function () { return dy.slice(begin, x.shape); } };
    }
};
//# sourceMappingURL=PadV2_grad.js.map