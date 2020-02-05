"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var environment_1 = require("../environment");
// We are wrapping this within an object so it can be stubbed by Jasmine.
exports.getNodeFetch = {
    // tslint:disable-next-line:no-require-imports
    importFetch: function () { return require('node-fetch'); }
};
var systemFetch;
// These getters and setters are for testing so we don't export a mutable
// variable.
function resetSystemFetch() {
    systemFetch = null;
}
exports.resetSystemFetch = resetSystemFetch;
function setSystemFetch(fetchFn) {
    systemFetch = fetchFn;
}
exports.setSystemFetch = setSystemFetch;
function getSystemFetch() {
    return systemFetch;
}
exports.getSystemFetch = getSystemFetch;
var PlatformNode = /** @class */ (function () {
    function PlatformNode() {
        // tslint:disable-next-line:no-require-imports
        this.util = require('util');
        // According to the spec, the built-in encoder can do only UTF-8 encoding.
        // https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder/TextEncoder
        this.textEncoder = new this.util.TextEncoder();
    }
    PlatformNode.prototype.fetch = function (path, requestInits) {
        if (environment_1.env().global.fetch != null) {
            return environment_1.env().global.fetch(path, requestInits);
        }
        if (systemFetch == null) {
            systemFetch = exports.getNodeFetch.importFetch();
        }
        return systemFetch(path, requestInits);
    };
    PlatformNode.prototype.now = function () {
        var time = process.hrtime();
        return time[0] * 1000 + time[1] / 1000000;
    };
    PlatformNode.prototype.encode = function (text, encoding) {
        if (encoding !== 'utf-8' && encoding !== 'utf8') {
            throw new Error("Node built-in encoder only supports utf-8, but got " + encoding);
        }
        return this.textEncoder.encode(text);
    };
    PlatformNode.prototype.decode = function (bytes, encoding) {
        if (bytes.length === 0) {
            return '';
        }
        return new this.util.TextDecoder(encoding).decode(bytes);
    };
    return PlatformNode;
}());
exports.PlatformNode = PlatformNode;
if (environment_1.env().get('IS_NODE')) {
    environment_1.env().setPlatform('node', new PlatformNode());
}
//# sourceMappingURL=platform_node.js.map