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
var test_util_1 = require("../test_util");
jasmine_util_1.describeWithFlags('tile', jasmine_util_1.ALL_ENVS, function () {
    it('1D (tile)', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, t2, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t = tf.tensor1d([1, 2, 3]);
                    t2 = tf.tile(t, [2]);
                    expect(t2.shape).toEqual([6]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, t2.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 3, 1, 2, 3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D (tile)', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, t2, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    t = tf.tensor2d([1, 11, 2, 22], [2, 2]);
                    t2 = tf.tile(t, [1, 2]);
                    expect(t2.shape).toEqual([2, 4]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, t2.data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [1, 11, 1, 11, 2, 22, 2, 22]]);
                    t2 = tf.tile(t, [2, 1]);
                    expect(t2.shape).toEqual([4, 2]);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, t2.data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [1, 11, 2, 22, 1, 11, 2, 22]]);
                    t2 = tf.tile(t, [2, 2]);
                    expect(t2.shape).toEqual([4, 4]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, t2.data()];
                case 3:
                    _c.apply(void 0, [_d.sent(),
                        [1, 11, 1, 11, 2, 22, 2, 22, 1, 11, 1, 11, 2, 22, 2, 22]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('3D (tile)', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, t2, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 8], [2, 2, 2]);
                    t2 = tf.tile(t, [1, 2, 1]);
                    expect(t2.shape).toEqual([2, 4, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, t2.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 3, 4, 1, 2, 3, 4, 5, 6, 7, 8, 5, 6, 7, 8]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('4D (tile)', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, t2, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t = tf.tensor4d([1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 2, 2]);
                    t2 = tf.tile(t, [1, 2, 1, 1]);
                    expect(t2.shape).toEqual([1, 4, 2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, t2.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('5D (tile)', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, t2, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t = tf.tensor5d([1, 2, 3, 4, 5, 6, 7, 8], [1, 1, 2, 2, 2]);
                    t2 = tf.tile(t, [1, 2, 1, 1, 1]);
                    expect(t2.shape).toEqual([1, 2, 2, 2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, t2.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1d string tensor', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor(['a', 'b', 'c']);
                    res = tf.tile(a, [2]);
                    expect(res.shape).toEqual([6]);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), ['a', 'b', 'c', 'a', 'b', 'c']]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2d string tensor', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor([['a', 'b'], ['c', 'd']]);
                    res = tf.tile(a, [2, 3]);
                    expect(res.shape).toEqual([4, 6]);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            'a', 'b', 'a', 'b', 'a', 'b', 'c', 'd', 'c', 'd', 'c', 'd',
                            'a', 'b', 'a', 'b', 'a', 'b', 'c', 'd', 'c', 'd', 'c', 'd'
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, t2, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t = tf.tensor1d([1, 2, NaN]);
                    t2 = tf.tile(t, [2]);
                    expect(t2.shape).toEqual([6]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, t2.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, NaN, 1, 2, NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1D bool (tile)', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, t2, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t = tf.tensor1d([true, false, true], 'bool');
                    t2 = tf.tile(t, [2]);
                    expect(t2.shape).toEqual([6]);
                    expect(t2.dtype).toBe('bool');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, t2.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 1, 1, 0, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D bool (tile)', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, t2, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    t = tf.tensor2d([true, false, true, true], [2, 2], 'bool');
                    t2 = tf.tile(t, [1, 2]);
                    expect(t2.shape).toEqual([2, 4]);
                    expect(t2.dtype).toBe('bool');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, t2.data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [1, 0, 1, 0, 1, 1, 1, 1]]);
                    t2 = tf.tile(t, [2, 1]);
                    expect(t2.shape).toEqual([4, 2]);
                    expect(t2.dtype).toBe('bool');
                    _b = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, t2.data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [1, 0, 1, 1, 1, 0, 1, 1]]);
                    t2 = tf.tile(t, [2, 2]);
                    expect(t2.shape).toEqual([4, 4]);
                    expect(t2.dtype).toBe('bool');
                    _c = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, t2.data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('3D bool (tile)', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, t2, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t = tf.tensor3d([true, false, true, false, true, false, true, false], [2, 2, 2], 'bool');
                    t2 = tf.tile(t, [1, 2, 1]);
                    expect(t2.shape).toEqual([2, 4, 2]);
                    expect(t2.dtype).toBe('bool');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, t2.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1D int32 (tile)', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, t2, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t = tf.tensor1d([1, 2, 5], 'int32');
                    t2 = tf.tile(t, [2]);
                    expect(t2.shape).toEqual([6]);
                    expect(t2.dtype).toBe('int32');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, t2.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 5, 1, 2, 5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D int32 (tile)', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, t2, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    t = tf.tensor2d([1, 2, 3, 4], [2, 2], 'int32');
                    t2 = tf.tile(t, [1, 2]);
                    expect(t2.shape).toEqual([2, 4]);
                    expect(t2.dtype).toBe('int32');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, t2.data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [1, 2, 1, 2, 3, 4, 3, 4]]);
                    t2 = tf.tile(t, [2, 1]);
                    expect(t2.shape).toEqual([4, 2]);
                    expect(t2.dtype).toBe('int32');
                    _b = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, t2.data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [1, 2, 3, 4, 1, 2, 3, 4]]);
                    t2 = tf.tile(t, [2, 2]);
                    expect(t2.shape).toEqual([4, 4]);
                    expect(t2.dtype).toBe('int32');
                    _c = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, t2.data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [1, 2, 1, 2, 3, 4, 3, 4, 1, 2, 1, 2, 3, 4, 3, 4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('3D int32 (tile)', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, t2, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 8], [2, 2, 2], 'int32');
                    t2 = tf.tile(t, [1, 2, 1]);
                    expect(t2.shape).toEqual([2, 4, 2]);
                    expect(t2.dtype).toBe('int32');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, t2.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 3, 4, 1, 2, 3, 4, 5, 6, 7, 8, 5, 6, 7, 8]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1D (tile) gradient', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor1d([1, 2, 3]);
                    dy = tf.tensor1d([0.1, 0.2, 0.3, 1, 2, 3, 10, 20, 30]);
                    gradients = tf.grad(function (x) { return tf.tile(x, [3]); })(x, dy);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [11.1, 22.2, 33.3]]);
                    expect(gradients.shape).toEqual([3]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor1d([1, 2, 3]);
                    dy = tf.tensor1d([0.1, 0.2, 0.3, 1, 2, 3, 10, 20, 30]);
                    gradients = tf.grad(function (x) { return tf.tile(x.clone(), [3]).clone(); })(x, dy);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [11.1, 22.2, 33.3]]);
                    expect(gradients.shape).toEqual([3]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D (tile) gradient', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor2d([[1, 2], [3, 4]], [2, 2]);
                    dy = tf.tensor2d([[1, 2, 10, 20], [3, 4, 30, 40]], [2, 4]);
                    gradients = tf.grad(function (x) { return tf.tile(x, [1, 2]); })(x, dy);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [11, 22, 33, 44]]);
                    expect(gradients.shape).toEqual([2, 2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('3D (tile) gradient', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor3d([[[1], [2]], [[3], [4]]], [2, 2, 1]);
                    dy = tf.tensor3d([[[1, 10], [2, 20]], [[3, 30], [4, 40]]], [2, 2, 2]);
                    gradients = tf.grad(function (x) { return tf.tile(x, [1, 1, 2]); })(x, dy);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [11, 22, 33, 44]]);
                    expect(gradients.shape).toEqual([2, 2, 1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('4D (tile) gradient', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor4d([[[[1]], [[2]]], [[[3]], [[4]]]], [2, 2, 1, 1]);
                    dy = tf.tensor4d([
                        [[[.01, .1], [1, 10]], [[.02, .2], [2, 20]]],
                        [[[.03, .3], [3, 30]], [[.04, .4], [4, 40]]]
                    ], [2, 2, 2, 2]);
                    gradients = tf.grad(function (x) { return tf.tile(x, [1, 1, 2, 2]); })(x, dy);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [11.11, 22.22, 33.33, 44.44]]);
                    expect(gradients.shape).toEqual([2, 2, 1, 1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.tile({}, [1]); })
            .toThrowError(/Argument 'x' passed to 'tile' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    res = tf.tile([1, 2, 3], [2]);
                    expect(res.shape).toEqual([6]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 3, 1, 2, 3]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=tile_test.js.map