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
var tf = require("./index");
var jasmine_util_1 = require("./jasmine_util");
var test_util_1 = require("./test_util");
jasmine_util_1.describeWithFlags('kernel_registry', jasmine_util_1.ALL_ENVS, function () {
    it('register a kernel and call it', function () {
        var called = false;
        tf.registerKernel({
            kernelName: 'MyKernel',
            backendName: tf.getBackend(),
            kernelFunc: function (_a) {
                var inputs = _a.inputs, attrs = _a.attrs;
                expect(attrs.a).toBe(5);
                expect(inputs.x.shape).toEqual([2, 2]);
                expect(inputs.x.dtype).toBe('float32');
                called = true;
                return { dtype: 'float32', shape: [3, 3], dataId: {} };
            }
        });
        var inputs = { x: tf.zeros([2, 2]) };
        var attrs = { a: 5 };
        var res = tf.engine().runKernel('MyKernel', inputs, attrs);
        expect(called).toBe(true);
        expect(res.dtype).toBe('float32');
        expect(res.shape).toEqual([3, 3]);
        tf.unregisterKernel('MyKernel', tf.getBackend());
    });
    it('errors when running non-existent kernel', function () {
        var inputs = {};
        var attrs = {};
        expect(function () { return tf.engine().runKernel('DoesNotExist', inputs, attrs); })
            .toThrowError();
    });
    it('errors when registering the same kernel twice', function () {
        tf.registerKernel({
            kernelName: 'MyKernel',
            backendName: tf.getBackend(),
            kernelFunc: function () {
                return null;
            }
        });
        expect(function () { return tf.registerKernel({
            kernelName: 'MyKernel',
            backendName: tf.getBackend(),
            kernelFunc: function () {
                return null;
            }
        }); }).toThrowError();
        tf.unregisterKernel('MyKernel', tf.getBackend());
    });
    it('register same kernel on two different backends', function () {
        tf.registerBackend('backend1', function () {
            return {
                id: 1,
                dispose: function () { return null; },
                disposeData: function (dataId) { return null; },
                numDataIds: function () { return 0; }
            };
        });
        tf.registerBackend('backend2', function () {
            return {
                id: 2,
                dispose: function () { return null; },
                disposeData: function (dataId) { return null; },
                numDataIds: function () { return 0; }
            };
        });
        var lastStorageId = -1;
        var kernelFunc = function (_a) {
            var backend = _a.backend;
            lastStorageId = backend.id;
            return { dataId: {}, shape: [], dtype: 'float32' };
        };
        tf.registerKernel({ kernelName: 'MyKernel', backendName: 'backend1', kernelFunc: kernelFunc });
        tf.registerKernel({ kernelName: 'MyKernel', backendName: 'backend2', kernelFunc: kernelFunc });
        // No kernel has been executed yet.
        expect(lastStorageId).toBe(-1);
        // Kernel was executed on the first backend.
        tf.setBackend('backend1');
        tf.engine().runKernel('MyKernel', {}, {});
        expect(lastStorageId).toBe(1);
        // Kernel was executed on the second backend.
        tf.setBackend('backend2');
        tf.engine().runKernel('MyKernel', {}, {});
        expect(lastStorageId).toBe(2);
        tf.removeBackend('backend1');
        tf.removeBackend('backend2');
        tf.unregisterKernel('MyKernel', 'backend1');
        tf.unregisterKernel('MyKernel', 'backend2');
    });
    it('register kernel with setup and dispose functions', function () {
        var backendName = 'custom-backend';
        var kernelName = 'MyKernel';
        var customBackend = {
            dispose: function () { return null; },
            disposeData: function (dataId) { return null; },
            numDataIds: function () { return 0; }
        };
        tf.registerBackend(backendName, function () { return customBackend; });
        var kernelFunc = function () {
            return { dataId: {}, shape: [], dtype: 'float32' };
        };
        var setupCalled = false;
        var setupFunc = function (backend) {
            expect(backend).toBe(customBackend);
            setupCalled = true;
        };
        var disposeCalled = false;
        var disposeFunc = function (backend) {
            expect(backend).toBe(customBackend);
            disposeCalled = true;
        };
        tf.registerKernel({ kernelName: kernelName, backendName: backendName, kernelFunc: kernelFunc, setupFunc: setupFunc, disposeFunc: disposeFunc });
        expect(setupCalled).toBe(false);
        expect(disposeCalled).toBe(false);
        tf.setBackend(backendName);
        expect(setupCalled).toBe(true);
        expect(disposeCalled).toBe(false);
        // Kernel was executed on the first backend.
        tf.engine().runKernel(kernelName, {}, {});
        tf.removeBackend(backendName);
        expect(setupCalled).toBe(true);
        expect(disposeCalled).toBe(true);
        tf.unregisterKernel(kernelName, backendName);
    });
});
jasmine_util_1.describeWithFlags('gradient registry', jasmine_util_1.ALL_ENVS, function () {
    it('register a kernel with gradient and call it', function () { return __awaiter(_this, void 0, void 0, function () {
        var kernelWasCalled, gradientWasCalled, kernelName, x, gradFunc, dx, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    kernelWasCalled = false;
                    gradientWasCalled = false;
                    kernelName = 'MyKernel';
                    x = tf.zeros([2, 2]);
                    tf.registerKernel({
                        kernelName: kernelName,
                        backendName: tf.getBackend(),
                        kernelFunc: function () {
                            kernelWasCalled = true;
                            return { dtype: 'float32', shape: [3, 3], dataId: {} };
                        }
                    });
                    tf.registerGradient({
                        kernelName: kernelName,
                        inputsToSave: ['x'],
                        gradFunc: function (dy, saved) {
                            // Make sure saved input (x) was passed to the gradient function.
                            expect(saved[0].dataId).toEqual(x.dataId);
                            // Make sure dy matches the shape of the output.
                            expect(dy.shape).toEqual([3, 3]);
                            gradientWasCalled = true;
                            return { x: function () { return tf.fill([2, 2], 3); } };
                        },
                    });
                    gradFunc = tf.grad(function (x) { return tf.engine().runKernel(kernelName, { x: x }, {} /* attrs */, [x] /* inputsToSave */); });
                    dx = gradFunc(x);
                    expect(kernelWasCalled).toBe(true);
                    expect(gradientWasCalled).toBe(true);
                    expect(dx.dtype).toBe('float32');
                    expect(dx.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, 3, 3, 3]]);
                    tf.unregisterKernel(kernelName, tf.getBackend());
                    tf.unregisterGradient(kernelName);
                    return [2 /*return*/];
            }
        });
    }); });
    it('register a kernel with gradient that specifies outputsToSave and call it', function () { return __awaiter(_this, void 0, void 0, function () {
        var kernelWasCalled, gradientWasCalled, kernelName, forwardReturnDataId, gradFunc, x, dx;
        return __generator(this, function (_a) {
            kernelWasCalled = false;
            gradientWasCalled = false;
            kernelName = 'MyKernel';
            forwardReturnDataId = {};
            tf.registerKernel({
                kernelName: kernelName,
                backendName: tf.getBackend(),
                kernelFunc: function () {
                    kernelWasCalled = true;
                    return {
                        dtype: 'float32',
                        shape: [3, 3],
                        dataId: forwardReturnDataId
                    };
                }
            });
            tf.registerGradient({
                kernelName: kernelName,
                outputsToSave: [true],
                gradFunc: function (dy, saved) {
                    // Make sure saved output was passed to the gradient function.
                    expect(saved[0].dataId).toEqual(forwardReturnDataId);
                    // Make sure dy matches the shape of the output.
                    expect(dy.shape).toEqual([3, 3]);
                    gradientWasCalled = true;
                    return { x: function () { return tf.fill([2, 2], 3); } };
                },
            });
            gradFunc = tf.grad(function (x) { return tf.engine().runKernel(kernelName, { x: x }, {} /* attrs */); });
            x = tf.zeros([2, 2]);
            dx = gradFunc(x);
            expect(kernelWasCalled).toBe(true);
            expect(gradientWasCalled).toBe(true);
            expect(dx.dtype).toBe('float32');
            expect(dx.shape).toEqual([2, 2]);
            tf.unregisterKernel(kernelName, tf.getBackend());
            tf.unregisterGradient(kernelName);
            return [2 /*return*/];
        });
    }); });
    it('register a kernel with array inputs and saveAllInputs true', function () { return __awaiter(_this, void 0, void 0, function () {
        var kernelWasCalled, gradientWasCalled, kernelName, x, forwardReturnDataId, z, gradFunc, dx, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    kernelWasCalled = false;
                    gradientWasCalled = false;
                    kernelName = 'MyKernel';
                    x = [tf.zeros([2, 2]), tf.zeros([2, 2])];
                    forwardReturnDataId = {};
                    tf.registerKernel({
                        kernelName: kernelName,
                        backendName: tf.getBackend(),
                        kernelFunc: function () {
                            kernelWasCalled = true;
                            return { dtype: 'float32', shape: [3, 3], dataId: forwardReturnDataId };
                        }
                    });
                    tf.registerGradient({
                        kernelName: kernelName,
                        saveAllInputs: true,
                        gradFunc: function (dy, saved) {
                            // Make sure saved input (x) was passed to the gradient function.
                            var $x0 = x[0], $x1 = x[1];
                            expect(saved.length).toEqual(x.length);
                            expect($x0.dataId).toEqual(x[0].dataId);
                            expect($x1.dataId).toEqual(x[1].dataId);
                            gradientWasCalled = true;
                            return { 0: function () { return tf.fill([2, 2], 3); }, 1: function () { return tf.fill([2, 2], 3); } };
                        }
                    });
                    z = function () {
                        var x = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            x[_i] = arguments[_i];
                        }
                        return tf.engine().runKernel(kernelName, x, {} /* attrs */);
                    };
                    gradFunc = tf.grads(z);
                    dx = gradFunc(x);
                    expect(kernelWasCalled).toBe(true);
                    expect(gradientWasCalled).toBe(true);
                    expect(dx.length).toEqual(2);
                    expect(dx[0].dtype).toBe('float32');
                    expect(dx[0].shape).toEqual([2, 2]);
                    expect(dx[1].dtype).toBe('float32');
                    expect(dx[1].shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx[0].data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [3, 3, 3, 3]]);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx[1].data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [3, 3, 3, 3]]);
                    tf.unregisterKernel(kernelName, tf.getBackend());
                    tf.unregisterGradient(kernelName);
                    return [2 /*return*/];
            }
        });
    }); });
    it('register a kernel with map inputs and saveAllInputs true should throw ' +
        'error', function () { return __awaiter(_this, void 0, void 0, function () {
        var kernelName, x0, x1, forwardReturnDataId, z, gradFunc;
        return __generator(this, function (_a) {
            kernelName = 'MyKernel';
            x0 = tf.zeros([2, 2]);
            x1 = tf.zeros([2, 2]);
            forwardReturnDataId = {};
            tf.registerKernel({
                kernelName: kernelName,
                backendName: tf.getBackend(),
                kernelFunc: function () {
                    return {
                        dtype: 'float32',
                        shape: [3, 3],
                        dataId: forwardReturnDataId
                    };
                }
            });
            tf.registerGradient({
                kernelName: kernelName,
                saveAllInputs: true,
                gradFunc: function (dy, saved) {
                    // Make sure saved input (x) was passed to the gradient function.
                    var $x0 = saved[0], $x1 = saved[1];
                    expect($x0.dataId).toEqual(x0.dataId);
                    expect($x1.dataId).toEqual(x1.dataId);
                    return { x0: function () { return tf.fill([2, 2], 3); }, x1: function () { return tf.fill([2, 2], 3); } };
                }
            });
            z = function (x0, x1) {
                return tf.engine().runKernel(kernelName, { x0: x0, x1: x1 }, {} /* attrs */);
            };
            gradFunc = tf.grads(z);
            expect(function () { return gradFunc([x0, x1]); })
                .toThrowError(/saveAllInputs is true, expected inputs to be an array/);
            tf.unregisterKernel(kernelName, tf.getBackend());
            tf.unregisterGradient(kernelName);
            return [2 /*return*/];
        });
    }); });
    it('errors when running non-existent gradient', function () {
        var kernelName = 'MyKernel';
        var x = tf.zeros([2, 2]);
        tf.registerKernel({
            kernelName: kernelName,
            backendName: tf.getBackend(),
            kernelFunc: function () { return ({ dtype: 'float32', shape: [3, 3], dataId: {} }); }
        });
        var gradFunc = tf.grad(function (x) { return tf.engine().runKernel(kernelName, { x: x }, {} /* attrs */, [x] /* inputsToSave */); });
        expect(function () { return gradFunc(x); })
            .toThrowError(/gradient function not found for MyKernel/);
        tf.unregisterKernel(kernelName, tf.getBackend());
    });
    it('warning when registering the same gradient twice', function () {
        var kernelName = 'MyKernel';
        tf.registerGradient({ kernelName: kernelName, gradFunc: function () { return null; } });
        spyOn(console, 'warn').and.callFake(function (msg) {
            expect(msg).toBe('Overriding the gradient for \'MyKernel\'');
        });
        tf.registerGradient({ kernelName: kernelName, gradFunc: function () { return null; } });
        tf.unregisterGradient(kernelName);
    });
});
//# sourceMappingURL=kernel_registry_test.js.map