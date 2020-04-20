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
jasmine_util_1.describeWithFlags('addN', jasmine_util_1.ALL_ENVS, function () {
    it('a single tensor', function () { return __awaiter(_this, void 0, void 0, function () {
        var res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    res = tf.addN([tf.tensor1d([1, 2, 3])]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('two tensors, int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    res = tf.addN([
                        tf.tensor1d([1, 2, -1], 'int32'),
                        tf.tensor1d([5, 3, 2], 'int32'),
                    ]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [6, 5, 1]]);
                    expect(res.dtype).toBe('int32');
                    expect(res.shape).toEqual([3]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('three tensors', function () { return __awaiter(_this, void 0, void 0, function () {
        var res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    res = tf.addN([
                        tf.tensor1d([1, 2]),
                        tf.tensor1d([5, 3]),
                        tf.tensor1d([-5, -2]),
                    ]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 3]]);
                    expect(res.dtype).toBe('float32');
                    expect(res.shape).toEqual([2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    res = tf.addN([[1, 2], [3, 4]]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 6]]);
                    expect(res.dtype).toBe('float32');
                    expect(res.shape).toEqual([2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('list of numbers gets treated as a list of scalars', function () { return __awaiter(_this, void 0, void 0, function () {
        var res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    res = tf.addN([1, 2, 3, 4]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [10]]);
                    expect(res.dtype).toBe('float32');
                    expect(res.shape).toEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('errors if list is empty', function () {
        expect(function () { return tf.addN([]); })
            .toThrowError(/Must pass at least one tensor to tf.addN\(\), but got 0/);
    });
    it('errors if argument is not an array', function () {
        // tslint:disable-next-line:no-any
        expect(function () { return tf.addN(tf.scalar(3)); })
            .toThrowError(/The argument passed to tf.addN\(\) must be a list of tensors/);
    });
    it('errors if arguments not of same dtype', function () {
        expect(function () { return tf.addN([tf.scalar(1, 'int32'), tf.scalar(2, 'float32')]); })
            .toThrowError(/All tensors passed to tf.addN\(\) must have the same dtype/);
    });
    it('errors if arguments not of same shape', function () {
        expect(function () { return tf.addN([tf.scalar(1), tf.tensor1d([2])]); })
            .toThrowError(/All tensors passed to tf.addN\(\) must have the same shape/);
    });
});
//# sourceMappingURL=add_n_test.js.map