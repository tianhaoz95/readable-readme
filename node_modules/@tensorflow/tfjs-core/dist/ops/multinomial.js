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
var tensor_util_env_1 = require("../tensor_util_env");
var operation_1 = require("./operation");
/**
 * Creates a `tf.Tensor` with values drawn from a multinomial distribution.
 *
 * ```js
 * const probs = tf.tensor([.75, .25]);
 * tf.multinomial(probs, 3).print();
 * ```
 *
 * @param logits 1D array with unnormalized log-probabilities, or
 *     2D array of shape `[batchSize, numOutcomes]`. See the `normalized`
 *     parameter.
 * @param numSamples Number of samples to draw for each row slice.
 * @param seed The seed number.
 * @param normalized Whether the provided `logits` are normalized true
 *     probabilities (sum to 1). Defaults to false.
 * @return 1D array of shape `[numSamples]`, or 2D array of shape
 *     `[batchSize, numSamples]`, depending on the rank of the input.
 */
/** @doc {heading: 'Tensors', subheading: 'Random'} */
function multinomial_(logits, numSamples, seed, normalized) {
    if (normalized === void 0) { normalized = false; }
    var $logits = tensor_util_env_1.convertToTensor(logits, 'logits', 'multinomial');
    var numOutcomes = $logits.size;
    var origRank = $logits.rank;
    if (numOutcomes < 2) {
        throw new Error("Error in multinomial: you need at least 2 outcomes, but got " +
            (numOutcomes + "."));
    }
    if (origRank > 2) {
        throw new Error("Rank of probabilities must be 1 or 2, but is " + origRank);
    }
    seed = seed || Math.random();
    var logits2D = origRank === 1 ? $logits.as2D(1, -1) : $logits;
    var res = engine_1.ENGINE.runKernelFunc(function (backend) { return backend.multinomial(logits2D, normalized, numSamples, seed); }, { logits2D: logits2D });
    return origRank === 1 ? res.as1D() : res;
}
exports.multinomial = operation_1.op({ multinomial_: multinomial_ });
//# sourceMappingURL=multinomial.js.map