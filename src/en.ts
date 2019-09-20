import * as core from "@actions/core";
import writeGood from "write-good";

function generateEnglishLangReport(content: string) {
  const suggestions = writeGood(content);
  const suggestionSize = suggestions.length;
  core.debug(`Found ${suggestionSize} suggestions`);
  return suggestions;
}

export default generateEnglishLangReport;
