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
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @fileoverview
 * @suppress {partialAlias} Optimization disabled due to passing the module
 * object into a function below:
 *
 *   import * as ops from './ops/ops';
 *   setOpHandler(ops);
 */
// Engine is the global singleton that needs to be initialized before the rest
// of the app.
require("./engine");
// Register backend-agnostic flags.
require("./flags");
// backend_cpu.ts and backend_webgl.ts are standalone files and should be
// explicitly included here.
require("./backends/webgl/backend_webgl");
require("./backends/cpu/backend_cpu");
// Import all kernels from cpu.
require("./backends/cpu/register_all_kernels");
// Import all kernels from webgl.
require("./backends/webgl/register_all_kernels");
// Register all the gradients.
require("./register_all_gradients");
require("./platforms/platform_browser");
require("./platforms/platform_node");
var backend_util = require("./backends/backend_util");
exports.backend_util = backend_util;
// Serialization.
var io = require("./io/io");
exports.io = io;
var math = require("./math");
exports.math = math;
var browser = require("./ops/browser");
exports.browser = browser;
var gather_util = require("./ops/gather_nd_util");
exports.gather_util = gather_util;
var scatter_util = require("./ops/scatter_nd_util");
exports.scatter_util = scatter_util;
var slice_util = require("./ops/slice_util");
exports.slice_util = slice_util;
var serialization = require("./serialization");
exports.serialization = serialization;
var tensor_1 = require("./tensor");
var tensor_util = require("./tensor_util");
exports.tensor_util = tensor_util;
var test_util = require("./test_util");
exports.test_util = test_util;
var util = require("./util");
exports.util = util;
var version_1 = require("./version");
exports.version_core = version_1.version;
var webgl = require("./webgl");
exports.webgl = webgl;
// Optimizers.
var adadelta_optimizer_1 = require("./optimizers/adadelta_optimizer");
exports.AdadeltaOptimizer = adadelta_optimizer_1.AdadeltaOptimizer;
var adagrad_optimizer_1 = require("./optimizers/adagrad_optimizer");
exports.AdagradOptimizer = adagrad_optimizer_1.AdagradOptimizer;
var adam_optimizer_1 = require("./optimizers/adam_optimizer");
exports.AdamOptimizer = adam_optimizer_1.AdamOptimizer;
var adamax_optimizer_1 = require("./optimizers/adamax_optimizer");
exports.AdamaxOptimizer = adamax_optimizer_1.AdamaxOptimizer;
var momentum_optimizer_1 = require("./optimizers/momentum_optimizer");
exports.MomentumOptimizer = momentum_optimizer_1.MomentumOptimizer;
var optimizer_1 = require("./optimizers/optimizer");
exports.Optimizer = optimizer_1.Optimizer;
var rmsprop_optimizer_1 = require("./optimizers/rmsprop_optimizer");
exports.RMSPropOptimizer = rmsprop_optimizer_1.RMSPropOptimizer;
var sgd_optimizer_1 = require("./optimizers/sgd_optimizer");
exports.SGDOptimizer = sgd_optimizer_1.SGDOptimizer;
var tensor_2 = require("./tensor");
exports.Tensor = tensor_2.Tensor;
exports.TensorBuffer = tensor_2.TensorBuffer;
exports.Variable = tensor_2.Variable;
var types_1 = require("./types");
exports.Rank = types_1.Rank;
exports.sumOutType = types_1.sumOutType;
__export(require("./ops/ops"));
var loss_ops_1 = require("./ops/loss_ops");
exports.Reduction = loss_ops_1.Reduction;
__export(require("./train"));
__export(require("./globals"));
__export(require("./kernel_registry"));
var gradients_1 = require("./gradients");
exports.customGrad = gradients_1.customGrad;
exports.grad = gradients_1.grad;
exports.grads = gradients_1.grads;
exports.valueAndGrad = gradients_1.valueAndGrad;
exports.valueAndGrads = gradients_1.valueAndGrads;
exports.variableGrads = gradients_1.variableGrads;
var environment_1 = require("./environment");
exports.Environment = environment_1.Environment;
exports.env = environment_1.env;
exports.ENV = environment_1.ENV;
// Top-level method exports.
var browser_util_1 = require("./browser_util");
exports.nextFrame = browser_util_1.nextFrame;
// Backend specific.
var backend_1 = require("./backends/backend");
exports.KernelBackend = backend_1.KernelBackend;
exports.DataStorage = backend_1.DataStorage;
var ops = require("./ops/ops");
tensor_1.setOpHandler(ops);
// Import all op chainers and add type info to Tensor.
require("./public/chained_ops/register_all_chained_ops");
//# sourceMappingURL=index.js.map