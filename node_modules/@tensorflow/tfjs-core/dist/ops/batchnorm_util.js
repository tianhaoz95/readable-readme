"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var globals_1 = require("../globals");
function warnDeprecation() {
    globals_1.deprecationWarn('tf.batchNormalization() is going away. ' +
        'Use tf.batchNorm() instead, and note the positional argument change ' +
        'of scale, offset, and varianceEpsilon');
}
exports.warnDeprecation = warnDeprecation;
function xAs4D(x) {
    var x4D;
    if (x.rank === 0 || x.rank === 1) {
        x4D = x.as4D(1, 1, 1, x.size);
    }
    else if (x.rank === 2) {
        x4D = x.as4D(1, 1, x.shape[0], x.shape[1]);
    }
    else if (x.rank === 3) {
        x4D = x.as4D(1, x.shape[0], x.shape[1], x.shape[2]);
    }
    else {
        x4D = x;
    }
    return x4D;
}
exports.xAs4D = xAs4D;
//# sourceMappingURL=batchnorm_util.js.map