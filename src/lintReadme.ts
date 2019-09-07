import * as core from "@actions/core";
import * as util from "./util";

async function lintReadme() {
  try {
    const myInput = core.getInput("myInput");
    core.debug(`Hello ${myInput}`);
    const workspaceDir = util.getGitHubWorkspace();
    const workspaceFiles = util.listFiles(workspaceDir);
    const readmeFilesContent = {};
    for (const workspaceFile of workspaceFiles) {
      if (util.isReadmeFilename(workspaceFile)) {
        const readmeFileContent = util.readFileContent(workspaceFile);
        readmeFilesContent[workspaceFile] = readmeFileContent;
      }
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

export default lintReadme;
