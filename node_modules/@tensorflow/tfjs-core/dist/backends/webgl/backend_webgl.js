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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
// Import webgl flags.
require("./flags_webgl");
var device_util = require("../../device_util");
var engine_1 = require("../../engine");
var environment_1 = require("../../environment");
var globals_1 = require("../../globals");
var log_1 = require("../../log");
var array_ops_1 = require("../../ops/array_ops");
var array_ops_util = require("../../ops/array_ops_util");
var axis_util = require("../../ops/axis_util");
var complex_ops_1 = require("../../ops/complex_ops");
var concat_util_1 = require("../../ops/concat_util");
var div_1 = require("../../ops/div");
var gather_nd_util = require("../../ops/gather_nd_util");
var reduce_util = require("../../ops/reduce_util");
var scatter_nd_util = require("../../ops/scatter_nd_util");
var segment_util = require("../../ops/segment_util");
var slice_util = require("../../ops/slice_util");
var softmax_1 = require("../../ops/softmax");
var tensor_ops_1 = require("../../ops/tensor_ops");
var transpose_1 = require("../../ops/transpose");
var types_1 = require("../../types");
var util = require("../../util");
var util_1 = require("../../util");
var backend_1 = require("../backend");
var backend_util = require("../backend_util");
var complex_util_1 = require("../complex_util");
var non_max_suppression_impl_1 = require("../non_max_suppression_impl");
var split_shared_1 = require("../split_shared");
var tile_impl_1 = require("../tile_impl");
var topk_impl_1 = require("../topk_impl");
var where_impl_1 = require("../where_impl");
var addn_gpu_1 = require("./addn_gpu");
var addn_packed_gpu_1 = require("./addn_packed_gpu");
var argminmax_gpu_1 = require("./argminmax_gpu");
var argminmax_packed_gpu_1 = require("./argminmax_packed_gpu");
var avg_pool_backprop_gpu_1 = require("./avg_pool_backprop_gpu");
var batchnorm_gpu_1 = require("./batchnorm_gpu");
var batchnorm_packed_gpu_1 = require("./batchnorm_packed_gpu");
var binaryop_complex_gpu = require("./binaryop_complex_gpu");
var binaryop_complex_gpu_1 = require("./binaryop_complex_gpu");
var binaryop_gpu = require("./binaryop_gpu");
var binaryop_gpu_1 = require("./binaryop_gpu");
var binaryop_packed_gpu = require("./binaryop_packed_gpu");
var binaryop_packed_gpu_1 = require("./binaryop_packed_gpu");
var canvas_util_1 = require("./canvas_util");
var clip_gpu_1 = require("./clip_gpu");
var clip_packed_gpu_1 = require("./clip_packed_gpu");
var complex_abs_gpu_1 = require("./complex_abs_gpu");
var concat_gpu_1 = require("./concat_gpu");
var concat_packed_gpu_1 = require("./concat_packed_gpu");
var conv_backprop_gpu_1 = require("./conv_backprop_gpu");
var conv_backprop_gpu_depthwise_1 = require("./conv_backprop_gpu_depthwise");
var conv_gpu_1 = require("./conv_gpu");
var conv_gpu_depthwise_1 = require("./conv_gpu_depthwise");
var conv_packed_gpu_depthwise_1 = require("./conv_packed_gpu_depthwise");
var crop_and_resize_gpu_1 = require("./crop_and_resize_gpu");
var cumsum_gpu_1 = require("./cumsum_gpu");
var decode_matrix_gpu_1 = require("./decode_matrix_gpu");
var decode_matrix_packed_gpu_1 = require("./decode_matrix_packed_gpu");
var depth_to_space_gpu_1 = require("./depth_to_space_gpu");
var diag_gpu_1 = require("./diag_gpu");
var encode_float_gpu_1 = require("./encode_float_gpu");
var encode_float_packed_gpu_1 = require("./encode_float_packed_gpu");
var encode_matrix_gpu_1 = require("./encode_matrix_gpu");
var encode_matrix_packed_gpu_1 = require("./encode_matrix_packed_gpu");
var fft_gpu = require("./fft_gpu");
var fft_gpu_1 = require("./fft_gpu");
var fill_gpu_1 = require("./fill_gpu");
var gather_gpu_1 = require("./gather_gpu");
var gather_nd_gpu_1 = require("./gather_nd_gpu");
var gpgpu_context_1 = require("./gpgpu_context");
var gpgpu_math = require("./gpgpu_math");
var im2col_packed_gpu_1 = require("./im2col_packed_gpu");
var lrn_gpu_1 = require("./lrn_gpu");
var lrn_grad_gpu_1 = require("./lrn_grad_gpu");
var lrn_packed_gpu_1 = require("./lrn_packed_gpu");
var max_pool_backprop_gpu_1 = require("./max_pool_backprop_gpu");
var mulmat_packed_gpu_1 = require("./mulmat_packed_gpu");
var multinomial_gpu_1 = require("./multinomial_gpu");
var onehot_gpu_1 = require("./onehot_gpu");
var pack_gpu_1 = require("./pack_gpu");
var pad_gpu_1 = require("./pad_gpu");
var pad_packed_gpu_1 = require("./pad_packed_gpu");
var pool_gpu_1 = require("./pool_gpu");
var reduce_gpu_1 = require("./reduce_gpu");
var reshape_packed_gpu_1 = require("./reshape_packed_gpu");
var resize_bilinear_backprop_gpu_1 = require("./resize_bilinear_backprop_gpu");
var resize_bilinear_gpu_1 = require("./resize_bilinear_gpu");
var resize_bilinear_packed_gpu_1 = require("./resize_bilinear_packed_gpu");
var resize_nearest_neighbor_backprop_gpu_1 = require("./resize_nearest_neighbor_backprop_gpu");
var resize_nearest_neighbor_gpu_1 = require("./resize_nearest_neighbor_gpu");
var reverse_gpu_1 = require("./reverse_gpu");
var reverse_packed_gpu_1 = require("./reverse_packed_gpu");
var scatter_gpu_1 = require("./scatter_gpu");
var segment_gpu_1 = require("./segment_gpu");
var select_gpu_1 = require("./select_gpu");
var slice_gpu_1 = require("./slice_gpu");
var slice_packed_gpu_1 = require("./slice_packed_gpu");
var strided_slice_gpu_1 = require("./strided_slice_gpu");
var tex_util = require("./tex_util");
var tex_util_1 = require("./tex_util");
var texture_manager_1 = require("./texture_manager");
var tile_gpu_1 = require("./tile_gpu");
var unary_op = require("./unaryop_gpu");
var unaryop_gpu_1 = require("./unaryop_gpu");
var unary_packed_op = require("./unaryop_packed_gpu");
var unaryop_packed_gpu_1 = require("./unaryop_packed_gpu");
var unpack_gpu_1 = require("./unpack_gpu");
var webgl_util = require("./webgl_util");
var binaryCaches = {};
function getBinaryCache(webGLVersion) {
    if (webGLVersion in binaryCaches) {
        return binaryCaches[webGLVersion];
    }
    binaryCaches[webGLVersion] = {};
    return binaryCaches[webGLVersion];
}
exports.getBinaryCache = getBinaryCache;
function mapActivationToShaderProgram(activation, packed) {
    if (packed === void 0) { packed = false; }
    if (activation === 'linear') {
        if (packed) {
            return unary_packed_op.LINEAR;
        }
        return unary_op.LINEAR;
    }
    else if (activation === 'relu') {
        if (packed) {
            return unary_packed_op.RELU;
        }
        return unary_op.RELU;
    }
    else if (activation === 'elu') {
        if (packed) {
            return unary_packed_op.ELU;
        }
        return unary_op.ELU;
    }
    else if (activation === 'relu6') {
        if (packed) {
            return unary_packed_op.RELU6;
        }
        return unary_op.RELU6;
    }
    else if (activation === 'prelu') {
        if (packed) {
            return binaryop_packed_gpu.PRELU;
        }
        return binaryop_gpu.PRELU;
    }
    throw new Error("Activation " + activation + " has not been implemented for the WebGL backend.");
}
// Empirically determined constant used to determine size threshold for handing
// off execution to the CPU.
var CPU_HANDOFF_SIZE_THRESHOLD = 128;
// Empirically determined constant used to decide the number of MB on GPU
// before we warn about high memory use. The MB are this constant * screen area
// * dpi / 1024 / 1024.
var BEFORE_PAGING_CONSTANT = 600;
function numMBBeforeWarning() {
    if (environment_1.env().global.screen == null) {
        return 1024; // 1 GB.
    }
    return (environment_1.env().global.screen.height * environment_1.env().global.screen.width *
        window.devicePixelRatio) *
        BEFORE_PAGING_CONSTANT / 1024 / 1024;
}
// Empirically determined minimal shared dimension in matmul before we forward
// to a.mul(b).sum() in order to take advantage of GPU parallelism. See
// https://github.com/tensorflow/tfjs-core/pull/1379 for benchmarks.
exports.MATMUL_SHARED_DIM_THRESHOLD = 1000;
var MathBackendWebGL = /** @class */ (function (_super) {
    __extends(MathBackendWebGL, _super);
    function MathBackendWebGL(gpgpu) {
        var _this = _super.call(this) || this;
        // Maps data ids that have a pending read operation, to list of subscribers.
        _this.pendingRead = new WeakMap();
        // List of data ids that are scheduled for disposal, but are waiting on a
        // pending read operation.
        _this.pendingDisposal = new WeakSet();
        // Used to count the number of 'shallow' sliced tensors that point to the
        // same data id.
        _this.dataRefCount = new WeakMap();
        _this.numBytesInGPU = 0;
        // Accumulated time spent (including blocking) in uploading data to webgl.
        _this.uploadWaitMs = 0;
        // Accumulated time spent (including blocking in downloading data from webgl.
        _this.downloadWaitMs = 0;
        _this.warnedAboutMemory = false;
        _this.pendingDeletes = 0;
        _this.disposed = false;
        if (!environment_1.env().getBool('HAS_WEBGL')) {
            throw new Error('WebGL is not supported on this device');
        }
        if (gpgpu == null) {
            var gl = canvas_util_1.getWebGLContext(environment_1.env().getNumber('WEBGL_VERSION'));
            _this.binaryCache = getBinaryCache(environment_1.env().getNumber('WEBGL_VERSION'));
            _this.gpgpu = new gpgpu_context_1.GPGPUContext(gl);
            _this.canvas = gl.canvas;
            _this.gpgpuCreatedLocally = true;
        }
        else {
            _this.gpgpu = gpgpu;
            _this.binaryCache = {};
            _this.gpgpuCreatedLocally = false;
            _this.canvas = gpgpu.gl.canvas;
        }
        _this.textureManager = new texture_manager_1.TextureManager(_this.gpgpu);
        _this.numMBBeforeWarning = numMBBeforeWarning();
        _this.texData = new backend_1.DataStorage(_this, engine_1.ENGINE);
        return _this;
    }
    MathBackendWebGL.prototype.numDataIds = function () {
        return this.texData.numDataIds() +
            (this.cpuBackend ? this.cpuBackend.numDataIds() : 0) -
            this.pendingDeletes;
    };
    MathBackendWebGL.prototype.write = function (values, shape, dtype) {
        if (environment_1.env().getBool('DEBUG')) {
            this.checkNumericalProblems(values);
        }
        if (dtype === 'complex64' && values != null) {
            throw new Error("Cannot write to a complex64 dtype. " +
                "Please use tf.complex(real, imag).");
        }
        var dataId = {};
        this.texData.set(dataId, { shape: shape, dtype: dtype, values: values, usage: tex_util_1.TextureUsage.UPLOAD });
        return dataId;
    };
    MathBackendWebGL.prototype.move = function (dataId, values, shape, dtype) {
        if (environment_1.env().getBool('DEBUG')) {
            this.checkNumericalProblems(values);
        }
        if (dtype === 'complex64') {
            throw new Error("Cannot write to a complex64 dtype. " +
                "Please use tf.complex(real, imag).");
        }
        this.texData.set(dataId, { shape: shape, dtype: dtype, values: values, usage: tex_util_1.TextureUsage.UPLOAD });
    };
    MathBackendWebGL.prototype.readSync = function (dataId) {
        var texData = this.texData.get(dataId);
        var values = texData.values, dtype = texData.dtype, complexTensors = texData.complexTensors, slice = texData.slice, shape = texData.shape, isPacked = texData.isPacked;
        if (slice != null) {
            var program = void 0;
            if (isPacked) {
                program = new unaryop_packed_gpu_1.UnaryOpPackedProgram(shape, unary_op.CLONE);
            }
            else {
                program = new unaryop_gpu_1.UnaryOpProgram(shape, unary_op.CLONE);
            }
            var res = this.runWebGLProgram(program, [{ dataId: dataId, shape: shape, dtype: dtype }], dtype);
            var data = this.readSync(res.dataId);
            this.disposeData(res.dataId);
            return data;
        }
        if (values != null) {
            return this.convertAndCacheOnCPU(dataId);
        }
        if (dtype === 'string') {
            return values;
        }
        var shouldTimeProgram = this.activeTimers != null;
        var start;
        if (shouldTimeProgram) {
            start = util.now();
        }
        var result;
        if (dtype === 'complex64') {
            var realValues = complexTensors.real.dataSync();
            var imagValues = complexTensors.imag.dataSync();
            result = complex_util_1.mergeRealAndImagArrays(realValues, imagValues);
        }
        else {
            result = this.getValuesFromTexture(dataId);
        }
        if (shouldTimeProgram) {
            this.downloadWaitMs += util.now() - start;
        }
        return this.convertAndCacheOnCPU(dataId, result);
    };
    MathBackendWebGL.prototype.read = function (dataId) {
        return __awaiter(this, void 0, void 0, function () {
            var subscribers_1, texData, values, shape, slice, dtype, complexTensors, isPacked, program, res, data, buffer, tmpDownloadTarget, tmpData, vals, ps, realValues, imagValues, size, dTypeVals, subscribers;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.pendingRead.has(dataId)) {
                            subscribers_1 = this.pendingRead.get(dataId);
                            return [2 /*return*/, new Promise(function (resolve) { return subscribers_1.push(resolve); })];
                        }
                        texData = this.texData.get(dataId);
                        values = texData.values, shape = texData.shape, slice = texData.slice, dtype = texData.dtype, complexTensors = texData.complexTensors, isPacked = texData.isPacked;
                        if (slice != null) {
                            program = void 0;
                            if (isPacked) {
                                program = new unaryop_packed_gpu_1.UnaryOpPackedProgram(shape, unary_op.CLONE);
                            }
                            else {
                                program = new unaryop_gpu_1.UnaryOpProgram(shape, unary_op.CLONE);
                            }
                            res = this.runWebGLProgram(program, [{ dataId: dataId, shape: shape, dtype: dtype }], dtype);
                            data = this.read(res.dataId);
                            this.disposeData(res.dataId);
                            return [2 /*return*/, data];
                        }
                        if (values != null) {
                            return [2 /*return*/, this.convertAndCacheOnCPU(dataId)];
                        }
                        if (!environment_1.env().getBool('WEBGL_DOWNLOAD_FLOAT_ENABLED') &&
                            environment_1.env().getNumber('WEBGL_VERSION') === 2) {
                            throw new Error("tensor.data() with WEBGL_DOWNLOAD_FLOAT_ENABLED=false and " +
                                "WEBGL_VERSION=2 not yet supported.");
                        }
                        buffer = null;
                        if (dtype !== 'complex64' && environment_1.env().get('WEBGL_BUFFER_SUPPORTED')) {
                            // Possibly copy the texture into a buffer before inserting a fence.
                            tmpDownloadTarget = this.decode(dataId);
                            tmpData = this.texData.get(tmpDownloadTarget.dataId);
                            buffer = (_a = this.gpgpu).createBufferFromTexture.apply(_a, [tmpData.texture].concat(tex_util.getDenseTexShape(shape)));
                        }
                        this.pendingRead.set(dataId, []);
                        if (!(dtype !== 'complex64')) return [3 /*break*/, 2];
                        // Create a fence and wait for it to resolve.
                        return [4 /*yield*/, this.gpgpu.createAndWaitForFence()];
                    case 1:
                        // Create a fence and wait for it to resolve.
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        if (!(dtype === 'complex64')) return [3 /*break*/, 4];
                        return [4 /*yield*/, Promise.all([complexTensors.real.data(), complexTensors.imag.data()])];
                    case 3:
                        ps = _b.sent();
                        realValues = ps[0];
                        imagValues = ps[1];
                        vals = complex_util_1.mergeRealAndImagArrays(realValues, imagValues);
                        return [3 /*break*/, 5];
                    case 4:
                        if (buffer == null) {
                            vals = this.getValuesFromTexture(dataId);
                        }
                        else {
                            size = util.sizeFromShape(shape);
                            vals = this.gpgpu.downloadFloat32MatrixFromBuffer(buffer, size);
                        }
                        _b.label = 5;
                    case 5:
                        if (tmpDownloadTarget != null) {
                            this.disposeData(tmpDownloadTarget.dataId);
                        }
                        dTypeVals = this.convertAndCacheOnCPU(dataId, vals);
                        subscribers = this.pendingRead.get(dataId);
                        this.pendingRead.delete(dataId);
                        // Notify all pending reads.
                        subscribers.forEach(function (resolve) { return resolve(dTypeVals); });
                        if (this.pendingDisposal.has(dataId)) {
                            this.pendingDisposal.delete(dataId);
                            this.disposeData(dataId);
                            this.pendingDeletes--;
                        }
                        return [2 /*return*/, dTypeVals];
                }
            });
        });
    };
    MathBackendWebGL.prototype.checkNumericalProblems = function (values) {
        if (values == null) {
            return;
        }
        for (var i = 0; i < values.length; i++) {
            var num = values[i];
            if (!webgl_util.canBeRepresented(num)) {
                if (environment_1.env().getBool('WEBGL_RENDER_FLOAT32_CAPABLE')) {
                    throw Error("The value " + num + " cannot be represented with your " +
                        "current settings. Consider enabling float32 rendering: " +
                        "'tf.env().set('WEBGL_RENDER_FLOAT32_ENABLED', true);'");
                }
                throw Error("The value " + num + " cannot be represented on this device.");
            }
        }
    };
    MathBackendWebGL.prototype.getValuesFromTexture = function (dataId) {
        var _a;
        var _b = this.texData.get(dataId), shape = _b.shape, dtype = _b.dtype, isPacked = _b.isPacked;
        var size = util.sizeFromShape(shape);
        if (environment_1.env().getBool('WEBGL_DOWNLOAD_FLOAT_ENABLED')) {
            var tmpTarget = this.decode(dataId);
            var tmpData_1 = this.texData.get(tmpTarget.dataId);
            var vals_1 = (_a = this.gpgpu).downloadMatrixFromPackedTexture.apply(_a, [tmpData_1.texture].concat(tex_util.getDenseTexShape(shape))).subarray(0, size);
            this.disposeData(tmpTarget.dataId);
            return vals_1;
        }
        var shouldUsePackedProgram = environment_1.env().getBool('WEBGL_PACK') && isPacked === true;
        var outputShape = shouldUsePackedProgram ? webgl_util.getShapeAs3D(shape) : shape;
        var program = shouldUsePackedProgram ?
            new encode_float_packed_gpu_1.EncodeFloatPackedProgram(outputShape) :
            new encode_float_gpu_1.EncodeFloatProgram(outputShape);
        var output = this.runWebGLProgram(program, [{ shape: outputShape, dtype: dtype, dataId: dataId }], 'float32');
        var tmpData = this.texData.get(output.dataId);
        var vals = this.gpgpu
            .downloadByteEncodedFloatMatrixFromOutputTexture(tmpData.texture, tmpData.texShape[0], tmpData.texShape[1])
            .subarray(0, size);
        this.disposeData(output.dataId);
        return vals;
    };
    MathBackendWebGL.prototype.time = function (f) {
        return __awaiter(this, void 0, void 0, function () {
            var oldActiveTimers, newActiveTimers, outerMostTime, flattenedActiveTimerQueries, flattenedActiveTimerNames, res, kernelMs_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        oldActiveTimers = this.activeTimers;
                        newActiveTimers = [];
                        outerMostTime = false;
                        if (this.programTimersStack == null) {
                            this.programTimersStack = newActiveTimers;
                            outerMostTime = true;
                        }
                        else {
                            this.activeTimers.push(newActiveTimers);
                        }
                        this.activeTimers = newActiveTimers;
                        f();
                        flattenedActiveTimerQueries = util.flatten(this.activeTimers.map(function (d) { return d.query; }))
                            .filter(function (d) { return d != null; });
                        flattenedActiveTimerNames = util.flatten(this.activeTimers.map(function (d) { return d.name; }))
                            .filter(function (d) { return d != null; });
                        this.activeTimers = oldActiveTimers;
                        if (outerMostTime) {
                            this.programTimersStack = null;
                        }
                        res = {
                            uploadWaitMs: this.uploadWaitMs,
                            downloadWaitMs: this.downloadWaitMs,
                            kernelMs: null,
                            wallMs: null // will be filled by the engine
                        };
                        if (!(environment_1.env().getNumber('WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE') > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.all(flattenedActiveTimerQueries)];
                    case 1:
                        kernelMs_1 = _a.sent();
                        res['kernelMs'] = util.sum(kernelMs_1);
                        res['getExtraProfileInfo'] = function () {
                            return kernelMs_1.map(function (d, i) { return ({ name: flattenedActiveTimerNames[i], ms: d }); })
                                .map(function (d) { return d.name + ": " + d.ms; })
                                .join(', ');
                        };
                        return [3 /*break*/, 3];
                    case 2:
                        res['kernelMs'] = {
                            error: 'WebGL query timers are not supported in this environment.'
                        };
                        _a.label = 3;
                    case 3:
                        this.uploadWaitMs = 0;
                        this.downloadWaitMs = 0;
                        return [2 /*return*/, res];
                }
            });
        });
    };
    MathBackendWebGL.prototype.memory = function () {
        return { unreliable: false, numBytesInGPU: this.numBytesInGPU };
    };
    MathBackendWebGL.prototype.startTimer = function () {
        if (environment_1.env().getNumber('WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE') > 0) {
            return this.gpgpu.beginQuery();
        }
        return { startMs: util.now(), endMs: null };
    };
    MathBackendWebGL.prototype.endTimer = function (query) {
        if (environment_1.env().getNumber('WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE') > 0) {
            this.gpgpu.endQuery();
            return query;
        }
        query.endMs = util.now();
        return query;
    };
    MathBackendWebGL.prototype.getQueryTime = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var timerQuery;
            return __generator(this, function (_a) {
                if (environment_1.env().getNumber('WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE') > 0) {
                    return [2 /*return*/, this.gpgpu.waitForQueryAndGetTime(query)];
                }
                timerQuery = query;
                return [2 /*return*/, timerQuery.endMs - timerQuery.startMs];
            });
        });
    };
    MathBackendWebGL.prototype.disposeData = function (dataId) {
        if (this.pendingDisposal.has(dataId)) {
            return;
        }
        if (this.pendingRead.has(dataId)) {
            this.pendingDisposal.add(dataId);
            this.pendingDeletes++;
            return;
        }
        // No-op if already disposed.
        if (!this.texData.has(dataId)) {
            return;
        }
        this.releaseGPUData(dataId);
        var complexTensors = this.texData.get(dataId).complexTensors;
        if (complexTensors != null) {
            complexTensors.real.dispose();
            complexTensors.imag.dispose();
        }
        this.texData.delete(dataId);
    };
    MathBackendWebGL.prototype.releaseGPUData = function (dataId) {
        var _a = this.texData.get(dataId), texture = _a.texture, dtype = _a.dtype, texShape = _a.texShape, usage = _a.usage, isPacked = _a.isPacked, slice = _a.slice;
        var key = slice && slice.origDataId || dataId;
        var refCount = this.dataRefCount.get(key);
        if (refCount > 1) {
            this.dataRefCount.set(key, refCount - 1);
        }
        else {
            this.dataRefCount.delete(key);
            if (texture != null) {
                this.numBytesInGPU -= this.computeBytes(texShape, dtype);
                this.textureManager.releaseTexture(texture, texShape, usage, isPacked);
            }
        }
        var texData = this.texData.get(dataId);
        texData.texture = null;
        texData.texShape = null;
        texData.isPacked = false;
        texData.slice = null;
    };
    MathBackendWebGL.prototype.getTexture = function (dataId) {
        this.uploadToGPU(dataId);
        return this.texData.get(dataId).texture;
    };
    /**
     * Returns internal information for the specific data bucket. Used in unit
     * tests.
     */
    MathBackendWebGL.prototype.getDataInfo = function (dataId) {
        return this.texData.get(dataId);
    };
    MathBackendWebGL.prototype.getCPUBackend = function () {
        if (!environment_1.env().getBool('WEBGL_CPU_FORWARD')) {
            return null;
        }
        if (this.cpuBackend == null) {
            this.cpuBackend = engine_1.ENGINE.findBackend('cpu');
        }
        return this.cpuBackend;
    };
    /*
    Tests whether all the inputs to an op are small and on the CPU. This heuristic
    determines when it would be faster to execute a kernel on the CPU. WebGL
    kernels opt into running this check and forwarding when appropriate.
    TODO(https://github.com/tensorflow/tfjs/issues/872): Develop a more
    sustainable strategy for optimizing backend execution of ops.
     */
    MathBackendWebGL.prototype.shouldExecuteOnCPU = function (inputs, sizeThreshold) {
        var _this = this;
        if (sizeThreshold === void 0) { sizeThreshold = CPU_HANDOFF_SIZE_THRESHOLD; }
        return this.getCPUBackend() != null &&
            inputs.every(function (input) { return _this.texData.get(input.dataId).texture == null &&
                util.sizeFromShape(input.shape) < sizeThreshold; });
    };
    MathBackendWebGL.prototype.getGPGPUContext = function () {
        return this.gpgpu;
    };
    MathBackendWebGL.prototype.complex = function (real, imag) {
        var result = this.makeOutput(real.shape, 'complex64');
        var resultData = this.texData.get(result.dataId);
        // The backend owns the reference to the underlying real and imaginary
        // clones. These will explicitly get disposed when the complex tensor is
        // disposed.
        resultData.complexTensors = {
            real: engine_1.ENGINE.keep(real.clone()),
            imag: engine_1.ENGINE.keep(imag.clone())
        };
        return result;
    };
    MathBackendWebGL.prototype.real = function (input) {
        var resultData = this.texData.get(input.dataId);
        return resultData.complexTensors.real.clone();
    };
    MathBackendWebGL.prototype.imag = function (input) {
        var resultData = this.texData.get(input.dataId);
        return resultData.complexTensors.imag.clone();
    };
    MathBackendWebGL.prototype.slice = function (x, begin, size) {
        if (this.shouldExecuteOnCPU([x])) {
            return this.cpuBackend.slice(x, begin, size);
        }
        // Short-circuit computation if the slice is zero-sized.
        if (util.sizeFromShape(size) === 0) {
            return tensor_ops_1.tensor([], size, x.dtype);
        }
        var isPacked = this.texData.get(x.dataId).isPacked;
        var isContinous = slice_util.isSliceContinous(x.shape, begin, size);
        if (isPacked || !isContinous) {
            var program = environment_1.env().getBool('WEBGL_PACK_ARRAY_OPERATIONS') ?
                new slice_packed_gpu_1.SlicePackedProgram(size) :
                new slice_gpu_1.SliceProgram(size);
            var customSetup = program.getCustomSetupFunc(begin);
            return this.compileAndRun(program, [x], null, customSetup);
        }
        this.uploadToGPU(x.dataId);
        return this.shallowSlice(x, begin, size);
    };
    MathBackendWebGL.prototype.shallowSlice = function (x, begin, size) {
        var xTexData = this.texData.get(x.dataId);
        var t = this.makeOutput(size, x.dtype);
        var newTexData = this.texData.get(t.dataId);
        // Copy texture data from the original tensor.
        Object.assign(newTexData, xTexData);
        newTexData.shape = size;
        newTexData.dtype = x.dtype;
        var flatOffset = slice_util.computeFlatOffset(begin, x.strides);
        if (xTexData.slice) {
            // We are slicing an already sliced tensor, so we have to accumulate
            // the offset.
            flatOffset += xTexData.slice.flatOffset;
        }
        newTexData.slice = {
            flatOffset: flatOffset,
            // Point to the original dataId, which is used to do ref counting.
            origDataId: xTexData.slice && xTexData.slice.origDataId || x.dataId
        };
        // Increase the ref count for that data bucket.
        var refCount = this.dataRefCount.get(newTexData.slice.origDataId) || 1;
        this.dataRefCount.set(newTexData.slice.origDataId, refCount + 1);
        return t;
    };
    MathBackendWebGL.prototype.stridedSlice = function (x, begin, end, strides) {
        if (this.shouldExecuteOnCPU([x])) {
            return this.cpuBackend.stridedSlice(x, begin, end, strides);
        }
        var outShape = slice_util.computeOutShape(begin, end, strides);
        if (outShape.some(function (axis) { return axis === 0; })) {
            return tensor_ops_1.tensor([], outShape);
        }
        var program = new strided_slice_gpu_1.StridedSliceProgram(begin, strides, outShape);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.reverse = function (x, axis) {
        var program = environment_1.env().getBool('WEBGL_PACK_ARRAY_OPERATIONS') ?
            new reverse_packed_gpu_1.ReversePackedProgram(x.shape, axis) :
            new reverse_gpu_1.ReverseProgram(x.shape, axis);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.concat = function (tensors, axis) {
        if (tensors[0].dtype === 'complex64') {
            var reals = tensors.map(function (t) { return complex_ops_1.real(t); });
            var imags = tensors.map(function (t) { return complex_ops_1.imag(t); });
            return complex_ops_1.complex(this.concat(reals, axis), this.concat(imags, axis));
        }
        if (this.shouldExecuteOnCPU(tensors)) {
            return this.cpuBackend.concat(tensors, axis);
        }
        if (tensors.length === 1) {
            return tensors[0];
        }
        if (tensors.length > environment_1.env().getNumber('WEBGL_MAX_TEXTURES_IN_SHADER')) {
            var midIndex = Math.floor(tensors.length / 2);
            var leftSide = this.concat(tensors.slice(0, midIndex), axis);
            var rightSide = this.concat(tensors.slice(midIndex), axis);
            return this.concat([leftSide, rightSide], axis);
        }
        if (environment_1.env().getBool('WEBGL_PACK_ARRAY_OPERATIONS') && tensors[0].rank > 1) {
            var program_1 = new concat_packed_gpu_1.ConcatPackedProgram(tensors.map(function (t) { return t.shape; }), axis);
            return this.compileAndRun(program_1, tensors);
        }
        // Any concat of n-dimensional tensors across any axis can be reduced to
        // a concatenation of two-dimensional tensors across the axis 1 by first
        // partitioning the axes of the original tensors into those less than the
        // axis to be concatenated and the rest. Then reshape the tensors
        // into a two-dimensional tensor by collapsing these two sets of axes and
        // concatenate the resulting matrices across the axis 1, finally reshaping
        // the result to have the proper shape.
        var outShape = concat_util_1.computeOutShape(tensors.map(function (t) { return t.shape; }), axis);
        var tensors2D = tensors.map(function (t) { return t.as2D(-1, util_1.sizeFromShape(t.shape.slice(axis))); });
        var program = new concat_gpu_1.ConcatProgram(tensors2D.map(function (t) { return t.shape; }));
        var res = this.compileAndRun(program, tensors2D);
        return res.reshape(outShape);
    };
    MathBackendWebGL.prototype.neg = function (x) {
        if (this.shouldExecuteOnCPU([x])) {
            return this.cpuBackend.neg(x);
        }
        if (environment_1.env().getBool('WEBGL_PACK_UNARY_OPERATIONS')) {
            return this.packedUnaryOp(x, unary_op.NEG, x.dtype);
        }
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.NEG);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.batchMatMul = function (a, b, transposeA, transposeB) {
        var outerShapeA = transposeA ? a.shape[2] : a.shape[1];
        var outerShapeB = transposeB ? b.shape[1] : b.shape[2];
        var sharedDim = transposeA ? a.shape[1] : a.shape[2];
        var _a = a.shape, batch = _a[0];
        // Since the matrices are vectors, it is faster to call mul().sum()
        // because sum() is O(sqrt(N)) due to divide-and-conquer.
        if ((outerShapeA === 1 || outerShapeB === 1) &&
            sharedDim > exports.MATMUL_SHARED_DIM_THRESHOLD) {
            if (transposeA) {
                a = transpose_1.transpose(a, [0, 2, 1]);
            }
            if (transposeB) {
                b = transpose_1.transpose(b, [0, 2, 1]);
            }
            var a3D = outerShapeB === 1 ? a : a.as3D(batch, sharedDim, 1);
            var axis = outerShapeB === 1 ? 2 : 1;
            var b3D = outerShapeB === 1 ? b.as3D(batch, 1, sharedDim) : b;
            return this.multiply(a3D, b3D).sum(axis, true /* keepDims */);
        }
        var dtype = types_1.upcastType(a.dtype, b.dtype);
        var program = new mulmat_packed_gpu_1.MatMulPackedProgram(a.shape, [batch, outerShapeA, outerShapeB], transposeA, transposeB);
        return this.compileAndRun(program, [a, b], dtype);
    };
    MathBackendWebGL.prototype.fusedBatchMatMul = function (_a) {
        var a = _a.a, b = _a.b, transposeA = _a.transposeA, transposeB = _a.transposeB, bias = _a.bias, activation = _a.activation, preluActivationWeights = _a.preluActivationWeights;
        var outerShapeA = transposeA ? a.shape[2] : a.shape[1];
        var outerShapeB = transposeB ? b.shape[1] : b.shape[2];
        var _b = a.shape, batch = _b[0];
        var dtype = types_1.upcastType(a.dtype, b.dtype);
        var hasBias = bias != null;
        var hasPreluActivationWeights = preluActivationWeights != null;
        var fusedActivation = activation ? mapActivationToShaderProgram(activation, true) : null;
        var program = new mulmat_packed_gpu_1.MatMulPackedProgram(a.shape, [batch, outerShapeA, outerShapeB], transposeA, transposeB, hasBias, fusedActivation, hasPreluActivationWeights);
        var inputs = [a, b];
        if (bias) {
            inputs.push(bias);
        }
        if (preluActivationWeights) {
            inputs.push(preluActivationWeights);
        }
        return this.compileAndRun(program, inputs, dtype);
    };
    MathBackendWebGL.prototype.multiply = function (a, b) {
        if (a.dtype === 'complex64') {
            var aData = this.texData.get(a.dataId);
            var bData = this.texData.get(b.dataId);
            var realProgram = new binaryop_complex_gpu_1.BinaryOpComplexProgram(binaryop_complex_gpu.COMPLEX_MULTIPLY.REAL, a.shape, b.shape);
            var imagProgram = new binaryop_complex_gpu_1.BinaryOpComplexProgram(binaryop_complex_gpu.COMPLEX_MULTIPLY.IMAG, a.shape, b.shape);
            var inputs = [
                this.makeComplexComponentTensorInfo(a, aData.complexTensors.real),
                this.makeComplexComponentTensorInfo(a, aData.complexTensors.imag),
                this.makeComplexComponentTensorInfo(b, bData.complexTensors.real),
                this.makeComplexComponentTensorInfo(b, bData.complexTensors.imag)
            ];
            var real_1 = this.compileAndRun(realProgram, inputs);
            var imag_1 = this.compileAndRun(imagProgram, inputs);
            var complex_1 = this.complex(real_1, imag_1);
            real_1.dispose();
            imag_1.dispose();
            return complex_1;
        }
        if (this.shouldExecuteOnCPU([a, b])) {
            return this.cpuBackend.multiply(a, b);
        }
        if (environment_1.env().getBool('WEBGL_PACK_BINARY_OPERATIONS')) {
            return this.packedBinaryOp(a, b, binaryop_gpu.MUL, a.dtype);
        }
        var program = new binaryop_gpu_1.BinaryOpProgram(binaryop_gpu.MUL, a.shape, b.shape);
        return this.compileAndRun(program, [a, b], a.dtype);
    };
    MathBackendWebGL.prototype.batchNormalization = function (x, mean, variance, varianceEpsilon, scale, offset) {
        var inputs = [x, mean, variance];
        var offsetShape = null;
        if (offset != null) {
            offsetShape = offset.shape;
            inputs.push(offset);
        }
        var scaleShape = null;
        if (scale != null) {
            scaleShape = scale.shape;
            inputs.push(scale);
        }
        if (environment_1.env().getBool('WEBGL_PACK_NORMALIZATION')) {
            var batchNormPackedProgram = new batchnorm_packed_gpu_1.BatchNormPackedProgram(x.shape, mean.shape, variance.shape, offsetShape, scaleShape, varianceEpsilon);
            return this.compileAndRun(batchNormPackedProgram, inputs);
        }
        var batchNormProgram = new batchnorm_gpu_1.BatchNormProgram(x.shape, mean.shape, variance.shape, offsetShape, scaleShape, varianceEpsilon);
        return this.compileAndRun(batchNormProgram, inputs);
    };
    MathBackendWebGL.prototype.localResponseNormalization4D = function (x, radius, bias, alpha, beta) {
        var program = environment_1.env().getBool('WEBGL_PACK_NORMALIZATION') ?
            new lrn_packed_gpu_1.LRNPackedProgram(x.shape, radius, bias, alpha, beta) :
            new lrn_gpu_1.LRNProgram(x.shape, radius, bias, alpha, beta);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.LRNGrad = function (dy, inputImage, outputImage, depthRadius, bias, alpha, beta) {
        var program = new lrn_grad_gpu_1.LRNGradProgram(inputImage.shape, depthRadius, bias, alpha, beta);
        return this.compileAndRun(program, [inputImage, outputImage, dy]);
    };
    MathBackendWebGL.prototype.tile = function (x, reps) {
        if (x.dtype === 'string') {
            var data = this.readSync(x.dataId);
            var decodedData = data.map(function (d) { return util.decodeString(d); });
            var buf = array_ops_1.buffer(x.shape, x.dtype, decodedData);
            return tile_impl_1.tile(buf, reps);
        }
        var program = new tile_gpu_1.TileProgram(x.shape, reps);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.pad = function (x, paddings, constantValue) {
        var program = environment_1.env().getBool('WEBGL_PACK_ARRAY_OPERATIONS') ?
            new pad_packed_gpu_1.PadPackedProgram(x.shape, paddings, constantValue) :
            new pad_gpu_1.PadProgram(x.shape, paddings, constantValue);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.gather = function (x, indices, axis) {
        if (this.shouldExecuteOnCPU([x, indices])) {
            return this.cpuBackend.gather(x, indices, axis);
        }
        var program = new gather_gpu_1.GatherProgram(x.shape, indices.size, axis);
        return this.compileAndRun(program, [x, indices]);
    };
    MathBackendWebGL.prototype.batchToSpaceND = function (x, blockShape, crops) {
        util.assert(x.rank <= 4, function () { return 'batchToSpaceND for rank > 4 with a WebGL backend not ' +
            'implemented yet'; });
        var prod = blockShape.reduce(function (a, b) { return a * b; });
        var reshaped = array_ops_util.getReshaped(x.shape, blockShape, prod);
        var permuted = array_ops_util.getPermuted(reshaped.length, blockShape.length);
        var reshapedPermuted = array_ops_util.getReshapedPermuted(x.shape, blockShape, prod);
        var sliceBeginCoords = array_ops_util.getSliceBeginCoords(crops, blockShape.length);
        var sliceSize = array_ops_util.getSliceSize(reshapedPermuted, crops, blockShape.length);
        return transpose_1.transpose(x.reshape(reshaped), permuted)
            .reshape(reshapedPermuted)
            .slice(sliceBeginCoords, sliceSize);
    };
    MathBackendWebGL.prototype.spaceToBatchND = function (x, blockShape, paddings) {
        util.assert(x.rank <= 4, function () { return 'spaceToBatchND for rank > 4 with a WebGL backend not ' +
            'implemented yet'; });
        var prod = blockShape.reduce(function (a, b) { return a * b; });
        var completePaddings = [[0, 0]];
        completePaddings.push.apply(completePaddings, paddings);
        for (var i = 1 + blockShape.length; i < x.shape.length; ++i) {
            completePaddings.push([0, 0]);
        }
        var paddedX = x.pad(completePaddings);
        var reshapedPaddedShape = array_ops_util.getReshaped(paddedX.shape, blockShape, prod, false);
        var permutedReshapedPaddedPermutation = array_ops_util.getPermuted(reshapedPaddedShape.length, blockShape.length, false);
        var flattenShape = array_ops_util.getReshapedPermuted(paddedX.shape, blockShape, prod, false);
        return transpose_1.transpose(paddedX.reshape(reshapedPaddedShape), permutedReshapedPaddedPermutation)
            .reshape(flattenShape);
    };
    MathBackendWebGL.prototype.reduce = function (x, reduceType, dtype) {
        var batchSize = x.shape[0];
        var inSize = x.shape[1];
        var windowSize = reduce_util.computeOptimalWindowSize(inSize);
        var reduceInfo = { windowSize: windowSize, inSize: inSize, batchSize: batchSize };
        var program = new reduce_gpu_1.ReduceProgram(reduceInfo, reduceType);
        var output = this.compileAndRun(program, [x], dtype);
        // No need to run another GPGPU program.
        if (output.shape[1] === 1) {
            return output;
        }
        return this.reduce(output, reduceType, dtype);
    };
    MathBackendWebGL.prototype.argReduce = function (x, reduceType, bestIndicesA) {
        if (bestIndicesA === void 0) { bestIndicesA = null; }
        var batchSize = x.shape[0];
        var inSize = x.shape[1];
        if (bestIndicesA != null) {
            batchSize = bestIndicesA.shape[0];
            inSize = bestIndicesA.shape[1];
        }
        var windowSize = reduce_util.computeOptimalWindowSize(inSize);
        var reduceInfo = { windowSize: windowSize, inSize: inSize, batchSize: batchSize };
        var program = new argminmax_gpu_1.ArgMinMaxProgram(reduceInfo, reduceType, bestIndicesA == null);
        var inputs = [x];
        if (bestIndicesA != null) {
            inputs.push(bestIndicesA);
        }
        var output = this.compileAndRun(program, inputs, 'int32');
        // No need to run another GPGPU program.
        if (output.shape[1] === 1) {
            return output;
        }
        return this.argReduce(x, reduceType, output);
    };
    MathBackendWebGL.prototype.argReducePacked = function (x, reduceType, bestIndicesA) {
        if (bestIndicesA === void 0) { bestIndicesA = null; }
        var inShape = bestIndicesA != null ? bestIndicesA.shape : x.shape;
        var inSize = inShape[inShape.length - 1];
        var windowSize = reduce_util.computeOptimalWindowSize(inSize);
        var program = new argminmax_packed_gpu_1.ArgMinMaxPackedProgram(inShape, windowSize, reduceType, bestIndicesA == null);
        var inputs = bestIndicesA == null ? [x] : [x, bestIndicesA];
        var output = this.compileAndRun(program, inputs, 'int32');
        if (output.rank === x.rank) {
            return this.argReducePacked(x, reduceType, output);
        }
        return output;
    };
    MathBackendWebGL.prototype.sum = function (x, axes) {
        axis_util.assertAxesAreInnerMostDims('sum', axes, x.rank);
        var _a = axis_util.computeOutAndReduceShapes(x.shape, axes), outShape = _a[0], reduceShape = _a[1];
        var inSize = util.sizeFromShape(reduceShape);
        var a2D = x.as2D(-1, inSize);
        var outputDType = types_1.sumOutType(x.dtype);
        return this.reduce(a2D, 'sum', outputDType).reshape(outShape);
    };
    MathBackendWebGL.prototype.prod = function (x, axes) {
        if (this.shouldExecuteOnCPU([x])) {
            return this.cpuBackend.prod(x, axes);
        }
        var _a = axis_util.computeOutAndReduceShapes(x.shape, axes), outShape = _a[0], reduceShape = _a[1];
        var inSize = util.sizeFromShape(reduceShape);
        var a2D = x.as2D(-1, inSize);
        var outputDType = types_1.sumOutType(x.dtype);
        return this.reduce(a2D, 'prod', outputDType).reshape(outShape);
    };
    MathBackendWebGL.prototype.unsortedSegmentSum = function (x, segmentIds, numSegments) {
        var axis = 0;
        var permutation = axis_util.getAxesPermutation([axis], x.rank);
        var permutedX = x;
        if (permutation != null) {
            permutedX = transpose_1.transpose(x, permutation);
            axis = axis_util.getInnerMostAxes(1, x.rank)[0];
        }
        var outShape = segment_util.computeOutShape(permutedX.shape, axis, numSegments);
        var inSize = util.sizeFromShape([permutedX.shape[axis]]);
        var a2D = permutedX.as2D(-1, inSize);
        var outputDType = types_1.sumOutType(x.dtype);
        var result = this.segOpCompute(a2D, 'unsortedSegmentSum', segmentIds, outputDType, numSegments)
            .reshape(outShape);
        if (permutation != null) {
            result = transpose_1.transpose(result, axis_util.getUndoAxesPermutation(permutation));
        }
        return result;
    };
    MathBackendWebGL.prototype.segOpCompute = function (x, segOpType, segmentIds, dtype, numSegments) {
        var batchSize = x.shape[0];
        var inSize = x.shape[1];
        var windowSize = segment_util.segOpComputeOptimalWindowSize(inSize, numSegments);
        var segOpInfo = { windowSize: windowSize, inSize: inSize, batchSize: batchSize, numSegments: numSegments };
        var program = new segment_gpu_1.SegmentOpProgram(segOpInfo, segOpType);
        var output = this.compileAndRun(program, [x, segmentIds], dtype);
        // No need to run another GPGPU program.
        if (output.shape[1] === numSegments) {
            return output;
        }
        segmentIds = tensor_ops_1.range(0, numSegments).tile([inSize / windowSize]);
        return this.segOpCompute(output, segOpType, segmentIds, dtype, numSegments);
    };
    MathBackendWebGL.prototype.argMinMaxReduce = function (x, axis, reduceType) {
        var axes = [axis];
        axis_util.assertAxesAreInnerMostDims('arg' + reduceType.charAt(0).toUpperCase() + reduceType.slice(1), axes, x.rank);
        if (!environment_1.env().getBool('WEBGL_PACK_REDUCE') || x.rank <= 2) {
            var _a = axis_util.computeOutAndReduceShapes(x.shape, axes), outShape = _a[0], reduceShape = _a[1];
            var inSize = util.sizeFromShape(reduceShape);
            var a2D = x.as2D(-1, inSize);
            return this.argReduce(a2D, reduceType).reshape(outShape);
        }
        return this.argReducePacked(x, reduceType);
    };
    MathBackendWebGL.prototype.argMin = function (x, axis) {
        return this.argMinMaxReduce(x, axis, 'min');
    };
    MathBackendWebGL.prototype.argMax = function (x, axis) {
        return this.argMinMaxReduce(x, axis, 'max');
    };
    MathBackendWebGL.prototype.cumsum = function (x, axis, exclusive, reverse) {
        if (axis !== x.rank - 1) {
            throw new Error("WebGL cumsum shader expects an inner-most axis=" + (x.rank - 1) + " " +
                ("but got axis=" + axis));
        }
        var program = new cumsum_gpu_1.CumSumProgram(x.shape, exclusive, reverse);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.equal = function (a, b) {
        if (environment_1.env().getBool('WEBGL_PACK_BINARY_OPERATIONS')) {
            return this.packedBinaryOp(a, b, binaryop_packed_gpu.EQUAL, 'bool');
        }
        var program = new binaryop_gpu_1.BinaryOpProgram(binaryop_gpu.EQUAL, a.shape, b.shape);
        return this.compileAndRun(program, [a, b], 'bool');
    };
    MathBackendWebGL.prototype.notEqual = function (a, b) {
        if (environment_1.env().getBool('WEBGL_PACK_BINARY_OPERATIONS')) {
            return this.packedBinaryOp(a, b, binaryop_packed_gpu.NOT_EQUAL, 'bool');
        }
        var program = new binaryop_gpu_1.BinaryOpProgram(binaryop_gpu.NOT_EQUAL, a.shape, b.shape);
        return this.compileAndRun(program, [a, b], 'bool');
    };
    MathBackendWebGL.prototype.less = function (a, b) {
        if (this.shouldExecuteOnCPU([a, b])) {
            return this.cpuBackend.less(a, b);
        }
        if (environment_1.env().getBool('WEBGL_PACK_BINARY_OPERATIONS')) {
            return this.packedBinaryOp(a, b, binaryop_packed_gpu.LESS, 'bool');
        }
        var program = new binaryop_gpu_1.BinaryOpProgram(binaryop_gpu.LESS, a.shape, b.shape);
        return this.compileAndRun(program, [a, b], 'bool');
    };
    MathBackendWebGL.prototype.lessEqual = function (a, b) {
        if (environment_1.env().getBool('WEBGL_PACK_BINARY_OPERATIONS')) {
            return this.packedBinaryOp(a, b, binaryop_packed_gpu.LESS_EQUAL, 'bool');
        }
        var program = new binaryop_gpu_1.BinaryOpProgram(binaryop_gpu.LESS_EQUAL, a.shape, b.shape);
        return this.compileAndRun(program, [a, b], 'bool');
    };
    MathBackendWebGL.prototype.greater = function (a, b) {
        if (this.shouldExecuteOnCPU([a, b])) {
            return this.cpuBackend.greater(a, b);
        }
        if (environment_1.env().getBool('WEBGL_PACK_BINARY_OPERATIONS')) {
            return this.packedBinaryOp(a, b, binaryop_packed_gpu.GREATER, 'bool');
        }
        var program = new binaryop_gpu_1.BinaryOpProgram(binaryop_gpu.GREATER, a.shape, b.shape);
        return this.compileAndRun(program, [a, b], 'bool');
    };
    MathBackendWebGL.prototype.greaterEqual = function (a, b) {
        if (environment_1.env().getBool('WEBGL_PACK_BINARY_OPERATIONS')) {
            return this.packedBinaryOp(a, b, binaryop_packed_gpu.GREATER_EQUAL, 'bool');
        }
        var program = new binaryop_gpu_1.BinaryOpProgram(binaryop_gpu.GREATER_EQUAL, a.shape, b.shape);
        return this.compileAndRun(program, [a, b], 'bool');
    };
    MathBackendWebGL.prototype.logicalNot = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.LOGICAL_NOT);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.logicalAnd = function (a, b) {
        if (environment_1.env().getBool('WEBGL_PACK_BINARY_OPERATIONS')) {
            return this.packedBinaryOp(a, b, binaryop_packed_gpu.LOGICAL_AND, 'bool');
        }
        var program = new binaryop_gpu_1.BinaryOpProgram(binaryop_gpu.LOGICAL_AND, a.shape, b.shape);
        return this.compileAndRun(program, [a, b], 'bool');
    };
    MathBackendWebGL.prototype.logicalOr = function (a, b) {
        if (environment_1.env().getBool('WEBGL_PACK_BINARY_OPERATIONS')) {
            return this.packedBinaryOp(a, b, binaryop_packed_gpu.LOGICAL_OR, 'bool');
        }
        var program = new binaryop_gpu_1.BinaryOpProgram(binaryop_gpu.LOGICAL_OR, a.shape, b.shape);
        return this.compileAndRun(program, [a, b], 'bool');
    };
    MathBackendWebGL.prototype.select = function (condition, a, b) {
        var program = new select_gpu_1.SelectProgram(condition.rank, a.shape, a.rank);
        return this.compileAndRun(program, [condition, a, b], types_1.upcastType(a.dtype, b.dtype));
    };
    MathBackendWebGL.prototype.where = function (condition) {
        log_1.warn('tf.where() in webgl locks the UI thread. ' +
            'Call tf.whereAsync() instead');
        var condVals = condition.dataSync();
        return where_impl_1.whereImpl(condition.shape, condVals);
    };
    MathBackendWebGL.prototype.topk = function (x, k, sorted) {
        var xVals = x.dataSync();
        return topk_impl_1.topkImpl(xVals, x.shape, x.dtype, k, sorted);
    };
    MathBackendWebGL.prototype.min = function (x, axes) {
        axis_util.assertAxesAreInnerMostDims('min', axes, x.rank);
        var _a = axis_util.computeOutAndReduceShapes(x.shape, axes), outShape = _a[0], reduceShape = _a[1];
        var inSize = util.sizeFromShape(reduceShape);
        var a2D = x.as2D(-1, inSize);
        return this.reduce(a2D, 'min', a2D.dtype).reshape(outShape);
    };
    MathBackendWebGL.prototype.minimum = function (a, b) {
        if (this.shouldExecuteOnCPU([a, b])) {
            return this.cpuBackend.minimum(a, b);
        }
        var program = environment_1.env().getBool('WEBGL_PACK_BINARY_OPERATIONS') ?
            new binaryop_packed_gpu_1.BinaryOpPackedProgram(binaryop_packed_gpu.MIN, a.shape, b.shape) :
            new binaryop_gpu_1.BinaryOpProgram(binaryop_gpu.MIN, a.shape, b.shape);
        return this.compileAndRun(program, [a, b]);
    };
    MathBackendWebGL.prototype.mod = function (a, b) {
        var program = environment_1.env().getBool('WEBGL_PACK_BINARY_OPERATIONS') ?
            new binaryop_packed_gpu_1.BinaryOpPackedProgram(binaryop_packed_gpu.MOD, a.shape, b.shape) :
            new binaryop_gpu_1.BinaryOpProgram(binaryop_gpu.MOD, a.shape, b.shape);
        return this.compileAndRun(program, [a, b]);
    };
    MathBackendWebGL.prototype.max = function (x, axes) {
        if (this.shouldExecuteOnCPU([x])) {
            return this.cpuBackend.max(x, axes);
        }
        axis_util.assertAxesAreInnerMostDims('max', axes, x.rank);
        var _a = axis_util.computeOutAndReduceShapes(x.shape, axes), outShape = _a[0], reduceShape = _a[1];
        var inSize = util.sizeFromShape(reduceShape);
        var a2D = x.as2D(-1, inSize);
        return this.reduce(a2D, 'max', a2D.dtype).reshape(outShape);
    };
    MathBackendWebGL.prototype.maximum = function (a, b) {
        if (this.shouldExecuteOnCPU([a, b])) {
            return this.cpuBackend.maximum(a, b);
        }
        var program = environment_1.env().getBool('WEBGL_PACK_BINARY_OPERATIONS') ?
            new binaryop_packed_gpu_1.BinaryOpPackedProgram(binaryop_packed_gpu.MAX, a.shape, b.shape) :
            new binaryop_gpu_1.BinaryOpProgram(binaryop_gpu.MAX, a.shape, b.shape);
        return this.compileAndRun(program, [a, b]);
    };
    MathBackendWebGL.prototype.all = function (x, axes) {
        axis_util.assertAxesAreInnerMostDims('all', axes, x.rank);
        var _a = axis_util.computeOutAndReduceShapes(x.shape, axes), outShape = _a[0], reduceShape = _a[1];
        var inSize = util.sizeFromShape(reduceShape);
        var a2D = x.as2D(-1, inSize);
        return this.reduce(a2D, 'all', a2D.dtype).reshape(outShape);
    };
    MathBackendWebGL.prototype.any = function (x, axes) {
        axis_util.assertAxesAreInnerMostDims('any', axes, x.rank);
        var _a = axis_util.computeOutAndReduceShapes(x.shape, axes), outShape = _a[0], reduceShape = _a[1];
        var inSize = util.sizeFromShape(reduceShape);
        var a2D = x.as2D(-1, inSize);
        return this.reduce(a2D, 'any', a2D.dtype).reshape(outShape);
    };
    MathBackendWebGL.prototype.floorDiv = function (a, b) {
        var op = binaryop_gpu.INT_DIV;
        var outputDtype = 'int32';
        if (environment_1.env().getBool('WEBGL_PACK_BINARY_OPERATIONS')) {
            return this.packedBinaryOp(a, b, binaryop_packed_gpu.INT_DIV, outputDtype);
        }
        var program = new binaryop_gpu_1.BinaryOpProgram(op, a.shape, b.shape);
        return this.compileAndRun(program, [a, b], outputDtype);
    };
    MathBackendWebGL.prototype.add = function (a, b) {
        if (a.dtype === 'complex64' && b.dtype === 'complex64') {
            return this.complexSeparableBinaryOp(a, b, binaryop_gpu.ADD);
        }
        if (this.shouldExecuteOnCPU([a, b])) {
            return this.cpuBackend.add(a, b);
        }
        var dtype = types_1.upcastType(a.dtype, b.dtype);
        if (environment_1.env().getBool('WEBGL_PACK_BINARY_OPERATIONS')) {
            return this.packedBinaryOp(a, b, binaryop_gpu.ADD, dtype);
        }
        var program = new binaryop_gpu_1.BinaryOpProgram(binaryop_gpu.ADD, a.shape, b.shape);
        return this.compileAndRun(program, [a, b], dtype);
    };
    MathBackendWebGL.prototype.packedUnaryOp = function (x, op, dtype) {
        var program = new unaryop_packed_gpu_1.UnaryOpPackedProgram(x.shape, op);
        return this.compileAndRun(program, [x], dtype);
    };
    MathBackendWebGL.prototype.packedBinaryOp = function (a, b, op, dtype, checkOutOfBounds) {
        if (checkOutOfBounds === void 0) { checkOutOfBounds = false; }
        var program = new binaryop_packed_gpu_1.BinaryOpPackedProgram(op, a.shape, b.shape, checkOutOfBounds);
        return this.compileAndRun(program, [a, b], dtype);
    };
    /**
     * Computes a complex binary operation that can be decomposed into a simple
     * binary operation on both the real and imagary parts.
     */
    MathBackendWebGL.prototype.complexSeparableBinaryOp = function (a, b, op) {
        var _this = this;
        var aData = this.texData.get(a.dataId);
        var bData = this.texData.get(b.dataId);
        var _a = [
            [aData.complexTensors.real, bData.complexTensors.real],
            [aData.complexTensors.imag, bData.complexTensors.imag]
        ].map(function (complexParts) {
            var aPart = complexParts[0], bPart = complexParts[1];
            var aHandle = _this.makeComplexComponentTensorInfo(a, aPart);
            var bHandle = _this.makeComplexComponentTensorInfo(b, bPart);
            var program = new binaryop_gpu_1.BinaryOpProgram(op, a.shape, b.shape);
            return _this.compileAndRun(program, [aHandle, bHandle], types_1.upcastType(aPart.dtype, bPart.dtype));
        }), real = _a[0], imag = _a[1];
        var complex = this.complex(real, imag);
        real.dispose();
        imag.dispose();
        return complex;
    };
    // Returns a TensorInfo with the complex shape and the dataId of the
    // underlying part. We need to do this because a reshaped complex tensor is
    // not reflected in its parts.
    MathBackendWebGL.prototype.makeComplexComponentTensorInfo = function (complexTensor, complexPart) {
        return {
            dataId: complexPart.dataId,
            dtype: complexPart.dtype,
            shape: complexTensor.shape
        };
    };
    MathBackendWebGL.prototype.addN = function (tensors) {
        if (tensors.length === 1) {
            return tensors[0];
        }
        // Limit the number of uploaded textures for optimization.
        if (tensors.length > environment_1.env().get('WEBGL_MAX_TEXTURES_IN_SHADER')) {
            var midIndex = Math.floor(tensors.length / 2);
            var leftSide = this.addN(tensors.slice(0, midIndex));
            var rightSide = this.addN(tensors.slice(midIndex));
            return this.addN([leftSide, rightSide]);
        }
        var dtype = tensors.map(function (t) { return t.dtype; }).reduce(function (d1, d2) { return types_1.upcastType(d1, d2); });
        var shapes = tensors.map(function (t) { return t.shape; });
        // We can make sure shapes are identical in op level.
        var usePackedOp = environment_1.env().getBool('WEBGL_PACK');
        var program = usePackedOp ?
            new addn_packed_gpu_1.AddNPackedProgram(tensors[0].shape, shapes) :
            new addn_gpu_1.AddNProgram(tensors[0].shape, shapes);
        return this.compileAndRun(program, tensors, dtype);
    };
    MathBackendWebGL.prototype.subtract = function (a, b) {
        if (a.dtype === 'complex64' && b.dtype === 'complex64') {
            return this.complexSeparableBinaryOp(a, b, binaryop_gpu.SUB);
        }
        if (this.shouldExecuteOnCPU([a, b])) {
            return this.cpuBackend.subtract(a, b);
        }
        var dtype = types_1.upcastType(a.dtype, b.dtype);
        if (environment_1.env().getBool('WEBGL_PACK_BINARY_OPERATIONS')) {
            return this.packedBinaryOp(a, b, binaryop_gpu.SUB, a.dtype);
        }
        var program = new binaryop_gpu_1.BinaryOpProgram(binaryop_gpu.SUB, a.shape, b.shape);
        return this.compileAndRun(program, [a, b], dtype);
    };
    MathBackendWebGL.prototype.pow = function (a, b) {
        var usePackedOp = environment_1.env().getBool('WEBGL_PACK_BINARY_OPERATIONS');
        var program = usePackedOp ?
            new binaryop_packed_gpu_1.BinaryOpPackedProgram(binaryop_packed_gpu.POW, a.shape, b.shape) :
            new binaryop_gpu_1.BinaryOpProgram(binaryop_gpu.POW, a.shape, b.shape);
        var dtype = types_1.upcastType(a.dtype, b.dtype);
        return this.compileAndRun(program, [a, b], dtype);
    };
    MathBackendWebGL.prototype.ceil = function (x) {
        if (this.shouldExecuteOnCPU([x])) {
            return this.cpuBackend.ceil(x);
        }
        if (environment_1.env().getBool('WEBGL_PACK_UNARY_OPERATIONS')) {
            return this.packedUnaryOp(x, unary_op.CEIL, x.dtype);
        }
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.CEIL);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.floor = function (x) {
        if (this.shouldExecuteOnCPU([x])) {
            return this.cpuBackend.floor(x);
        }
        if (environment_1.env().getBool('WEBGL_PACK_UNARY_OPERATIONS')) {
            return this.packedUnaryOp(x, unary_op.FLOOR, x.dtype);
        }
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.FLOOR);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.sign = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.SIGN);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.isNaN = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.IS_NAN);
        return this.compileAndRun(program, [x], 'bool');
    };
    MathBackendWebGL.prototype.isInf = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.IS_INF);
        return this.compileAndRun(program, [x], 'bool');
    };
    MathBackendWebGL.prototype.isFinite = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.IS_FINITE);
        return this.compileAndRun(program, [x], 'bool');
    };
    MathBackendWebGL.prototype.round = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.ROUND);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.exp = function (x) {
        if (this.shouldExecuteOnCPU([x])) {
            return this.cpuBackend.exp(x);
        }
        if (environment_1.env().getBool('WEBGL_PACK_UNARY_OPERATIONS')) {
            return this.packedUnaryOp(x, unary_op.EXP, x.dtype);
        }
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.EXP);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.expm1 = function (x) {
        if (this.shouldExecuteOnCPU([x])) {
            return this.cpuBackend.expm1(x);
        }
        if (environment_1.env().getBool('WEBGL_PACK_UNARY_OPERATIONS')) {
            return this.packedUnaryOp(x, unary_op.EXPM1, x.dtype);
        }
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.EXPM1);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.softmax = function (logits, dim) {
        var axes = util.parseAxisParam([dim], logits.shape);
        var maxLogit = this.max(logits, axes);
        var expandedShape = axis_util.expandShapeToKeepDim(maxLogit.shape, axes);
        var a = this.subtract(logits, maxLogit.reshape(expandedShape));
        var b = this.exp(a);
        var sumExp = this.sum(b, axes).reshape(expandedShape);
        // TODO(annxingyuan): Call divImpl rather than op as part of softmax kernel
        // modularization.
        return div_1.div(b, sumExp);
    };
    MathBackendWebGL.prototype.log = function (x) {
        if (this.shouldExecuteOnCPU([x])) {
            return this.cpuBackend.log(x);
        }
        if (environment_1.env().getBool('WEBGL_PACK_UNARY_OPERATIONS')) {
            return this.packedUnaryOp(x, unary_packed_op.LOG, x.dtype);
        }
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.LOG);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.log1p = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.LOG1P);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.sqrt = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.SQRT);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.rsqrt = function (x) {
        if (this.shouldExecuteOnCPU([x])) {
            return this.cpuBackend.rsqrt(x);
        }
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.RSQRT);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.reciprocal = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.RECIPROCAL);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.relu = function (x) {
        var program;
        if (environment_1.env().getBool('WEBGL_PACK')) {
            program = new unaryop_packed_gpu_1.UnaryOpPackedProgram(x.shape, unary_packed_op.RELU);
        }
        else {
            program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.RELU);
        }
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.relu6 = function (x) {
        var program;
        if (environment_1.env().getBool('WEBGL_PACK')) {
            program = new unaryop_packed_gpu_1.UnaryOpPackedProgram(x.shape, unary_packed_op.RELU6);
        }
        else {
            program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.RELU6);
        }
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.prelu = function (x, alpha) {
        var program = environment_1.env().getBool('WEBGL_PACK_BINARY_OPERATIONS') ?
            new binaryop_packed_gpu_1.BinaryOpPackedProgram(binaryop_packed_gpu.PRELU, x.shape, alpha.shape) :
            new binaryop_gpu_1.BinaryOpProgram(binaryop_gpu.PRELU, x.shape, alpha.shape);
        return this.compileAndRun(program, [x, alpha]);
    };
    MathBackendWebGL.prototype.elu = function (x) {
        if (environment_1.env().getBool('WEBGL_PACK_UNARY_OPERATIONS')) {
            return this.packedUnaryOp(x, unary_packed_op.ELU, x.dtype);
        }
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.ELU);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.eluDer = function (dy, y) {
        var program = environment_1.env().getBool('WEBGL_PACK_BINARY_OPERATIONS') ?
            new binaryop_packed_gpu_1.BinaryOpPackedProgram(binaryop_packed_gpu.ELU_DER, dy.shape, y.shape) :
            new binaryop_gpu_1.BinaryOpProgram(binaryop_gpu.ELU_DER, dy.shape, y.shape);
        return this.compileAndRun(program, [dy, y]);
    };
    MathBackendWebGL.prototype.selu = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.SELU);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.int = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.TO_INT);
        return this.compileAndRun(program, [x], 'int32');
    };
    MathBackendWebGL.prototype.clip = function (x, min, max) {
        var program;
        if (environment_1.env().getBool('WEBGL_PACK_CLIP')) {
            program = new clip_packed_gpu_1.ClipPackedProgram(x.shape);
        }
        else {
            program = new clip_gpu_1.ClipProgram(x.shape);
        }
        var customSetup = program.getCustomSetupFunc(min, max);
        return this.compileAndRun(program, [x], null, customSetup);
    };
    MathBackendWebGL.prototype.abs = function (x) {
        if (this.shouldExecuteOnCPU([x])) {
            return this.cpuBackend.abs(x);
        }
        if (environment_1.env().getBool('WEBGL_PACK_UNARY_OPERATIONS')) {
            return this.packedUnaryOp(x, unary_op.ABS, x.dtype);
        }
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.ABS);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.complexAbs = function (x) {
        var xData = this.texData.get(x.dataId);
        var program = new complex_abs_gpu_1.ComplexAbsProgram(x.shape);
        var inputs = [
            this.makeComplexComponentTensorInfo(x, xData.complexTensors.real),
            this.makeComplexComponentTensorInfo(x, xData.complexTensors.imag),
        ];
        return this.compileAndRun(program, inputs);
    };
    MathBackendWebGL.prototype.sigmoid = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.SIGMOID);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.softplus = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.SOFTPLUS);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.sin = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.SIN);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.cos = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.COS);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.tan = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.TAN);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.asin = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.ASIN);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.acos = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.ACOS);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.atan = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.ATAN);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.atan2 = function (a, b) {
        var program = environment_1.env().getBool('WEBGL_PACK_BINARY_OPERATIONS') ?
            new binaryop_packed_gpu_1.BinaryOpPackedProgram(binaryop_packed_gpu.ATAN2, a.shape, b.shape) :
            new binaryop_gpu_1.BinaryOpProgram(binaryop_gpu.ATAN2, a.shape, b.shape);
        return this.compileAndRun(program, [a, b]);
    };
    MathBackendWebGL.prototype.sinh = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.SINH);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.cosh = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.COSH);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.tanh = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.TANH);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.asinh = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.ASINH);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.acosh = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.ACOSH);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.atanh = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.ATANH);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.erf = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.ERF);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.step = function (x, alpha) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.STEP(alpha));
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.conv2dByMatMul = function (x, filter, convInfo, bias, activation, preluActivationWeights) {
        // Reshapes conv2D input to 2D tensors, uses matMul and then reshape the
        // result from 2D to 4D.
        var xShape = x.shape;
        var xTexData = this.texData.get(x.dataId);
        var sharedMatMulDim = convInfo.inChannels;
        var outerShapeX = xShape[0] * xShape[1] * xShape[2];
        var outerShapeFilter = convInfo.outChannels;
        var isChannelsLast = convInfo.dataFormat === 'channelsLast';
        var transposeA = false;
        var transposeB = false;
        // TODO: Once reduction ops are packed, batchMatMul will always be packed
        // and we can remove this condition.
        var batchMatMulWillBeUnpacked = (outerShapeX === 1 || outerShapeFilter === 1) &&
            sharedMatMulDim > exports.MATMUL_SHARED_DIM_THRESHOLD;
        var reshapeWillBeExpensive = xShape[2] % 2 !== 0 && !!xTexData.isPacked;
        if (batchMatMulWillBeUnpacked || !environment_1.env().getBool('WEBGL_LAZILY_UNPACK') ||
            !environment_1.env().getBool('WEBGL_PACK_BINARY_OPERATIONS') ||
            !reshapeWillBeExpensive) {
            var targetShape_1 = isChannelsLast ? xShape[0] * xShape[1] * xShape[2] :
                xShape[0] * xShape[2] * xShape[3];
            var xReshaped_1 = this.reshape(x, [1, targetShape_1, convInfo.inChannels]);
            var filterReshaped_1 = this.reshape(filter, [1, convInfo.inChannels, convInfo.outChannels]);
            return this.reshape(this.fusedBatchMatMul({
                a: xReshaped_1,
                b: filterReshaped_1,
                transposeA: transposeA,
                transposeB: transposeB,
                bias: bias,
                activation: activation,
                preluActivationWeights: preluActivationWeights
            }), convInfo.outShape);
        }
        // Following optimization is specific to packed |x| with odd row count
        // (For example, in channelLast mode, 'row count' refers to x.shape[2]):
        // we avoid expensive packed 2x2 reshape by padding row count to next,
        // even number. When x.shape[2] is odd, the result of packed batchMatMul is
        // the same (has the same texture layout and and values in the texture) as
        // it is for even x.shape[2] + 1. We make the odd-rows tensor to look like
        // even-rows tensor before the operation and, after the batchMatMul,
        // fix the even-rows result to have odd number of rows.
        var targetShape = isChannelsLast ?
            xShape[0] * xShape[1] * (xShape[2] + 1) :
            xShape[0] * xShape[2] * (xShape[3] + 1);
        var xReshaped = {
            dataId: x.dataId,
            shape: [1, targetShape, convInfo.inChannels],
            dtype: x.dtype
        };
        // xTexData.shape gets referenced from GPGPUBinary.inShapeInfos.
        // Decrementing row count, after batchMatMul->...->compileProgram leads to
        // invalid row count within the reference in GPGPUBinary.inShapeInfos.
        // Alternative fix would be to provide a copy to GPGPUBinary.inShapeInfos
        // in compileProgram method, but that would affect compilation of all
        // programs - instead, provide a copy here, with even row count, before
        // calling batchMatMul->...->compileProgram and after that, the original
        // xTexData.shape is restored.
        var originalXTexDataShape = xTexData.shape;
        xTexData.shape = xTexData.shape.slice();
        xTexData.shape[xTexData.shape.length - 2]++;
        util.assert(webgl_util.isReshapeFree(xTexData.shape, xReshaped.shape), function () { return "packed reshape " + xTexData.shape + " to " + xReshaped.shape + " isn't free"; });
        var filterReshaped = this.reshape(filter, [1, convInfo.inChannels, convInfo.outChannels]);
        var pointwiseConv = this.fusedBatchMatMul({
            a: xReshaped,
            b: filterReshaped,
            transposeA: transposeA,
            transposeB: transposeB,
            bias: bias,
            activation: activation,
            preluActivationWeights: preluActivationWeights
        });
        var pointwiseConvTexData = this.texData.get(pointwiseConv.dataId);
        util.assert(pointwiseConvTexData.isPacked, function () { return 'batchMatMul result is expected to be packed'; });
        // Restore the input shape to original.
        xTexData.shape = originalXTexDataShape;
        // Set the output shape - there is no need for expensive reshape as data
        // layout is already correct.
        pointwiseConvTexData.shape = convInfo.outShape;
        return engine_1.ENGINE.makeTensorFromDataId(pointwiseConv.dataId, convInfo.outShape, pointwiseConv.dtype);
    };
    MathBackendWebGL.prototype.conv2dWithIm2Row = function (x, filter, convInfo, bias, activation, preluActivationWeights) {
        // Rearranges conv2d input so each block to be convolved over forms the
        // column of a new matrix with shape [filterWidth * filterHeight *
        // inChannels, outHeight * outWidth]. The filter is also rearranged so each
        // output channel forms a row of a new matrix with shape [outChannels,
        // filterWidth * filterHeight * inChannels]. The convolution is then
        // computed by multiplying these matrices and reshaping the result.
        var filterWidth = convInfo.filterWidth, filterHeight = convInfo.filterHeight, inChannels = convInfo.inChannels, outWidth = convInfo.outWidth, outHeight = convInfo.outHeight, dataFormat = convInfo.dataFormat;
        var isChannelsLast = dataFormat === 'channelsLast';
        var sharedDim = filterWidth * filterHeight * inChannels;
        var numCols = outHeight * outWidth;
        var x2ColShape = [sharedDim, numCols];
        var transposeA = true;
        var transposeB = false;
        var xSqueezed = x.squeeze([0]);
        var w2Row = filter.reshape([1, sharedDim, -1]);
        var im2ColProgram = new im2col_packed_gpu_1.Im2ColPackedProgram(x2ColShape, xSqueezed.shape, convInfo);
        var im2Col = this.compileAndRun(im2ColProgram, [xSqueezed]).reshape([
            1, x2ColShape[0], x2ColShape[1]
        ]);
        var hasBias = bias != null;
        var hasPreluActivationWeights = preluActivationWeights != null;
        var fusedActivation = activation ? mapActivationToShaderProgram(activation, true) : null;
        var matmulProgram = new mulmat_packed_gpu_1.MatMulPackedProgram(im2Col.shape, [1, numCols, convInfo.outChannels], transposeA, transposeB, hasBias, fusedActivation, hasPreluActivationWeights);
        var inputs = [im2Col, w2Row];
        if (bias) {
            inputs.push(bias);
        }
        if (hasPreluActivationWeights) {
            inputs.push(preluActivationWeights);
        }
        var product = this.compileAndRun(matmulProgram, inputs);
        if (isChannelsLast) {
            return product.reshape([1, outHeight, outWidth, convInfo.outChannels]);
        }
        else {
            return product.reshape([1, convInfo.outChannels, outHeight, outWidth]);
        }
    };
    MathBackendWebGL.prototype.fusedConv2d = function (_a) {
        var input = _a.input, filter = _a.filter, convInfo = _a.convInfo, bias = _a.bias, activation = _a.activation, preluActivationWeights = _a.preluActivationWeights;
        if (convInfo.filterHeight === 1 && convInfo.filterWidth === 1 &&
            convInfo.dilationHeight === 1 && convInfo.dilationWidth === 1 &&
            convInfo.strideHeight === 1 && convInfo.strideWidth === 1 &&
            (convInfo.padInfo.type === 'SAME' ||
                convInfo.padInfo.type === 'VALID')) {
            return this.conv2dByMatMul(input, filter, convInfo, bias, activation, preluActivationWeights);
        }
        if (environment_1.env().getBool('WEBGL_CONV_IM2COL') && input.shape[0] === 1) {
            return this.conv2dWithIm2Row(input, filter, convInfo, bias, activation, preluActivationWeights);
        }
        var hasBias = bias != null;
        var hasPreluActivationWeights = preluActivationWeights != null;
        var fusedActivation = activation ? mapActivationToShaderProgram(activation, false) : null;
        var program = new conv_gpu_1.Conv2DProgram(convInfo, hasBias, fusedActivation, hasPreluActivationWeights);
        var inputs = [input, filter];
        if (bias) {
            inputs.push(bias);
        }
        if (preluActivationWeights) {
            inputs.push(preluActivationWeights);
        }
        return this.compileAndRun(program, inputs);
    };
    MathBackendWebGL.prototype.conv2d = function (x, filter, convInfo) {
        if (convInfo.filterHeight === 1 && convInfo.filterWidth === 1 &&
            convInfo.dilationHeight === 1 && convInfo.dilationWidth === 1 &&
            convInfo.strideHeight === 1 && convInfo.strideWidth === 1 &&
            (convInfo.padInfo.type === 'SAME' ||
                convInfo.padInfo.type === 'VALID')) {
            return this.conv2dByMatMul(x, filter, convInfo);
        }
        if (environment_1.env().getBool('WEBGL_CONV_IM2COL') && x.shape[0] === 1) {
            return this.conv2dWithIm2Row(x, filter, convInfo);
        }
        var program = new conv_gpu_1.Conv2DProgram(convInfo);
        return this.compileAndRun(program, [x, filter]);
    };
    MathBackendWebGL.prototype.conv2dDerInput = function (dy, filter, convInfo) {
        var program = new conv_backprop_gpu_1.Conv2DDerInputProgram(convInfo);
        return this.compileAndRun(program, [dy, filter]);
    };
    MathBackendWebGL.prototype.conv2dDerFilter = function (x, dy, convInfo) {
        var program = new conv_backprop_gpu_1.Conv2DDerFilterProgram(convInfo);
        return this.compileAndRun(program, [x, dy]);
    };
    MathBackendWebGL.prototype.fusedDepthwiseConv2D = function (_a) {
        var input = _a.input, filter = _a.filter, convInfo = _a.convInfo, bias = _a.bias, activation = _a.activation, preluActivationWeights = _a.preluActivationWeights;
        var shouldPackDepthwiseConv = environment_1.env().getBool('WEBGL_PACK_DEPTHWISECONV') &&
            convInfo.strideWidth <= 2 &&
            convInfo.outChannels / convInfo.inChannels === 1;
        var fusedActivation = activation ?
            mapActivationToShaderProgram(activation, shouldPackDepthwiseConv) :
            null;
        var inputs = [input, filter];
        var hasBias = bias != null;
        var hasPreluActivationWeights = preluActivationWeights != null;
        if (hasBias) {
            inputs.push(bias);
        }
        if (hasPreluActivationWeights) {
            inputs.push(preluActivationWeights);
        }
        var program;
        if (shouldPackDepthwiseConv) {
            program = new conv_packed_gpu_depthwise_1.DepthwiseConvPacked2DProgram(convInfo, hasBias, fusedActivation, hasPreluActivationWeights);
            return this.compileAndRun(program, inputs);
        }
        program = new conv_gpu_depthwise_1.DepthwiseConv2DProgram(convInfo, hasBias, fusedActivation, hasPreluActivationWeights);
        return this.compileAndRun(program, inputs);
    };
    MathBackendWebGL.prototype.depthwiseConv2D = function (x, filter, convInfo) {
        var program;
        if (environment_1.env().getBool('WEBGL_PACK_DEPTHWISECONV') &&
            convInfo.strideWidth <= 2 &&
            convInfo.outChannels / convInfo.inChannels === 1) {
            program = new conv_packed_gpu_depthwise_1.DepthwiseConvPacked2DProgram(convInfo);
            return this.compileAndRun(program, [x, filter]);
        }
        program = new conv_gpu_depthwise_1.DepthwiseConv2DProgram(convInfo);
        return this.compileAndRun(program, [x, filter]);
    };
    MathBackendWebGL.prototype.depthwiseConv2DDerInput = function (dy, filter, convInfo) {
        var program = new conv_backprop_gpu_depthwise_1.DepthwiseConv2DDerInputProgram(convInfo);
        return this.compileAndRun(program, [dy, filter]);
    };
    MathBackendWebGL.prototype.depthwiseConv2DDerFilter = function (x, dy, convInfo) {
        var program = new conv_backprop_gpu_depthwise_1.DepthwiseConv2DDerFilterProgram(convInfo);
        return this.compileAndRun(program, [x, dy]);
    };
    MathBackendWebGL.prototype.conv3d = function (x, filter, convInfo) {
        var program = new conv_gpu_1.Conv3DProgram(convInfo);
        return this.compileAndRun(program, [x, filter]);
    };
    MathBackendWebGL.prototype.conv3dDerInput = function (dy, filter, convInfo) {
        var program = new conv_backprop_gpu_1.Conv3DDerInputProgram(convInfo);
        return this.compileAndRun(program, [dy, filter]);
    };
    MathBackendWebGL.prototype.conv3dDerFilter = function (x, dy, convInfo) {
        var program = new conv_backprop_gpu_1.Conv3DDerFilterProgram(convInfo);
        return this.compileAndRun(program, [x, dy]);
    };
    MathBackendWebGL.prototype.maxPool = function (x, convInfo) {
        var program = new pool_gpu_1.Pool2DProgram(convInfo, 'max', false);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.avgPool = function (x, convInfo) {
        var program = new pool_gpu_1.Pool2DProgram(convInfo, 'avg', false);
        return this.compileAndRun(program, [x], 'float32');
    };
    MathBackendWebGL.prototype.maxPoolBackprop = function (dy, x, y, convInfo) {
        var getPositions = true;
        var maxPoolPositionsProgram = new pool_gpu_1.Pool2DProgram(convInfo, 'max', getPositions);
        var maxPoolPositions = this.compileAndRun(maxPoolPositionsProgram, [x]);
        var maxPoolBackPropProgram = new max_pool_backprop_gpu_1.MaxPool2DBackpropProgram(convInfo);
        var result = this.compileAndRun(maxPoolBackPropProgram, [dy, maxPoolPositions], x.dtype);
        maxPoolPositions.dispose();
        return result;
    };
    MathBackendWebGL.prototype.avgPoolBackprop = function (dy, x, convInfo) {
        var avgPoolBackpropProgram = new avg_pool_backprop_gpu_1.AvgPool2DBackpropProgram(convInfo);
        return this.compileAndRun(avgPoolBackpropProgram, [dy], x.dtype);
    };
    MathBackendWebGL.prototype.cast = function (x, dtype) {
        return backend_util.castTensor(x, dtype, this);
    };
    MathBackendWebGL.prototype.unstack = function (x, axis) {
        var num = x.shape[axis];
        var outShape = new Array(x.rank - 1);
        var outIndex = 0;
        for (var i = 0; i < x.rank; i++) {
            if (i !== axis) {
                outShape[outIndex++] = x.shape[i];
            }
        }
        var begin = new Array(x.rank).fill(0);
        var size = x.shape.slice();
        size[axis] = 1;
        var res = new Array(num);
        for (var i = 0; i < res.length; i++) {
            begin[axis] = i;
            res[i] = this.slice(x, begin, size).reshape(outShape);
        }
        return res;
    };
    MathBackendWebGL.prototype.avgPool3d = function (x, convInfo) {
        var program = new pool_gpu_1.Pool3DProgram(convInfo, 'avg', false);
        return this.compileAndRun(program, [x], 'float32');
    };
    MathBackendWebGL.prototype.avgPool3dBackprop = function (dy, x, convInfo) {
        var avgPool3dBackpropProgram = new avg_pool_backprop_gpu_1.AvgPool3DBackpropProgram(convInfo);
        return this.compileAndRun(avgPool3dBackpropProgram, [dy], x.dtype);
    };
    MathBackendWebGL.prototype.maxPool3d = function (x, convInfo) {
        var program = new pool_gpu_1.Pool3DProgram(convInfo, 'max', false);
        return this.compileAndRun(program, [x], 'float32');
    };
    MathBackendWebGL.prototype.maxPool3dBackprop = function (dy, x, y, convInfo) {
        var getPositions = true;
        var maxPool3dPositionsProgram = new pool_gpu_1.Pool3DProgram(convInfo, 'max', getPositions);
        var maxPool3dPositions = this.compileAndRun(maxPool3dPositionsProgram, [x]);
        var maxPool3dBackPropProgram = new max_pool_backprop_gpu_1.MaxPool3DBackpropProgram(convInfo);
        var result = this.compileAndRun(maxPool3dBackPropProgram, [dy, maxPool3dPositions], x.dtype);
        maxPool3dPositions.dispose();
        return result;
    };
    MathBackendWebGL.prototype.reshape = function (x, shape) {
        var texData = this.texData.get(x.dataId);
        if (texData.isPacked && !webgl_util.isReshapeFree(x.shape, shape) &&
            !(texData.texture !== null &&
                webgl_util.isReshapeFree(texData.shape, shape))) {
            var info = this.packedReshape(x, shape);
            return engine_1.ENGINE.makeTensorFromDataId(info.dataId, info.shape, info.dtype);
        }
        return backend_util.reshapeTensor(x, shape);
    };
    MathBackendWebGL.prototype.resizeBilinear = function (x, newHeight, newWidth, alignCorners) {
        var program = environment_1.env().getBool('WEBGL_PACK_IMAGE_OPERATIONS') ?
            new resize_bilinear_packed_gpu_1.ResizeBilinearPackedProgram(x.shape, newHeight, newWidth, alignCorners) :
            new resize_bilinear_gpu_1.ResizeBilinearProgram(x.shape, newHeight, newWidth, alignCorners);
        return this.compileAndRun(program, [x], 'float32');
    };
    MathBackendWebGL.prototype.resizeBilinearBackprop = function (dy, x, alignCorners) {
        var program = new resize_bilinear_backprop_gpu_1.ResizeBilinearBackpropProgram(dy, x, alignCorners);
        return this.compileAndRun(program, [dy]);
    };
    MathBackendWebGL.prototype.resizeNearestNeighbor = function (x, newHeight, newWidth, alignCorners) {
        var program = new resize_nearest_neighbor_gpu_1.ResizeNearestNeighborProgram(x.shape, newHeight, newWidth, alignCorners);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.resizeNearestNeighborBackprop = function (dy, x, alignCorners) {
        var program = new resize_nearest_neighbor_backprop_gpu_1.ResizeNearestNeigborBackpropProgram(dy, x, alignCorners);
        return this.compileAndRun(program, [dy]);
    };
    MathBackendWebGL.prototype.multinomial = function (logits, normalized, numSamples, seed) {
        var probs = normalized ? logits : softmax_1.softmax(logits);
        var batchSize = probs.shape[0];
        var numOutcomes = probs.shape[1];
        var program = new multinomial_gpu_1.MultinomialProgram(batchSize, numOutcomes, numSamples);
        var customSetup = program.getCustomSetupFunc(seed);
        return this.compileAndRun(program, [probs], 'int32', customSetup);
    };
    MathBackendWebGL.prototype.oneHot = function (indices, depth, onValue, offValue) {
        var program = new onehot_gpu_1.OneHotProgram(indices.size, depth, onValue, offValue);
        return this.compileAndRun(program, [indices]);
    };
    MathBackendWebGL.prototype.diag = function (x) {
        var program = new diag_gpu_1.DiagProgram(x.size);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.nonMaxSuppression = function (boxes, scores, maxOutputSize, iouThreshold, scoreThreshold) {
        log_1.warn('tf.nonMaxSuppression() in webgl locks the UI thread. ' +
            'Call tf.nonMaxSuppressionAsync() instead');
        var boxesVals = boxes.dataSync();
        var scoresVals = scores.dataSync();
        return non_max_suppression_impl_1.nonMaxSuppressionV3(boxesVals, scoresVals, maxOutputSize, iouThreshold, scoreThreshold);
    };
    MathBackendWebGL.prototype.cropAndResize = function (image, boxes, boxIndex, cropSize, method, extrapolationValue) {
        var program = new crop_and_resize_gpu_1.CropAndResizeProgram(image.shape, boxes.shape, cropSize, method, extrapolationValue);
        return this.compileAndRun(program, [image, boxes, boxIndex], 'float32');
    };
    MathBackendWebGL.prototype.depthToSpace = function (x, blockSize, dataFormat) {
        util.assert(blockSize > 1, function () {
            return "blockSize should be > 1 for depthToSpace, but was: " + blockSize;
        });
        var batchSize = x.shape[0];
        var inputHeight = (dataFormat === 'NHWC') ? x.shape[1] : x.shape[2];
        var inputWidth = (dataFormat === 'NHWC') ? x.shape[2] : x.shape[3];
        var inputDepth = (dataFormat === 'NHWC') ? x.shape[3] : x.shape[1];
        var outputHeight = inputHeight * blockSize;
        var outputWidth = inputWidth * blockSize;
        var outputDepth = inputDepth / (blockSize * blockSize);
        var outputShape = (dataFormat === 'NHWC') ?
            [batchSize, outputHeight, outputWidth, outputDepth] :
            [batchSize, outputDepth, outputHeight, outputWidth];
        var program = new depth_to_space_gpu_1.DepthToSpaceProgram(outputShape, blockSize, dataFormat);
        return this.compileAndRun(program, [x]);
    };
    MathBackendWebGL.prototype.split = function (x, sizeSplits, axis) {
        return split_shared_1.split(x, sizeSplits, axis);
    };
    MathBackendWebGL.prototype.scatterND = function (indices, updates, shape) {
        var _a = scatter_nd_util.calculateShapes(updates, indices, shape), sliceRank = _a.sliceRank, numUpdates = _a.numUpdates, sliceSize = _a.sliceSize, strides = _a.strides, outputSize = _a.outputSize;
        var flattenShape = [outputSize / sliceSize, sliceSize];
        var flattenIndices = indices.reshape([numUpdates, sliceRank]);
        var flattenX = updates.reshape([numUpdates, sliceSize]);
        if (outputSize === 0) {
            return backend_util.reshapeTensor(tensor_ops_1.tensor([]), shape);
        }
        var defaultValue = tensor_ops_1.scalar(0);
        var program = new scatter_gpu_1.ScatterProgram(numUpdates, sliceRank, flattenIndices.rank, flattenX.rank, strides, flattenShape);
        var res = this.compileAndRun(program, [flattenX, flattenIndices, defaultValue]);
        return res.reshape(shape);
    };
    MathBackendWebGL.prototype.sparseToDense = function (sparseIndices, sparseValues, outputShape, defaultValue) {
        var _a = scatter_nd_util.calculateShapes(sparseValues, sparseIndices, outputShape), sliceRank = _a.sliceRank, numUpdates = _a.numUpdates, strides = _a.strides, outputSize = _a.outputSize;
        var sumDupeIndices = false;
        var program = new scatter_gpu_1.ScatterProgram(numUpdates, sliceRank, sparseIndices.rank, sparseValues.rank, strides, [outputSize, 1], sumDupeIndices);
        var res = this.compileAndRun(program, [sparseValues, sparseIndices, defaultValue]);
        return res.reshape(outputShape);
    };
    MathBackendWebGL.prototype.fft = function (x) {
        var inverse = false;
        return this.fftImpl(x, inverse);
    };
    MathBackendWebGL.prototype.ifft = function (x) {
        var inverse = true;
        return this.fftImpl(x, inverse);
    };
    MathBackendWebGL.prototype.fftImpl = function (x, inverse) {
        var xData = this.texData.get(x.dataId);
        var realProgram = new fft_gpu_1.FFTProgram(fft_gpu.COMPLEX_FFT.REAL, x.shape, inverse);
        var imagProgram = new fft_gpu_1.FFTProgram(fft_gpu.COMPLEX_FFT.IMAG, x.shape, inverse);
        var inputs = [
            this.makeComplexComponentTensorInfo(x, xData.complexTensors.real),
            this.makeComplexComponentTensorInfo(x, xData.complexTensors.imag),
        ];
        var real = this.compileAndRun(realProgram, inputs);
        var imag = this.compileAndRun(imagProgram, inputs);
        var complex = this.complex(real, imag).as2D(x.shape[0], x.shape[1]);
        real.dispose();
        imag.dispose();
        return complex;
    };
    MathBackendWebGL.prototype.gatherND = function (x, indices) {
        var indicesShape = indices.shape;
        var sliceRank = indicesShape[indicesShape.length - 1];
        var _a = gather_nd_util.prepareAndValidate(x, indices), resultShape = _a[0], numSlices = _a[1], sliceSize = _a[2], strides = _a[3];
        var flattenIndices = indices.reshape([numSlices, sliceRank]);
        var flattenX = x.reshape([x.size / sliceSize, sliceSize]);
        var program = new gather_nd_gpu_1.GatherNDProgram(sliceRank, strides, [numSlices, sliceSize]);
        var res = this.compileAndRun(program, [flattenX, flattenIndices]);
        return res.reshape(resultShape);
    };
    MathBackendWebGL.prototype.fill = function (shape, value, dtype) {
        dtype = dtype || util_1.inferDtype(value);
        if (dtype === 'string') {
            // String type should be handled in CPU memory.
            var values = util_1.getArrayFromDType(dtype, util_1.sizeFromShape(shape));
            values.fill(value);
            return engine_1.ENGINE.makeTensor(values, shape, dtype, this);
        }
        else {
            var program = new fill_gpu_1.FillProgram(shape, value);
            var customSetup = program.getCustomSetupFunc(value);
            return this.compileAndRun(program, [], dtype, customSetup);
        }
    };
    MathBackendWebGL.prototype.onesLike = function (x) {
        if (x.dtype === 'string') {
            throw new Error('onesLike is not supported under string dtype');
        }
        else {
            // TODO(cais, smilkov): Add WebGL shader for onesLike:
            //   https://github.com/tensorflow/tfjs/issues/1293
            return this.fill(x.shape, 1, x.dtype);
        }
    };
    MathBackendWebGL.prototype.zerosLike = function (x) {
        return this.fill(x.shape, x.dtype === 'string' ? '' : 0, x.dtype);
    };
    MathBackendWebGL.prototype.linspace = function (start, stop, num) {
        // TODO: Use CPU implementation due to the precision problem in Safari.
        return backend_util.linspaceImpl(start, stop, num);
    };
    MathBackendWebGL.prototype.makeTensorInfo = function (shape, dtype) {
        var dataId = this.write(null /* values */, shape, dtype);
        this.texData.get(dataId).usage = null;
        return { dataId: dataId, shape: shape, dtype: dtype };
    };
    MathBackendWebGL.prototype.makeOutput = function (shape, dtype) {
        var dataId = this.makeTensorInfo(shape, dtype).dataId;
        return engine_1.ENGINE.makeTensorFromDataId(dataId, shape, dtype, this);
    };
    MathBackendWebGL.prototype.unpackTensor = function (input) {
        var program = new unpack_gpu_1.UnpackProgram(input.shape);
        return this.runWebGLProgram(program, [input], input.dtype);
    };
    MathBackendWebGL.prototype.packTensor = function (input) {
        var program = new pack_gpu_1.PackProgram(input.shape);
        var preventEagerUnpackingOutput = true;
        return this.runWebGLProgram(program, [input], input.dtype, null /* customSetup */, preventEagerUnpackingOutput);
    };
    MathBackendWebGL.prototype.packedReshape = function (input, afterShape) {
        var input3DShape = [
            webgl_util.getBatchDim(input.shape)
        ].concat(webgl_util.getRowsCols(input.shape));
        var input3D = {
            dtype: input.dtype,
            shape: input3DShape,
            dataId: input.dataId
        };
        var afterShapeAs3D = [
            webgl_util.getBatchDim(afterShape)
        ].concat(webgl_util.getRowsCols(afterShape));
        var program = new reshape_packed_gpu_1.ReshapePackedProgram(afterShapeAs3D, input3DShape);
        var preventEagerUnpackingOfOutput = true;
        var output = this.runWebGLProgram(program, [input3D], input.dtype, null /* customSetup */, preventEagerUnpackingOfOutput);
        return { dataId: output.dataId, shape: afterShape, dtype: output.dtype };
    };
    MathBackendWebGL.prototype.decode = function (dataId) {
        var texData = this.texData.get(dataId);
        var isPacked = texData.isPacked, shape = texData.shape, dtype = texData.dtype;
        var shapeAs3D = webgl_util.getShapeAs3D(shape);
        var program;
        if (isPacked) {
            program = new decode_matrix_packed_gpu_1.DecodeMatrixPackedProgram(shapeAs3D);
        }
        else {
            program = new decode_matrix_gpu_1.DecodeMatrixProgram(shapeAs3D);
        }
        var preventEagerUnpackingOfOutput = true;
        var out = this.runWebGLProgram(program, [{ shape: shapeAs3D, dtype: dtype, dataId: dataId }], dtype, null /* customSetup */, preventEagerUnpackingOfOutput);
        return { dtype: dtype, shape: shape, dataId: out.dataId };
    };
    MathBackendWebGL.prototype.runWebGLProgram = function (program, inputs, outputDtype, customSetup, preventEagerUnpackingOfOutput) {
        var _this = this;
        if (preventEagerUnpackingOfOutput === void 0) { preventEagerUnpackingOfOutput = false; }
        var output = this.makeTensorInfo(program.outputShape, outputDtype);
        var outData = this.texData.get(output.dataId);
        if (program.packedOutput) {
            outData.isPacked = true;
        }
        if (program.outPackingScheme === tex_util.PackingScheme.DENSE) {
            var texelShape = tex_util.getDenseTexShape(program.outputShape);
            // For a densely packed output, we explicitly set texShape
            // so it doesn't get assigned later according to our typical packing
            // scheme wherein a single texel can only contain values from adjacent
            // rows/cols.
            outData.texShape = texelShape.map(function (d) { return d * 2; });
        }
        if (program.outTexUsage != null) {
            outData.usage = program.outTexUsage;
        }
        if (util_1.sizeFromShape(output.shape) === 0) {
            // Short-circuit the computation since the result is empty (has 0 in its
            // shape).
            outData.values = util_1.getTypedArrayFromDType(output.dtype, 0);
            return output;
        }
        var dataToDispose = [];
        var inputsData = inputs.map(function (input) {
            if (input.dtype === 'complex64') {
                throw new Error("GPGPUProgram does not support complex64 input. For complex64 " +
                    "dtypes, please separate the program into real and imaginary " +
                    "parts.");
            }
            var texData = _this.texData.get(input.dataId);
            if (texData.texture == null) {
                if (!program.packedInputs &&
                    util.sizeFromShape(input.shape) <=
                        environment_1.env().getNumber('WEBGL_SIZE_UPLOAD_UNIFORM')) {
                    // Upload small tensors that live on the CPU as uniforms, not as
                    // textures. Do this only when the environment supports 32bit floats
                    // due to problems when comparing 16bit floats with 32bit floats.
                    // TODO(https://github.com/tensorflow/tfjs/issues/821): Make it
                    // possible for packed shaders to sample from uniforms.
                    return {
                        shape: input.shape,
                        texData: null,
                        isUniform: true,
                        uniformValues: texData.values
                    };
                }
                // This ensures that if a packed program's inputs have not yet been
                // uploaded to the GPU, they get uploaded as packed right off the bat.
                if (program.packedInputs) {
                    texData.isPacked = true;
                    texData.shape = input.shape;
                }
            }
            else if (!!texData.isPacked !== !!program.packedInputs) {
                input = texData.isPacked ? _this.unpackTensor(input) :
                    _this.packTensor(input);
                dataToDispose.push(input);
                texData = _this.texData.get(input.dataId);
            }
            else if (texData.isPacked &&
                !webgl_util.isReshapeFree(texData.shape, input.shape)) {
                // This is a special case where a texture exists for a tensor
                // but the shapes are incompatible (due to packing constraints) because
                // the tensor did not have a chance to go through the packed reshape
                // shader. This only happens when we reshape the *same* tensor to form
                // *distinct* inputs to an op, e.g. dotting a vector with itself. This
                // case will disappear once packed uploading is the default.
                var savedInput = input;
                var targetShape = input.shape;
                input.shape = texData.shape;
                input = _this.packedReshape(input, targetShape);
                dataToDispose.push(input);
                texData = _this.texData.get(input.dataId);
                savedInput.shape = targetShape;
            }
            _this.uploadToGPU(input.dataId);
            return { shape: input.shape, texData: texData, isUniform: false };
        });
        this.uploadToGPU(output.dataId);
        var outputData = { shape: output.shape, texData: outData, isUniform: false };
        var key = gpgpu_math.makeShaderKey(program, inputsData, outputData);
        var binary = this.getAndSaveBinary(key, function () {
            return gpgpu_math.compileProgram(_this.gpgpu, program, inputsData, outputData);
        });
        var shouldTimeProgram = this.activeTimers != null;
        var query;
        if (shouldTimeProgram) {
            query = this.startTimer();
        }
        gpgpu_math.runProgram(this.gpgpu, binary, inputsData, outputData, customSetup);
        dataToDispose.forEach(function (info) { return _this.disposeData(info.dataId); });
        if (shouldTimeProgram) {
            query = this.endTimer(query);
            this.activeTimers.push({ name: program.constructor.name, query: this.getQueryTime(query) });
        }
        if (!environment_1.env().getBool('WEBGL_LAZILY_UNPACK') && outData.isPacked &&
            preventEagerUnpackingOfOutput === false) {
            var unpacked = this.unpackTensor(output);
            this.disposeData(output.dataId);
            return unpacked;
        }
        return output;
    };
    MathBackendWebGL.prototype.compileAndRun = function (program, inputs, outputDtype, customSetup, preventEagerUnpackingOfOutput) {
        if (preventEagerUnpackingOfOutput === void 0) { preventEagerUnpackingOfOutput = false; }
        outputDtype = outputDtype || inputs[0].dtype;
        var outInfo = this.runWebGLProgram(program, inputs, outputDtype, customSetup, preventEagerUnpackingOfOutput);
        return engine_1.ENGINE.makeTensorFromDataId(outInfo.dataId, outInfo.shape, outInfo.dtype);
    };
    MathBackendWebGL.prototype.getAndSaveBinary = function (key, getBinary) {
        if (!(key in this.binaryCache)) {
            this.binaryCache[key] = getBinary();
        }
        return this.binaryCache[key];
    };
    MathBackendWebGL.prototype.getTextureManager = function () {
        return this.textureManager;
    };
    MathBackendWebGL.prototype.dispose = function () {
        var _this = this;
        if (this.disposed) {
            return;
        }
        // Avoid disposing the compiled webgl programs during unit testing because
        // it slows down test execution.
        if (!environment_1.env().getBool('IS_TEST')) {
            var allKeys = Object.keys(this.binaryCache);
            allKeys.forEach(function (key) {
                _this.gpgpu.deleteProgram(_this.binaryCache[key].webGLProgram);
                delete _this.binaryCache[key];
            });
        }
        this.textureManager.dispose();
        if (this.canvas != null &&
            (typeof (HTMLCanvasElement) !== 'undefined' &&
                this.canvas instanceof HTMLCanvasElement)) {
            this.canvas.remove();
        }
        else {
            this.canvas = null;
        }
        if (this.gpgpuCreatedLocally) {
            this.gpgpu.program = null;
            this.gpgpu.dispose();
        }
        this.disposed = true;
    };
    MathBackendWebGL.prototype.floatPrecision = function () {
        var _this = this;
        if (this.floatPrecisionValue == null) {
            this.floatPrecisionValue = globals_1.tidy(function () {
                if (!environment_1.env().get('WEBGL_RENDER_FLOAT32_ENABLED')) {
                    // Momentarily switching DEBUG flag to false so we don't throw an
                    // error trying to upload a small value.
                    var debugFlag = environment_1.env().getBool('DEBUG');
                    environment_1.env().set('DEBUG', false);
                    var underflowCheckValue = _this.abs(tensor_ops_1.scalar(1e-8)).dataSync()[0];
                    environment_1.env().set('DEBUG', debugFlag);
                    if (underflowCheckValue > 0) {
                        return 32;
                    }
                }
                return 16;
            });
        }
        return this.floatPrecisionValue;
    };
    /** Returns the smallest representable number.  */
    MathBackendWebGL.prototype.epsilon = function () {
        return this.floatPrecision() === 32 ? backend_1.EPSILON_FLOAT32 : backend_1.EPSILON_FLOAT16;
    };
    MathBackendWebGL.prototype.uploadToGPU = function (dataId) {
        var _a;
        var texData = this.texData.get(dataId);
        var shape = texData.shape, dtype = texData.dtype, values = texData.values, texture = texData.texture, usage = texData.usage, isPacked = texData.isPacked;
        if (texture != null) {
            // Array is already on GPU. No-op.
            return;
        }
        var shouldTimeProgram = this.activeTimers != null;
        var start;
        if (shouldTimeProgram) {
            start = util.now();
        }
        var texShape = texData.texShape;
        if (texShape == null) {
            texShape = webgl_util.getTextureShapeFromLogicalShape(shape, isPacked);
            texData.texShape = texShape;
        }
        if (values != null) {
            var shapeAs3D = webgl_util.getShapeAs3D(shape);
            var program = void 0;
            var width = texShape[1], height = texShape[0];
            var isByteArray = values instanceof Uint8Array;
            if (isPacked) {
                _a = tex_util.getPackedMatrixTextureShapeWidthHeight(texShape[0], texShape[1]), width = _a[0], height = _a[1];
                program = new encode_matrix_packed_gpu_1.EncodeMatrixPackedProgram(shapeAs3D, [height, width], isByteArray);
            }
            else {
                program =
                    new encode_matrix_gpu_1.EncodeMatrixProgram(shapeAs3D, [height, width], isByteArray);
            }
            var tempDenseInputHandle = this.makeTensorInfo([height, width], dtype);
            if (isByteArray) {
                this.texData.get(tempDenseInputHandle.dataId).usage =
                    tex_util_1.TextureUsage.PIXELS;
            }
            else {
                this.texData.get(tempDenseInputHandle.dataId).usage =
                    tex_util_1.TextureUsage.UPLOAD;
            }
            this.gpgpu.uploadDenseMatrixToTexture(this.getTexture(tempDenseInputHandle.dataId), width, height, values);
            // We want the output to remain packed regardless of the value of
            // WEBGL_PACK.
            var preventEagerUnpacking = true;
            var encodedOutputTarget = this.runWebGLProgram(program, [tempDenseInputHandle], dtype, null, preventEagerUnpacking);
            // Have the original texture assume the identity of the encoded output.
            var outputTexData = this.texData.get(encodedOutputTarget.dataId);
            texData.texture = outputTexData.texture;
            texData.texShape = outputTexData.texShape;
            texData.isPacked = outputTexData.isPacked;
            texData.usage = outputTexData.usage;
            this.disposeData(tempDenseInputHandle.dataId);
            this.texData.delete(encodedOutputTarget.dataId);
            // Once uploaded, don't store the values on cpu.
            texData.values = null;
            if (shouldTimeProgram) {
                this.uploadWaitMs += util.now() - start;
            }
        }
        else {
            var newTexture = this.acquireTexture(texShape, usage, dtype, isPacked);
            texData.texture = newTexture;
        }
    };
    MathBackendWebGL.prototype.convertAndCacheOnCPU = function (dataId, float32Values) {
        var texData = this.texData.get(dataId);
        var dtype = texData.dtype;
        this.releaseGPUData(dataId);
        if (float32Values != null) {
            texData.values = float32ToTypedArray(float32Values, dtype);
        }
        return texData.values;
    };
    MathBackendWebGL.prototype.acquireTexture = function (texShape, texType, dtype, isPacked) {
        this.numBytesInGPU += this.computeBytes(texShape, dtype);
        if (!this.warnedAboutMemory &&
            this.numBytesInGPU > this.numMBBeforeWarning * 1024 * 1024) {
            var mb = (this.numBytesInGPU / 1024 / 1024).toFixed(2);
            this.warnedAboutMemory = true;
            console.warn("High memory usage in GPU: " + mb + " MB, " +
                "most likely due to a memory leak");
        }
        return this.textureManager.acquireTexture(texShape, texType, isPacked);
    };
    MathBackendWebGL.prototype.computeBytes = function (shape, dtype) {
        return shape[0] * shape[1] * util.bytesPerElement(dtype);
    };
    return MathBackendWebGL;
}(backend_1.KernelBackend));
exports.MathBackendWebGL = MathBackendWebGL;
if (device_util.isBrowser()) {
    engine_1.ENGINE.registerBackend('webgl', function () { return new MathBackendWebGL(); }, 2 /* priority */);
}
function float32ToTypedArray(a, dtype) {
    if (dtype === 'float32' || dtype === 'complex64') {
        return a;
    }
    else if (dtype === 'int32' || dtype === 'bool') {
        var result = (dtype === 'int32') ? new Int32Array(a.length) :
            new Uint8Array(a.length);
        for (var i = 0; i < result.length; ++i) {
            result[i] = Math.round(a[i]);
        }
        return result;
    }
    else {
        throw new Error("Unknown dtype " + dtype);
    }
}
//# sourceMappingURL=backend_webgl.js.map