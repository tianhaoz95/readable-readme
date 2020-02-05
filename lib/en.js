"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const toxicity = __importStar(require("@tensorflow-models/toxicity"));
const util = __importStar(require("./util"));
let model;
function fetchToxcityClassifier() {
    return __awaiter(this, void 0, void 0, function* () {
        const threshold = 0.9;
        if (model === undefined) {
            model = yield toxicity.load(threshold, [
                "identity_attack",
                "insult",
                "obscene",
                "severe_toxicity",
                "sexual_explicit",
                "threat",
                "toxicity"
            ]);
        }
    });
}
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
exports.generateEnglishLangReport = generateEnglishLangReport;
function generateToxicityReport(content) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetchToxcityClassifier();
        const sentences = content.split(/[.|?|!]/);
        if (model === undefined) {
            return "";
        }
        const predictions = yield model.classify(sentences);
        let report = "Sentiment Analysis: \n\n";
        for (const prediction of predictions) {
            const gatherResult = util.gatherToxicSentences(prediction.label, prediction.results, sentences);
            report += util.toxicityClassification2paragraph(gatherResult);
        }
        return report;
    });
}
exports.generateToxicityReport = generateToxicityReport;
