"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const write_good_1 = __importDefault(require("write-good"));
const util = __importStar(require("./util"));
function generateEnglishLangReport(content) {
    const suggestions = write_good_1.default(content);
    for (const suggestion of suggestions) {
        const fromLineNumber = util.index2lineNumber(content, suggestion.index);
        suggestion.fromLine = fromLineNumber;
        const toLineNumber = util.index2lineNumber(content, suggestion.index + suggestion.offset);
        suggestion.toLine = toLineNumber;
    }
    const suggestionSize = suggestions.length;
    util.rrlog(`Found ${suggestionSize} suggestions`);
    return suggestions;
}
exports.default = generateEnglishLangReport;
