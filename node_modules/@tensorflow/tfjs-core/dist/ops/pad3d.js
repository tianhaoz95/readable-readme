"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../util");
var operation_1 = require("./operation");
var pad_1 = require("./pad");
/**
 * Pads a `tf.Tensor3D` with a given value and paddings. See `pad` for details.
 */
function pad3d_(x, paddings, constantValue) {
    if (constantValue === void 0) { constantValue = 0; }
    util_1.assert(paddings.length === 3 && paddings[0].length === 2 &&
        paddings[1].length === 2 && paddings[2].length === 2, function () { return 'Invalid number of paddings. Must be length of 2 each.'; });
    return pad_1.pad(x, paddings, constantValue);
}
exports.pad3d = operation_1.op({ pad3d_: pad3d_ });
//# sourceMappingURL=pad3d.js.map