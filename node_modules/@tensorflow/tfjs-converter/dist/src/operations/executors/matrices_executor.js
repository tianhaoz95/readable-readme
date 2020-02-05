"use strict";
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
var tfc = require("@tensorflow/tfjs-core");
var utils_1 = require("./utils");
exports.executeOp = function (node, tensorMap, context) {
    switch (node.op) {
        case 'BatchMatMul':
        case 'BatchMatMulV2':
        case 'MatMul':
            return [tfc.matMul(utils_1.getParamValue('a', node, tensorMap, context), utils_1.getParamValue('b', node, tensorMap, context), utils_1.getParamValue('transposeA', node, tensorMap, context), utils_1.getParamValue('transposeB', node, tensorMap, context))];
        case 'Transpose':
            return [tfc.transpose(utils_1.getParamValue('x', node, tensorMap, context), utils_1.getParamValue('perm', node, tensorMap, context))];
        case '_FusedMatMul':
            var _a = utils_1.getParamValue('fusedOps', node, tensorMap, context), extraOp = _a[0], activationFunc = _a[1];
            var isBiasAdd = extraOp === 'biasadd';
            var isPrelu = activationFunc === 'prelu';
            var numArgs = utils_1.getParamValue('numArgs', node, tensorMap, context);
            if (isBiasAdd) {
                if (isPrelu && numArgs !== 2) {
                    throw new Error('Fused MatMul with BiasAdd and Prelu must have two ' +
                        'extra arguments: bias and alpha.');
                }
                if (!isPrelu && numArgs !== 1) {
                    throw new Error('Fused MatMul with BiasAdd must have one extra argument: bias.');
                }
            }
            var _b = utils_1.getParamValue('args', node, tensorMap, context), biasArg = _b[0], preluArg = _b[1];
            return [tfc.fused.matMul({
                    a: utils_1.getParamValue('a', node, tensorMap, context),
                    b: utils_1.getParamValue('b', node, tensorMap, context),
                    transposeA: utils_1.getParamValue('transposeA', node, tensorMap, context),
                    transposeB: utils_1.getParamValue('transposeB', node, tensorMap, context),
                    bias: biasArg,
                    activation: activationFunc,
                    preluActivationWeights: preluArg
                })];
        default:
            throw TypeError("Node type " + node.op + " is not implemented");
    }
};
exports.CATEGORY = 'matrices';
//# sourceMappingURL=matrices_executor.js.map