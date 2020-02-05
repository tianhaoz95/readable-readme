"use strict";
/**
 * @license
 * Copyright 2019 Google Inc. All Rights Reserved.
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
var concat_util = require("../../ops/concat_util");
var packing_util_1 = require("../packing_util");
var shader_compiler_1 = require("./shader_compiler");
var ConcatPackedProgram = /** @class */ (function () {
    function ConcatPackedProgram(shapes, axis) {
        this.packedInputs = true;
        this.packedOutput = true;
        this.outputShape = [];
        this.outputShape = concat_util.computeOutShape(shapes, axis);
        var shape = this.outputShape;
        var rank = shape.length;
        var dtype = shader_compiler_1.getCoordsDataType(rank);
        var coords = packing_util_1.getChannels('coords', rank);
        var channels = ['x', 'y', 'z', 'w', 'u', 'v'].slice(0, rank);
        this.variableNames = shapes.map(function (_, i) { return "T" + i; });
        var offsets = new Array(shapes.length - 1);
        offsets[0] = shapes[0][axis];
        for (var i = 1; i < offsets.length; i++) {
            offsets[i] = offsets[i - 1] + shapes[i][axis];
        }
        var channel = channels[axis];
        var lastChannels = channels.slice(-2);
        var allChannels = channels.join();
        var getValueSnippet = "if (" + channel + " < " + offsets[0] + ") {\n        return getChannel(\n            getT0(" + allChannels + "), vec2(" + lastChannels.join() + "));\n        }";
        for (var i = 1; i < offsets.length; i++) {
            var shift_1 = offsets[i - 1];
            // Note: the >= comparison below may seem unnecessary given the check
            // above but is needed to workaround branch execution issues on some
            // devices. It makes all the conditions exclusive without relying on
            // execution order.
            getValueSnippet += "\n        if (" + channel + " < " + offsets[i] + "  && " + channel + " >= " + offsets[i - 1] + ") {\n          return getChannel(\n            getT" + i + "(" + shiftedChannels(channels, channel, shift_1) + "),\n            vec2(" + shiftedChannels(lastChannels, channel, shift_1) + "));\n        }";
        }
        var lastIndex = offsets.length;
        var shift = offsets[offsets.length - 1];
        getValueSnippet += "\n        return getChannel(\n          getT" + lastIndex + "(" + shiftedChannels(channels, channel, shift) + "),\n          vec2(" + shiftedChannels(lastChannels, channel, shift) + "));";
        this.userCode = "\n      float getValue(" + channels.map(function (x) { return 'int ' + x; }) + ") {\n        " + getValueSnippet + "\n      }\n\n      void main() {\n        " + dtype + " coords = getOutputCoords();\n        vec4 result = vec4(getValue(" + coords + "), 0., 0., 0.);\n\n        " + coords[rank - 1] + " = " + coords[rank - 1] + " + 1;\n        if (" + coords[rank - 1] + " < " + shape[rank - 1] + ") {\n          result.g = getValue(" + coords + ");\n        }\n\n        " + coords[rank - 2] + " = " + coords[rank - 2] + " + 1;\n        if (" + coords[rank - 2] + " < " + shape[rank - 2] + ") {\n          result.a = getValue(" + coords + ");\n        }\n\n        " + coords[rank - 1] + " = " + coords[rank - 1] + " - 1;\n        if (" + coords[rank - 2] + " < " + shape[rank - 2] + " &&\n            " + coords[rank - 1] + " < " + shape[rank - 1] + ") {\n          result.b = getValue(" + coords + ");\n        }\n        setOutput(result);\n      }\n    ";
    }
    return ConcatPackedProgram;
}());
exports.ConcatPackedProgram = ConcatPackedProgram;
/**
 * Return an expression for coordinates into a vector where a given channel
 * will be offset by [shift].
 *
 * @param channels the channels to consider
 * @param channel the channel we want shifted
 * @param shift  the amount to subtract from the channel.
 *
 * @returns a string of the form 'x, y-[shift], z' where any one channel can
 * have the shift applied.
 */
function shiftedChannels(channels, channel, shift) {
    var channelIdx = channels.indexOf(channel);
    var res = channels.map(function (c, idx) {
        if (idx === channelIdx) {
            return c + " - " + shift;
        }
        else {
            return c;
        }
    });
    return res.join();
}
//# sourceMappingURL=concat_packed_gpu.js.map