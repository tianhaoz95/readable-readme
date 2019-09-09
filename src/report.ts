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
