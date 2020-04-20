"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../../util");
var pool_utils_1 = require("../pool_utils");
function maxPoolWithArgmaxImpl(xValues, xShape, dtype, includeBatchInIndex, convInfo) {
    var strides = util_1.computeStrides(xShape);
    var maxPools = pool_utils_1.pool(xValues, xShape, dtype, strides, convInfo, 'max');
    var maxPositions = pool_utils_1.maxPoolPositions(xValues, xShape, dtype, convInfo, true, includeBatchInIndex);
    return [maxPools.values, maxPositions.values];
}
exports.maxPoolWithArgmaxImpl = maxPoolWithArgmaxImpl;
//# sourceMappingURL=MaxPoolWithArgmax_impl.js.map