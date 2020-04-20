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
var kernel_names_1 = require("../kernel_names");
var axis_util = require("../ops/axis_util");
var transpose_1 = require("../ops/transpose");
exports.transposeGradConfig = {
    kernelName: kernel_names_1.Transpose,
    gradFunc: function (dy, saved, attrs) {
        var transposeAttrs = attrs;
        var perm = transposeAttrs.perm;
        var undoPerm = axis_util.getUndoAxesPermutation(perm);
        return { x: function () { return transpose_1.transpose(dy, undoPerm); } };
    }
};
//# sourceMappingURL=Transpose_grad.js.map