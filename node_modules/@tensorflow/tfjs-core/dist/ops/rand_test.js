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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var tf = require("../index");
var jasmine_util_1 = require("../jasmine_util");
var test_util_1 = require("../test_util");
var rand_util_1 = require("./rand_util");
var rand_util_2 = require("./rand_util");
jasmine_util_1.describeWithFlags('rand', jasmine_util_1.ALL_ENVS, function () {
    it('should return a random 1D float32 array', function () { return __awaiter(_this, void 0, void 0, function () {
        var shape, result, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    shape = [10];
                    result = tf.rand(shape, function () { return __1.util.randUniform(0, 2); });
                    expect(result.dtype).toBe('float32');
                    _a = test_util_1.expectValuesInRange;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), 0, 2]);
                    result = tf.rand(shape, function () { return __1.util.randUniform(0, 1.5); });
                    expect(result.dtype).toBe('float32');
                    _b = test_util_1.expectValuesInRange;
                    return [4 /*yield*/, result.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), 0, 1.5]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return a random 1D int32 array', function () { return __awaiter(_this, void 0, void 0, function () {
        var shape, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    shape = [10];
                    result = tf.rand(shape, function () { return __1.util.randUniform(0, 2); }, 'int32');
                    expect(result.dtype).toBe('int32');
                    _a = test_util_1.expectValuesInRange;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0, 2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return a random 1D bool array', function () { return __awaiter(_this, void 0, void 0, function () {
        var shape, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    shape = [10];
                    result = tf.rand(shape, function () { return __1.util.randUniform(0, 1); }, 'bool');
                    expect(result.dtype).toBe('bool');
                    _a = test_util_1.expectValuesInRange;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0, 1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return a random 2D float32 array', function () { return __awaiter(_this, void 0, void 0, function () {
        var shape, result, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    shape = [3, 4];
                    result = tf.rand(shape, function () { return __1.util.randUniform(0, 2.5); });
                    expect(result.dtype).toBe('float32');
                    _a = test_util_1.expectValuesInRange;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), 0, 2.5]);
                    result = tf.rand(shape, function () { return __1.util.randUniform(0, 1.5); }, 'float32');
                    expect(result.dtype).toBe('float32');
                    _b = test_util_1.expectValuesInRange;
                    return [4 /*yield*/, result.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), 0, 1.5]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return a random 2D int32 array', function () { return __awaiter(_this, void 0, void 0, function () {
        var shape, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    shape = [3, 4];
                    result = tf.rand(shape, function () { return __1.util.randUniform(0, 2); }, 'int32');
                    expect(result.dtype).toBe('int32');
                    _a = test_util_1.expectValuesInRange;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0, 2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return a random 2D bool array', function () { return __awaiter(_this, void 0, void 0, function () {
        var shape, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    shape = [3, 4];
                    result = tf.rand(shape, function () { return __1.util.randUniform(0, 1); }, 'bool');
                    expect(result.dtype).toBe('bool');
                    _a = test_util_1.expectValuesInRange;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0, 1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return a random 3D float32 array', function () { return __awaiter(_this, void 0, void 0, function () {
        var shape, result, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    shape = [3, 4, 5];
                    result = tf.rand(shape, function () { return __1.util.randUniform(0, 2.5); });
                    expect(result.dtype).toBe('float32');
                    _a = test_util_1.expectValuesInRange;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), 0, 2.5]);
                    result = tf.rand(shape, function () { return __1.util.randUniform(0, 1.5); }, 'float32');
                    expect(result.dtype).toBe('float32');
                    _b = test_util_1.expectValuesInRange;
                    return [4 /*yield*/, result.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), 0, 1.5]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return a random 3D int32 array', function () { return __awaiter(_this, void 0, void 0, function () {
        var shape, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    shape = [3, 4, 5];
                    result = tf.rand(shape, function () { return __1.util.randUniform(0, 2); }, 'int32');
                    expect(result.dtype).toBe('int32');
                    _a = test_util_1.expectValuesInRange;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0, 2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return a random 3D bool array', function () { return __awaiter(_this, void 0, void 0, function () {
        var shape, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    shape = [3, 4, 5];
                    result = tf.rand(shape, function () { return __1.util.randUniform(0, 1); }, 'bool');
                    expect(result.dtype).toBe('bool');
                    _a = test_util_1.expectValuesInRange;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0, 1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return a random 4D float32 array', function () { return __awaiter(_this, void 0, void 0, function () {
        var shape, result, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    shape = [3, 4, 5, 6];
                    result = tf.rand(shape, function () { return __1.util.randUniform(0, 2.5); });
                    expect(result.dtype).toBe('float32');
                    _a = test_util_1.expectValuesInRange;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), 0, 2.5]);
                    result = tf.rand(shape, function () { return __1.util.randUniform(0, 1.5); });
                    expect(result.dtype).toBe('float32');
                    _b = test_util_1.expectValuesInRange;
                    return [4 /*yield*/, result.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), 0, 1.5]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return a random 4D int32 array', function () { return __awaiter(_this, void 0, void 0, function () {
        var shape, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    shape = [3, 4, 5, 6];
                    result = tf.rand(shape, function () { return __1.util.randUniform(0, 2); }, 'int32');
                    expect(result.dtype).toBe('int32');
                    _a = test_util_1.expectValuesInRange;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0, 2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return a random 4D bool array', function () { return __awaiter(_this, void 0, void 0, function () {
        var shape, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    shape = [3, 4, 5, 6];
                    result = tf.rand(shape, function () { return __1.util.randUniform(0, 1); }, 'bool');
                    expect(result.dtype).toBe('bool');
                    _a = test_util_1.expectValuesInRange;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0, 1]);
                    return [2 /*return*/];
            }
        });
    }); });
});
function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
}
describe('MPRandGauss', function () {
    var EPSILON = 0.05;
    var SEED = 2002;
    it('should default to float32 numbers', function () {
        var rand = new rand_util_1.MPRandGauss(0, 1.5);
        expect(isFloat(rand.nextValue())).toBe(true);
    });
    it('should handle a mean/stdv of float32 numbers', function () {
        var rand = new rand_util_1.MPRandGauss(0, 1.5, 'float32', false /* truncated */, SEED);
        var values = [];
        var size = 10000;
        for (var i = 0; i < size; i++) {
            values.push(rand.nextValue());
        }
        rand_util_2.expectArrayInMeanStdRange(values, 0, 1.5, EPSILON);
        rand_util_2.jarqueBeraNormalityTest(values);
    });
    it('should handle int32 numbers', function () {
        var rand = new rand_util_1.MPRandGauss(0, 1, 'int32');
        expect(isFloat(rand.nextValue())).toBe(false);
    });
    it('should handle a mean/stdv of int32 numbers', function () {
        var rand = new rand_util_1.MPRandGauss(0, 2, 'int32', false /* truncated */, SEED);
        var values = [];
        var size = 10000;
        for (var i = 0; i < size; i++) {
            values.push(rand.nextValue());
        }
        rand_util_2.expectArrayInMeanStdRange(values, 0, 2, EPSILON);
        rand_util_2.jarqueBeraNormalityTest(values);
    });
    it('Should not have a more than 2x std-d from mean for truncated values', function () {
        var stdv = 1.5;
        var rand = new rand_util_1.MPRandGauss(0, stdv, 'float32', true /* truncated */);
        for (var i = 0; i < 1000; i++) {
            expect(Math.abs(rand.nextValue())).toBeLessThan(stdv * 2);
        }
    });
});
describe('RandGamma', function () {
    var SEED = 2002;
    it('should default to float32 numbers', function () {
        var rand = new rand_util_1.RandGamma(2, 2, 'float32');
        expect(isFloat(rand.nextValue())).toBe(true);
    });
    it('should handle an alpha/beta of float32 numbers', function () {
        var rand = new rand_util_1.RandGamma(2, 2, 'float32', SEED);
        var values = [];
        var size = 10000;
        for (var i = 0; i < size; i++) {
            values.push(rand.nextValue());
        }
        test_util_1.expectValuesInRange(values, 0, 30);
    });
    it('should handle int32 numbers', function () {
        var rand = new rand_util_1.RandGamma(2, 2, 'int32');
        expect(isFloat(rand.nextValue())).toBe(false);
    });
    it('should handle an alpha/beta of int32 numbers', function () {
        var rand = new rand_util_1.RandGamma(2, 2, 'int32', SEED);
        var values = [];
        var size = 10000;
        for (var i = 0; i < size; i++) {
            values.push(rand.nextValue());
        }
        test_util_1.expectValuesInRange(values, 0, 30);
    });
});
describe('UniformRandom', function () {
    it('float32, no seed', function () {
        var min = 0.2;
        var max = 0.24;
        var dtype = 'float32';
        var xs = [];
        for (var i = 0; i < 10; ++i) {
            var rand = new rand_util_1.UniformRandom(min, max, dtype);
            var x = rand.nextValue();
            xs.push(x);
        }
        expect(Math.min.apply(Math, xs)).toBeGreaterThanOrEqual(min);
        expect(Math.max.apply(Math, xs)).toBeLessThan(max);
    });
    it('int32, no seed', function () {
        var min = 13;
        var max = 37;
        var dtype = 'int32';
        var xs = [];
        for (var i = 0; i < 10; ++i) {
            var rand = new rand_util_1.UniformRandom(min, max, dtype);
            var x = rand.nextValue();
            expect(Number.isInteger(x)).toEqual(true);
            xs.push(x);
        }
        expect(Math.min.apply(Math, xs)).toBeGreaterThanOrEqual(min);
        expect(Math.max.apply(Math, xs)).toBeLessThanOrEqual(max);
    });
    it('seed is number', function () {
        var min = -1.2;
        var max = -0.4;
        var dtype = 'float32';
        var seed = 1337;
        var xs = [];
        for (var i = 0; i < 10; ++i) {
            var rand = new rand_util_1.UniformRandom(min, max, dtype, seed);
            var x = rand.nextValue();
            expect(x).toBeGreaterThanOrEqual(min);
            expect(x).toBeLessThan(max);
            xs.push(x);
        }
        // Assert deterministic results.
        expect(Math.min.apply(Math, xs)).toEqual(Math.max.apply(Math, xs));
    });
    it('seed === null', function () {
        var min = 0;
        var max = 1;
        var dtype = 'float32';
        var seed = null;
        var rand = new rand_util_1.UniformRandom(min, max, dtype, seed);
        var x = rand.nextValue();
        expect(x).toBeGreaterThanOrEqual(0);
        expect(x).toBeLessThan(1);
    });
    it('seed === undefined', function () {
        var min = 0;
        var max = 1;
        var dtype = 'float32';
        var seed = undefined;
        var rand = new rand_util_1.UniformRandom(min, max, dtype, seed);
        var x = rand.nextValue();
        expect(x).toBeGreaterThanOrEqual(0);
        expect(x).toBeLessThan(1);
    });
});
//# sourceMappingURL=rand_test.js.map