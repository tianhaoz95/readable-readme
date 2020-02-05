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
/**
 * Implementation of the NonMaxSuppression kernel shared between webgl and cpu.
 */
var tensor_ops_1 = require("../ops/tensor_ops");
var array_util_1 = require("./array_util");
function nonMaxSuppressionV3(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold) {
    var dummySoftNmsSigma = 0.0;
    return nonMaxSuppressionImpl_(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, dummySoftNmsSigma)
        .selectedIndices;
}
exports.nonMaxSuppressionV3 = nonMaxSuppressionV3;
function nonMaxSuppressionV5(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, softNmsSigma) {
    // For NonMaxSuppressionV5Op, we always return a second output holding
    // corresponding scores.
    var returnScoresTensor = true;
    var result = nonMaxSuppressionImpl_(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, softNmsSigma, returnScoresTensor);
    result.numValidOutputs.dispose();
    return {
        selectedIndices: result.selectedIndices,
        selectedScores: result.selectedScores
    };
}
exports.nonMaxSuppressionV5 = nonMaxSuppressionV5;
function nonMaxSuppressionImpl_(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, softNmsSigma, returnScoresTensor, padToMaxOutputSize) {
    if (returnScoresTensor === void 0) { returnScoresTensor = false; }
    if (padToMaxOutputSize === void 0) { padToMaxOutputSize = false; }
    // The list is sorted in ascending order, so that we can always pop the
    // candidate with the largest score in O(1) time.
    var candidates = Array.from(scores)
        .map(function (score, boxIndex) { return ({ score: score, boxIndex: boxIndex, suppressBeginIndex: 0 }); })
        .filter(function (c) { return c.score > scoreThreshold; })
        .sort(ascendingComparator);
    // If softNmsSigma is 0, the outcome of this algorithm is exactly same as
    // before.
    var scale = softNmsSigma > 0 ? (-0.5 / softNmsSigma) : 0.0;
    var selectedIndices = [];
    var selectedScores = [];
    while (selectedIndices.length < maxOutputSize && candidates.length > 0) {
        var candidate = candidates.pop();
        var originalScore = candidate.score, boxIndex = candidate.boxIndex, suppressBeginIndex = candidate.suppressBeginIndex;
        if (originalScore < scoreThreshold) {
            break;
        }
        // Overlapping boxes are likely to have similar scores, therefore we
        // iterate through the previously selected boxes backwards in order to
        // see if candidate's score should be suppressed. We use
        // suppressBeginIndex to track and ensure a candidate can be suppressed
        // by a selected box no more than once. Also, if the overlap exceeds
        // iouThreshold, we simply ignore the candidate.
        var ignoreCandidate = false;
        for (var j = selectedIndices.length - 1; j >= suppressBeginIndex; --j) {
            var iou = intersectionOverUnion(boxes, boxIndex, selectedIndices[j]);
            if (iou >= iouThreshold) {
                ignoreCandidate = true;
                break;
            }
            candidate.score =
                candidate.score * suppressWeight(iouThreshold, scale, iou);
            if (candidate.score <= scoreThreshold) {
                break;
            }
        }
        // At this point, if `candidate.score` has not dropped below
        // `scoreThreshold`, then we know that we went through all of the
        // previous selections and can safely update `suppressBeginIndex` to the
        // end of the selected array. Then we can re-insert the candidate with
        // the updated score and suppressBeginIndex back in the candidate list.
        // If on the other hand, `candidate.score` has dropped below the score
        // threshold, we will not add it back to the candidates list.
        candidate.suppressBeginIndex = selectedIndices.length;
        if (!ignoreCandidate) {
            // Candidate has passed all the tests, and is not suppressed, so
            // select the candidate.
            if (candidate.score === originalScore) {
                selectedIndices.push(boxIndex);
                selectedScores.push(candidate.score);
            }
            else if (candidate.score > scoreThreshold) {
                // Candidate's score is suppressed but is still high enough to be
                // considered, so add back to the candidates list.
                array_util_1.binaryInsert(candidates, candidate, ascendingComparator);
            }
        }
    }
    // NonMaxSuppressionV4 feature: padding output to maxOutputSize.
    var numValidOutputs = selectedIndices.length;
    if (padToMaxOutputSize) {
        selectedIndices.fill(0, numValidOutputs);
        selectedScores.fill(0.0, numValidOutputs);
    }
    return {
        selectedIndices: tensor_ops_1.tensor1d(selectedIndices, 'int32'),
        selectedScores: tensor_ops_1.tensor1d(selectedScores, 'float32'),
        numValidOutputs: tensor_ops_1.scalar(numValidOutputs, 'int32')
    };
}
function intersectionOverUnion(boxes, i, j) {
    var iCoord = boxes.subarray(i * 4, i * 4 + 4);
    var jCoord = boxes.subarray(j * 4, j * 4 + 4);
    var yminI = Math.min(iCoord[0], iCoord[2]);
    var xminI = Math.min(iCoord[1], iCoord[3]);
    var ymaxI = Math.max(iCoord[0], iCoord[2]);
    var xmaxI = Math.max(iCoord[1], iCoord[3]);
    var yminJ = Math.min(jCoord[0], jCoord[2]);
    var xminJ = Math.min(jCoord[1], jCoord[3]);
    var ymaxJ = Math.max(jCoord[0], jCoord[2]);
    var xmaxJ = Math.max(jCoord[1], jCoord[3]);
    var areaI = (ymaxI - yminI) * (xmaxI - xminI);
    var areaJ = (ymaxJ - yminJ) * (xmaxJ - xminJ);
    if (areaI <= 0 || areaJ <= 0) {
        return 0.0;
    }
    var intersectionYmin = Math.max(yminI, yminJ);
    var intersectionXmin = Math.max(xminI, xminJ);
    var intersectionYmax = Math.min(ymaxI, ymaxJ);
    var intersectionXmax = Math.min(xmaxI, xmaxJ);
    var intersectionArea = Math.max(intersectionYmax - intersectionYmin, 0.0) *
        Math.max(intersectionXmax - intersectionXmin, 0.0);
    return intersectionArea / (areaI + areaJ - intersectionArea);
}
// A Gaussian penalty function, this method always returns values in [0, 1].
// The weight is a function of similarity, the more overlap two boxes are, the
// smaller the weight is, meaning highly overlapping boxe will be significantly
// penalized. On the other hand, a non-overlapping box will not be penalized.
function suppressWeight(iouThreshold, scale, iou) {
    var weight = Math.exp(scale * iou * iou);
    return iou <= iouThreshold ? weight : 0.0;
}
function ascendingComparator(c1, c2) {
    // For objects with same scores, we make the object with the larger index go
    // first. In an array that pops from the end, this means that the object with
    // the smaller index will be popped first. This ensures the same output as
    // the TensorFlow python version.
    return (c1.score - c2.score) ||
        ((c1.score === c2.score) && (c2.boxIndex - c1.boxIndex));
}
//# sourceMappingURL=non_max_suppression_impl.js.map