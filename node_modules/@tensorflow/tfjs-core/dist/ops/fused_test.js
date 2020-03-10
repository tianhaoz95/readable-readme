"use strict";
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
jasmine_util_1.describeWithFlags('fused matmul', jasmine_util_1.ALL_ENVS, function () {
    it('fused A x B', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, c, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    b = tf.tensor2d([0, 1, -3, 2, 2, 1], [3, 2]);
                    c = tf.fused.matMul({ a: a, b: b });
                    expect(c.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 8, -3, 20]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('fused A x B with relu', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, transposeA, transposeB, c, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    b = tf.tensor2d([0, 1, -3, 2, 2, 1], [3, 2]);
                    transposeA = false;
                    transposeB = false;
                    c = tf.fused.matMul({ a: a, b: b, transposeA: transposeA, transposeB: transposeB, bias: null, activation: 'relu' });
                    expect(c.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 8, 0, 20]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('fused A x B with elu', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, transposeA, transposeB, c, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    b = tf.tensor2d([0, 1, -3, 2, 2, 1], [3, 2]);
                    transposeA = false;
                    transposeB = false;
                    c = tf.fused.matMul({ a: a, b: b, transposeA: transposeA, transposeB: transposeB, bias: null, activation: 'elu' });
                    expect(c.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 8, -0.9502, 20]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('fused A x B with relu6', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, transposeA, transposeB, c, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    b = tf.tensor2d([0, 1, -3, 2, 2, 1], [3, 2]);
                    transposeA = false;
                    transposeB = false;
                    c = tf.fused.matMul({ a: a, b: b, transposeA: transposeA, transposeB: transposeB, bias: null, activation: 'relu6' });
                    expect(c.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 6, 0, 6]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('fused A x B with prelu', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, alpha, transposeA, transposeB, c, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    b = tf.tensor2d([0, 1, -3, 2, 2, 1], [3, 2]);
                    alpha = tf.tensor2d([0.5, 0.5], [1, 2]);
                    transposeA = false;
                    transposeB = false;
                    c = tf.fused.matMul({
                        a: a,
                        b: b,
                        transposeA: transposeA,
                        transposeB: transposeB,
                        bias: null,
                        activation: 'prelu',
                        preluActivationWeights: alpha
                    });
                    expect(c.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 8, -1.5, 20]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('fused A x B with relu transpose', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, transposeA, transposeB, c, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    b = tf.tensor2d([0, 1, -3, 2, 2, 1], [2, 3]);
                    transposeA = false;
                    transposeB = true;
                    c = tf.fused.matMul({ a: a, b: b, transposeA: transposeA, transposeB: transposeB, bias: null, activation: 'relu' });
                    expect(c.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 9, 0, 24]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('fused A x B with 2d bias and relu', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, c, transposeA, transposeB, d, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    b = tf.tensor2d([0, 1, -3, 2, 2, 1], [3, 2]);
                    c = tf.tensor2d([1, 1, 1, 1], [2, 2]);
                    transposeA = false;
                    transposeB = false;
                    d = tf.fused.matMul({ a: a, b: b, transposeA: transposeA, transposeB: transposeB, bias: c, activation: 'relu' });
                    expect(d.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, d.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 9, 0, 21]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('fused A x B with relu and broadcasted bias', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, c, act, transposeA, transposeB, d, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    b = tf.tensor2d([0, 1, -3, 2, 2, 1], [3, 2]);
                    c = tf.tensor1d([1, 1]);
                    act = 'relu';
                    transposeA = false;
                    transposeB = false;
                    d = tf.fused.matMul({ a: a, b: b, transposeA: transposeA, transposeB: transposeB, bias: c, activation: act });
                    expect(d.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, d.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 9, 0, 21]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('fused A x B with elu and broadcasted bias', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, c, act, transposeA, transposeB, d, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    b = tf.tensor2d([0, 1, -3, 2, 2, 1], [3, 2]);
                    c = tf.tensor1d([1, 1]);
                    act = 'elu';
                    transposeA = false;
                    transposeB = false;
                    d = tf.fused.matMul({ a: a, b: b, transposeA: transposeA, transposeB: transposeB, bias: c, activation: act });
                    expect(d.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, d.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 9, -0.8647, 21]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('fused A x B with relu and broadcasted bias different rank', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, c, act, transposeA, transposeB, d, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [2, 2, 3]);
                    b = tf.tensor3d([0, 1, -3, 2, 2, 1, 0, 1, -3, 2, 2, 1], [2, 3, 2]);
                    c = tf.tensor2d([1, 2], [1, 2]);
                    act = 'relu';
                    transposeA = false;
                    transposeB = false;
                    d = tf.fused.matMul({ a: a, b: b, transposeA: transposeA, transposeB: transposeB, bias: c, activation: act });
                    expect(d.shape).toEqual([2, 2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, d.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 6, 0, 18, 0, 30, 0, 42]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('fused A x B with 2d bias only', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, c, transposeA, transposeB, d, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    b = tf.tensor2d([0, 1, -3, 2, 2, 1], [3, 2]);
                    c = tf.tensor2d([1, 1, 1, 1], [2, 2]);
                    transposeA = false;
                    transposeB = false;
                    d = tf.fused.matMul({ a: a, b: b, transposeA: transposeA, transposeB: transposeB, bias: c, activation: 'linear' });
                    expect(d.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, d.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 9, -2, 21]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('fused A x B with relu gradient', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, transposeA, transposeB, grads, fusedGrads, _a, da, db, _b, fusedDa, fusedDb, _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 10, 20, -30], [2, 3]);
                    b = tf.tensor2d([2, 3, 4, -1, 2, 3], [3, 2]);
                    dy = tf.tensor2d([1, 10, 20, 30], [2, 2]);
                    transposeA = false;
                    transposeB = false;
                    grads = tf.grads(function (a, b) {
                        var prod = tf.matMul(a, b, transposeA, transposeB);
                        return tf.relu(prod);
                    });
                    fusedGrads = tf.grads(function (a, b) {
                        return tf.fused.matMul({ a: a, b: b, transposeA: transposeA, transposeB: transposeB, bias: null, activation: 'relu' });
                    });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    _b = fusedGrads([a, b], dy), fusedDa = _b[0], fusedDb = _b[1];
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.array()];
                case 1:
                    _d = [_g.sent()];
                    return [4 /*yield*/, fusedDa.array()];
                case 2:
                    _c.apply(void 0, _d.concat([_g.sent()]));
                    _e = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 3:
                    _f = [_g.sent()];
                    return [4 /*yield*/, fusedDb.array()];
                case 4:
                    _e.apply(void 0, _f.concat([_g.sent()]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones A x B with relu', function () {
        var a = tf.tensor2d([1, 2, 3, 10, 20, -30], [2, 3]);
        var b = tf.tensor2d([2, 3, 4, -1, 2, 3], [3, 2]);
        var dy = tf.tensor2d([1, 10, 20, 30], [2, 2]);
        var transposeA = false;
        var transposeB = false;
        var fusedGrads = tf.grads(function (a, b) {
            return tf.fused
                .matMul({
                a: a.clone(),
                b: b.clone(),
                transposeA: transposeA,
                transposeB: transposeB,
                bias: null,
                activation: 'relu'
            })
                .clone();
        });
        var _a = fusedGrads([a, b], dy), fusedDa = _a[0], fusedDb = _a[1];
        expect(fusedDa.shape).toEqual(a.shape);
        expect(fusedDb.shape).toEqual(b.shape);
    });
    it('fused A x B with relu bias gradient', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, c, transposeA, transposeB, dy, grads, fusedGrads, _a, da, db, dc, _b, fusedDa, fusedDb, fusedDc, _c, _d, _e, _f, _g, _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 10, 20, -30], [2, 3]);
                    b = tf.tensor2d([2, 3, 4, -1, 2, 3], [3, 2]);
                    c = tf.tensor2d([1, 1, 1, 1], [2, 2]);
                    transposeA = false;
                    transposeB = false;
                    dy = tf.tensor2d([1, 10, 20, 30], [2, 2]);
                    grads = tf.grads(function (a, b, c) {
                        var prod = tf.matMul(a, b, transposeA, transposeB);
                        var sum = tf.add(prod, c);
                        return tf.relu(sum);
                    });
                    fusedGrads = tf.grads(function (a, b, c) {
                        return tf.fused.matMul({ a: a, b: b, transposeA: transposeA, transposeB: transposeB, bias: c, activation: 'relu' });
                    });
                    _a = grads([a, b, c], dy), da = _a[0], db = _a[1], dc = _a[2];
                    _b = fusedGrads([a, b, c], dy), fusedDa = _b[0], fusedDb = _b[1], fusedDc = _b[2];
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.array()];
                case 1:
                    _d = [_j.sent()];
                    return [4 /*yield*/, fusedDa.array()];
                case 2:
                    _c.apply(void 0, _d.concat([_j.sent()]));
                    _e = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.array()];
                case 3:
                    _f = [_j.sent()];
                    return [4 /*yield*/, fusedDb.array()];
                case 4:
                    _e.apply(void 0, _f.concat([_j.sent()]));
                    _g = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dc.array()];
                case 5:
                    _h = [_j.sent()];
                    return [4 /*yield*/, fusedDc.array()];
                case 6:
                    _g.apply(void 0, _h.concat([_j.sent()]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('fused A x B with relu bias gradient transpose', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, c, transposeA, transposeB, dy, grads, fusedGrads, _a, da, db, dc, _b, fusedDa, fusedDb, fusedDc, _c, _d, _e, _f, _g, _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 10, 20, -30], [3, 2]);
                    b = tf.tensor2d([2, 3, 4, -1, 2, 3], [3, 2]);
                    c = tf.tensor2d([1, 1, 1, 1], [2, 2]);
                    transposeA = true;
                    transposeB = false;
                    dy = tf.tensor2d([1, 10, 20, 30], [2, 2]);
                    grads = tf.grads(function (a, b, c) {
                        var prod = tf.matMul(a, b, transposeA, transposeB);
                        var sum = tf.add(prod, c);
                        return tf.relu(sum);
                    });
                    fusedGrads = tf.grads(function (a, b, c) {
                        return tf.fused.matMul({ a: a, b: b, transposeA: transposeA, transposeB: transposeB, bias: c, activation: 'relu' });
                    });
                    _a = grads([a, b, c], dy), da = _a[0], db = _a[1], dc = _a[2];
                    _b = fusedGrads([a, b, c], dy), fusedDa = _b[0], fusedDb = _b[1], fusedDc = _b[2];
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.array()];
                case 1:
                    _d = [_j.sent()];
                    return [4 /*yield*/, fusedDa.array()];
                case 2:
                    _c.apply(void 0, _d.concat([_j.sent()]));
                    _e = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.array()];
                case 3:
                    _f = [_j.sent()];
                    return [4 /*yield*/, fusedDb.array()];
                case 4:
                    _e.apply(void 0, _f.concat([_j.sent()]));
                    _g = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dc.array()];
                case 5:
                    _h = [_j.sent()];
                    return [4 /*yield*/, fusedDc.array()];
                case 6:
                    _g.apply(void 0, _h.concat([_j.sent()]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('fused A x B with relu and broadcasted bias gradient', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, c, transposeA, transposeB, dy, grads, fusedGrads, _a, da, db, dc, _b, fusedDa, fusedDb, fusedDc, _c, _d, _e, _f, _g, _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 10, 20, -30], [2, 3]);
                    b = tf.tensor2d([2, 3, 4, -1, 2, 3], [3, 2]);
                    c = tf.tensor2d([[1]]);
                    transposeA = false;
                    transposeB = false;
                    dy = tf.tensor2d([1, 10, 20, 30], [2, 2]);
                    grads = tf.grads(function (a, b, c) {
                        var prod = tf.matMul(a, b, transposeA, transposeB);
                        var sum = tf.add(prod, c);
                        return tf.relu(sum);
                    });
                    fusedGrads = tf.grads(function (a, b, c) {
                        return tf.fused.matMul({ a: a, b: b, transposeA: transposeA, transposeB: transposeB, bias: c, activation: 'relu' });
                    });
                    _a = grads([a, b, c], dy), da = _a[0], db = _a[1], dc = _a[2];
                    _b = fusedGrads([a, b, c], dy), fusedDa = _b[0], fusedDb = _b[1], fusedDc = _b[2];
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.array()];
                case 1:
                    _d = [_j.sent()];
                    return [4 /*yield*/, fusedDa.array()];
                case 2:
                    _c.apply(void 0, _d.concat([_j.sent()]));
                    _e = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.array()];
                case 3:
                    _f = [_j.sent()];
                    return [4 /*yield*/, fusedDb.array()];
                case 4:
                    _e.apply(void 0, _f.concat([_j.sent()]));
                    _g = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dc.array()];
                case 5:
                    _h = [_j.sent()];
                    return [4 /*yield*/, fusedDc.array()];
                case 6:
                    _g.apply(void 0, _h.concat([_j.sent()]));
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('fused depthwiseConv2D', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var fSize, pad, strides, chMul, inDepth, x, w, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fSize = 2;
                    pad = 'valid';
                    strides = 1;
                    chMul = 1;
                    inDepth = 1;
                    x = tf.tensor4d([
                        0.230664, 0.987388, 0.0685208, 0.419224, 0.887861, 0.731641,
                        0.0741907, 0.409265, 0.351377
                    ], [1, 3, 3, inDepth]);
                    w = tf.tensor4d([-0.303873, -0.229223, 0.144333, 0.803373], [fSize, fSize, inDepth, chMul]);
                    result = tf.fused.depthwiseConv2d({ x: x, filter: w, strides: strides, pad: pad });
                    expect(result.shape).toEqual([1, 2, 2, 1]);
                    expected = [0.47737, 0.40018, 0.00859, -0.09615];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('basic with relu', function () { return __awaiter(_this, void 0, void 0, function () {
        var fSize, pad, strides, chMul, inDepth, x, w, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fSize = 2;
                    pad = 'valid';
                    strides = 1;
                    chMul = 1;
                    inDepth = 1;
                    x = tf.tensor4d([
                        0.230664, 0.987388, 0.0685208, 0.419224, 0.887861, 0.731641,
                        0.0741907, 0.409265, 0.351377
                    ], [1, 3, 3, inDepth]);
                    w = tf.tensor4d([-0.303873, -0.229223, 0.144333, 0.803373], [fSize, fSize, inDepth, chMul]);
                    result = tf.fused.depthwiseConv2d({ x: x, filter: w, strides: strides, pad: pad, activation: 'relu' });
                    expect(result.shape).toEqual([1, 2, 2, 1]);
                    expected = [0.47737, 0.40018, 0.00859, 0];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('basic with broadcasted bias and relu', function () { return __awaiter(_this, void 0, void 0, function () {
        var fSize, pad, strides, chMul, inDepth, x, w, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fSize = 2;
                    pad = 'valid';
                    strides = 1;
                    chMul = 1;
                    inDepth = 1;
                    x = tf.tensor4d([
                        0.230664, 0.987388, 0.0685208, 0.419224, 0.887861, 0.731641,
                        0.0741907, 0.409265, 0.351377
                    ], [1, 3, 3, inDepth]);
                    w = tf.tensor4d([-0.303873, -0.229223, 0.144333, 0.803373], [fSize, fSize, inDepth, chMul]);
                    result = tf.fused.depthwiseConv2d({ x: x, filter: w, strides: strides, pad: pad, bias: tf.scalar(1), activation: 'relu' });
                    expect(result.shape).toEqual([1, 2, 2, 1]);
                    expected = [1.47737, 1.40018, 1.00859, 0.90385];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('prelu', function () { return __awaiter(_this, void 0, void 0, function () {
        var fSize, pad, strides, chMul, inDepth, x, alpha, w, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fSize = 3;
                    pad = 'valid';
                    strides = 1;
                    chMul = 1;
                    inDepth = 1;
                    x = tf.tensor4d([
                        0.149194, 0.089009, 0.654891, 0.083324, 0.537043, 0.644331, 0.563037,
                        0.211859, 0.633501, 0.186427, 0.777034, 0.50001, 0.607341, 0.95303,
                        0.696479, 0.050387, 0.62045, 0.728049, 0.028043, 0.437009, 0.712881,
                        0.741935, 0.974474, 0.621102, 0.171411
                    ], [1, 5, 5, inDepth]);
                    alpha = tf.tensor4d([0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9], [1, 3, 3, 1]);
                    w = tf.tensor4d([
                        -0.125386, -0.975199, -0.640437, -0.281895, -0.990968, -0.347208,
                        -0.889702, -0.180695, -0.691992
                    ], [fSize, fSize, inDepth, chMul]);
                    result = tf.fused.depthwiseConv2d({
                        x: x,
                        filter: w,
                        strides: strides,
                        pad: pad,
                        activation: 'prelu',
                        preluActivationWeights: alpha
                    });
                    expect(result.shape).toEqual([1, 3, 3, 1]);
                    expected = [
                        -0.25400, -0.50118, -0.73622, -0.94068, -1.2298, -1.84585, -2.3089,
                        -2.7499, -2.64077
                    ];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient x=[2,3,3,1] f=[2,2,1,1] s=1 p=0', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputDepth, outputDepth, inputShape, filterSize, strides, pad, filterShape, filter, x, dy, grads, _a, dx, dfilter, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    inputDepth = 1;
                    outputDepth = 1;
                    inputShape = [2, 3, 3, inputDepth];
                    filterSize = 2;
                    strides = 1;
                    pad = 0;
                    filterShape = [filterSize, filterSize, inputDepth, outputDepth];
                    filter = tf.tensor4d([-1, 1, -2, 0.5], filterShape);
                    x = tf.tensor4d([1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9], inputShape);
                    dy = tf.tensor4d([3, 1, 2, 0, 3, 1, 2, 0], [2, 2, 2, 1]);
                    grads = tf.grads(function (x, filter) {
                        return tf.fused.depthwiseConv2d({ x: x, filter: filter, strides: strides, pad: pad });
                    });
                    _a = grads([x, filter], dy), dx = _a[0], dfilter = _a[1];
                    expect(dx.shape).toEqual(x.shape);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(),
                        [-3, 2, 1, -8, 1.5, 0.5, -4, 1, 0, -3, 2, 1, -8, 1.5, 0.5, -4, 1, 0]]);
                    expect(dfilter.shape).toEqual(filterShape);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dfilter.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [26, 38, 62, 74]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient x=[2,3,3,1] f=[2,2,1,1] s=1 p=0 with bias', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputDepth, outputDepth, inputShape, filterSize, strides, pad, filterShape, filter, bias, x, dy, fusedGrads, _a, dxFused, dfilterFused, dbiasFused, grads, _b, dx, dfilter, dbias, _c, _d, _e, _f, _g, _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    inputDepth = 1;
                    outputDepth = 1;
                    inputShape = [2, 3, 3, inputDepth];
                    filterSize = 2;
                    strides = 1;
                    pad = 0;
                    filterShape = [filterSize, filterSize, inputDepth, outputDepth];
                    filter = tf.tensor4d([-1, 1, -2, 0.5], filterShape);
                    bias = tf.ones([2, 2, 2, 1]);
                    x = tf.tensor4d([1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9], inputShape);
                    dy = tf.tensor4d([3, 1, 2, 0, 3, 1, 2, 0], [2, 2, 2, 1]);
                    fusedGrads = tf.grads(function (x, w, b) { return tf.fused.depthwiseConv2d({
                        x: x,
                        filter: w,
                        strides: strides,
                        pad: pad,
                        dataFormat: 'NHWC',
                        dilations: [1, 1],
                        bias: b
                    }); });
                    _a = fusedGrads([x, filter, bias], dy), dxFused = _a[0], dfilterFused = _a[1], dbiasFused = _a[2];
                    grads = tf.grads(function (x, filter, bias) {
                        var conv = tf.depthwiseConv2d(x, filter, strides, pad);
                        var sum = tf.add(conv, bias);
                        return sum;
                    });
                    _b = grads([x, filter, bias], dy), dx = _b[0], dfilter = _b[1], dbias = _b[2];
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dxFused.array()];
                case 1:
                    _d = [_j.sent()];
                    return [4 /*yield*/, dx.array()];
                case 2:
                    _c.apply(void 0, _d.concat([_j.sent()]));
                    _e = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dfilterFused.array()];
                case 3:
                    _f = [_j.sent()];
                    return [4 /*yield*/, dfilter.array()];
                case 4:
                    _e.apply(void 0, _f.concat([_j.sent()]));
                    _g = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dbiasFused.array()];
                case 5:
                    _h = [_j.sent()];
                    return [4 /*yield*/, dbias.array()];
                case 6:
                    _g.apply(void 0, _h.concat([_j.sent()]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient x=[2,3,3,1] f=[2,2,1,1] s=1 p=0 with bias and activation', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputDepth, outputDepth, inputShape, filterSize, strides, pad, filterShape, filter, bias, x, dy, fusedGrads, _a, dxFused, dfilterFused, dbiasFused, grads, _b, dx, dfilter, dbias, _c, _d, _e, _f, _g, _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    inputDepth = 1;
                    outputDepth = 1;
                    inputShape = [2, 3, 3, inputDepth];
                    filterSize = 2;
                    strides = 1;
                    pad = 0;
                    filterShape = [filterSize, filterSize, inputDepth, outputDepth];
                    filter = tf.tensor4d([-1, 1, -2, 0.5], filterShape);
                    bias = tf.ones([2, 2, 2, 1]);
                    x = tf.tensor4d([1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9], inputShape);
                    dy = tf.tensor4d([3, 1, 2, 0, 3, 1, 2, 0], [2, 2, 2, 1]);
                    fusedGrads = tf.grads(function (x, w, b) { return tf.fused.depthwiseConv2d({
                        x: x,
                        filter: w,
                        strides: strides,
                        pad: pad,
                        dataFormat: 'NHWC',
                        dilations: [1, 1],
                        bias: b,
                        activation: 'relu'
                    }); });
                    _a = fusedGrads([x, filter, bias], dy), dxFused = _a[0], dfilterFused = _a[1], dbiasFused = _a[2];
                    grads = tf.grads(function (x, filter, bias) {
                        var conv = tf.depthwiseConv2d(x, filter, strides, pad);
                        var sum = tf.add(conv, bias);
                        return tf.relu(sum);
                    });
                    _b = grads([x, filter, bias], dy), dx = _b[0], dfilter = _b[1], dbias = _b[2];
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dxFused.array()];
                case 1:
                    _d = [_j.sent()];
                    return [4 /*yield*/, dx.array()];
                case 2:
                    _c.apply(void 0, _d.concat([_j.sent()]));
                    _e = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dfilterFused.array()];
                case 3:
                    _f = [_j.sent()];
                    return [4 /*yield*/, dfilter.array()];
                case 4:
                    _e.apply(void 0, _f.concat([_j.sent()]));
                    _g = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dbiasFused.array()];
                case 5:
                    _h = [_j.sent()];
                    return [4 /*yield*/, dbias.array()];
                case 6:
                    _g.apply(void 0, _h.concat([_j.sent()]));
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('fused conv2d', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputDepth, inShape, outputDepth, fSize, pad, stride, x, w, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    inputDepth = 2;
                    inShape = [2, 2, 2, inputDepth];
                    outputDepth = 2;
                    fSize = 1;
                    pad = 0;
                    stride = 1;
                    x = tf.tensor4d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], inShape);
                    w = tf.tensor4d([-1, 1, -2, 0.5], [fSize, fSize, inputDepth, outputDepth]);
                    result = tf.fused.conv2d({ x: x, filter: w, strides: stride, pad: pad });
                    expect(result.shape).toEqual([2, 2, 2, 2]);
                    expected = [-5, 2, -11, 5, -17, 8, -23, 11, -29, 14, -35, 17, -41, 20, -47, 23];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('basic with relu', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputDepth, inShape, outputDepth, fSize, pad, stride, x, w, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    inputDepth = 2;
                    inShape = [2, 2, 2, inputDepth];
                    outputDepth = 2;
                    fSize = 1;
                    pad = 0;
                    stride = 1;
                    x = tf.tensor4d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], inShape);
                    w = tf.tensor4d([-1, 1, -2, 0.5], [fSize, fSize, inputDepth, outputDepth]);
                    result = tf.fused.conv2d({
                        x: x,
                        filter: w,
                        strides: stride,
                        pad: pad,
                        dataFormat: 'NHWC',
                        dilations: [1, 1],
                        activation: 'relu'
                    });
                    expect(result.shape).toEqual([2, 2, 2, 2]);
                    expected = [0, 2, 0, 5, 0, 8, 0, 11, 0, 14, 0, 17, 0, 20, 0, 23];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('basic with bias', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputDepth, inShape, outputDepth, fSize, pad, stride, x, w, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    inputDepth = 2;
                    inShape = [2, 2, 2, inputDepth];
                    outputDepth = 2;
                    fSize = 1;
                    pad = 0;
                    stride = 1;
                    x = tf.tensor4d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], inShape);
                    w = tf.tensor4d([-1, 1, -2, 0.5], [fSize, fSize, inputDepth, outputDepth]);
                    result = tf.fused.conv2d({
                        x: x,
                        filter: w,
                        strides: stride,
                        pad: pad,
                        dataFormat: 'NHWC',
                        dilations: [1, 1],
                        bias: tf.tensor1d([5, 6])
                    });
                    expect(result.shape).toEqual([2, 2, 2, 2]);
                    expected = [0, 8, -6, 11, -12, 14, -18, 17, -24, 20, -30, 23, -36, 26, -42, 29];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('basic with elu', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputDepth, inShape, outputDepth, fSize, pad, stride, x, w, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    inputDepth = 2;
                    inShape = [2, 2, 2, inputDepth];
                    outputDepth = 2;
                    fSize = 1;
                    pad = 0;
                    stride = 1;
                    x = tf.tensor4d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], inShape);
                    w = tf.tensor4d([-1, 1, -2, 0.5], [fSize, fSize, inputDepth, outputDepth]);
                    result = tf.fused.conv2d({
                        x: x,
                        filter: w,
                        strides: stride,
                        pad: pad,
                        dataFormat: 'NHWC',
                        dilations: [1, 1],
                        activation: 'elu'
                    });
                    expect(result.shape).toEqual([2, 2, 2, 2]);
                    expected = [-0.99326, 2, -1, 5, -1, 8, -1, 11, -1, 14, -1, 17, -1, 20, -1, 23];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('basic with prelu', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputDepth, inShape, outputDepth, fSize, pad, stride, x, alpha, w, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    inputDepth = 2;
                    inShape = [2, 2, 2, inputDepth];
                    outputDepth = 2;
                    fSize = 1;
                    pad = 0;
                    stride = 1;
                    x = tf.tensor4d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], inShape);
                    alpha = tf.tensor3d([0.25, 0.75], [1, 1, 2]);
                    w = tf.tensor4d([-1, 1, -2, 0.5], [fSize, fSize, inputDepth, outputDepth]);
                    result = tf.fused.conv2d({
                        x: x,
                        filter: w,
                        strides: stride,
                        pad: pad,
                        dataFormat: 'NHWC',
                        dilations: [1, 1],
                        activation: 'prelu',
                        preluActivationWeights: alpha
                    });
                    expect(result.shape).toEqual([2, 2, 2, 2]);
                    expected = [
                        -1.25, 2, -2.75, 5, -4.25, 8, -5.75, 11, -7.25, 14, -8.75, 17, -10.25, 20,
                        -11.75, 23
                    ];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('basic with broadcasted bias and relu', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputDepth, inShape, outputDepth, fSize, pad, stride, x, w, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    inputDepth = 2;
                    inShape = [2, 2, 2, inputDepth];
                    outputDepth = 2;
                    fSize = 1;
                    pad = 0;
                    stride = 1;
                    x = tf.tensor4d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], inShape);
                    w = tf.tensor4d([-1, 1, -2, 0.5], [fSize, fSize, inputDepth, outputDepth]);
                    result = tf.fused.conv2d({
                        x: x,
                        filter: w,
                        strides: stride,
                        pad: pad,
                        dataFormat: 'NHWC',
                        dilations: [1, 1],
                        bias: tf.scalar(5),
                        activation: 'relu'
                    });
                    expect(result.shape).toEqual([2, 2, 2, 2]);
                    expected = [0, 7, 0, 10, 0, 13, 0, 16, 0, 19, 0, 22, 0, 25, 0, 28];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('im2row', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputDepth, inputShape, outputDepth, fSize, pad, strides, x, w, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    inputDepth = 1;
                    inputShape = [4, 4, inputDepth];
                    outputDepth = 3;
                    fSize = 1;
                    pad = 'same';
                    strides = [2, 2];
                    x = tf.tensor3d([
                        10, 30, 50, 70, 20, 40, 60, 80, -10, -30, -50, -70, -20, -40, -60, -80
                    ], inputShape);
                    w = tf.tensor4d([1, 0.5, 1], [fSize, fSize, inputDepth, outputDepth]);
                    result = tf.fused.conv2d({ x: x, filter: w, strides: strides, pad: pad });
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [10, 5, 10, 50, 25, 50, -10, -5, -10, -50, -25, -50]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('im2row with relu', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputDepth, inputShape, outputDepth, fSize, pad, strides, x, w, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    inputDepth = 1;
                    inputShape = [4, 4, inputDepth];
                    outputDepth = 3;
                    fSize = 1;
                    pad = 'same';
                    strides = [2, 2];
                    x = tf.tensor3d([
                        10, 30, 50, 70, 20, 40, 60, 80, -10, -30, -50, -70, -20, -40, -60, -80
                    ], inputShape);
                    w = tf.tensor4d([1, 0.5, 1], [fSize, fSize, inputDepth, outputDepth]);
                    result = tf.fused.conv2d({
                        x: x,
                        filter: w,
                        strides: strides,
                        pad: pad,
                        dataFormat: 'NHWC',
                        dilations: [1, 1],
                        activation: 'relu'
                    });
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [10, 5, 10, 50, 25, 50, 0, 0, 0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('im2row with prelu', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputDepth, inputShape, outputDepth, fSize, pad, strides, x, w, alpha, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    inputDepth = 1;
                    inputShape = [4, 4, inputDepth];
                    outputDepth = 3;
                    fSize = 1;
                    pad = 'same';
                    strides = [2, 2];
                    x = tf.tensor3d([
                        10, 30, 50, 70, 20, 40, 60, 80, -10, -30, -50, -70, -20, -40, -60, -80
                    ], inputShape);
                    w = tf.tensor4d([1, 0.5, 1], [fSize, fSize, inputDepth, outputDepth]);
                    alpha = tf.tensor3d([0.5], [1, 1, inputDepth]);
                    result = tf.fused.conv2d({
                        x: x,
                        filter: w,
                        strides: strides,
                        pad: pad,
                        dataFormat: 'NHWC',
                        dilations: [1, 1],
                        activation: 'prelu',
                        preluActivationWeights: alpha
                    });
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [10, 5, 10, 50, 25, 50, -5, -2.5, -5, -25, -12.5, -25]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('pointwise with prelu', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputDepth, inputShape, outputDepth, fSize, pad, strides, x, w, alpha, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    inputDepth = 1;
                    inputShape = [4, 4, inputDepth];
                    outputDepth = 3;
                    fSize = 1;
                    pad = 'same';
                    strides = [1, 1];
                    x = tf.tensor3d([
                        10, 30, 50, 70, 20, 40, 60, 80, -10, -30, -50, -70, -20, -40, -60, -80
                    ], inputShape);
                    w = tf.tensor4d([1, 0.5, 1], [fSize, fSize, inputDepth, outputDepth]);
                    alpha = tf.tensor3d([0.5], [1, 1, inputDepth]);
                    result = tf.fused.conv2d({
                        x: x,
                        filter: w,
                        strides: strides,
                        pad: pad,
                        dataFormat: 'NHWC',
                        dilations: [1, 1],
                        activation: 'prelu',
                        preluActivationWeights: alpha
                    });
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            10, 5, 10, 30, 15, 30, 50, 25, 50, 70, 35, 70,
                            20, 10, 20, 40, 20, 40, 60, 30, 60, 80, 40, 80,
                            -5, -2.5, -5, -15, -7.5, -15, -25, -12.5, -25, -35, -17.5, -35,
                            -10, -5, -10, -20, -10, -20, -30, -15, -30, -40, -20, -40
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('im2row with broadcasted bias and relu', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputDepth, inputShape, outputDepth, fSize, pad, strides, x, w, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    inputDepth = 1;
                    inputShape = [4, 4, inputDepth];
                    outputDepth = 3;
                    fSize = 1;
                    pad = 'same';
                    strides = [2, 2];
                    x = tf.tensor3d([
                        10, 30, 50, 70, 20, 40, 60, 80, -10, -30, -50, -70, -20, -40, -60, -80
                    ], inputShape);
                    w = tf.tensor4d([1, 0.5, 1], [fSize, fSize, inputDepth, outputDepth]);
                    result = tf.fused.conv2d({
                        x: x,
                        filter: w,
                        strides: strides,
                        pad: pad,
                        dataFormat: 'NHWC',
                        dilations: [1, 1],
                        bias: tf.scalar(5),
                        activation: 'relu'
                    });
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [15, 10, 15, 55, 30, 55, 0, 0, 0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient x=[2,3,3,1] f=[2,2,1,1] s=1 p=0', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputDepth, outputDepth, inputShape, filterSize, strides, pad, filterShape, filter, x, dy, grads, _a, dx, dfilter, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    inputDepth = 1;
                    outputDepth = 1;
                    inputShape = [2, 3, 3, inputDepth];
                    filterSize = 2;
                    strides = 1;
                    pad = 0;
                    filterShape = [filterSize, filterSize, inputDepth, outputDepth];
                    filter = tf.tensor4d([-1, 1, -2, 0.5], filterShape);
                    x = tf.tensor4d([1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9], inputShape);
                    dy = tf.tensor4d([3, 1, 2, 0, 3, 1, 2, 0], [2, 2, 2, 1]);
                    grads = tf.grads(function (x, filter) {
                        return tf.fused.conv2d({ x: x, filter: filter, strides: strides, pad: pad });
                    });
                    _a = grads([x, filter], dy), dx = _a[0], dfilter = _a[1];
                    expect(dx.shape).toEqual(x.shape);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(),
                        [-3, 2, 1, -8, 1.5, 0.5, -4, 1, 0, -3, 2, 1, -8, 1.5, 0.5, -4, 1, 0]]);
                    expect(dfilter.shape).toEqual(filterShape);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dfilter.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [26, 38, 62, 74]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient x=[2,3,3,1] f=[2,2,1,1] s=1 p=0 with bias', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputDepth, outputDepth, inputShape, filterSize, strides, pad, filterShape, filter, bias, x, dy, fusedGrads, _a, dxFused, dfilterFused, dbiasFused, grads, _b, dx, dfilter, dbias, _c, _d, _e, _f, _g, _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    inputDepth = 1;
                    outputDepth = 1;
                    inputShape = [2, 3, 3, inputDepth];
                    filterSize = 2;
                    strides = 1;
                    pad = 0;
                    filterShape = [filterSize, filterSize, inputDepth, outputDepth];
                    filter = tf.tensor4d([-1, 1, -2, 0.5], filterShape);
                    bias = tf.ones([2, 2, 2, 1]);
                    x = tf.tensor4d([1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9], inputShape);
                    dy = tf.tensor4d([3, 1, 2, 0, 3, 1, 2, 0], [2, 2, 2, 1]);
                    fusedGrads = tf.grads(function (x, w, b) { return tf.fused.conv2d({
                        x: x,
                        filter: w,
                        strides: strides,
                        pad: pad,
                        dataFormat: 'NHWC',
                        dilations: [1, 1],
                        bias: b
                    }); });
                    _a = fusedGrads([x, filter, bias], dy), dxFused = _a[0], dfilterFused = _a[1], dbiasFused = _a[2];
                    grads = tf.grads(function (x, filter, bias) {
                        var conv = tf.conv2d(x, filter, strides, pad);
                        var sum = tf.add(conv, bias);
                        return sum;
                    });
                    _b = grads([x, filter, bias], dy), dx = _b[0], dfilter = _b[1], dbias = _b[2];
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dxFused.array()];
                case 1:
                    _d = [_j.sent()];
                    return [4 /*yield*/, dx.array()];
                case 2:
                    _c.apply(void 0, _d.concat([_j.sent()]));
                    _e = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dfilterFused.array()];
                case 3:
                    _f = [_j.sent()];
                    return [4 /*yield*/, dfilter.array()];
                case 4:
                    _e.apply(void 0, _f.concat([_j.sent()]));
                    _g = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dbiasFused.array()];
                case 5:
                    _h = [_j.sent()];
                    return [4 /*yield*/, dbias.array()];
                case 6:
                    _g.apply(void 0, _h.concat([_j.sent()]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient x=[2,3,3,1] f=[2,2,1,1] s=1 p=0 with bias and relu', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputDepth, outputDepth, inputShape, filterSize, strides, pad, filterShape, filter, bias, x, dy, fusedGrads, _a, dxFused, dfilterFused, dbiasFused, grads, _b, dx, dfilter, dbias, _c, _d, _e, _f, _g, _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    inputDepth = 1;
                    outputDepth = 1;
                    inputShape = [2, 3, 3, inputDepth];
                    filterSize = 2;
                    strides = 1;
                    pad = 0;
                    filterShape = [filterSize, filterSize, inputDepth, outputDepth];
                    filter = tf.tensor4d([-1, 1, -2, 0.5], filterShape);
                    bias = tf.ones([2, 2, 2, 1]);
                    x = tf.tensor4d([1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9], inputShape);
                    dy = tf.tensor4d([3, 1, 2, 0, 3, 1, 2, 0], [2, 2, 2, 1]);
                    fusedGrads = tf.grads(function (x, w, b) { return tf.fused.conv2d({
                        x: x,
                        filter: w,
                        strides: strides,
                        pad: pad,
                        dataFormat: 'NHWC',
                        dilations: [1, 1],
                        bias: b,
                        activation: 'relu'
                    }); });
                    _a = fusedGrads([x, filter, bias], dy), dxFused = _a[0], dfilterFused = _a[1], dbiasFused = _a[2];
                    grads = tf.grads(function (x, filter, bias) {
                        var conv = tf.conv2d(x, filter, strides, pad);
                        var sum = tf.add(conv, bias);
                        return tf.relu(sum);
                    });
                    _b = grads([x, filter, bias], dy), dx = _b[0], dfilter = _b[1], dbias = _b[2];
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dxFused.array()];
                case 1:
                    _d = [_j.sent()];
                    return [4 /*yield*/, dx.array()];
                case 2:
                    _c.apply(void 0, _d.concat([_j.sent()]));
                    _e = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dfilterFused.array()];
                case 3:
                    _f = [_j.sent()];
                    return [4 /*yield*/, dfilter.array()];
                case 4:
                    _e.apply(void 0, _f.concat([_j.sent()]));
                    _g = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dbiasFused.array()];
                case 5:
                    _h = [_j.sent()];
                    return [4 /*yield*/, dbias.array()];
                case 6:
                    _g.apply(void 0, _h.concat([_j.sent()]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient x=[2,3,3,1] f=[2,2,1,1] s=1 p=0 with bias and elu', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputDepth, outputDepth, inputShape, filterSize, strides, pad, filterShape, filter, bias, x, dy, fusedGrads, _a, dxFused, dfilterFused, dbiasFused, grads, _b, dx, dfilter, dbias, _c, _d, _e, _f, _g, _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    inputDepth = 1;
                    outputDepth = 1;
                    inputShape = [2, 3, 3, inputDepth];
                    filterSize = 2;
                    strides = 1;
                    pad = 0;
                    filterShape = [filterSize, filterSize, inputDepth, outputDepth];
                    filter = tf.tensor4d([-1, 1, -2, 0.5], filterShape);
                    bias = tf.ones([2, 2, 2, 1]);
                    x = tf.tensor4d([1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9], inputShape);
                    dy = tf.tensor4d([3, 1, 2, 0, 3, 1, 2, 0], [2, 2, 2, 1]);
                    fusedGrads = tf.grads(function (x, w, b) { return tf.fused.conv2d({
                        x: x,
                        filter: w,
                        strides: strides,
                        pad: pad,
                        dataFormat: 'NHWC',
                        dilations: [1, 1],
                        bias: b,
                        activation: 'elu'
                    }); });
                    _a = fusedGrads([x, filter, bias], dy), dxFused = _a[0], dfilterFused = _a[1], dbiasFused = _a[2];
                    grads = tf.grads(function (x, filter, bias) {
                        var conv = tf.conv2d(x, filter, strides, pad);
                        var sum = tf.add(conv, bias);
                        return tf.elu(sum);
                    });
                    _b = grads([x, filter, bias], dy), dx = _b[0], dfilter = _b[1], dbias = _b[2];
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dxFused.array()];
                case 1:
                    _d = [_j.sent()];
                    return [4 /*yield*/, dx.array()];
                case 2:
                    _c.apply(void 0, _d.concat([_j.sent()]));
                    _e = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dfilterFused.array()];
                case 3:
                    _f = [_j.sent()];
                    return [4 /*yield*/, dfilter.array()];
                case 4:
                    _e.apply(void 0, _f.concat([_j.sent()]));
                    _g = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dbiasFused.array()];
                case 5:
                    _h = [_j.sent()];
                    return [4 /*yield*/, dbias.array()];
                case 6:
                    _g.apply(void 0, _h.concat([_j.sent()]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('fused matmul with relu6 and gradients', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, transposeA, transposeB, fusedGrads, _a, fusedDa, fusedDb, grads, _b, da, db, _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 10, 20, -30], [2, 3]);
                    b = tf.tensor2d([2, 3, 4, -1, 2, 3], [3, 2]);
                    dy = tf.tensor2d([1, 10, 20, 30], [2, 2]);
                    transposeA = false;
                    transposeB = false;
                    fusedGrads = tf.grads(function (a, b) {
                        return tf.fused.matMul({ a: a, b: b, transposeA: transposeA, transposeB: transposeB, bias: null, activation: 'relu6' });
                    });
                    _a = fusedGrads([a, b], dy), fusedDa = _a[0], fusedDb = _a[1];
                    grads = tf.grads(function (a, b) {
                        var prod = tf.matMul(a, b, transposeA, transposeB);
                        return tf.relu6(prod);
                    });
                    _b = grads([a, b], dy), da = _b[0], db = _b[1];
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.array()];
                case 1:
                    _d = [_g.sent()];
                    return [4 /*yield*/, fusedDa.array()];
                case 2:
                    _c.apply(void 0, _d.concat([_g.sent()]));
                    _e = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 3:
                    _f = [_g.sent()];
                    return [4 /*yield*/, fusedDb.array()];
                case 4:
                    _e.apply(void 0, _f.concat([_g.sent()]));
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=fused_test.js.map