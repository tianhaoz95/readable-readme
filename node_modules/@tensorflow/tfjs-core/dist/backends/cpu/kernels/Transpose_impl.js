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
var util = require("../../../util");
function transposeImpl(xVals, xShape, dtype, perm, newShape) {
    var xSize = util.sizeFromShape(xShape);
    var xRank = xShape.length;
    var xStrides = util.computeStrides(xShape);
    var newStrides = util.computeStrides(newShape);
    var result = util.getTypedArrayFromDType(dtype, util.sizeFromShape(newShape));
    for (var i = 0; i < xSize; ++i) {
        var loc = util.indexToLoc(i, xRank, xStrides);
        // Permute location.
        var newLoc = new Array(loc.length);
        for (var i_1 = 0; i_1 < newLoc.length; i_1++) {
            newLoc[i_1] = loc[perm[i_1]];
        }
        var newIndex = util.locToIndex(newLoc, xRank, newStrides);
        result[newIndex] = xVals[i];
    }
    return result;
}
exports.transposeImpl = transposeImpl;
//# sourceMappingURL=Transpose_impl.js.map