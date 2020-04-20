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
var seedrandom = require("seedrandom");
var test_util_1 = require("../test_util");
// https://en.wikipedia.org/wiki/Marsaglia_polar_method
var MPRandGauss = /** @class */ (function () {
    function MPRandGauss(mean, stdDeviation, dtype, truncated, seed) {
        this.mean = mean;
        this.stdDev = stdDeviation;
        this.dtype = dtype;
        this.nextVal = NaN;
        this.truncated = truncated;
        if (this.truncated) {
            this.upper = this.mean + this.stdDev * 2;
            this.lower = this.mean - this.stdDev * 2;
        }
        var seedValue = seed ? seed : Math.random();
        this.random = seedrandom.alea(seedValue.toString());
    }
    /** Returns next sample from a Gaussian distribution. */
    MPRandGauss.prototype.nextValue = function () {
        if (!isNaN(this.nextVal)) {
            var value = this.nextVal;
            this.nextVal = NaN;
            return value;
        }
        var resultX, resultY;
        var isValid = false;
        while (!isValid) {
            var v1 = void 0, v2 = void 0, s = void 0;
            do {
                v1 = 2 * this.random() - 1;
                v2 = 2 * this.random() - 1;
                s = v1 * v1 + v2 * v2;
            } while (s >= 1 || s === 0);
            var mul = Math.sqrt(-2.0 * Math.log(s) / s);
            resultX = this.mean + this.stdDev * v1 * mul;
            resultY = this.mean + this.stdDev * v2 * mul;
            if (!this.truncated || this.isValidTruncated(resultX)) {
                isValid = true;
            }
        }
        if (!this.truncated || this.isValidTruncated(resultY)) {
            this.nextVal = this.convertValue(resultY);
        }
        return this.convertValue(resultX);
    };
    /** Handles proper rounding for non-floating-point numbers. */
    MPRandGauss.prototype.convertValue = function (value) {
        if (this.dtype == null || this.dtype === 'float32') {
            return value;
        }
        return Math.round(value);
    };
    /** Returns true if less than 2-standard-deviations from the mean. */
    MPRandGauss.prototype.isValidTruncated = function (value) {
        return value <= this.upper && value >= this.lower;
    };
    return MPRandGauss;
}());
exports.MPRandGauss = MPRandGauss;
// Marsaglia, George, and Wai Wan Tsang. 2000. "A Simple Method for Generating
// Gamma Variables."
var RandGamma = /** @class */ (function () {
    function RandGamma(alpha, beta, dtype, seed) {
        this.alpha = alpha;
        this.beta = 1 / beta; // convert rate to scale parameter
        this.dtype = dtype;
        var seedValue = seed ? seed : Math.random();
        this.randu = seedrandom.alea(seedValue.toString());
        this.randn = new MPRandGauss(0, 1, dtype, false, this.randu());
        if (alpha < 1) {
            this.d = alpha + (2 / 3);
        }
        else {
            this.d = alpha - (1 / 3);
        }
        this.c = 1 / Math.sqrt(9 * this.d);
    }
    /** Returns next sample from a gamma distribution. */
    RandGamma.prototype.nextValue = function () {
        var x2, v0, v1, x, u, v;
        while (true) {
            do {
                x = this.randn.nextValue();
                v = 1 + (this.c * x);
            } while (v <= 0);
            v *= v * v;
            x2 = x * x;
            v0 = 1 - (0.331 * x2 * x2);
            v1 = (0.5 * x2) + (this.d * (1 - v + Math.log(v)));
            u = this.randu();
            if (u < v0 || Math.log(u) < v1) {
                break;
            }
        }
        v = (1 / this.beta) * this.d * v;
        if (this.alpha < 1) {
            v *= Math.pow(this.randu(), 1 / this.alpha);
        }
        return this.convertValue(v);
    };
    /** Handles proper rounding for non-floating-point numbers. */
    RandGamma.prototype.convertValue = function (value) {
        if (this.dtype === 'float32') {
            return value;
        }
        return Math.round(value);
    };
    return RandGamma;
}());
exports.RandGamma = RandGamma;
var UniformRandom = /** @class */ (function () {
    function UniformRandom(min, max, dtype, seed) {
        var _this = this;
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 1; }
        /** Handles proper rounding for non floating point numbers. */
        this.canReturnFloat = function () {
            return (_this.dtype == null || _this.dtype === 'float32');
        };
        this.min = min;
        this.range = max - min;
        this.dtype = dtype;
        if (seed == null) {
            seed = Math.random();
        }
        if (typeof seed === 'number') {
            seed = seed.toString();
        }
        if (!this.canReturnFloat() && this.range <= 1) {
            throw new Error("The difference between " + min + " - " + max + " <= 1 and dtype is not float");
        }
        this.random = seedrandom.alea(seed);
    }
    UniformRandom.prototype.convertValue = function (value) {
        if (this.canReturnFloat()) {
            return value;
        }
        return Math.round(value);
    };
    UniformRandom.prototype.nextValue = function () {
        return this.convertValue(this.min + this.range * this.random());
    };
    return UniformRandom;
}());
exports.UniformRandom = UniformRandom;
function jarqueBeraNormalityTest(values) {
    // https://en.wikipedia.org/wiki/Jarque%E2%80%93Bera_test
    var n = values.length;
    var s = skewness(values);
    var k = kurtosis(values);
    var jb = n / 6 * (Math.pow(s, 2) + 0.25 * Math.pow(k - 3, 2));
    // JB test requires 2-degress of freedom from Chi-Square @ 0.95:
    // http://www.itl.nist.gov/div898/handbook/eda/section3/eda3674.htm
    var CHI_SQUARE_2DEG = 5.991;
    if (jb > CHI_SQUARE_2DEG) {
        throw new Error("Invalid p-value for JB: " + jb);
    }
}
exports.jarqueBeraNormalityTest = jarqueBeraNormalityTest;
function expectArrayInMeanStdRange(actual, expectedMean, expectedStdDev, epsilon) {
    if (epsilon == null) {
        epsilon = test_util_1.testEpsilon();
    }
    var actualMean = mean(actual);
    test_util_1.expectNumbersClose(actualMean, expectedMean, epsilon);
    test_util_1.expectNumbersClose(standardDeviation(actual, actualMean), expectedStdDev, epsilon);
}
exports.expectArrayInMeanStdRange = expectArrayInMeanStdRange;
function mean(values) {
    var sum = 0;
    for (var i = 0; i < values.length; i++) {
        sum += values[i];
    }
    return sum / values.length;
}
function standardDeviation(values, mean) {
    var squareDiffSum = 0;
    for (var i = 0; i < values.length; i++) {
        var diff = values[i] - mean;
        squareDiffSum += diff * diff;
    }
    return Math.sqrt(squareDiffSum / values.length);
}
function kurtosis(values) {
    // https://en.wikipedia.org/wiki/Kurtosis
    var valuesMean = mean(values);
    var n = values.length;
    var sum2 = 0;
    var sum4 = 0;
    for (var i = 0; i < n; i++) {
        var v = values[i] - valuesMean;
        sum2 += Math.pow(v, 2);
        sum4 += Math.pow(v, 4);
    }
    return (1 / n) * sum4 / Math.pow((1 / n) * sum2, 2);
}
function skewness(values) {
    // https://en.wikipedia.org/wiki/Skewness
    var valuesMean = mean(values);
    var n = values.length;
    var sum2 = 0;
    var sum3 = 0;
    for (var i = 0; i < n; i++) {
        var v = values[i] - valuesMean;
        sum2 += Math.pow(v, 2);
        sum3 += Math.pow(v, 3);
    }
    return (1 / n) * sum3 / Math.pow((1 / (n - 1)) * sum2, 3 / 2);
}
//# sourceMappingURL=rand_util.js.map