import filewtf from "filewtf";
import fs from "fs";
import path from "path";

export function getGitHubWorkspace() {
  const workspaceDir = process.env.GITHUB_WORKSPACE;
  if (!workspaceDir) {
    const errMsg = "Cannot find GITHUB_WORKSPACE in environment";
    throw errMsg;
  } else {
    return workspaceDir;
  }
}

export function getGitHubRepo() {
  const repo = process.env.GITHUB_REPOSITORY;
  if (!repo) {
    const errMsg = "Cannot find GITHUB_REPOSITORY in environment";
    throw errMsg;
  } else {
    if (!validateGitHubRepo(repo)) {
      const errMsg = "Repository " + repo + " is not valid";
      throw errMsg;
    }
    return repo;
  }
}

export function validateGitHubRepo(repo: string) {
  const matcher = new RegExp("^[^/]+/[^/]+$");
  const match = matcher.test(repo);
  return match;
}

// TODO(tianhaoz95): this function requires the input
// repo to be valid which is not great. Change the
// validator to throw error by itself for better
// reuseability.
export function parseGitHubRepoOwner(repo: string) {
  const scopes = repo.split("/");
  const repoOwner = scopes[0];
  return repoOwner;
}

export function getGitHubRepoOwner() {
  const repo = getGitHubRepo();
  const repoOwner = parseGitHubRepoOwner(repo);
  return repoOwner;
}

export function parseGitHubRepoId(repo: string) {
  const scopes = repo.split("/");
  const repoOwner = scopes[1];
  return repoOwner;
}

export function getGitHubRepoId() {
  const repo = getGitHubRepo();
  const repoId = parseGitHubRepoId(repo);
  return repoId;
}

export function listFiles(rootDir: string) {
  const fileList = filewtf.walkthrough(rootDir);
  return fileList;
}

export function readFileContent(filename: string) {
  const fileContent = fs.readFileSync(filename, "utf8");
  return fileContent;
}

export function isReadmeFilename(filename: string) {
  const matcher = new RegExp("^.*\.(md|markdown)$");
  const match = matcher.test(filename);
  return match;
}

export function loadTemplate(template: string) {
  const filename = path.join(path.resolve(__dirname), "../template/" + template + ".md");
  const templateContent = fs.readFileSync(filename, "utf8");
  return templateContent;
}
