import * as core from "@actions/core";
import * as util from "./util";

async function lintReadme() {
  try {
    const myInput = core.getInput("myInput");
    core.debug(`Hello ${myInput}`);
    const WorkspaceDir = util.getGitHubWorkspace();
    // TODO(tianhaoz95): add file listing
  } catch (error) {
    core.setFailed(error.message);
  }
}

export default lintReadme;
