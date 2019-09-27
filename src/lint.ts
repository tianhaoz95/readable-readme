import * as core from "@actions/core";
import micromatch from "micromatch";
import * as path from "path";
import en from "./en";
import * as octo from "./octo";
import * as report from "./report";
import * as util from "./util";

export async function lintWorkspace() {
  try {
    const verbose = core.getInput("verbose");
    core.debug(`Verbose level: ${verbose}`);
    const workspaceDir = util.getGitHubWorkspace();
    const rawWorkspaceFiles = util.listFiles(workspaceDir);
    const workspaceFiles = micromatch(rawWorkspaceFiles, ["!**/node_modules/**"]);
    const reportsMetadata = new Array();
    for (const workspaceFile of workspaceFiles) {
      if (util.isReadmeFilename(workspaceFile)) {
        const readmeFileContent = util.readFileContent(workspaceFile);
        const relativePath = path.relative(workspaceDir, workspaceFile);
        core.debug("Scanning " + workspaceFile + ", relative path: " + relativePath + "...");
        const reportEntry = {
          en: null,
          fileContent: readmeFileContent,
          filename: workspaceFile,
          relativePath,
        };
        reportEntry.en = en(readmeFileContent);
        reportsMetadata.push(reportEntry);
      }
    }
    let finalReport = "";
    for (const reportMetadata of reportsMetadata) {
      const reportEntry = report.composeReportMetadataToParagraph(reportMetadata);
      // TODO(tianhaoz95): let the compose take the responsibility of decisiding
      // whether the report for certain file should be generated.
      // TODO(tianhaoz95): add a test for no suggestion composing
      // (shouldn't generate anything).
      if (reportMetadata.en.length > 0) {
        finalReport += "\n\n";
        finalReport += reportEntry;
        finalReport += "\n\n";
      } else {
        core.debug("Skipping because no suggestion is generated");
      }
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
