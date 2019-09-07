import * as core from "@actions/core";
import en from "./en";
import * as report from "./report";
import * as util from "./util";

function lint() {
  try {
    const verbose = core.getInput("verbose");
    core.debug(`Verbose level: ${verbose}`);
    const workspaceDir = util.getGitHubWorkspace();
    const workspaceFiles = util.listFiles(workspaceDir);
    const reportsMetadata = new Array();
    for (const workspaceFile of workspaceFiles) {
      if (util.isReadmeFilename(workspaceFile)) {
        const readmeFileContent = util.readFileContent(workspaceFile);
        const reportEntry = {
          en: null,
        };
        reportEntry.en = en(readmeFileContent);
        reportsMetadata.push(reportEntry);
      }
    }
    let finalReport = "final report";
    for (const reportMetadata of reportsMetadata) {
      finalReport += report.composeSuggestsToParagraph(reportMetadata.en);
    }
    core.debug(finalReport);
  } catch (error) {
    core.setFailed(error.message);
  }
}

export default lint;
