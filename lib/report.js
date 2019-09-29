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
const mustache_1 = __importDefault(require("mustache"));
const util = __importStar(require("./util"));
/**
 * Composer to convert report metadata into human-readable report
 * @param reportMetadata The metadata for generating the report
 * @returns The readable report generated from metadata
 */
function composeReportMetadataToParagraph(reportMetadata) {
    let reportContent = "";
    const reportTemplate = util.loadTemplate("langReport");
    const fileLinkTemplate = util.loadTemplate("linkToFile");
    const suggestionTemplate = util.loadTemplate("langSuggestion");
    const filename = reportMetadata.filename;
    const owner = util.getGitHubRepoOwner();
    const repo = util.getGitHubRepoId();
    const relativePath = reportMetadata.relativePath;
    for (const suggestion of reportMetadata.en) {
        const suggestionContent = util.sanitizeReason(suggestion.reason);
        const suggestionIndex = suggestion.index;
        const suggestionOffset = suggestion.offset;
        const fullText = reportMetadata.fileContent;
        const snippetContent = renderSnippet(suggestionIndex, suggestionOffset, 35, fullText, "plainTextSnippet");
        const suggestionRenderContent = {
            index: suggestionIndex,
            offset: suggestionOffset,
            snippet: snippetContent,
            suggestion: suggestionContent,
        };
        const suggestionEntryContent = mustache_1.default.render(suggestionTemplate, suggestionRenderContent);
        reportContent += suggestionEntryContent;
        reportContent += "\n\n";
    }
    const link = mustache_1.default.render(fileLinkTemplate, {
        owner,
        path: relativePath,
        ref: "master",
        repo,
    });
    const finalReport = mustache_1.default.render(reportTemplate, {
        content: reportContent,
        filename: relativePath,
        link,
    });
    return finalReport;
}
exports.composeReportMetadataToParagraph = composeReportMetadataToParagraph;
/**
 * Composer for the report title
 * @returns The title for the report issue
 */
function getTeportIssueTitle() {
    const uid = util.getGitHubRef();
    const template = util.loadTemplate("reportIssueTitle");
    const issueTitle = mustache_1.default.render(template, { uid });
    return issueTitle;
}
exports.getTeportIssueTitle = getTeportIssueTitle;
/**
 * Snippet getter will wrap a flexible size of context
 * around our suggestion highlight.
 * @param index The starting index of the suggestion highlight
 * @param offset The offset of the suggestion highlight
 * @param range The range of the context
 * @param fullText The full text to get snippet from
 * @returns The snippet
 */
function getSnippet(index, offset, range, fullText) {
    const textSize = fullText.length;
    const startIndex = Math.max(0, index - range);
    const endIndex = Math.min(textSize, index + offset + range);
    const highlight = fullText.substring(index, index + offset);
    const leftContext = fullText.substring(startIndex, index);
    const rightContext = fullText.substring(index + offset, endIndex);
    const fullSnippet = leftContext + highlight + rightContext;
    return {
        /** The full snippet from the concat of all the rest */
        fullSnippet,
        /** The highlight of the suggestion target */
        highlight,
        /** The context text to the left of the hightlight */
        leftContext,
        /** The context text to the right of the hightlight */
        rightContext,
    };
}
exports.getSnippet = getSnippet;
/**
 * This function compiles the snippet using a template
 * @param leftContext The context to the left of the highlight
 * @param rightContext The context to the right of the highlight
 * @param highlight The highlighted text
 * @param template The ID of the snippet template to be used
 */
function compileSnippet(leftContext, rightContext, highlight, template) {
    const templateContent = util.loadTemplate(template);
    const compiledSnippet = util.sanitizeMarkdown(mustache_1.default.render(templateContent, {
        highlight,
        leftContext,
        rightContext,
    }));
    return compiledSnippet;
}
exports.compileSnippet = compileSnippet;
/**
 * This function gets the snippet using [[getSnippet]] and
 * renders it to a certain template.
 * @param index The starting index of the suggestion highlight
 * @param offset The offset of the suggestion highlight
 * @param range The range of the context
 * @param fullText The full text to get snippet from
 * @param template The ID of the snippet template to be used
 * @returns The rendered snippet
 */
function renderSnippet(index, offset, range, fullText, template) {
    const snippetMetadata = getSnippet(index, offset, range, fullText);
    const snippetText = compileSnippet(snippetMetadata.leftContext, snippetMetadata.rightContext, snippetMetadata.highlight, template);
    return snippetText;
}
exports.renderSnippet = renderSnippet;
