import filewtf from "filewtf";
import fs from "fs";
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
export function readFileContent(filename: string) {
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
  const sanitizedMarkdown = rawText.replace(/&#x60;/gi, "`");
  return sanitizedMarkdown;
}
