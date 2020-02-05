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
var kernelRegistry = new Map();
var gradRegistry = new Map();
/**
 * Returns the kernel function (code) associated with the provided names.
 *
 * @param kernelName The official name of the kernel.
 * @param backendName The official name of the backend.
 */
function getKernel(kernelName, backendName) {
    var key = makeKey(kernelName, backendName);
    return kernelRegistry.get(key);
}
exports.getKernel = getKernel;
/**
 * Returns the registered gradient info associated with the provided kernel.
 * @param kernelName The official TF kernel name.
 */
function getGradient(kernelName) {
    return gradRegistry.get(kernelName);
}
exports.getGradient = getGradient;
function getKernelsForBackend(backendName) {
    var it = kernelRegistry.entries();
    var result = [];
    while (true) {
        var _a = it.next(), done = _a.done, value = _a.value;
        if (done) {
            break;
        }
        var key = value[0], config = value[1];
        var backend = key.split('_')[0];
        if (backend === backendName) {
            result.push(config);
        }
    }
    return result;
}
exports.getKernelsForBackend = getKernelsForBackend;
/**
 * Registers the function (forward pass) for the kernel in a global registry.
 *
 * @param config A config object with the following properties:
 * - `kernelName` The official name of the kernel.
 * - `backendName` The official name of the backend.
 * - `kernelFunc` The function to run during the forward pass of the kernel.
 * - `setupFunc` Optional. Gets called once, after the backend initializes.
 * - `disposeFunc` Optional. Gets called once, right before the backend is
 * disposed.
 */
function registerKernel(config) {
    var kernelName = config.kernelName, backendName = config.backendName;
    var key = makeKey(kernelName, backendName);
    if (kernelRegistry.has(key)) {
        throw new Error("The kernel '" + kernelName + "' for backend " +
            ("'" + backendName + "' is already registered"));
    }
    kernelRegistry.set(key, config);
}
exports.registerKernel = registerKernel;
/**
 * Registers a gradient function for a given kernel in the global registry,
 * to be used during the back-propagation of that kernel.
 *
 * @param config An object with the following properties:
 * - `kernelName` The name of the kernel that the gradient function is for.
 * - `gradFunc` The function to run during back-propagation.
 */
function registerGradient(config) {
    var kernelName = config.kernelName;
    if (gradRegistry.has(kernelName)) {
        console.warn("Overriding the gradient for '" + kernelName + "'");
    }
    gradRegistry.set(kernelName, config);
}
exports.registerGradient = registerGradient;
/**
 * Removes the kernel function from the registry.
 *
 * @param kernelName The official name of the kernel.
 * @param backendName The official name of the backend.
 *
 */
function unregisterKernel(kernelName, backendName) {
    var key = makeKey(kernelName, backendName);
    if (!kernelRegistry.has(key)) {
        throw new Error("The kernel '" + kernelName + "' for backend " +
            ("'" + backendName + "' is not registered"));
    }
    kernelRegistry.delete(key);
}
exports.unregisterKernel = unregisterKernel;
/** Removes the registered gradient from the global registry. */
function unregisterGradient(kernelName) {
    if (!gradRegistry.has(kernelName)) {
        throw new Error("The gradient '" + kernelName + "' for backend is not registered");
    }
    gradRegistry.delete(kernelName);
}
exports.unregisterGradient = unregisterGradient;
function makeKey(kernelName, backendName) {
    return backendName + "_" + kernelName;
}
//# sourceMappingURL=kernel_registry.js.map