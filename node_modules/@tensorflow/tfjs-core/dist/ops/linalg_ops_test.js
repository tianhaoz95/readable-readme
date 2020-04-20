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
var ops_1 = require("./ops");
jasmine_util_1.describeWithFlags('bandPart', jasmine_util_1.ALL_ENVS, function () {
    it('keeps tensor unchanged', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = ops_1.tensor2d([1, 1, 1, 1, 1, 1, 1, 1, 1], [3, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.linalg.bandPart(x, -1, -1).array()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [[1, 1, 1], [1, 1, 1], [1, 1, 1]]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('upper triangular matrix', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = ops_1.tensor2d([1, 1, 1, 1, 1, 1, 1, 1, 1], [3, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.linalg.bandPart(x, 0, -1).array()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [[1, 1, 1], [0, 1, 1], [0, 0, 1]]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('lower triangular matrix', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = ops_1.tensor2d([1, 1, 1, 1, 1, 1, 1, 1, 1], [3, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.linalg.bandPart(x, -1, 0).array()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [[1, 0, 0], [1, 1, 0], [1, 1, 1]]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('diagonal elements', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = ops_1.tensor2d([1, 1, 1, 1, 1, 1, 1, 1, 1], [3, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.linalg.bandPart(x, 0, 0).array()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [[1, 0, 0], [0, 1, 0], [0, 0, 1]]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('lower triangular elements', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = ops_1.tensor2d([1, 1, 1, 1, 1, 1, 1, 1, 1], [3, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.linalg.bandPart(x, 1, 0).array()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [[1, 0, 0], [1, 1, 0], [0, 1, 1]]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('upper triangular elements', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = ops_1.tensor2d([1, 1, 1, 1, 1, 1, 1, 1, 1], [3, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.linalg.bandPart(x, 0, 1).array()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [[1, 1, 0], [0, 1, 1], [0, 0, 1]]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('4X4 matrix - tensorflow python examples', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    x = ops_1.tensor2d([[0, 1, 2, 3], [-1, 0, 1, 2], [-2, -1, 0, 1], [-3, -2, -1, 0]]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.linalg.bandPart(x, 1, -1).array()];
                case 1:
                    _a.apply(void 0, [_c.sent(),
                        [[0, 1, 2, 3], [-1, 0, 1, 2], [0, -1, 0, 1], [0, 0, -1, 0]]]);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.linalg.bandPart(x, 2, 1).array()];
                case 2:
                    _b.apply(void 0, [_c.sent(),
                        [[0, 1, 0, 0], [-1, 0, 1, 0], [-2, -1, 0, 1], [0, -2, -1, 0]]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('3 dimensional matrix', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = ops_1.tensor3d([[[1, 1], [1, 1]], [[1, 1], [1, 1]]]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.linalg.bandPart(x, 0, 0).array()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [[[1, 0], [0, 1]], [[1, 0], [0, 1]]]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2X3X3 tensor', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = ops_1.tensor3d([[[1, 1, 1], [1, 1, 1], [1, 1, 1]], [[1, 1, 1], [1, 1, 1], [1, 1, 1]]]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.linalg.bandPart(x, 1, 2).array()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [[[1, 1, 1], [1, 1, 1], [0, 1, 1]], [[1, 1, 1], [1, 1, 1], [0, 1, 1]]]]);
                    return [2 /*return*/];
            }
        });
    }); });
    var la = tf.linalg;
    it('fails for scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var x;
        return __generator(this, function (_a) {
            x = ops_1.scalar(1);
            expect(function () { return la.bandPart(x, 1, 2); }).toThrowError(/bandPart.*rank/i);
            return [2 /*return*/];
        });
    }); });
    it('fails for 1D tensor', function () { return __awaiter(_this, void 0, void 0, function () {
        var x;
        return __generator(this, function (_a) {
            x = ops_1.tensor1d([1, 2, 3, 4, 5]);
            expect(function () { return la.bandPart(x, 1, 2); }).toThrowError(/bandPart.*rank/i);
            return [2 /*return*/];
        });
    }); });
    it('fails if numLower or numUpper too large', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _loop_1, _i, _a, numLower, _loop_2, _b, _c, numLower, _loop_3, _d, _e, numLower;
        return __generator(this, function (_f) {
            a = tf.tensor2d([[1, 2, 3], [4, 5, 6]]);
            _loop_1 = function (numLower) {
                var _loop_4 = function (numUpper) {
                    expect(function () { return tf.linalg.bandPart(a, numLower, numUpper); })
                        .toThrowError(/bandPart.*numLower/i);
                };
                for (var _i = 0, _a = [-1, 0, 1, 2]; _i < _a.length; _i++) {
                    var numUpper = _a[_i];
                    _loop_4(numUpper);
                }
            };
            for (_i = 0, _a = [3, 5, 8, 13]; _i < _a.length; _i++) {
                numLower = _a[_i];
                _loop_1(numLower);
            }
            _loop_2 = function (numLower) {
                var _loop_5 = function (numUpper) {
                    expect(function () { return tf.linalg.bandPart(a, numLower, numUpper); })
                        .toThrowError(/bandPart.*numUpper/i);
                };
                for (var _i = 0, _a = [4, 5, 9]; _i < _a.length; _i++) {
                    var numUpper = _a[_i];
                    _loop_5(numUpper);
                }
            };
            for (_b = 0, _c = [-1, 0, 1]; _b < _c.length; _b++) {
                numLower = _c[_b];
                _loop_2(numLower);
            }
            _loop_3 = function (numLower) {
                var _loop_6 = function (numUpper) {
                    expect(function () { return tf.linalg.bandPart(a, numLower, numUpper); })
                        .toThrowError(/bandPart.*(numLower|numUpper)/i);
                };
                for (var _i = 0, _a = [4, 5, 9]; _i < _a.length; _i++) {
                    var numUpper = _a[_i];
                    _loop_6(numUpper);
                }
            };
            for (_d = 0, _e = [3, 5, 8, 13]; _d < _e.length; _d++) {
                numLower = _e[_d];
                _loop_3(numLower);
            }
            return [2 /*return*/];
        });
    }); });
    it('works for 3x4 example', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a, _b, _c, _i, _d, numUpper, _e, _f, _g, _h, _j, _k, numUpper, _l, _m, _o, numLower, _p, _q, _r, _s, _t, numUpper, _u;
        return __generator(this, function (_v) {
            switch (_v.label) {
                case 0:
                    a = tf.tensor2d([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, la.bandPart(a, 0, 0).array()];
                case 1:
                    _a.apply(void 0, [_v.sent(),
                        [[1, 0, 0, 0], [0, 6, 0, 0], [0, 0, 11, 0]]]);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, la.bandPart(a, 0, 1).array()];
                case 2:
                    _b.apply(void 0, [_v.sent(),
                        [[1, 2, 0, 0], [0, 6, 7, 0], [0, 0, 11, 12]]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, la.bandPart(a, 0, 2).array()];
                case 3:
                    _c.apply(void 0, [_v.sent(),
                        [[1, 2, 3, 0], [0, 6, 7, 8], [0, 0, 11, 12]]]);
                    _i = 0, _d = [3, 4, -1, -2];
                    _v.label = 4;
                case 4:
                    if (!(_i < _d.length)) return [3 /*break*/, 7];
                    numUpper = _d[_i];
                    _e = test_util_1.expectArraysClose;
                    return [4 /*yield*/, la.bandPart(a, 0, numUpper).array()];
                case 5:
                    _e.apply(void 0, [_v.sent(),
                        [[1, 2, 3, 4], [0, 6, 7, 8], [0, 0, 11, 12]]]);
                    _v.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 4];
                case 7:
                    _f = test_util_1.expectArraysClose;
                    return [4 /*yield*/, la.bandPart(a, 1, 0).array()];
                case 8:
                    _f.apply(void 0, [_v.sent(),
                        [[1, 0, 0, 0], [5, 6, 0, 0], [0, 10, 11, 0]]]);
                    _g = test_util_1.expectArraysClose;
                    return [4 /*yield*/, la.bandPart(a, 1, 1).array()];
                case 9:
                    _g.apply(void 0, [_v.sent(),
                        [[1, 2, 0, 0], [5, 6, 7, 0], [0, 10, 11, 12]]]);
                    _h = test_util_1.expectArraysClose;
                    return [4 /*yield*/, la.bandPart(a, 1, 2).array()];
                case 10:
                    _h.apply(void 0, [_v.sent(),
                        [[1, 2, 3, 0], [5, 6, 7, 8], [0, 10, 11, 12]]]);
                    _j = 0, _k = [3, 4, -1, -2];
                    _v.label = 11;
                case 11:
                    if (!(_j < _k.length)) return [3 /*break*/, 14];
                    numUpper = _k[_j];
                    _l = test_util_1.expectArraysClose;
                    return [4 /*yield*/, la.bandPart(a, 1, numUpper).array()];
                case 12:
                    _l.apply(void 0, [_v.sent(),
                        [[1, 2, 3, 4], [5, 6, 7, 8], [0, 10, 11, 12]]]);
                    _v.label = 13;
                case 13:
                    _j++;
                    return [3 /*break*/, 11];
                case 14:
                    _m = 0, _o = [2, 3, -1, -2];
                    _v.label = 15;
                case 15:
                    if (!(_m < _o.length)) return [3 /*break*/, 23];
                    numLower = _o[_m];
                    _p = test_util_1.expectArraysClose;
                    return [4 /*yield*/, la.bandPart(a, numLower, 0).array()];
                case 16:
                    _p.apply(void 0, [_v.sent(),
                        [[1, 0, 0, 0], [5, 6, 0, 0], [9, 10, 11, 0]]]);
                    _q = test_util_1.expectArraysClose;
                    return [4 /*yield*/, la.bandPart(a, numLower, 1).array()];
                case 17:
                    _q.apply(void 0, [_v.sent(),
                        [[1, 2, 0, 0], [5, 6, 7, 0], [9, 10, 11, 12]]]);
                    _r = test_util_1.expectArraysClose;
                    return [4 /*yield*/, la.bandPart(a, numLower, 2).array()];
                case 18:
                    _r.apply(void 0, [_v.sent(),
                        [[1, 2, 3, 0], [5, 6, 7, 8], [9, 10, 11, 12]]]);
                    _s = 0, _t = [3, 4, -1, -2];
                    _v.label = 19;
                case 19:
                    if (!(_s < _t.length)) return [3 /*break*/, 22];
                    numUpper = _t[_s];
                    _u = test_util_1.expectArraysClose;
                    return [4 /*yield*/, la.bandPart(a, numLower, numUpper).array()];
                case 20:
                    _u.apply(void 0, [_v.sent(),
                        [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]]);
                    _v.label = 21;
                case 21:
                    _s++;
                    return [3 /*break*/, 19];
                case 22:
                    _m++;
                    return [3 /*break*/, 15];
                case 23: return [2 /*return*/];
            }
        });
    }); });
}); // end bandPart
jasmine_util_1.describeWithFlags('gramSchmidt-tiny', jasmine_util_1.ALL_ENVS, function () {
    it('2x2, Array of Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var xs, ys, y, _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    xs = [
                        tf.randomNormal([2], 0, 1, 'float32', 1),
                        tf.randomNormal([2], 0, 1, 'float32', 2)
                    ];
                    ys = tf.linalg.gramSchmidt(xs);
                    y = tf.stack(ys);
                    // Test that the results are orthogonalized and normalized.
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.transpose().matMul(y).array()];
                case 1:
                    _b = [_e.sent()];
                    return [4 /*yield*/, tf.eye(2).array()];
                case 2:
                    // Test that the results are orthogonalized and normalized.
                    _a.apply(void 0, _b.concat([_e.sent()]));
                    // Test angle between xs[0] and ys[0] is zero, i.e., the orientation of the
                    // first vector is kept.
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.sum(xs[0].mul(ys[0])).array()];
                case 3:
                    _d = [_e.sent()];
                    return [4 /*yield*/, tf.norm(xs[0]).mul(tf.norm(ys[0])).array()];
                case 4:
                    // Test angle between xs[0] and ys[0] is zero, i.e., the orientation of the
                    // first vector is kept.
                    _c.apply(void 0, _d.concat([_e.sent()]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('3x3, Array of Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var xs, ys, y, _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    xs = [
                        tf.randomNormal([3], 0, 1, 'float32', 1),
                        tf.randomNormal([3], 0, 1, 'float32', 2),
                        tf.randomNormal([3], 0, 1, 'float32', 3)
                    ];
                    ys = tf.linalg.gramSchmidt(xs);
                    y = tf.stack(ys);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.transpose().matMul(y).array()];
                case 1:
                    _b = [_e.sent()];
                    return [4 /*yield*/, tf.eye(3).array()];
                case 2:
                    _a.apply(void 0, _b.concat([_e.sent()]));
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.sum(xs[0].mul(ys[0])).array()];
                case 3:
                    _d = [_e.sent()];
                    return [4 /*yield*/, tf.norm(xs[0]).mul(tf.norm(ys[0])).array()];
                case 4:
                    _c.apply(void 0, _d.concat([_e.sent()]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('3x3, Matrix', function () { return __awaiter(_this, void 0, void 0, function () {
        var xs, y, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    xs = tf.randomNormal([3, 3], 0, 1, 'float32', 1);
                    y = tf.linalg.gramSchmidt(xs);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.transpose().matMul(y).array()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, tf.eye(3).array()];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('2x3, Matrix', function () { return __awaiter(_this, void 0, void 0, function () {
        var xs, y, yT, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    xs = tf.randomNormal([2, 3], 0, 1, 'float32', 1);
                    y = tf.linalg.gramSchmidt(xs);
                    yT = y.transpose();
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.matMul(yT).array()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, tf.eye(2).array()];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('3x2 Matrix throws Error', function () {
        var xs = tf.tensor2d([[1, 2], [3, -1], [5, 1]]);
        expect(function () { return tf.linalg.gramSchmidt(xs); })
            .toThrowError(/Number of vectors \(3\) exceeds number of dimensions \(2\)/);
    });
    it('Mismatching dimensions input throws Error', function () {
        var xs = [tf.tensor1d([1, 2, 3]), tf.tensor1d([-1, 5, 1]), tf.tensor1d([0, 0])];
        expect(function () { return tf.linalg.gramSchmidt(xs); }).toThrowError(/Non-unique/);
    });
    it('Empty input throws Error', function () {
        expect(function () { return tf.linalg.gramSchmidt([]); }).toThrowError(/empty/);
    });
});
jasmine_util_1.describeWithFlags('qr', jasmine_util_1.ALL_ENVS, function () {
    it('1x1', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, _a, q, r, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    x = ops_1.tensor2d([[10]], [1, 1]);
                    _a = tf.linalg.qr(x), q = _a[0], r = _a[1];
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, q.array()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [[-1]]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.array()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [[-10]]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2x2', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, _a, q, r, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    x = ops_1.tensor2d([[1, 3], [-2, -4]], [2, 2]);
                    _a = tf.linalg.qr(x), q = _a[0], r = _a[1];
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, q.array()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [[-0.4472, -0.8944], [0.8944, -0.4472]]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.array()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [[-2.2361, -4.9193], [0, -0.8944]]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2x2x2', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, _a, q, r, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    x = ops_1.tensor3d([[[-1, -3], [2, 4]], [[1, 3], [-2, -4]]], [2, 2, 2]);
                    _a = tf.linalg.qr(x), q = _a[0], r = _a[1];
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, q.array()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [
                            [[-0.4472, -0.8944], [0.8944, -0.4472]],
                            [[-0.4472, -0.8944], [0.8944, -0.4472]]
                        ]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.array()];
                case 2:
                    _c.apply(void 0, [_d.sent(),
                        [[[2.2361, 4.9193], [0, 0.8944]], [[-2.2361, -4.9193], [0, -0.8944]]]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2x1x2x2', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, _a, q, r, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    x = ops_1.tensor4d([[[[-1, -3], [2, 4]]], [[[1, 3], [-2, -4]]]], [2, 1, 2, 2]);
                    _a = tf.linalg.qr(x), q = _a[0], r = _a[1];
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, q.array()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [
                            [[[-0.4472, -0.8944], [0.8944, -0.4472]]],
                            [[[-0.4472, -0.8944], [0.8944, -0.4472]]],
                        ]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.array()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [
                            [[[2.2361, 4.9193], [0, 0.8944]]], [[[-2.2361, -4.9193], [0, -0.8944]]]
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('3x3', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, _a, q, r, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    x = ops_1.tensor2d([[1, 3, 2], [-2, 0, 7], [8, -9, 4]], [3, 3]);
                    _a = tf.linalg.qr(x), q = _a[0], r = _a[1];
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, q.array()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [
                            [-0.1204, 0.8729, 0.4729], [0.2408, -0.4364, 0.8669],
                            [-0.9631, -0.2182, 0.1576]
                        ]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.array()];
                case 2:
                    _c.apply(void 0, [_d.sent(),
                        [[-8.3066, 8.3066, -2.4077], [0, 4.5826, -2.1822], [0, 0, 7.6447]]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('3x3, zero on diagonal', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, _a, q, r, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    x = ops_1.tensor2d([[0, 2, 2], [1, 1, 1], [0, 1, 2]], [3, 3]);
                    _a = tf.linalg.qr(x), q = _a[0], r = _a[1];
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, q.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [
                            [0., -0.89442719, 0.4472136], [1., 0., 0.], [0., -0.4472136, -0.89442719]
                        ]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(),
                        [[1., 1., 1.], [0., -2.23606798, -2.68328157], [0., 0., -0.89442719]]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('3x2, fullMatrices = default false', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, _a, q, r, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    x = ops_1.tensor2d([[1, 2], [3, -3], [-2, 1]], [3, 2]);
                    _a = tf.linalg.qr(x), q = _a[0], r = _a[1];
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, q.array()];
                case 1:
                    _b.apply(void 0, [_d.sent(),
                        [[-0.2673, 0.9221], [-0.8018, -0.3738], [0.5345, -0.0997]]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.array()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [[-3.7417, 2.4054], [0, 2.8661]]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('3x2, fullMatrices = true', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, _a, q, r, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    x = ops_1.tensor2d([[1, 2], [3, -3], [-2, 1]], [3, 2]);
                    _a = tf.linalg.qr(x, true), q = _a[0], r = _a[1];
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, q.array()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [
                            [-0.2673, 0.9221, 0.2798], [-0.8018, -0.3738, 0.4663],
                            [0.5345, -0.0997, 0.8393]
                        ]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.array()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [[-3.7417, 2.4054], [0, 2.8661], [0, 0]]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2x3, fullMatrices = default false', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, _a, q, r, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    x = ops_1.tensor2d([[1, 2, 3], [-3, -2, 1]], [2, 3]);
                    _a = tf.linalg.qr(x), q = _a[0], r = _a[1];
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, q.array()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [[-0.3162278, -0.9486833], [0.9486833, -0.31622773]]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.array()];
                case 2:
                    _c.apply(void 0, [_d.sent(),
                        [[-3.162, -2.5298, -2.3842e-07], [0, -1.2649, -3.162]]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2x3, fullMatrices = true', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, _a, q, r, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    x = ops_1.tensor2d([[1, 2, 3], [-3, -2, 1]], [2, 3]);
                    _a = tf.linalg.qr(x, true), q = _a[0], r = _a[1];
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, q.array()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [[-0.3162278, -0.9486833], [0.9486833, -0.31622773]]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.array()];
                case 2:
                    _c.apply(void 0, [_d.sent(),
                        [[-3.162, -2.5298, -2.3842e-07], [0, -1.2649, -3.162]]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Does not leak memory', function () {
        var x = ops_1.tensor2d([[1, 3], [-2, -4]], [2, 2]);
        // The first call to qr creates and keeps internal singleton tensors.
        // Subsequent calls should always create exactly two tensors.
        tf.linalg.qr(x);
        // Count before real call.
        var numTensors = tf.memory().numTensors;
        tf.linalg.qr(x);
        expect(tf.memory().numTensors).toEqual(numTensors + 2);
    });
    it('Insuffient input tensor rank leads to error', function () {
        var x1 = ops_1.scalar(12);
        expect(function () { return tf.linalg.qr(x1); }).toThrowError(/rank >= 2.*got rank 0/);
        var x2 = ops_1.tensor1d([12]);
        expect(function () { return tf.linalg.qr(x2); }).toThrowError(/rank >= 2.*got rank 1/);
    });
});
//# sourceMappingURL=linalg_ops_test.js.map