"use strict";
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
var kernel_names_1 = require("../../../kernel_names");
var Div_impl_1 = require("./Div_impl");
exports.divConfig = {
    kernelName: kernel_names_1.Div,
    backendName: 'webgl',
    kernelFunc: function (_a) {
        var inputs = _a.inputs, backend = _a.backend;
        var _b = inputs, a = _b.a, b = _b.b;
        var webglBackend = backend;
        return Div_impl_1.divImpl(a, b, webglBackend);
    }
};
//# sourceMappingURL=Div.js.map