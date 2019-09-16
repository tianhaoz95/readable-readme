import mustache from "mustache";
import * as util from "./util";

export function composeReportMetadataToParagraph(reportMetadata) {
  let finalReport = "";
  const reportTitleTemplate = util.loadTemplate("title");
  const suggestionTemplate = util.loadTemplate("langSuggestion");
  const filename = reportMetadata.filename;
  const reportTitle = mustache.render(reportTitleTemplate, {filename});
  finalReport += reportTitle;
  for (const suggestion of reportMetadata.en) {
    const suggestionContent = suggestion.suggestion;
    const suggestionIndex = suggestion.index;
    const suggestionOffset = suggestion.offset;
    const suggestionRenderContent = {
      index: suggestionIndex,
      offset: suggestionOffset,
      snippet: "Not implemented yet",
      suggestion: suggestionContent,
    };
    const suggestionEntryContent = mustache.render(suggestionTemplate, suggestionRenderContent);
    finalReport += suggestionEntryContent;
  }
  return finalReport;
}

export function getTeportIssueTitle(): string {
  // TODO(tianhaoz95): make this function use the various
  // ientifiers, timestamp and commit sha.
  return "placeholder titile";
}

/**
 * Snippet getter will wrap a flexible size of context
 * around our suggestion highlight.
 * @param index The starting index of the suggestion highlight
 * @param offset The offset of the suggestion highlight
 * @param range The range of the context
 * @param fullText The full text to get snippet from
 * @returns The snippet
 */
export function getSnippet(
  index: number,
  offset: number,
  range: number,
  fullText: string,
) {
  const textSize = fullText.length;
  const startIndex = Math.max(0, index - range);
  const endIndex = Math.min(textSize, index + offset + range);
  const highlight = fullText.substring(index, index + offset);
  const leftContext = fullText.substring(startIndex, index);
  const rightContext = fullText.substring(index + offset, endIndex);
  const fullSnippet = leftContext + highlight + rightContext;
  return {
    fullSnippet,
    highlight,
    leftContext,
    rightContext,
  };
}
// TODO(tianhaoz95): add more tests for edge cases
