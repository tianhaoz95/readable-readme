import * as core from "@actions/core";
import filewtf from "filewtf";
import fs from "fs";
import micromatch from "micromatch";
import path from "path";

/**
 * This function get the GitHub workspace directory
 * from the environment variables.
 */
export function getGitHubWorkspace() {
  // TODO(tianhaoz95): take a look at the equivalent in the @action/core
  // and replace this method if the alternative is better.
  const workspaceDir = process.env.GITHUB_WORKSPACE;
  if (!workspaceDir) {
    const errMsg = "Cannot find GITHUB_WORKSPACE in environment";
    throw errMsg;
  } else {
    return workspaceDir;
  }
}

/**
 * This function gets the GitHub repo from the environment
 * variables. e.g. tianhaoz95/readable-readme.
 */
export function getGitHubRepo() {
  // TODO(tianhaoz95): take a look at the equivalent in the @action/core
  // and replace this method if the alternative is better.
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

/**
 * This function validates if a GitHub repo from the environment
 * variable is valid.
 * @param repo the GitHub repo output from [[getGitHubRepo]]
 */
export function validateGitHubRepo(repo: string) {
  const matcher = new RegExp("^[^/]+/[^/]+$");
  const match = matcher.test(repo);
  return match;
}

/**
 * This function parses the GitHub repo owner from the repo name
 *
 * ## Example
 *
 * ```ts
 * parseGitHubRepoOwner("tianhaoz95/readable-readme")
 * ```
 *
 * The above code will give "tianhaoz95" as it is the owner's ID.
 *
 * @param repo the GitHub repo output from [[getGitHubRepo]]
 */
export function parseGitHubRepoOwner(repo: string) {
  // TODO(tianhaoz95): this function requires the input
  // repo to be valid which is not great. Change the
  // validator to throw error by itself for better
  // reuseability.
  const scopes = repo.split("/");
  const repoOwner = scopes[0];
  return repoOwner;
}

/**
 * This function is a wrapper on top of [[parseGitHubRepoOwner]],
 * [[getGitHubRepo]] and [[validateGitHubRepo]] since
 * in this project there is no need to get owners other than the one
 * the GitHub action is running on.
 */
export function getGitHubRepoOwner() {
  const repo = getGitHubRepo();
  const repoOwner = parseGitHubRepoOwner(repo);
  return repoOwner;
}

/**
 * This function parses the GitHub repo owner from the repo name
 *
 * ## Example
 *
 * ```ts
 * parseGitHubRepoId("tianhaoz95/readable-readme")
 * ```
 *
 * The above code will give "readable-readme" as it is the repo's ID.
 *
 * @param repo the GitHub repo output from [[getGitHubRepo]]
 */
export function parseGitHubRepoId(repo: string) {
  const scopes = repo.split("/");
  const repoOwner = scopes[1];
  return repoOwner;
}

/**
 * This function is a wrapper on top of [[parseGitHubRepoId]],
 * [[getGitHubRepo]] and [[validateGitHubRepo]] since
 * in this project there is no need to get repo IDs other than the one
 * the GitHub action is running on.
 */
export function getGitHubRepoId() {
  const repo = getGitHubRepo();
  const repoId = parseGitHubRepoId(repo);
  return repoId;
}

/**
 * This function get the current repo reference from
 * the environment variables.
 */
export function getGitHubRef(): string {
  const ref = process.env.GITHUB_REF;
  if (!ref) {
    const errMsg = "GITHUB_REF not set";
    throw errMsg;
  } else {
    if (isBranchRef(ref)) {
      return ref;
    } else if (isPullRequestRef(ref)) {
      return ref;
    } else if (isTagRef(ref)) {
      return ref;
    } else {
      const unknownRef = "unknown ref";
      rrlog(ref + " not recognized, returning " + unknownRef);
      return unknownRef;
    }
  }
}

/**
 * This function checks if a GitHub reference is
 * referring to a branch.
 */
export function isBranchRef(ref: string): boolean {
  const matcher = new RegExp("^refs/heads/");
  const match = matcher.test(ref);
  return match;
}

/**
 * This function checks if a GiHub reference is
 * referring to a pull request.
 */
export function isPullRequestRef(ref: string): boolean {
  const matcher = new RegExp("^refs/pull/[0-9]+");
  const match = matcher.test(ref);
  return match;
}

/**
 * This function parses the pull request number from
 * the entire reference. For example, it should parse
 * pull request number 234 form reference refs/pull/234.
 * @param ref The reference of the repository
 */
export function parsePullRequestNumber(ref: string): number {
  const scopes = ref.split("/");
  const pullNumber = scopes[2];
  return parseInt(pullNumber);
}

/**
 * This function validates if a GitHub reference is
 * a tag.
 * @param ref The GitHub reference to be validated
 */
export function isTagRef(ref: string): boolean {
  const matcher = new RegExp("^refs/tags/");
  const match = matcher.test(ref);
  return match;
}

/**
 * This function parses the ref used for file link url
 * from the GitHub reference.
 */
export function parseFileLinkRef(ref: string): string {
  if (isBranchRef(ref)) {
    const fileRef = ref.replace(/refs\/heads\//gi, "");
    return fileRef;
  } else if (isPullRequestRef(ref)) {
    const fileRef = "not supported";
    return fileRef;
  } else {
    const fileRef = "not supported";
    return fileRef;
  }
}

/**
 * This function lists all the items in the
 * target root directory recurrsively.
 * @param rootDir the root directory to be walked
 */
export function listFiles(rootDir: string) {
  const fileList = filewtf.walkthrough(rootDir);
  return fileList;
}

/**
 * This function reads the content of a file.
 * @param filename the filename of the file to be read
 */
export function readFileContent(filename: string): string {
  const fileContent = fs.readFileSync(filename, "utf8");
  return fileContent;
}

/**
 * This function checks if a filename is a markdown.
 * @param filename the filename that needs to be checked
 */
export function isReadmeFilename(filename: string) {
  const matcher = new RegExp("^.*\.(md|markdown)$");
  const match = matcher.test(filename);
  return match;
}

/**
 * This function loads the markdown template using the template ID
 * abstracting the reading and the searching away.
 * @param template the template id name to load (without the .md extension)
 */
export function loadTemplate(template: string) {
  const filename = path.join(path.resolve(__dirname), "../template/" + template + ".md");
  const templateContent = fs.readFileSync(filename, "utf8");
  return templateContent;
}

/**
 * This function sanitizes unwanted characters out of text
 */
export function sanitizeMarkdown(rawText) {
  /** Clean out unicode */
  let sanitizedMarkdown = rawText.replace(/&#x60;/gi, "`");
  sanitizedMarkdown = sanitizedMarkdown.replace(/\n/gi, "");
  return sanitizedMarkdown;
}

/**
 * This function sanitizes the reason output
 */
export function sanitizeReason(rawReason: string): string {
  let sanitizedReason = rawReason;
  sanitizedReason = sanitizedReason.replace(/\n/ig, " ");
  return sanitizedReason;
}

/**
 * This function is used to log information for debugging
 */
export function rrlog(logMsg: string): void {
  const logFlag = process.env.RRLOG;
  if (logFlag && logFlag === "true") {
    core.debug(logMsg);
  }
}

/**
 * This function reads the readme ignore file and convert it
 * to a list that can be used by the matcher.
 */
export function getReadmeIgnoreList(filename: string): string[] {
  // TODO(tianhaoz95): add test for this.
  const ignoreContent: string = readFileContent(filename);
  const ignoreList: string[] = ignoreContent.split("\n");
  const sanitizedIgnoreList: string[] = [];
  for (const ignoreEntry of ignoreList) {
    if (ignoreEntry.length > 0) {
      sanitizedIgnoreList.push(ignoreEntry);
    }
  }
  rrlog("Ignored list: " + JSON.stringify(sanitizedIgnoreList));
  return sanitizedIgnoreList;
}

/**
 * This function returns the files to be linted after stripping
 * off the ignored files.
 * @param worksapceDir The dir to find ignore and readme files
 */
export function getLintFileList(workspaceDir: string): string[] {
  // TODO(tianhaoz95): add test for this.
  const readmeIgnoreFilename = path.join(workspaceDir, "/.readmeignore");
  const ignoreList = getReadmeIgnoreList(readmeIgnoreFilename);
  rrlog("ignore list found: " + JSON.stringify(ignoreList));
  const rawWorkspaceFiles = listFiles(workspaceDir);
  rrlog("rawWorkspaceFiles size: " + rawWorkspaceFiles.length.toString());
  if (ignoreList.length === 0) {
    // match with empty ignorelist will return empty list, so just return
    rrlog("ignorelist is empty, proceed with all markdown files");
    return rawWorkspaceFiles;
  }
  const workspaceFiles = micromatch(rawWorkspaceFiles, ignoreList);
  rrlog("workspaceFiles size: " + workspaceFiles.length.toString());
  return workspaceFiles;
}
