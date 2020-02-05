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
Object.defineProperty(exports, "__esModule", { value: true });
var operation_1 = require("../ops/operation");
var binary_ops_1 = require("./binary_ops");
var concat_split_1 = require("./concat_split");
var slice_1 = require("./slice");
var spectral_ops_1 = require("./spectral_ops");
var tensor_ops_1 = require("./tensor_ops");
/**
 * Generate a Hann window.
 *
 * See: https://en.wikipedia.org/wiki/Window_function#Hann_and_Hamming_windows
 *
 * ```js
 * tf.signal.hannWindow(10).print();
 * ```
 * @param The length of window
 */
/**
 * @doc {heading: 'Operations', subheading: 'Signal', namespace: 'signal'}
 */
function hannWindow_(windowLength) {
    return cosineWindow(windowLength, 0.5, 0.5);
}
/**
 * Generate a hamming window.
 *
 * See: https://en.wikipedia.org/wiki/Window_function#Hann_and_Hamming_windows
 *
 * ```js
 * tf.signal.hammingWindow(10).print();
 * ```
 * @param The length of window
 */
/**
 * @doc {heading: 'Operations', subheading: 'Signal', namespace: 'signal'}
 */
function hammingWindow_(windowLength) {
    return cosineWindow(windowLength, 0.54, 0.46);
}
/**
 * Expands input into frames of frameLength.
 * Slides a window size with frameStep.
 *
 * ```js
 * tf.signal.frame([1, 2, 3], 2, 1).print();
 * ```
 * @param signal The input tensor to be expanded
 * @param frameLength Length of each frame
 * @param frameStep The frame hop size in samples.
 * @param padEnd Whether to pad the end of signal with padValue.
 * @param padValue An number to use where the input signal does
 *     not exist when padEnd is True.
 */
/**
 * @doc {heading: 'Operations', subheading: 'Signal', namespace: 'signal'}
 */
function frame_(signal, frameLength, frameStep, padEnd, padValue) {
    if (padEnd === void 0) { padEnd = false; }
    if (padValue === void 0) { padValue = 0; }
    var start = 0;
    var output = [];
    while (start + frameLength <= signal.size) {
        output.push(slice_1.slice(signal, start, frameLength));
        start += frameStep;
    }
    if (padEnd) {
        while (start < signal.size) {
            var padLen = (start + frameLength) - signal.size;
            var pad = concat_split_1.concat([slice_1.slice(signal, start, frameLength - padLen),
                tensor_ops_1.fill([padLen], padValue)]);
            output.push(pad);
            start += frameStep;
        }
    }
    if (output.length === 0) {
        return tensor_ops_1.tensor2d([], [0, frameLength]);
    }
    return concat_split_1.concat(output).as2D(output.length, frameLength);
}
/**
 * Computes the Short-time Fourier Transform of signals
 * See: https://en.wikipedia.org/wiki/Short-time_Fourier_transform
 *
 * ```js
 * const input = tf.tensor1d([1, 1, 1, 1, 1])
 * tf.signal.stft(input, 3, 1).print();
 * ```
 * @param signal 1-dimensional real value tensor.
 * @param frameLength The window length of samples.
 * @param frameStep The number of samples to step.
 * @param fftLength The size of the FFT to apply.
 * @param windowFn A callable that takes a window length and returns 1-d tensor.
 */
/**
 * @doc {heading: 'Operations', subheading: 'Signal', namespace: 'signal'}
 */
function stft_(signal, frameLength, frameStep, fftLength, windowFn) {
    if (windowFn === void 0) { windowFn = exports.hannWindow; }
    if (fftLength == null) {
        fftLength = enclosingPowerOfTwo(frameLength);
    }
    var framedSignal = exports.frame(signal, frameLength, frameStep);
    var windowedSignal = binary_ops_1.mul(framedSignal, windowFn(frameLength));
    var output = [];
    for (var i = 0; i < framedSignal.shape[0]; i++) {
        output.push(spectral_ops_1.rfft(windowedSignal.slice([i, 0], [1, frameLength]), fftLength));
    }
    return concat_split_1.concat(output);
}
function enclosingPowerOfTwo(value) {
    // Return 2**N for integer N such that 2**N >= value.
    return Math.floor(Math.pow(2, Math.ceil(Math.log(value) / Math.log(2.0))));
}
function cosineWindow(windowLength, a, b) {
    var even = 1 - windowLength % 2;
    var newValues = new Float32Array(windowLength);
    for (var i = 0; i < windowLength; ++i) {
        var cosArg = (2.0 * Math.PI * i) / (windowLength + even - 1);
        newValues[i] = a - b * Math.cos(cosArg);
    }
    return tensor_ops_1.tensor1d(newValues, 'float32');
}
exports.hannWindow = operation_1.op({ hannWindow_: hannWindow_ });
exports.hammingWindow = operation_1.op({ hammingWindow_: hammingWindow_ });
exports.frame = operation_1.op({ frame_: frame_ });
exports.stft = operation_1.op({ stft_: stft_ });
//# sourceMappingURL=signal_ops.js.map