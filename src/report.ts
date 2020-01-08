import * as core from "@actions/core";
import mustache from "mustache";
import * as util from "./util";

/**
 * Composer to convert report metadata into human-readable report
 * @param reportMetadata The metadata for generating the report
 * @returns The readable report generated from metadata
 */
export function composeReportMetadataToParagraph(reportMetadata): string {
  let reportContent = "";
  const reportTemplate = util.loadTemplate("langReport");
  const fileLinkTemplate = util.loadTemplate("linkToFile");
  const suggestionTemplate = util.loadTemplate("langSuggestion");
  const owner = util.getGitHubRepoOwner();
  const repo = util.getGitHubRepoId();
  const relativePath = reportMetadata.relativePath;
  for (const suggestion of reportMetadata.en) {
    const suggestionContent = util.sanitizeReason(suggestion.reason);
    const suggestionIndex = suggestion.index;
    const suggestionOffset = suggestion.offset;
    const permaLink = util.generatePermaLink(suggestion.fromLine, suggestion.toLine, relativePath);
    const suggestionRenderContent = {
      index: suggestionIndex,
      offset: suggestionOffset,
      snippet: permaLink,
      suggestion: suggestionContent,
    };
    const suggestionEntryContent = mustache.render(suggestionTemplate, suggestionRenderContent);
    reportContent += suggestionEntryContent;
    reportContent += "\n\n";
  }
  const link = mustache.render(fileLinkTemplate, {
    owner,
    path: relativePath,
    ref: "master", /** TODO(tianhao95): get this programmatically */
    repo,
  });
  const finalReport = mustache.render(reportTemplate, {
    content: reportContent,
    filename: relativePath,
    link,
  });
  return finalReport;
}

/**
 * Composer for the report title
 * @returns The title for the report issue
 */
export function getTeportIssueTitle(): string {
  const uid = util.getGitHubRef();
  const template = util.loadTemplate("reportIssueTitle");
  const issueTitle = mustache.render(template, { uid });
  return issueTitle;
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

/**
 * This function compiles the snippet using a template
 * @param leftContext The context to the left of the highlight
 * @param rightContext The context to the right of the highlight
 * @param highlight The highlighted text
 * @param template The ID of the snippet template to be used
 */
export function compileSnippet(
  leftContext: string,
  rightContext: string,
  highlight: string,
  template: string,
): string {
  const templateContent = util.loadTemplate(template);
  const compiledSnippet = util.sanitizeMarkdown(
    mustache.render(
      templateContent,
      {
        highlight,
        leftContext,
        rightContext,
      },
    ),
  );
  return compiledSnippet;
}

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
export function renderSnippet(
  index: number,
  offset: number,
  range: number,
  fullText: string,
  template: string,
): string {
  const snippetMetadata = getSnippet(index, offset, range, fullText);
  const snippetText = compileSnippet(
    snippetMetadata.leftContext,
    snippetMetadata.rightContext,
    snippetMetadata.highlight,
    template,
  );
  return snippetText;
}
