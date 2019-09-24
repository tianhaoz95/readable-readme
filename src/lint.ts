import * as core from "@actions/core";
import en from "./en";
import * as octo from "./octo";
import * as report from "./report";
import * as util from "./util";

export async function lintWorkspace() {
  try {
    const verbose = core.getInput("verbose");
    core.debug(`Verbose level: ${verbose}`);
    const workspaceDir = util.getGitHubWorkspace() + "/horrible";
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
      finalReport += "\n\n";
    }
    const reportTitle = report.getTeportIssueTitle();
    await octo.postGitHubIssue(reportTitle, finalReport);
    return "OK";
  } catch (error) {
    // TODO(tianhaoz95): move this to the upper level main function
    core.error(JSON.stringify(error));
    core.setFailed(error.message);
  }
}
