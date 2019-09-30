import writeGood from "write-good";
import * as util from "./util";

function generateEnglishLangReport(content: string) {
  const suggestions = writeGood(content);
  const suggestionSize = suggestions.length;
  util.rrlog(`Found ${suggestionSize} suggestions`);
  return suggestions;
}

export default generateEnglishLangReport;
