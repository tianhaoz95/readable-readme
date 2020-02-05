"use strict";
/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
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
var AvgPool2DBackpropProgram = /** @class */ (function () {
    function AvgPool2DBackpropProgram(convInfo) {
        this.variableNames = ['dy'];
        this.outputShape = convInfo.inShape;
        var filterHeight = convInfo.filterHeight;
        var filterWidth = convInfo.filterWidth;
        var strideHeight = convInfo.strideHeight;
        var strideWidth = convInfo.strideWidth;
        var dilationHeight = convInfo.dilationHeight;
        var dilationWidth = convInfo.dilationWidth;
        var effectiveFilterHeight = convInfo.effectiveFilterHeight;
        var effectiveFilterWidth = convInfo.effectiveFilterWidth;
        var padTop = effectiveFilterHeight - 1 - convInfo.padInfo.top;
        var padLeft = effectiveFilterWidth - 1 - convInfo.padInfo.left;
        var avgMultiplier = 1 / (filterHeight * filterWidth);
        this.userCode = "\n      const ivec2 pads = ivec2(" + padTop + ", " + padLeft + ");\n      const float avgMultiplier = float(" + avgMultiplier + ");\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int d = coords[3];\n\n        ivec2 dyRCCorner = coords.yz - pads;\n        int dyRCorner = dyRCCorner.x;\n        int dyCCorner = dyRCCorner.y;\n\n        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n        for (int wR = 0; wR < " + effectiveFilterHeight + ";\n            wR += " + dilationHeight + ") {\n          float dyR = float(dyRCorner + wR) / " + strideHeight + ".0;\n\n          if (dyR < 0.0 || dyR >= " + convInfo.outHeight + ".0 || fract(dyR) > 0.0) {\n            continue;\n          }\n          int idyR = int(dyR);\n\n          for (int wC = 0; wC < " + effectiveFilterWidth + ";\n            wC+= " + dilationWidth + ") {\n            float dyC = float(dyCCorner + wC) / " + strideWidth + ".0;\n\n            if (dyC < 0.0 || dyC >= " + convInfo.outWidth + ".0 ||\n                fract(dyC) > 0.0) {\n              continue;\n            }\n            int idyC = int(dyC);\n\n            float dyValue = getDy(b, idyR, idyC, d);\n\n            dotProd += dyValue * avgMultiplier;\n          }\n        }\n        setOutput(dotProd);\n      }\n    ";
    }
    return AvgPool2DBackpropProgram;
}());
exports.AvgPool2DBackpropProgram = AvgPool2DBackpropProgram;
var AvgPool3DBackpropProgram = /** @class */ (function () {
    function AvgPool3DBackpropProgram(convInfo) {
        this.variableNames = ['dy'];
        this.outputShape = convInfo.inShape;
        var filterDepth = convInfo.filterDepth;
        var filterHeight = convInfo.filterHeight;
        var filterWidth = convInfo.filterWidth;
        var strideDepth = convInfo.strideDepth;
        var strideHeight = convInfo.strideHeight;
        var strideWidth = convInfo.strideWidth;
        var dilationDepth = convInfo.dilationDepth;
        var dilationHeight = convInfo.dilationHeight;
        var dilationWidth = convInfo.dilationWidth;
        var effectiveFilterDepth = convInfo.effectiveFilterDepth;
        var effectiveFilterHeight = convInfo.effectiveFilterHeight;
        var effectiveFilterWidth = convInfo.effectiveFilterWidth;
        var padFront = effectiveFilterDepth - 1 - convInfo.padInfo.front;
        var padTop = effectiveFilterHeight - 1 - convInfo.padInfo.top;
        var padLeft = effectiveFilterWidth - 1 - convInfo.padInfo.left;
        var avgMultiplier = 1 / (filterDepth * filterHeight * filterWidth);
        this.userCode = "\n      const ivec3 pads = ivec3(" + padFront + ", " + padTop + ", " + padLeft + ");\n      const float avgMultiplier = float(" + avgMultiplier + ");\n\n      void main() {\n        ivec5 coords = getOutputCoords();\n        int batch = coords.x;\n        int ch = coords.u;\n\n        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;\n        int dyDCorner = dyCorner.x;\n        int dyRCorner = dyCorner.y;\n        int dyCCorner = dyCorner.z;\n\n        // Convolve dy(?, ?, ?, d) with pos mask(:, :, :, ch) to get\n        // dx(xD, xR, xC, ch).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n\n        for (int wD = 0; wD < " + effectiveFilterDepth + ";\n            wD += " + dilationDepth + ") {\n          float dyD = float(dyDCorner + wD) / " + strideDepth + ".0;\n\n          if (dyD < 0.0 || dyD >= " + convInfo.outDepth + ".0 || fract(dyD) > 0.0) {\n            continue;\n          }\n          int idyD = int(dyD);\n\n          for (int wR = 0; wR < " + effectiveFilterHeight + ";\n              wR += " + dilationHeight + ") {\n            float dyR = float(dyRCorner + wR) / " + strideHeight + ".0;\n\n            if (dyR < 0.0 || dyR >= " + convInfo.outHeight + ".0 ||\n                fract(dyR) > 0.0) {\n              continue;\n            }\n            int idyR = int(dyR);\n\n            for (int wC = 0; wC < " + effectiveFilterWidth + ";\n                wC += " + dilationWidth + ") {\n              float dyC = float(dyCCorner + wC) / " + strideWidth + ".0;\n\n              if (dyC < 0.0 || dyC >= " + convInfo.outWidth + ".0 ||\n                  fract(dyC) > 0.0) {\n                continue;\n              }\n              int idyC = int(dyC);\n\n              float dyValue = getDy(batch, idyD, idyR, idyC, ch);\n\n              dotProd += dyValue * avgMultiplier;\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    ";
    }
    return AvgPool3DBackpropProgram;
}());
exports.AvgPool3DBackpropProgram = AvgPool3DBackpropProgram;
//# sourceMappingURL=avg_pool_backprop_gpu.js.map