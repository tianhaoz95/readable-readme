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
var engine_1 = require("../engine");
var kernel_names_1 = require("../kernel_names");
var tensor_util_env_1 = require("../tensor_util_env");
var util = require("../util");
var operation_1 = require("./operation");
/**
 * Construct a tensor by repeating it the number of times given by reps.
 *
 * This operation creates a new tensor by replicating `input` `reps`
 * times. The output tensor's i'th dimension has `input.shape[i] *
 * reps[i]` elements, and the values of `input` are replicated
 * `reps[i]` times along the i'th dimension. For example, tiling
 * `[a, b, c, d]` by `[2]` produces `[a, b, c, d, a, b, c, d]`.
 *
 * ```js
 * const a = tf.tensor1d([1, 2]);
 *
 * a.tile([2]).print();    // or a.tile([2])
 * ```
 *
 * ```js
 * const a = tf.tensor2d([1, 2, 3, 4], [2, 2]);
 *
 * a.tile([1, 2]).print();  // or a.tile([1, 2])
 * ```
 * @param x The tensor to tile.
 * @param reps Determines the number of replications per dimension.
 */
/** @doc {heading: 'Tensors', subheading: 'Slicing and Joining'} */
function tile_(x, reps) {
    var parseAs = null;
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'tile', parseAs);
    util.assert($x.rank === reps.length, function () { return "Error in transpose: rank of input " + $x.rank + " " +
        ("must match length of reps " + reps + "."); });
    var forward = function (backend, save) {
        var res = backend.tile($x, reps);
        save([$x]);
        return res;
    };
    var inputsToSave = [$x];
    var inputs = { x: $x };
    var attrs = { reps: reps };
    return engine_1.ENGINE.runKernelFunc(forward, inputs, null /* grad */, kernel_names_1.Tile, attrs, inputsToSave);
}
exports.tile = operation_1.op({ tile_: tile_ });
//# sourceMappingURL=tile.js.map