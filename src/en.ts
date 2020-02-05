import writeGood from "write-good";
import * as toxicity from "@tensorflow-models/toxicity";
import * as util from "./util";

/**
 * The neural net model for sentiment analysisi
 *
 * It classifies the doc again multiple potential ways
 * of not being respectful.
 */
let model: toxicity.ToxicityClassifier | undefined;

/**
 * This function fetches the model for performing
 * sentiment analysis.
 *
 * It's a long-running loading, so only run it once
 * per execution to save time.
 */
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

/**
 * This function generate a report of language issues based on
 * hard coded rules.
 *
 * @param content the content of a single markdown file
 */
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

/**
 * This function generates a report of respectfulness and fairness
 * of a markdown with neural nets.
 *
 * @param content the content of a single markdown file
 */
export async function generateToxicityReport(content: string): Promise<string> {
  await fetchToxcityClassifier();
  const sentences = content.split(/[.|?|!]/);
  if (model === undefined) {
    return "";
  }
  const predictions = await model.classify(sentences);
  let report = "Sentiment Analysis: \n\n";
  for (const prediction of predictions) {
    const gatherResult = util.gatherToxicSentences(
      prediction.label,
      prediction.results,
      sentences
    );
    report += util.toxicityClassification2paragraph(gatherResult);
  }
  return report;
}
