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
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("../../environment");
var util = require("../../util");
var PackingScheme;
(function (PackingScheme) {
    /**
     * All values in a single texel are densely packed without any constraints.
     *
     * This is how the shader encodes a tensor with shape = [2, 3, 4]
     * (indices are [batch, row, col]).
     *
     * 000|001   010|011   020|021
     * -------   -------   -------
     * 002|003   012|013   022|023
     *
     * 100|101   110|111   120|121
     * -------   -------   -------
     * 102|103   112|113   122|123
     *
     */
    PackingScheme[PackingScheme["DENSE"] = 0] = "DENSE";
    /**
     * Single texels contain only values from the same batch, and from adjacent
     * rows and columns.
     *
     * This is how the shader encodes a tensor with shape = [2, 3, 5]
     * (indices are [batch, row, col]).
     *
     * 000|001   002|003   004|xxx   020|021   022|023   024|xxx
     * -------   -------   -------   -------   -------   -------
     * 010|011   012|013   014|xxx   xxx|xxx   xxx|xxx   xxx|xxx
     *
     * 100|101   102|103   104|xxx   120|121   122|123   124|xxx
     * -------   -------   -------   -------   -------   -------
     * 110|111   112|113   114|xxx   xxx|xxx   xxx|xxx   xxx|xxx
     *
     */
    PackingScheme[PackingScheme["SHARED_BATCH"] = 1] = "SHARED_BATCH";
})(PackingScheme = exports.PackingScheme || (exports.PackingScheme = {}));
var TextureUsage;
(function (TextureUsage) {
    TextureUsage[TextureUsage["RENDER"] = 0] = "RENDER";
    TextureUsage[TextureUsage["UPLOAD"] = 1] = "UPLOAD";
    TextureUsage[TextureUsage["PIXELS"] = 2] = "PIXELS";
    TextureUsage[TextureUsage["DOWNLOAD"] = 3] = "DOWNLOAD";
})(TextureUsage = exports.TextureUsage || (exports.TextureUsage = {}));
var PhysicalTextureType;
(function (PhysicalTextureType) {
    PhysicalTextureType[PhysicalTextureType["UNPACKED_FLOAT16"] = 0] = "UNPACKED_FLOAT16";
    PhysicalTextureType[PhysicalTextureType["UNPACKED_FLOAT32"] = 1] = "UNPACKED_FLOAT32";
    PhysicalTextureType[PhysicalTextureType["PACKED_4X1_UNSIGNED_BYTE"] = 2] = "PACKED_4X1_UNSIGNED_BYTE";
    PhysicalTextureType[PhysicalTextureType["PACKED_2X2_FLOAT32"] = 3] = "PACKED_2X2_FLOAT32";
    PhysicalTextureType[PhysicalTextureType["PACKED_2X2_FLOAT16"] = 4] = "PACKED_2X2_FLOAT16";
})(PhysicalTextureType = exports.PhysicalTextureType || (exports.PhysicalTextureType = {}));
function getUnpackedMatrixTextureShapeWidthHeight(rows, columns) {
    return [columns, rows];
}
exports.getUnpackedMatrixTextureShapeWidthHeight = getUnpackedMatrixTextureShapeWidthHeight;
function getUnpackedArraySizeFromMatrixSize(matrixSize, channelsPerTexture) {
    return matrixSize * channelsPerTexture;
}
exports.getUnpackedArraySizeFromMatrixSize = getUnpackedArraySizeFromMatrixSize;
function getColorMatrixTextureShapeWidthHeight(rows, columns) {
    return [columns * 4, rows];
}
exports.getColorMatrixTextureShapeWidthHeight = getColorMatrixTextureShapeWidthHeight;
/**
 * Get shape for densely packed RGBA texture.
 */
function getDenseTexShape(shape) {
    var size = util.sizeFromShape(shape);
    var texelsNeeded = Math.ceil(size / 4);
    return util.sizeToSquarishShape(texelsNeeded);
}
exports.getDenseTexShape = getDenseTexShape;
function getMatrixSizeFromUnpackedArraySize(unpackedSize, channelsPerTexture) {
    if (unpackedSize % channelsPerTexture !== 0) {
        throw new Error("unpackedSize (" + unpackedSize + ") must be a multiple of " +
            ("" + channelsPerTexture));
    }
    return unpackedSize / channelsPerTexture;
}
exports.getMatrixSizeFromUnpackedArraySize = getMatrixSizeFromUnpackedArraySize;
function decodeMatrixFromUnpackedColorRGBAArray(unpackedArray, matrix, channels) {
    var requiredSize = unpackedArray.length * channels / 4;
    if (matrix.length < requiredSize) {
        throw new Error("matrix length (" + matrix.length + ") must be >= " + requiredSize);
    }
    var dst = 0;
    for (var src = 0; src < unpackedArray.length; src += 4) {
        for (var c = 0; c < channels; c++) {
            matrix[dst++] = unpackedArray[src + c];
        }
    }
}
exports.decodeMatrixFromUnpackedColorRGBAArray = decodeMatrixFromUnpackedColorRGBAArray;
function getPackedMatrixTextureShapeWidthHeight(rows, columns) {
    return [
        Math.max(1, Math.ceil(columns / 2)), Math.max(1, Math.ceil(rows / 2))
    ];
}
exports.getPackedMatrixTextureShapeWidthHeight = getPackedMatrixTextureShapeWidthHeight;
function getPackedRGBAArraySizeFromMatrixShape(rows, columns) {
    var _a = getPackedMatrixTextureShapeWidthHeight(rows, columns), w = _a[0], h = _a[1];
    return w * h * 4;
}
exports.getPackedRGBAArraySizeFromMatrixShape = getPackedRGBAArraySizeFromMatrixShape;
function getTextureConfig(
// tslint:disable-next-line:no-any
gl, textureHalfFloatExtension) {
    // tslint:disable-next-line:no-any
    var glany = gl;
    var internalFormatFloat;
    var internalFormatHalfFloat;
    var internalFormatPackedHalfFloat;
    var internalFormatPackedFloat;
    var textureFormatFloat;
    var downloadTextureFormat;
    var downloadUnpackNumChannels;
    var defaultNumChannels;
    var textureTypeHalfFloat;
    var textureTypeFloat;
    if (environment_1.env().getNumber('WEBGL_VERSION') === 2) {
        internalFormatFloat = glany.R32F;
        internalFormatHalfFloat = glany.R16F;
        internalFormatPackedHalfFloat = glany.RGBA16F;
        internalFormatPackedFloat = glany.RGBA32F;
        textureFormatFloat = glany.RED;
        downloadUnpackNumChannels = 4;
        defaultNumChannels = 1;
        textureTypeHalfFloat = glany.HALF_FLOAT;
        textureTypeFloat = glany.FLOAT;
    }
    else {
        internalFormatFloat = gl.RGBA;
        internalFormatHalfFloat = gl.RGBA;
        internalFormatPackedHalfFloat = gl.RGBA;
        internalFormatPackedFloat = glany.RGBA;
        textureFormatFloat = gl.RGBA;
        downloadUnpackNumChannels = 4;
        defaultNumChannels = 4;
        textureTypeHalfFloat = textureHalfFloatExtension != null ?
            textureHalfFloatExtension.HALF_FLOAT_OES :
            null;
        textureTypeFloat = gl.FLOAT;
    }
    downloadTextureFormat = gl.RGBA;
    return {
        internalFormatFloat: internalFormatFloat,
        internalFormatHalfFloat: internalFormatHalfFloat,
        internalFormatPackedHalfFloat: internalFormatPackedHalfFloat,
        internalFormatPackedFloat: internalFormatPackedFloat,
        textureFormatFloat: textureFormatFloat,
        downloadTextureFormat: downloadTextureFormat,
        downloadUnpackNumChannels: downloadUnpackNumChannels,
        defaultNumChannels: defaultNumChannels,
        textureTypeHalfFloat: textureTypeHalfFloat,
        textureTypeFloat: textureTypeFloat
    };
}
exports.getTextureConfig = getTextureConfig;
//# sourceMappingURL=tex_util.js.map