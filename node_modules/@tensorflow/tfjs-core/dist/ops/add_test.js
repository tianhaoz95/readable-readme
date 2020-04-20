"use strict";
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
var tf = require("../index");
var jasmine_util_1 = require("../jasmine_util");
var test_util_1 = require("../test_util");
jasmine_util_1.describeWithFlags('add', jasmine_util_1.ALL_ENVS, function () {
    it('c + A', function () { return __awaiter(_this, void 0, void 0, function () {
        var c, a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    c = tf.scalar(5);
                    a = tf.tensor1d([1, 2, 3]);
                    result = tf.add(c, a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [6, 7, 8]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('c + A propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var c, a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    c = tf.scalar(NaN);
                    a = tf.tensor1d([1, 2, 3]);
                    res = tf.add(c, a);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [NaN, NaN, NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('A + B broadcasting same rank Tensors different shape', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, -3, -4], [2, 2]);
                    b = tf.tensor2d([2, 3], [2, 1]);
                    result = tf.add(a, b);
                    expect(result.shape).toEqual([2, 2]);
                    expected = [3, 4, 0, -1];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('A + B broadcast 2D + 1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, -3, -4], [2, 2]);
                    b = tf.tensor1d([1, 2]);
                    result = tf.add(a, b);
                    expect(result.shape).toEqual([2, 2]);
                    expected = [2, 4, -2, -2];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('A + B', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([2, 5, 1]);
                    b = tf.tensor1d([4, 2, -1]);
                    result = tf.add(a, b);
                    expected = [6, 7, 0];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [2, 5, 1];
                    b = [4, 2, -1];
                    result = tf.add(a, b);
                    expected = [6, 7, 0];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike chained', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([2, 5, 1]);
                    b = [4, 2, -1];
                    result = a.add(b);
                    expected = [6, 7, 0];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('A + B propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([2, 5, NaN]);
                    b = tf.tensor1d([4, 2, -1]);
                    res = tf.add(a, b);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [6, 7, NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('A + B throws when passed tensors with different shape', function () {
        var a = tf.tensor1d([2, 5, 1, 5]);
        var b = tf.tensor1d([4, 2, -1]);
        expect(function () { return tf.add(a, b); }).toThrowError();
        expect(function () { return tf.add(b, a); }).toThrowError();
    });
    it('2D+scalar broadcast', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    b = tf.scalar(2);
                    res = tf.add(a, b);
                    expect(res.shape).toEqual([2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, 4, 5, 6, 7, 8]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('scalar+1D broadcast', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(2);
                    b = tf.tensor1d([1, 2, 3, 4, 5, 6]);
                    res = tf.add(a, b);
                    expect(res.shape).toEqual([6]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, 4, 5, 6, 7, 8]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D+2D broadcast each with 1 dim', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 5], [1, 3]);
                    b = tf.tensor2d([7, 3], [2, 1]);
                    res = tf.add(a, b);
                    expect(res.shape).toEqual([2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [8, 9, 12, 4, 5, 8]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D+2D broadcast inner dim of b', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 5, 4, 5, 6], [2, 3]);
                    b = tf.tensor2d([7, 3], [2, 1]);
                    res = tf.add(a, b);
                    expect(res.shape).toEqual([2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [8, 9, 12, 7, 8, 9]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('3D+scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([1, 2, 3, 4, 5, 6], [2, 3, 1]);
                    b = tf.scalar(-1);
                    res = tf.add(a, b);
                    expect(res.shape).toEqual([2, 3, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, 2, 3, 4, 5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('6D+scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, expectedResult, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.range(0, 64).reshape([2, 2, 2, 2, 2, 2]);
                    b = tf.scalar(-1);
                    res = tf.add(a, b);
                    expect(res.shape).toEqual([2, 2, 2, 2, 2, 2]);
                    expectedResult = [
                        -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
                        15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                        31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46,
                        47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62
                    ];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expectedResult]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('6D+2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, expectedResult, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.range(0, 64).reshape([2, 2, 2, 2, 2, 2]);
                    b = tf.tensor2d([11, 13, 17, 19], [2, 2]);
                    res = tf.add(a, b);
                    expect(res.shape).toEqual([2, 2, 2, 2, 2, 2]);
                    expectedResult = [
                        11, 14, 19, 22, 15, 18, 23, 26, 19, 22, 27, 30, 23, 26, 31, 34,
                        27, 30, 35, 38, 31, 34, 39, 42, 35, 38, 43, 46, 39, 42, 47, 50,
                        43, 46, 51, 54, 47, 50, 55, 58, 51, 54, 59, 62, 55, 58, 63, 66,
                        59, 62, 67, 70, 63, 66, 71, 74, 67, 70, 75, 78, 71, 74, 79, 82
                    ];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expectedResult]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('add tensors with 0 in shape', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1]);
                    b = tf.tensor3d([], [0, 0, 5]);
                    res = tf.add(a, b);
                    expect(res.shape).toEqual([0, 0, 5]);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), []]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient: scalar + 1D broadcast', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.scalar(2);
                    b = tf.tensor1d([3, 4, 5]);
                    dy = tf.tensor1d([7, 8, 9]);
                    grads = tf.grads(function (a, b) { return tf.add(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [7 + 8 + 9]]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [7, 8, 9]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.scalar(2);
                    b = tf.tensor1d([3, 4, 5]);
                    dy = tf.tensor1d([7, 8, 9]);
                    grads = tf.grads(function (a, b) { return tf.add(a.clone(), b.clone()).clone(); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [7 + 8 + 9]]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [7, 8, 9]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient: 2D + 2D broadcast', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor2d([2, 3], [2, 1]);
                    b = tf.tensor2d([4, 5, 6, 7], [2, 2]);
                    dy = tf.tensor2d([5, 4, 3, 2], [2, 2]);
                    grads = tf.grads(function (a, b) { return tf.add(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [5 + 4, 3 + 2]]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [5, 4, 3, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('complex number addition', function () { return __awaiter(_this, void 0, void 0, function () {
        var real1, imag1, complex1, real2, imag2, complex2, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    real1 = tf.tensor1d([1]);
                    imag1 = tf.tensor1d([2]);
                    complex1 = tf.complex(real1, imag1);
                    real2 = tf.tensor1d([3]);
                    imag2 = tf.tensor1d([4]);
                    complex2 = tf.complex(real2, imag2);
                    result = complex1.add(complex2);
                    expect(result.dtype).toBe('complex64');
                    expect(result.shape).toEqual([1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 6]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('complex number reshape and then addition', function () { return __awaiter(_this, void 0, void 0, function () {
        var real1, imag1, complex1, real2, imag2, complex2, complex1Reshaped, complex2Reshaped, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    real1 = tf.tensor1d([1]);
                    imag1 = tf.tensor1d([2]);
                    complex1 = tf.complex(real1, imag1);
                    real2 = tf.tensor1d([3]);
                    imag2 = tf.tensor1d([4]);
                    complex2 = tf.complex(real2, imag2);
                    complex1Reshaped = complex1.reshape([1, 1, 1]);
                    complex2Reshaped = complex2.reshape([1, 1, 1]);
                    result = complex1Reshaped.add(complex2Reshaped);
                    expect(result.dtype).toBe('complex64');
                    expect(result.shape).toEqual([1, 1, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 6]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('complex number broadcasting addition', function () { return __awaiter(_this, void 0, void 0, function () {
        var real1, imag1, complex1, real2, imag2, complex2, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    real1 = tf.tensor2d([1, 2, -3, -4], [2, 2]);
                    imag1 = tf.tensor2d([10, 20, -30, -40], [2, 2]);
                    complex1 = tf.complex(real1, imag1);
                    real2 = tf.tensor1d([4]);
                    imag2 = tf.tensor1d([5]);
                    complex2 = tf.complex(real2, imag2);
                    result = tf.add(complex1, complex2);
                    expect(result.dtype).toEqual('complex64');
                    expect(result.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [1 + 4, 10 + 5, 2 + 4, 20 + 5, -3 + 4, -30 + 5, -4 + 4, -40 + 5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a as a non-tensor', function () {
        expect(function () { return tf.add({}, tf.scalar(1)); })
            .toThrowError(/Argument 'a' passed to 'add' must be a Tensor/);
    });
    it('throws when passed b as a non-tensor', function () {
        expect(function () { return tf.add(tf.scalar(1), {}); })
            .toThrowError(/Argument 'b' passed to 'add' must be a Tensor/);
    });
    it('upcasts when dtypes dont match', function () { return __awaiter(_this, void 0, void 0, function () {
        var res, _a, _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    res = tf.add(tf.scalar(1, 'int32'), tf.scalar(1, 'float32'));
                    expect(res.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_f.sent(), [2]]);
                    res = tf.add(tf.scalar(1, 'int32'), tf.scalar(true, 'bool'));
                    expect(res.dtype).toBe('int32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_f.sent(), [2]]);
                    res = tf.add(tf.scalar(1, 'int32'), tf.scalar(false, 'bool'));
                    expect(res.dtype).toBe('int32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 3:
                    _c.apply(void 0, [_f.sent(), [1]]);
                    res = tf.add(tf.complex(4, 7), tf.scalar(1, 'float32'));
                    expect(res.dtype).toBe('complex64');
                    _d = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 4:
                    _d.apply(void 0, [_f.sent(), [5, 7]]);
                    res = tf.add(tf.complex(4, 7), tf.scalar(1, 'int32'));
                    expect(res.dtype).toBe('complex64');
                    _e = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 5:
                    _e.apply(void 0, [_f.sent(), [5, 7]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    result = tf.add(5, [1, 2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [6, 7, 8]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=add_test.js.map