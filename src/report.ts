import mustache from "mustache";
import * as util from "./util";

export function composeReportMetadataToParagraph(reportMetadata) {
  const reportTitleTemplate = util.loadTemplate("title");
  const filename = reportMetadata.filename;
  const reportTitle = mustache.render(reportTitleTemplate, {filename});
  return reportTitle;
}
