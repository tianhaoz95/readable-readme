"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../util");
var operation_1 = require("./operation");
var pad_1 = require("./pad");
/**
 * Pads a `tf.Tensor1D` with a given value and paddings. See `pad` for details.
 */
function pad1d_(x, paddings, constantValue) {
    if (constantValue === void 0) { constantValue = 0; }
    util_1.assert(paddings.length === 2, function () { return 'Invalid number of paddings. Must be length of 2.'; });
    return pad_1.pad(x, [paddings], constantValue);
}
exports.pad1d = operation_1.op({ pad1d_: pad1d_ });
//# sourceMappingURL=pad1d.js.map