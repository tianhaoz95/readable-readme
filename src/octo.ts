import * as core from "@actions/core";
import * as github from "@actions/github";
import * as util from "./util";

function getOctokit() {
  let token = core.getInput("token");
  if (process.env.TEST_GITHUB_TOKEN) {
    token = process.env.TEST_GITHUB_TOKEN;
  }
  const kit = new github.GitHub(token);
  return kit;
}

export const octokit = getOctokit();

export async function postGitHubIssue(title: string, body: string) {
  const repoOwner = util.getGitHubRepoOwner();
  const repoId = util.getGitHubRepoId();
  await octokit.issues.create({
    body,
    owner: repoOwner,
    repo: repoId,
    title,
  });
}
