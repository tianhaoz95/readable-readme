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
var tensor_ops_1 = require("../ops/tensor_ops");
exports.tileGradConfig = {
    kernelName: kernel_names_1.Tile,
    inputsToSave: ['x'],
    gradFunc: function (dy, saved, attrs) {
        var x = saved[0];
        var reps = attrs.reps;
        var derX = function () {
            var xGrad = tensor_ops_1.zerosLike(x);
            // TODO(cais): Maybe reduce memory footprint by avoiding repeated
            // slicing.
            if (x.rank === 1) {
                for (var i = 0; i < reps[0]; ++i) {
                    xGrad = xGrad.add(dy.slice([i * x.shape[0]], [x.shape[0]]));
                }
            }
            else if (x.rank === 2) {
                for (var i = 0; i < reps[0]; ++i) {
                    for (var j = 0; j < reps[1]; ++j) {
                        xGrad = xGrad.add(dy.slice([i * x.shape[0], j * x.shape[1]], [x.shape[0], x.shape[1]]));
                    }
                }
            }
            else if (x.rank === 3) {
                for (var i = 0; i < reps[0]; ++i) {
                    for (var j = 0; j < reps[1]; ++j) {
                        for (var k = 0; k < reps[2]; ++k) {
                            xGrad = xGrad.add(dy.slice([i * x.shape[0], j * x.shape[1], k * x.shape[2]], [x.shape[0], x.shape[1], x.shape[2]]));
                        }
                    }
                }
            }
            else if (x.rank === 4) {
                for (var i = 0; i < reps[0]; ++i) {
                    for (var j = 0; j < reps[1]; ++j) {
                        for (var k = 0; k < reps[2]; ++k) {
                            for (var l = 0; l < reps[3]; ++l) {
                                xGrad = xGrad.add(dy.slice([
                                    i * x.shape[0], j * x.shape[1], k * x.shape[2],
                                    l * x.shape[3]
                                ], [x.shape[0], x.shape[1], x.shape[2], x.shape[3]]));
                            }
                        }
                    }
                }
            }
            else {
                throw new Error("Gradient for tile operation is not implemented for rank-" +
                    (x.rank + " tensors yet."));
            }
            return xGrad;
        };
        return { x: derX };
    },
};
//# sourceMappingURL=Tile_grad.js.map