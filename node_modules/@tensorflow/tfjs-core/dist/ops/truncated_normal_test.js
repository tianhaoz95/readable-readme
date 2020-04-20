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
var tf = require("../index");
var jasmine_util_1 = require("../jasmine_util");
var rand_util_1 = require("./rand_util");
jasmine_util_1.describeWithFlags('truncatedNormal', jasmine_util_1.ALL_ENVS, function () {
    // Expect slightly higher variances for truncated values.
    var EPSILON = 0.60;
    var SEED = 2002;
    function assertTruncatedValues(values, mean, stdv) {
        var bounds = mean + stdv * 2;
        for (var i = 0; i < values.length; i++) {
            expect(Math.abs(values[i])).toBeLessThanOrEqual(bounds);
        }
    }
    it('should return a random 1D float32 array', function () { return __awaiter(_this, void 0, void 0, function () {
        var shape, result, _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    shape = [1000];
                    result = tf.truncatedNormal(shape, 0, 3.5, null, SEED);
                    expect(result.dtype).toBe('float32');
                    _a = assertTruncatedValues;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_e.sent(), 0, 3.5]);
                    _b = rand_util_1.expectArrayInMeanStdRange;
                    return [4 /*yield*/, result.data()];
                case 2:
                    _b.apply(void 0, [_e.sent(), 0, 3.5, EPSILON]);
                    result = tf.truncatedNormal(shape, 0, 4.5, 'float32', SEED);
                    expect(result.dtype).toBe('float32');
                    _c = assertTruncatedValues;
                    return [4 /*yield*/, result.data()];
                case 3:
                    _c.apply(void 0, [_e.sent(), 0, 4.5]);
                    _d = rand_util_1.expectArrayInMeanStdRange;
                    return [4 /*yield*/, result.data()];
                case 4:
                    _d.apply(void 0, [_e.sent(), 0, 4.5, EPSILON]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return a randon 1D int32 array', function () { return __awaiter(_this, void 0, void 0, function () {
        var shape, result, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    shape = [1000];
                    result = tf.truncatedNormal(shape, 0, 5, 'int32', SEED);
                    expect(result.dtype).toBe('int32');
                    _a = assertTruncatedValues;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), 0, 5]);
                    _b = rand_util_1.expectArrayInMeanStdRange;
                    return [4 /*yield*/, result.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), 0, 5, EPSILON]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return a 2D float32 array', function () { return __awaiter(_this, void 0, void 0, function () {
        var shape, result, _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    shape = [50, 50];
                    result = tf.truncatedNormal(shape, 0, 3.5, null, SEED);
                    expect(result.dtype).toBe('float32');
                    _a = assertTruncatedValues;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_e.sent(), 0, 3.5]);
                    _b = rand_util_1.expectArrayInMeanStdRange;
                    return [4 /*yield*/, result.data()];
                case 2:
                    _b.apply(void 0, [_e.sent(), 0, 3.5, EPSILON]);
                    result = tf.truncatedNormal(shape, 0, 4.5, 'float32', SEED);
                    expect(result.dtype).toBe('float32');
                    _c = assertTruncatedValues;
                    return [4 /*yield*/, result.data()];
                case 3:
                    _c.apply(void 0, [_e.sent(), 0, 4.5]);
                    _d = rand_util_1.expectArrayInMeanStdRange;
                    return [4 /*yield*/, result.data()];
                case 4:
                    _d.apply(void 0, [_e.sent(), 0, 4.5, EPSILON]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return a 2D int32 array', function () { return __awaiter(_this, void 0, void 0, function () {
        var shape, result, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    shape = [50, 50];
                    result = tf.truncatedNormal(shape, 0, 5, 'int32', SEED);
                    expect(result.dtype).toBe('int32');
                    _a = assertTruncatedValues;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), 0, 5]);
                    _b = rand_util_1.expectArrayInMeanStdRange;
                    return [4 /*yield*/, result.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), 0, 5, EPSILON]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return a 3D float32 array', function () { return __awaiter(_this, void 0, void 0, function () {
        var shape, result, _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    shape = [10, 10, 10];
                    result = tf.truncatedNormal(shape, 0, 3.5, null, SEED);
                    expect(result.dtype).toBe('float32');
                    _a = assertTruncatedValues;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_e.sent(), 0, 3.5]);
                    _b = rand_util_1.expectArrayInMeanStdRange;
                    return [4 /*yield*/, result.data()];
                case 2:
                    _b.apply(void 0, [_e.sent(), 0, 3.5, EPSILON]);
                    result = tf.truncatedNormal(shape, 0, 4.5, 'float32', SEED);
                    expect(result.dtype).toBe('float32');
                    _c = assertTruncatedValues;
                    return [4 /*yield*/, result.data()];
                case 3:
                    _c.apply(void 0, [_e.sent(), 0, 4.5]);
                    _d = rand_util_1.expectArrayInMeanStdRange;
                    return [4 /*yield*/, result.data()];
                case 4:
                    _d.apply(void 0, [_e.sent(), 0, 4.5, EPSILON]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return a 3D int32 array', function () { return __awaiter(_this, void 0, void 0, function () {
        var shape, result, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    shape = [10, 10, 10];
                    result = tf.truncatedNormal(shape, 0, 5, 'int32', SEED);
                    expect(result.dtype).toBe('int32');
                    _a = assertTruncatedValues;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), 0, 5]);
                    _b = rand_util_1.expectArrayInMeanStdRange;
                    return [4 /*yield*/, result.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), 0, 5, EPSILON]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return a 4D float32 array', function () { return __awaiter(_this, void 0, void 0, function () {
        var shape, result, _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    shape = [5, 5, 5, 5];
                    result = tf.truncatedNormal(shape, 0, 3.5, null, SEED);
                    expect(result.dtype).toBe('float32');
                    _a = assertTruncatedValues;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_e.sent(), 0, 3.5]);
                    _b = rand_util_1.expectArrayInMeanStdRange;
                    return [4 /*yield*/, result.data()];
                case 2:
                    _b.apply(void 0, [_e.sent(), 0, 3.5, EPSILON]);
                    result = tf.truncatedNormal(shape, 0, 4.5, 'float32', SEED);
                    expect(result.dtype).toBe('float32');
                    _c = assertTruncatedValues;
                    return [4 /*yield*/, result.data()];
                case 3:
                    _c.apply(void 0, [_e.sent(), 0, 4.5]);
                    _d = rand_util_1.expectArrayInMeanStdRange;
                    return [4 /*yield*/, result.data()];
                case 4:
                    _d.apply(void 0, [_e.sent(), 0, 4.5, EPSILON]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return a 4D int32 array', function () { return __awaiter(_this, void 0, void 0, function () {
        var shape, result, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    shape = [5, 5, 5, 5];
                    result = tf.truncatedNormal(shape, 0, 5, 'int32', SEED);
                    expect(result.dtype).toBe('int32');
                    _a = assertTruncatedValues;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), 0, 5]);
                    _b = rand_util_1.expectArrayInMeanStdRange;
                    return [4 /*yield*/, result.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), 0, 5, EPSILON]);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=truncated_normal_test.js.map