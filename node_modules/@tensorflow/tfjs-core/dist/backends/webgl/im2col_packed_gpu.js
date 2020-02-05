"use strict";
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
var glsl_version_1 = require("./glsl_version");
var Im2ColPackedProgram = /** @class */ (function () {
    function Im2ColPackedProgram(outputShape, inputShape, convInfo) {
        this.variableNames = ['A'];
        this.packedInputs = true;
        this.packedOutput = true;
        this.outputShape = outputShape;
        var filterWidth = convInfo.filterWidth, inChannels = convInfo.inChannels, strideWidth = convInfo.strideWidth, strideHeight = convInfo.strideHeight, padInfo = convInfo.padInfo, outWidth = convInfo.outWidth, dilationWidth = convInfo.dilationWidth, dilationHeight = convInfo.dilationHeight, dataFormat = convInfo.dataFormat;
        var left = padInfo.left, top = padInfo.top;
        var itemsPerBlockRow = inChannels * filterWidth;
        var glsl = glsl_version_1.getGlslDifferences();
        var isChannelsLast = dataFormat === 'channelsLast';
        var rowDim = isChannelsLast ? 0 : 1;
        var colDim = isChannelsLast ? 1 : 2;
        var unrolled = "";
        for (var row = 0; row <= 1; row++) {
            for (var col = 0; col <= 1; col++) {
                unrolled += "\n          blockIndex = rc.y + " + col + ";\n          pos = rc.x + " + row + ";\n\n          if(blockIndex < " + outputShape[1] + " && pos < " + outputShape[0] + ") {\n            offsetY = int(blockIndex / (" + outWidth + ")) * " + strideHeight + " - " + top + ";\n            d0 = offsetY + " + dilationHeight + " * (pos / " + itemsPerBlockRow + ");\n\n            if(d0 < " + inputShape[rowDim] + " && d0 >= 0) {\n\n              offsetX = int(mod(float(blockIndex), " + outWidth + ".) * " + strideWidth + ". - " + left + ".);\n              d1 = offsetX + " + dilationWidth + " * (int(mod(float(pos), " + itemsPerBlockRow + ".) / " + inChannels + ".));\n\n              if(d1 < " + inputShape[colDim] + " && d1 >= 0) {\n\n                ch = int(mod(float(pos), " + inChannels + ".));\n\n                if (" + isChannelsLast + ") {\n                  innerDims = vec2(d1, ch);\n                  result[" + (row * 2 + col) + "] = getChannel(\n                    getA(d0, int(innerDims.x),\n                    int(innerDims.y)), innerDims);\n                } else {\n                  innerDims = vec2(d0, d1);\n                  result[" + (row * 2 + col) + "] = getChannel(\n                    getA(ch, int(innerDims.x),\n                    int(innerDims.y)), innerDims);\n                }\n              }\n            }\n          }\n        ";
            }
        }
        this.userCode = "\n      void main() {\n        ivec2 rc = getOutputCoords();\n\n        vec4 result = vec4(0);\n\n        int blockIndex, pos, offsetY, d0, offsetX, d1, ch;\n        vec2 innerDims;\n\n        " + unrolled + "\n\n        " + glsl.output + " = result;\n      }\n    ";
    }
    return Im2ColPackedProgram;
}());
exports.Im2ColPackedProgram = Im2ColPackedProgram;
//# sourceMappingURL=im2col_packed_gpu.js.map