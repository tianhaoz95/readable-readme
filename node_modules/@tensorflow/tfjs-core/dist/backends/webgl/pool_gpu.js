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
var Pool2DProgram = /** @class */ (function () {
    function Pool2DProgram(convInfo, poolType, computePositions, flattenPositions, includeBatchInIndex) {
        if (flattenPositions === void 0) { flattenPositions = false; }
        if (includeBatchInIndex === void 0) { includeBatchInIndex = false; }
        this.variableNames = ['x'];
        if (poolType === 'avg' && computePositions) {
            throw new Error('Cannot compute positions for average pool.');
        }
        var filterWidth = convInfo.filterWidth;
        var strideHeight = convInfo.strideHeight;
        var strideWidth = convInfo.strideWidth;
        var dilationHeight = convInfo.dilationHeight;
        var dilationWidth = convInfo.dilationWidth;
        var effectiveFilterHeight = convInfo.effectiveFilterHeight;
        var effectiveFilterWidth = convInfo.effectiveFilterWidth;
        var padTop = convInfo.padInfo.top;
        var padLeft = convInfo.padInfo.left;
        this.outputShape = convInfo.outShape;
        var isAvgPool = poolType === 'avg';
        var batchFlattenPositionStr = "((batch  * " + convInfo.inHeight + " + xR) * " + convInfo.inWidth + " + xC) * " + convInfo.inChannels + " + d";
        var flattenPositionStr = "(xR * " + convInfo.inWidth + " + xC) * " + convInfo.inChannels + " + d";
        var initializationValue = '0.0';
        if (!isAvgPool) {
            // WebGL on Firefox Linux can't compile 1/0 so we do 1/eps.
            initializationValue = '-1.0 / 1e-20';
        }
        if (computePositions) {
            var compareOp_1 = '>=';
            this.userCode = "\n        const ivec2 strides = ivec2(" + strideHeight + ", " + strideWidth + ");\n        const ivec2 pads = ivec2(" + padTop + ", " + padLeft + ");\n\n        void main() {\n          ivec4 coords = getOutputCoords();\n          int batch = coords[0];\n          int d = coords[3];\n\n          ivec2 xRCCorner = coords.yz * strides - pads;\n          int xRCorner = xRCCorner.x;\n          int xCCorner = xRCCorner.y;\n\n          // max/min x(?, ?, d) to get y(yR, yC, d).\n          // ? = to be determined\n          float minMaxValue = 0.0;\n          float minMaxValueFound = 0.0;\n          int minMaxPosition = 0;\n          float avgValue = 0.0;\n\n          for (int wR = 0; wR < " + effectiveFilterHeight + ";\n              wR += " + dilationHeight + ") {\n            int xR = xRCorner + wR;\n\n            if (xR < 0 || xR >= " + convInfo.inHeight + ") {\n              continue;\n            }\n\n            for (int wC = 0; wC < " + effectiveFilterWidth + ";\n                wC += " + dilationWidth + ") {\n              int xC = xCCorner + wC;\n\n              if (xC < 0 || xC >= " + convInfo.inWidth + ") {\n                continue;\n              }\n\n              float value = getX(batch, xR, xC, d);\n\n              // If a min / max value has already been found, use it. If not,\n              // use the current value.\n              float currMinMaxValue = mix(\n                  value, minMaxValue, minMaxValueFound);\n              if (value " + compareOp_1 + " currMinMaxValue) {\n                minMaxValue = value;\n                minMaxValueFound = 1.0;\n                minMaxPosition = " + (flattenPositions ? (includeBatchInIndex ? batchFlattenPositionStr :
                flattenPositionStr) :
                "wR * " + effectiveFilterWidth + " + wC") + ";\n              }\n            }\n          }\n          setOutput(float(minMaxPosition));\n        }\n      ";
            return;
        }
        var compareOp = 'max';
        var returnValue = poolType + "(" + poolType + "(" + poolType + "(" +
            'minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])';
        if (poolType === 'avg') {
            returnValue = "avgValue / count";
        }
        var filterWidthNearestVec4 = Math.floor(filterWidth / 4) * 4;
        var filterWidthVec4Remainder = filterWidth % 4;
        var updateSnippet = "\n      if (" + isAvgPool + ") {\n        avgValue += dot(values, ones);\n      } else {\n        minMaxValue = " + compareOp + "(values, minMaxValue);\n      }\n    ";
        this.userCode = "\n      const ivec2 strides = ivec2(" + strideHeight + ", " + strideWidth + ");\n      const ivec2 pads = ivec2(" + padTop + ", " + padLeft + ");\n      const float initializationValue = " + initializationValue + ";\n      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);\n\n      float count = 0.0;\n\n      float getValue(int batch, int xR, int xC, int d) {\n        if (xC < 0 || xC >= " + convInfo.inWidth + ") {\n          return initializationValue;\n        }\n        count += 1.0;\n        return getX(batch, xR, xC, d);\n      }\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int batch = coords[0];\n        int d = coords[3];\n\n        ivec2 xRCCorner = coords.yz * strides - pads;\n        int xRCorner = xRCCorner.x;\n        int xCCorner = xRCCorner.y;\n\n        // max/min x(?, ?, d) to get y(yR, yC, d).\n        // ? = to be determined\n        vec4 minMaxValue = vec4(" + initializationValue + ");\n        float avgValue = 0.0;\n        count = 0.0;\n\n        for (int wR = 0; wR < " + effectiveFilterHeight + ";\n            wR += " + dilationHeight + ") {\n          int xR = xRCorner + wR;\n\n          if (xR < 0 || xR >= " + convInfo.inHeight + ") {\n            continue;\n          }\n\n          for (int wC = 0; wC < " + filterWidthNearestVec4 + "; wC += 4) {\n            int xC = xCCorner + wC * " + dilationWidth + ";\n\n            vec4 values = vec4(\n              getValue(batch, xR, xC, d),\n              getValue(batch, xR, xC + " + dilationWidth + ", d),\n              getValue(batch, xR, xC + 2 * " + dilationWidth + ", d),\n              getValue(batch, xR, xC + 3 * " + dilationWidth + ", d)\n            );\n\n            " + updateSnippet + "\n          }\n\n          int xC = xCCorner + " + filterWidthNearestVec4 + ";\n          if (" + (filterWidthVec4Remainder === 1) + ") {\n            vec4 values = vec4(\n              getValue(batch, xR, xC, d),\n              initializationValue,\n              initializationValue,\n              initializationValue\n            );\n\n            " + updateSnippet + "\n          } else if (" + (filterWidthVec4Remainder === 2) + ") {\n            vec4 values = vec4(\n              getValue(batch, xR, xC, d),\n              getValue(batch, xR, xC + " + dilationWidth + ", d),\n              initializationValue,\n              initializationValue\n            );\n\n            " + updateSnippet + "\n          } else if (" + (filterWidthVec4Remainder === 3) + ") {\n            vec4 values = vec4(\n              getValue(batch, xR, xC, d),\n              getValue(batch, xR, xC + " + dilationWidth + ", d),\n              getValue(batch, xR, xC + 2 * " + dilationWidth + ", d),\n              initializationValue\n            );\n\n            " + updateSnippet + "\n          }\n        }\n        setOutput(" + returnValue + ");\n      }\n    ";
    }
    return Pool2DProgram;
}());
exports.Pool2DProgram = Pool2DProgram;
var Pool3DProgram = /** @class */ (function () {
    function Pool3DProgram(convInfo, poolType, computePositions, flattenPositions, includeBatchInIndex) {
        if (flattenPositions === void 0) { flattenPositions = false; }
        if (includeBatchInIndex === void 0) { includeBatchInIndex = false; }
        this.variableNames = ['x'];
        if (poolType === 'avg' && computePositions) {
            throw new Error('Cannot compute positions for average pool.');
        }
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
        var padFront = convInfo.padInfo.front;
        var padTop = convInfo.padInfo.top;
        var padLeft = convInfo.padInfo.left;
        this.outputShape = convInfo.outShape;
        var isAvgPool = poolType === 'avg';
        var initializationValue = '0.0';
        if (!isAvgPool) {
            // WebGL on Firefox Linux can't compile 1/0 so we do 1/eps.
            initializationValue = '-1.0 / 1e-20';
        }
        if (computePositions) {
            var compareOp_2 = '>=';
            this.userCode = "\n        const ivec3 strides =\n            ivec3(" + strideDepth + ", " + strideHeight + ", " + strideWidth + ");\n        const ivec3 pads = ivec3(" + padFront + ", " + padTop + ", " + padLeft + ");\n\n        void main() {\n          ivec5 coords = getOutputCoords();\n          int batch = coords.x;\n          int ch = coords.u;\n\n          ivec3 xCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;\n          int xDCorner = xCorner.x;\n          int xRCorner = xCorner.y;\n          int xCCorner = xCorner.z;\n\n          // max/min x(?, ?, ?, ch) to get y(yD, yR, yC, ch).\n          // ? = to be determined\n          float minMaxValue = 0.0;\n          float minMaxValueFound = 0.0;\n          int minMaxPosition = 0;\n\n          for (int wD = 0; wD < " + effectiveFilterDepth + ";\n              wD += " + dilationDepth + ") {\n            int xD = xDCorner + wD;\n\n            if (xD < 0 || xD >= " + convInfo.inDepth + ") {\n              continue;\n            }\n\n            for (int wR = 0; wR < " + effectiveFilterHeight + ";\n                wR += " + dilationHeight + ") {\n              int xR = xRCorner + wR;\n\n              if (xR < 0 || xR >= " + convInfo.inHeight + ") {\n                continue;\n              }\n\n              for (int wC = 0; wC < " + effectiveFilterWidth + ";\n                  wC += " + dilationWidth + ") {\n                int xC = xCCorner + wC;\n\n                if (xC < 0 || xC >= " + convInfo.inWidth + ") {\n                  continue;\n                }\n\n                float value = getX(batch, xD, xR, xC, ch);\n\n                // If a min / max value has already been found, use it. If not,\n                // use the current value.\n                float currMinMaxValue = mix(\n                    value, minMaxValue, minMaxValueFound);\n                if (value " + compareOp_2 + " currMinMaxValue) {\n                  minMaxValue = value;\n                  minMaxValueFound = 1.0;\n                  minMaxPosition = " + (flattenPositions ?
                (includeBatchInIndex ?
                    "(((batch * " + convInfo.inDepth + " + xD) * " + convInfo.inHeight + " + xR) * " + convInfo.inWidth + " + xC) * " + convInfo.inChannels + " + ch" :
                    "((xD * " + convInfo.inHeight + " + xR) * " + convInfo.inWidth + " + xC) * " + convInfo.inChannels + " + ch") :
                "wD * " + effectiveFilterHeight + " * " + effectiveFilterWidth + " +\n                      wR * " + effectiveFilterWidth + " + wC") + ";\n                }\n              }\n            }\n          }\n          setOutput(float(minMaxPosition));\n        }\n      ";
            return;
        }
        var compareOp = 'max';
        var returnValue = poolType + "(" + poolType + "(" + poolType + "(" +
            'minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])';
        if (poolType === 'avg') {
            returnValue = "avgValue / count";
        }
        var filterWidthNearestVec4 = Math.floor(filterWidth / 4) * 4;
        var filterWidthVec4Remainder = filterWidth % 4;
        var updateSnippet = "\n      if (" + isAvgPool + ") {\n        avgValue += dot(values, ones);\n      } else {\n        minMaxValue = " + compareOp + "(values, minMaxValue);\n      }\n    ";
        this.userCode = "\n      const ivec3 strides =\n        ivec3(" + strideDepth + ", " + strideHeight + ", " + strideWidth + ");\n      const ivec3 pads = ivec3(" + padFront + ", " + padTop + ", " + padLeft + ");\n      const float initializationValue = " + initializationValue + ";\n      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);\n\n      float count = 0.0;\n\n      float getValue(int batch, int xD, int xR, int xC, int ch) {\n        if (xC < 0 || xC >= " + convInfo.inWidth + ") {\n          return initializationValue;\n        }\n        count += 1.0;\n        return getX(batch, xD, xR, xC, ch);\n      }\n\n      void main() {\n        ivec5 coords = getOutputCoords();\n        int batch = coords.x;\n        int ch = coords.u;\n\n        ivec3 xCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;\n        int xDCorner = xCorner.x;\n        int xRCorner = xCorner.y;\n        int xCCorner = xCorner.z;\n\n        // max/min x(?, ?, ?, d) to get y(yD, yR, yC, ch).\n        // ? = to be determined\n        vec4 minMaxValue = vec4(" + initializationValue + ");\n        float avgValue = 0.0;\n        count = 0.0;\n\n        for (int wD = 0; wD < " + effectiveFilterDepth + ";\n            wD += " + dilationDepth + ") {\n          int xD = xDCorner + wD;\n\n          if (xD < 0 || xD >= " + convInfo.inDepth + ") {\n            continue;\n          }\n\n          for (int wR = 0; wR < " + effectiveFilterHeight + ";\n            wR += " + dilationHeight + ") {\n            int xR = xRCorner + wR;\n\n            if (xR < 0 || xR >= " + convInfo.inHeight + ") {\n              continue;\n            }\n\n            for (int wC = 0; wC < " + filterWidthNearestVec4 + "; wC += 4) {\n              int xC = xCCorner + wC * " + dilationWidth + ";\n\n              vec4 values = vec4(\n                getValue(batch, xD, xR, xC, ch),\n                getValue(batch, xD, xR, xC + " + dilationWidth + ", ch),\n                getValue(batch, xD, xR, xC + 2 * " + dilationWidth + ", ch),\n                getValue(batch, xD, xR, xC + 3 * " + dilationWidth + ", ch)\n              );\n\n              " + updateSnippet + "\n            }\n\n            int xC = xCCorner + " + filterWidthNearestVec4 + ";\n            if (" + (filterWidthVec4Remainder === 1) + ") {\n              vec4 values = vec4(\n                getValue(batch, xD, xR, xC, ch),\n                initializationValue,\n                initializationValue,\n                initializationValue\n              );\n\n              " + updateSnippet + "\n            } else if (" + (filterWidthVec4Remainder === 2) + ") {\n              vec4 values = vec4(\n                getValue(batch, xD, xR, xC, ch),\n                getValue(batch, xD, xR, xC + " + dilationWidth + ", ch),\n                initializationValue,\n                initializationValue\n              );\n\n              " + updateSnippet + "\n            } else if (" + (filterWidthVec4Remainder === 3) + ") {\n              vec4 values = vec4(\n                getValue(batch, xD, xR, xC, ch),\n                getValue(batch, xD, xR, xC + " + dilationWidth + ", ch),\n                getValue(batch, xD, xR, xC + 2 * " + dilationWidth + ", ch),\n                initializationValue\n              );\n\n              " + updateSnippet + "\n            }\n          }\n          setOutput(" + returnValue + ");\n        }\n      }\n    ";
    }
    return Pool3DProgram;
}());
exports.Pool3DProgram = Pool3DProgram;
//# sourceMappingURL=pool_gpu.js.map