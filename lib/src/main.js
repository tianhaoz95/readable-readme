"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lint = __importStar(require("./lint"));
/**
 * This is the only entry point to the action workflow
 * under the hood it calls [[lint]].
 */
function main() {
    lint.lintWorkspace();
}
main();
