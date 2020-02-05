import writeGood from "write-good";
import * as toxicity from "@tensorflow-models/toxicity";
import * as util from "./util";

let model: toxicity.ToxicityClassifier | undefined;

async function fetchToxcityClassifier() {
  const threshold: number = 0.9;
  if (model === undefined) {
    model = await toxicity.load(threshold, [
      "identity_attack",
      "insult",
      "obscene",
      "severe_toxicity",
      "sexual_explicit",
      "threat",
      "toxicity"
    ]);
  }
}

export function generateEnglishLangReport(content: string) {
  const suggestions = writeGood(content);
  for (const suggestion of suggestions) {
    const fromLineNumber = util.index2lineNumber(content, suggestion.index);
    suggestion.fromLine = fromLineNumber;
    const toLineNumber = util.index2lineNumber(
      content,
      suggestion.index + suggestion.offset
    );
    suggestion.toLine = toLineNumber;
  }
  const suggestionSize = suggestions.length;
  util.rrlog(`Found ${suggestionSize} suggestions`);
  return suggestions;
}

export async function generateToxicityReport(content: string): Promise<string> {
  await fetchToxcityClassifier();
  const sentences = content.split(/[.|?|!]/);
  if (model === undefined) {
    return "";
  }
  const predictions = await model.classify(sentences);
  let report = "";
  for (const prediction of predictions) {
    const gatherResult = util.gatherToxicSentences(
      prediction.results,
      sentences
    );
    if (gatherResult.isToxic) {
      report += prediction.label;
      report += " detected in sentences: \n";
      for (const toxicSentence of gatherResult.toxicSentences) {
        report += "* ";
        report += toxicSentence;
        report += "\n";
      }
      report += "\n";
    } else {
      report += prediction.label;
      report += ": not detected";
      report += "\n";
    }
  }
  return report;
}
