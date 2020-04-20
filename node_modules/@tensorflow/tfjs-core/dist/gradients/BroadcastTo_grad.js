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
exports.broadcastToGradConfig = {
    kernelName: kernel_names_1.BroadcastTo,
    gradFunc: function (dy, saved, attrs) {
        var broadCastToAttrs = attrs;
        var inputShape = broadCastToAttrs.inputShape;
        var outputShape = broadCastToAttrs.shape;
        var reps = Array.from(outputShape);
        for (var i = inputShape.length - 1; i >= 0; i--) {
            if (inputShape[i] === outputShape[i]) {
                reps[i] = 1;
            }
            else if (inputShape[i] !== 1) {
                throw new Error("broadcastTo(): [" + inputShape + "] cannot be broadcast to [" + outputShape + "].");
            }
        }
        var axes = [];
        for (var i = 0; i < reps.length; i++) {
            if (reps[i] > 1) {
                axes.push(i);
            }
        }
        var keepDims = true;
        return { x: function () { return dy.sum(axes, keepDims); } };
    }
};
//# sourceMappingURL=BroadcastTo_grad.js.map