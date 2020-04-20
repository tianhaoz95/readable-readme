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
var array_ops_1 = require("./array_ops");
var operation_1 = require("./operation");
var tile_1 = require("./tile");
/**
 * Create an identity matrix.
 *
 * @param numRows Number of rows.
 * @param numColumns Number of columns. Defaults to `numRows`.
 * @param batchShape If provided, will add the batch shape to the beginning
 *   of the shape of the returned `tf.Tensor` by repeating the identity
 *   matrix.
 * @param dtype Data type.
 * @returns Identity matrix of the specified size and data type, possibly
 *   with batch repetition if `batchShape` is specified.
 */
/** @doc {heading: 'Tensors', subheading: 'Creation'} */
function eye_(numRows, numColumns, batchShape, dtype) {
    if (dtype === void 0) { dtype = 'float32'; }
    if (numColumns == null) {
        numColumns = numRows;
    }
    var buff = array_ops_1.buffer([numRows, numColumns], dtype);
    var n = numRows <= numColumns ? numRows : numColumns;
    for (var i = 0; i < n; ++i) {
        buff.set(1, i, i);
    }
    var out = buff.toTensor().as2D(numRows, numColumns);
    if (batchShape == null) {
        return out;
    }
    else {
        if (batchShape.length === 1) {
            return tile_1.tile(array_ops_1.expandDims(out, 0), [batchShape[0], 1, 1]);
        }
        else if (batchShape.length === 2) {
            return tile_1.tile(array_ops_1.expandDims(array_ops_1.expandDims(out, 0), 0), [batchShape[0], batchShape[1], 1, 1]);
        }
        else if (batchShape.length === 3) {
            return tile_1.tile(array_ops_1.expandDims(array_ops_1.expandDims(array_ops_1.expandDims(out, 0), 0), 0), [batchShape[0], batchShape[1], batchShape[2], 1, 1]);
        }
        else {
            throw new Error("eye() currently supports only 1D and 2D " +
                (
                // tslint:disable-next-line:no-any
                "batchShapes, but received " + batchShape.length + "D."));
        }
    }
}
exports.eye = operation_1.op({ eye_: eye_ });
//# sourceMappingURL=eye.js.map