"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../util");
var operation_1 = require("./operation");
var pad_1 = require("./pad");
/**
 * Pads a `tf.Tensor4D` with a given value and paddings. See `pad` for details.
 */
function pad4d_(x, paddings, constantValue) {
    if (constantValue === void 0) { constantValue = 0; }
    util_1.assert(paddings.length === 4 && paddings[0].length === 2 &&
        paddings[1].length === 2 && paddings[2].length === 2 &&
        paddings[3].length === 2, function () { return 'Invalid number of paddings. Must be length of 2 each.'; });
    return pad_1.pad(x, paddings, constantValue);
}
exports.pad4d = operation_1.op({ pad4d_: pad4d_ });
//# sourceMappingURL=pad4d.js.map