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
    return repo;
  }
}

// TODO(tianhaoz95): add github owner getter using repo getter and tests.

// TODO(tianhaoz95): add github repo name getter using repo getter and tests.

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
