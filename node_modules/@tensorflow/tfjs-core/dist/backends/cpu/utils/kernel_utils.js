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
var backend_util = require("../../../backends/backend_util");
var util = require("../../../util");
function broadcastedBinaryOp(aShape, bShape, aVals, bVals, dtype, op) {
    var newShape = backend_util.assertAndGetBroadcastShape(aShape, bShape);
    var resultRank = newShape.length;
    var resultStrides = util.computeStrides(newShape);
    var resultSize = util.sizeFromShape(newShape);
    var result = util.getTypedArrayFromDType(dtype, resultSize);
    var aRank = aShape.length;
    var bRank = bShape.length;
    var aStrides = util.computeStrides(aShape);
    var bStrides = util.computeStrides(bShape);
    var aBroadcastDims = backend_util.getBroadcastDims(aShape, newShape);
    var bBroadcastDims = backend_util.getBroadcastDims(bShape, newShape);
    if (aBroadcastDims.length + bBroadcastDims.length === 0) {
        for (var i = 0; i < result.length; ++i) {
            result[i] = op(aVals[i % aVals.length], bVals[i % bVals.length]);
        }
    }
    else {
        var _loop_1 = function (i) {
            var loc = util.indexToLoc(i, resultRank, resultStrides);
            var aLoc = loc.slice(-aRank);
            aBroadcastDims.forEach(function (d) { return aLoc[d] = 0; });
            var aIndex = util.locToIndex(aLoc, aRank, aStrides);
            var bLoc = loc.slice(-bRank);
            bBroadcastDims.forEach(function (d) { return bLoc[d] = 0; });
            var bIndex = util.locToIndex(bLoc, bRank, bStrides);
            result[i] = op(aVals[aIndex], bVals[bIndex]);
        };
        for (var i = 0; i < result.length; ++i) {
            _loop_1(i);
        }
    }
    return [result, newShape];
}
exports.broadcastedBinaryOp = broadcastedBinaryOp;
//# sourceMappingURL=kernel_utils.js.map