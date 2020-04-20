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
var kernel_names_1 = require("../kernel_names");
var broadcast_util = require("../ops/broadcast_util");
exports.addGradConfig = {
    kernelName: kernel_names_1.Add,
    inputsToSave: ['a', 'b'],
    gradFunc: function (dy, saved) {
        var a = saved[0], b = saved[1];
        var outShape = broadcast_util.assertAndGetBroadcastShape(a.shape, b.shape);
        var derA = function () {
            var res = dy;
            var reduceAxes = broadcast_util.getReductionAxes(a.shape, outShape);
            if (reduceAxes.length > 0) {
                res = res.sum(reduceAxes);
            }
            return res.reshape(a.shape);
        };
        var derB = function () {
            var res = dy;
            var reduceAxes = broadcast_util.getReductionAxes(b.shape, outShape);
            if (reduceAxes.length > 0) {
                res = res.sum(reduceAxes);
            }
            return res.reshape(b.shape);
        };
        return { a: derA, b: derB };
    }
};
//# sourceMappingURL=Add_grad.js.map