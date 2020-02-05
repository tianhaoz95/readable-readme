"use strict";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 * =============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
/** Utility functions related to user-defined metadata. */
// Maximum recommended serialized size for user-defined metadata.
// Beyond this limit, a warning message will be printed during model loading and
// saving.
exports.MAX_USER_DEFINED_METADATA_SERIALIZED_LENGTH = 1 * 1024 * 1024;
/**
 * Check validity of user-defined metadata.
 *
 * @param userDefinedMetadata
 * @param modelName Name of the model that the user-defined metadata belongs to.
 *   Used during construction of error messages.
 * @param checkSize Whether to check the size of the metadata is under
 *   recommended limit. Default: `false`. If `true`, will try stringify the
 *   JSON object and print a console warning if the serialzied size is above the
 *   limit.
 * @throws Error if `userDefinedMetadata` is not a plain JSON object.
 */
function checkUserDefinedMetadata(userDefinedMetadata, modelName, checkSize) {
    if (checkSize === void 0) { checkSize = false; }
    if (userDefinedMetadata == null ||
        typeof userDefinedMetadata !== 'object' ||
        Object.getPrototypeOf(userDefinedMetadata) !== Object.prototype ||
        !plainObjectCheck(userDefinedMetadata)) {
        throw new Error('User-defined metadata is expected to be a JSON object, but is not.');
    }
    if (checkSize) {
        var out = JSON.stringify(userDefinedMetadata);
        if (out.length > exports.MAX_USER_DEFINED_METADATA_SERIALIZED_LENGTH) {
            console.warn("User-defined metadata of model \"" + modelName + "\" is too large in " +
                ("size (length=" + out.length + " when serialized). It is not ") +
                "recommended to store such large objects in user-defined metadata. " +
                "Please make sure its serialized length is <= " +
                (exports.MAX_USER_DEFINED_METADATA_SERIALIZED_LENGTH + "."));
        }
    }
}
exports.checkUserDefinedMetadata = checkUserDefinedMetadata;
/**
 * Check if an input is plain JSON object or any valid subfield of it.
 *
 * @param x The input to be checked.
 * @param assertObject Whether to assert `x` is a JSON object, i.e., reject
 *   cases of arrays and primitives.
 * @return Returns `true` if and only if `x` is a plain JSON object,
 *   a JSON-valid primitive including string, number, boolean and null,
 *   or an array of the said types.
 */
// tslint:disable-next-line:no-any
function plainObjectCheck(x) {
    if (x === null) {
        // Note: typeof `null` is 'object', and `null` is valid in JSON.
        return true;
    }
    else if (typeof x === 'object') {
        if (Object.getPrototypeOf(x) === Object.prototype) {
            // `x` is a JavaScript object and its prototype is Object.
            var keys = Object.keys(x);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                if (typeof key !== 'string') {
                    // JSON keys must be strings.
                    return false;
                }
                if (!plainObjectCheck(x[key])) { // Recursive call.
                    return false;
                }
            }
            return true;
        }
        else {
            // `x` is a JavaScript object but its prototype is not Object.
            if (Array.isArray(x)) {
                // `x` is a JavaScript array.
                for (var _a = 0, x_1 = x; _a < x_1.length; _a++) {
                    var item = x_1[_a];
                    if (!plainObjectCheck(item)) { // Recursive call.
                        return false;
                    }
                }
                return true;
            }
            else {
                // `x` is a JavaScript object and its prototype is not Object,
                // and it's not an Array. I.e., it's a complex object such as
                // `Error` and `Date`.
                return false;
            }
        }
    }
    else {
        // `x` is not a JavaScript object or `null`.
        var xType = typeof x;
        return xType === 'string' || xType === 'number' || xType === 'boolean';
    }
}
exports.plainObjectCheck = plainObjectCheck;
//# sourceMappingURL=user_defined_metadata.js.map