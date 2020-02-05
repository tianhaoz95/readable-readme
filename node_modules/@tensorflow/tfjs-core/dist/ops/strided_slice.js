"use strict";
/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
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
var engine_1 = require("../engine");
var tensor_util_env_1 = require("../tensor_util_env");
var operation_1 = require("./operation");
var slice_1 = require("./slice");
var slice_util_1 = require("./slice_util");
/**
 * Extracts a strided slice of a tensor.
 *
 * Roughly speaking, this op extracts a slice of size (end-begin)/stride from
 * the given input tensor (x). Starting at the location specified by begin the
 * slice continues by adding stride to the index until all dimensions are not
 * less than end. Note that a stride can be negative, which causes a reverse
 * slice.
 *
 * ```js
 * const t = tf.tensor3d([1, 1, 1 ,2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6],
 *    [3, 2, 3]);
 * t.stridedSlice([1, 0, 0], [2, 1, 3], [1, 1, 1]).print()  // [[[3, 3, 3]]]
 * t.stridedSlice([1, 0, 0], [2, 2, 3], [1, 1, 1]).print()  // [[[3, 3, 3],
 *                                                     // [4, 4, 4]]]
 * t.stridedSlice([1, -1, 0], [2, -3, 3], [1, -1, 1]).print() // [[[4, 4, 4],
 *                                                     // [3, 3, 3]]]
 * ```
 *
 * @param x The tensor to stride slice.
 * @param begin The coordinates to start the slice from.
 * @param end: The coordinates to end the slice at.
 * @param strides: The size of the slice.
 * @param beginMask: If the ith bit of beginMask is set, begin[i] is ignored
 *      and the fullest possible range in that dimension is used instead.
 * @param endMask: If the ith bit of endMask is set, end[i] is ignored
 *      and the fullest possible range in that dimension is used instead.
 * @param shrinkAxisMask: a bitmask where bit i implies that
 * the ith specification should shrink the dimensionality. begin and end must
 * imply a slice of size 1 in the dimension.
 */
/** @doc {heading: 'Operations', subheading: 'Slicing and Joining'} */
function stridedSlice_(x, begin, end, strides, beginMask, endMask, ellipsisMask, newAxisMask, shrinkAxisMask) {
    if (beginMask === void 0) { beginMask = 0; }
    if (endMask === void 0) { endMask = 0; }
    if (ellipsisMask === void 0) { ellipsisMask = 0; }
    if (newAxisMask === void 0) { newAxisMask = 0; }
    if (shrinkAxisMask === void 0) { shrinkAxisMask = 0; }
    if (strides == null) {
        strides = new Array(begin.length);
    }
    if (ellipsisMask !== 0) {
        throw new Error('ellipsis mask is not yet supported');
    }
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'stridedSlice');
    // Expand the dims of x based on the newAxisMask.
    var expandAxes = slice_util_1.maskToAxes(newAxisMask);
    var newShape = $x.shape.slice();
    expandAxes.forEach(function (axis) {
        begin[axis] = 0;
        end[axis] = 1;
        newShape.splice(axis, 0, 1);
    });
    $x = $x.reshape(newShape);
    // Normalize the start, end and strides.
    for (var axis = 0; axis < $x.rank; axis++) {
        begin[axis] = slice_util_1.startForAxis(beginMask, begin, strides, $x.shape, axis);
        end[axis] = slice_util_1.stopForAxis(endMask, end, strides, $x.shape, axis);
        strides[axis] = strides[axis] || 1;
    }
    var shrinkAxes = slice_util_1.maskToAxes(shrinkAxisMask);
    // Adjust the ends based on the shrink mask.
    shrinkAxes.forEach(function (axis) {
        end[axis] = begin[axis] + 1;
        strides[axis] = 1;
    });
    // Figure out the output shape.
    var size = slice_util_1.computeOutShape(begin, end, strides);
    // Remove the axes based on shrinkMask.
    var outShape = size.filter(function (_, axis) { return shrinkAxes.indexOf(axis) === -1; });
    var nonStrided = strides.every(function (v) { return v === 1; });
    if (nonStrided) {
        return slice_1.slice($x, begin, size).reshape(outShape);
    }
    var res = engine_1.ENGINE.runKernelFunc(function (backend) { return backend.stridedSlice($x, begin, end, strides); }, { $x: $x });
    return res.reshape(outShape);
}
exports.stridedSlice = operation_1.op({ stridedSlice_: stridedSlice_ });
//# sourceMappingURL=strided_slice.js.map