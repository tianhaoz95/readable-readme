import writeGood from "write-good";

function generateEnglishLangReport(content: string) {
  const suggestions = writeGood(content);
  return suggestions;
}

export default generateEnglishLangReport;
