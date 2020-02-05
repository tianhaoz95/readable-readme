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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var tensor_util_env_1 = require("../tensor_util_env");
var util_1 = require("../util");
var tensor_ops_1 = require("./tensor_ops");
/**
 * Returns whether the targets are in the top K predictions.
 *
 * ```js
 * const predictions = tf.tensor2d([[20, 10, 40, 30], [30, 50, -20, 10]]);
 * const targets = tf.tensor1d([2, 0]);
 * const precision = await tf.inTopKAsync(predictions, targets);
 * precision.print();
 * ```
 * @param predictions 2-D or higher `tf.Tensor` with last dimension being
 *     at least `k`.
 * @param targets 1-D or higher `tf.Tensor`.
 * @param k Optional Number of top elements to look at for computing precision,
 *     default to 1.
 */
/** @doc {heading: 'Operations', subheading: 'Evaluation'} */
function inTopKAsync_(predictions, targets, k) {
    if (k === void 0) { k = 1; }
    return __awaiter(this, void 0, void 0, function () {
        var $predictions, $targets, lastDim, predictionsVals, targetsVals, _a, batch, size, precision, b, offset, vals, valAndInd, i, i;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    $predictions = tensor_util_env_1.convertToTensor(predictions, 'predictions', 'inTopK');
                    $targets = tensor_util_env_1.convertToTensor(targets, 'targets', 'inTopK');
                    util_1.assert($predictions.rank > 1, function () { return 'inTopK() expects the predictions to be of rank 2 or higher, ' +
                        ("but got " + $predictions.rank); });
                    util_1.assert($predictions.rank - 1 === $targets.rank, function () { return "predictions rank should be 1 larger than " +
                        "targets rank, but got predictions rank " +
                        ($predictions.rank + " and targets rank " + $targets.rank); });
                    util_1.assertShapesMatch($predictions.shape.slice(0, $predictions.shape.length - 1), $targets.shape, "predictions's shape should be align with the targets' shape, " +
                        'except the last dimension.');
                    lastDim = $predictions.shape[$predictions.shape.length - 1];
                    util_1.assert(k > 0 && k <= lastDim, function () { return "'k' passed to inTopK() must be > 0 && <= the predictions last " +
                        ("dimension (" + lastDim + "), but got " + k); });
                    return [4 /*yield*/, $predictions.data()];
                case 1:
                    predictionsVals = _b.sent();
                    return [4 /*yield*/, $targets.data()];
                case 2:
                    targetsVals = _b.sent();
                    _a = [predictionsVals.length / lastDim, lastDim], batch = _a[0], size = _a[1];
                    precision = util_1.getTypedArrayFromDType('bool', batch);
                    for (b = 0; b < batch; b++) {
                        offset = b * size;
                        vals = predictionsVals.subarray(offset, offset + size);
                        valAndInd = [];
                        for (i = 0; i < vals.length; i++) {
                            valAndInd.push({ value: vals[i], index: i });
                        }
                        valAndInd.sort(function (a, b) { return b.value - a.value; });
                        precision[b] = 0;
                        for (i = 0; i < k; i++) {
                            if (valAndInd[i].index === targetsVals[b]) {
                                precision[b] = 1;
                                break;
                            }
                        }
                    }
                    if (predictions !== $predictions) {
                        $predictions.dispose();
                    }
                    if (targets !== $targets) {
                        $targets.dispose();
                    }
                    // Output precision has the same shape as targets.
                    return [2 /*return*/, tensor_ops_1.tensor(precision, $targets.shape, 'bool')];
            }
        });
    });
}
exports.inTopKAsync = inTopKAsync_;
//# sourceMappingURL=in_top_k.js.map