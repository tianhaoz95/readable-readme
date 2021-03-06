import * as core from "@actions/core";
import mustache from "mustache";
import * as path from "path";
import * as en from "./en";
import * as octo from "./octo";
import * as report from "./report";
import * as util from "./util";

export async function lintWorkspace() {
  try {
    const verbose = core.getInput("verbose")
      ? core.getInput("verbose")
      : "default";
    util.rrlog(`verbose level: ${verbose}`);
    const workspaceDir = util.getGitHubWorkspace();
    const workspaceFiles: string[] = util.getLintFileList(workspaceDir);
    const reportsMetadata = new Array();
    core.info(
      `start scanning the workspace ${workspaceDir} (${workspaceFiles.length} files in total)`
    );
    for (const workspaceFile of workspaceFiles) {
      if (util.isReadmeFilename(workspaceFile)) {
        core.info(`Analyzing file ${workspaceFile}...`);
        const readmeFileContent = util.readFileContent(workspaceFile);
        const relativePath = path.relative(workspaceDir, workspaceFile);
        const reportEntry = {
          en: null,
          fileContent: readmeFileContent,
          filename: workspaceFile,
          relativePath,
          toxicity: "not generated"
        };
        reportEntry.en = en.generateEnglishLangReport(readmeFileContent);
        reportEntry.toxicity = await en.generateToxicityReport(
          readmeFileContent
        );
        util.rrlog(`report entry is: ${reportEntry}`);
        reportsMetadata.push(reportEntry);
      }
    }
    let finalReport = "";
    for (const reportMetadata of reportsMetadata) {
      const reportEntry = report.composeReportMetadataToParagraph(
        reportMetadata
      );
      // TODO(tianhaoz95): let the compose take the responsibility of decisiding
      // whether the report for certain file should be generated.
      // TODO(tianhaoz95): add a test for no suggestion composing
      // (shouldn't generate anything).
      if (reportMetadata.en.length > 0) {
        finalReport += "\n\n";
        finalReport += reportEntry;
        finalReport += "\n\n";
      } else {
        util.rrlog(
          `Skipping ${reportMetadata.filename} because no suggestion is generated`
        );
      }
    }
    const reportTitle = report.getTeportIssueTitle();
    const issueTemplate = util.loadTemplate("reportIssueBody");
    const composedIssue = mustache.render(issueTemplate, {
      reportContent: finalReport
    });
    await octo.postResultToGitHub(reportTitle, composedIssue);
    return "OK";
  } catch (error) {
    // TODO(tianhaoz95): move this to the upper level main function
    core.error(JSON.stringify(error));
    core.setFailed(error.message);
  }
}
