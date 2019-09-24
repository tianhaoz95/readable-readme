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

export async function matchIssueTitle(
  title: string,
  repo: string,
  owner: string,
) {
  const allIssues = await octokit.issues.listForRepo({
    owner,
    repo,
  });
  for (const issue of allIssues.data) {
    const issueTitle = issue.title;
    if (title === issueTitle) {
      return {
        found: true,
        issueNumber: issue.number,
      };
    }
  }
  return {
    found: false,
    issueNumber: -1,
  };
}

export async function postGitHubIssue(title: string, body: string) {
  const repoOwner = util.getGitHubRepoOwner();
  const repoId = util.getGitHubRepoId();
  const issueMatch = await matchIssueTitle(
    title,
    repoId,
    repoOwner,
  );
  if (issueMatch.found) {
    core.debug("issue exist, updating existing issue...");
    await octokit.issues.update({
      issue_number: issueMatch.issueNumber,
      body,
      owner: repoOwner,
      repo: repoId,
      title,
    })
  } else {
    core.debug("issue not exist, creating new issue...");
    await octokit.issues.create({
      body,
      owner: repoOwner,
      repo: repoId,
      title,
    });
  }
  return "OK";
}
