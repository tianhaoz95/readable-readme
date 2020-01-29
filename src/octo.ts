import * as core from "@actions/core";
import * as github from "@actions/github";
import * as util from "./util";

function getOctokit() {
  let token: string = core.getInput("token");
  if (process.env.TEST_GITHUB_TOKEN) {
    token = process.env.TEST_GITHUB_TOKEN;
  }
  const kit = new github.GitHub(token);
  return kit;
}

export async function matchIssueTitle(
  title: string,
  repo: string,
  owner: string,
) {
  const octokit = getOctokit();
  const allIssues = await octokit.issues.listForRepo({
    owner,
    repo,
  });
  for (const issue of allIssues.data) {
    const issueTitle = issue.title;
    if (title === issueTitle && issue.state === "open") {
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

export async function postResultToGitHub(title: string, body: string) {
  const repoRef: string = util.getGitHubRef();
  if (process.env.LOCAL_TESTING === "true") {
    core.info(title);
    core.info(body);
    return "OK";
  } else {
    if (util.isBranchRef(repoRef)) {
      return await postGitHubIssue(title, body);
    } else if (util.isPullRequestRef(repoRef)) {
      const content: string = "Title: " + title + "\n\n" + body;
      return await postGitHubPullRequestComment(content);
    } else if (util.isTagRef(repoRef)) {
      return await postGitHubIssue(title, body);
    } else {
      util.rrlog("Unknown ref found: " + repoRef);
    }
  }
}

export async function postGitHubPullRequestComment(content: string) {
  const repoOwner = util.getGitHubRepoOwner();
  const repoId = util.getGitHubRepoId();
  const octokit = getOctokit();
  const pullRequestNumber = util.parsePullRequestNumber(util.getGitHubRef());
  await octokit.issues.createComment({
    body: content,
    issue_number: pullRequestNumber,
    owner: repoOwner,
    repo: repoId,
  });
  return "OK";
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
    util.rrlog("issue exist, updating existing issue...");
    const octokit = getOctokit();
    await octokit.issues.update({
      body,
      issue_number: issueMatch.issueNumber,
      owner: repoOwner,
      repo: repoId,
      title,
    });
  } else {
    util.rrlog("issue not exist, creating new issue...");
    const octokit = getOctokit();
    await octokit.issues.create({
      body,
      owner: repoOwner,
      repo: repoId,
      title,
    });
  }
  return "OK";
}
