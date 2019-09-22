import * as core from "@actions/core";
import en from "./en";
import * as octo from "./octo";
import * as report from "./report";
import * as util from "./util";

export function lintWorkspace() {
  try {
    const verbose = core.getInput("verbose");
    core.debug(`Verbose level: ${verbose}`);
    const workspaceDir = util.getGitHubWorkspace() + "/src";
    const workspaceFiles = util.listFiles(workspaceDir);
    const reportsMetadata = new Array();
    for (const workspaceFile of workspaceFiles) {
      if (util.isReadmeFilename(workspaceFile)) {
        const readmeFileContent = util.readFileContent(workspaceFile);
        const reportEntry = {
          en: null,
          fileContent: readmeFileContent,
          filename: workspaceFile,
        };
        reportEntry.en = en(readmeFileContent);
        reportsMetadata.push(reportEntry);
      }
    }
    let finalReport = "final report";
    for (const reportMetadata of reportsMetadata) {
      const reportEntry = report.composeReportMetadataToParagraph(reportMetadata);
      finalReport += "\n\n";
      finalReport += reportEntry;
    }
    const reportTitle = report.getTeportIssueTitle();
    octo.postGitHubIssue(reportTitle, finalReport);
  } catch (error) {
    // TODO(tianhaoz95): move this to the upper level main function
    core.setFailed(error.message);
  }
}
