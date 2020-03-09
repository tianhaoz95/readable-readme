"use strict";
/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
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
var util = require("./util");
var Profiler = /** @class */ (function () {
    function Profiler(backendTimer, logger) {
        this.backendTimer = backendTimer;
        this.logger = logger;
        if (logger == null) {
            this.logger = new Logger();
        }
    }
    Profiler.prototype.profileKernel = function (kernelName, inputs, f) {
        var _this = this;
        var outputs;
        var holdResultWrapperFn = function () {
            outputs = f();
        };
        var timer = this.backendTimer.time(holdResultWrapperFn);
        outputs.forEach(function (r) {
            // Dangling promise here because we don't want to propagate up
            // asynchronicity.
            r.data().then(function (vals) {
                checkComputationForErrors(vals, r.dtype, kernelName);
                timer.then(function (timing) {
                    var extraInfo = '';
                    if (timing.getExtraProfileInfo != null) {
                        extraInfo = timing.getExtraProfileInfo();
                    }
                    _this.logger.logKernelProfile(kernelName, r, vals, timing.kernelMs, inputs, extraInfo);
                });
            });
        });
        return outputs;
    };
    return Profiler;
}());
exports.Profiler = Profiler;
function checkComputationForErrors(vals, dtype, kernelName) {
    if (dtype !== 'float32') {
        // Only floating point computations will generate NaN values
        return false;
    }
    for (var i = 0; i < vals.length; i++) {
        var num = vals[i];
        if (isNaN(num) || !isFinite(num)) {
            // Throwing custom exception so behavior is testable.
            console.warn("Found " + num + " in the result of '" + kernelName + "'");
            return true;
        }
    }
    return false;
}
exports.checkComputationForErrors = checkComputationForErrors;
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.prototype.logKernelProfile = function (name, result, vals, timeMs, inputs, extraInfo) {
        var time = typeof timeMs === 'number' ? util.rightPad(timeMs + "ms", 9) :
            timeMs['error'];
        var paddedName = util.rightPad(name, 25);
        var rank = result.rank;
        var size = result.size;
        var shape = util.rightPad(result.shape.toString(), 14);
        var inputShapesDescription = '';
        for (var name_1 in inputs) {
            var input = inputs[name_1];
            // The input might be a non-tensor (e.g HTMLImageElement), in which case
            // we claim the output shape as input shape.
            var inputShape = input.shape || result.shape;
            var inputRank = inputShape.length;
            inputShapesDescription +=
                name_1 + ": " + inputRank + "D " + (inputRank > 0 ? inputShape : '') + " ";
        }
        console.log("%c" + paddedName + "\t%c" + time + "\t%c" + rank + "D " + shape + "\t%c" + size + "\t%c" + inputShapesDescription + "\t%c" + extraInfo, 'font-weight:bold', 'color:red', 'color:blue', 'color: orange', 'color: green', 'color: steelblue');
    };
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=profiler.js.map