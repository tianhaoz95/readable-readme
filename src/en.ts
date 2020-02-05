import writeGood from "write-good";
import * as toxicity from '@tensorflow-models/toxicity';
import * as util from "./util";

export function generateEnglishLangReport(content: string) {
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

export async function generateToxicityReport(content: string): Promise<string> {
  const threshold: number = 0.9;
  const model = await toxicity.load(threshold, [
    "identity_attack",
    "insult",
    "obscene",
    "severe_toxicity",
    "sexual_explicit",
    "threat",
    "toxicity"
  ]);
  const sentences = content.split(/[\s,]+/);
  const predictions = await model.classify(sentences);
  let report = "";
  for (const prediction of predictions) {
    if (prediction.results[0].match) {
      report += prediction.label;
      report += " detected with probability: ";
      report += Math.max(prediction.results[0].probabilities[0], prediction.results[0].probabilities[1]).toString();
      report += '\n';
    } else {
      report += prediction.label;
      report += " not detected";
      report += '\n'
    }
  }
  return report;
}
