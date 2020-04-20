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
var broadcast_util = require("../ops/broadcast_util");
var div_1 = require("../ops/div");
var reduction_ops_1 = require("../ops/reduction_ops");
var square_1 = require("../ops/square");
var unary_ops_1 = require("../ops/unary_ops");
exports.divGradConfig = {
    kernelName: kernel_names_1.Div,
    inputsToSave: ['a', 'b'],
    gradFunc: function (dy, saved) {
        var a = saved[0], b = saved[1];
        var outShape = broadcast_util.assertAndGetBroadcastShape(a.shape, b.shape);
        var derA = function () {
            var res = div_1.div(dy, b.toFloat());
            var reduceAxes = broadcast_util.getReductionAxes(a.shape, outShape);
            if (reduceAxes.length > 0) {
                return reduction_ops_1.sum(res, reduceAxes).reshape(a.shape);
            }
            return res;
        };
        var derB = function () {
            var res = dy.mul(a.toFloat());
            var reduceAxes = broadcast_util.getReductionAxes(b.shape, outShape);
            if (reduceAxes.length > 0) {
                res = reduction_ops_1.sum(res, reduceAxes).reshape(b.shape);
            }
            var tmp = square_1.square(b);
            return unary_ops_1.neg(div_1.div(res, tmp.toFloat()));
        };
        return { a: derA, b: derB };
    }
};
//# sourceMappingURL=Div_grad.js.map