import writeGood from "write-good";
import * as util from "./util";

function generateEnglishLangReport(content: string) {
  const suggestions = writeGood(content);
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

export default generateEnglishLangReport;
