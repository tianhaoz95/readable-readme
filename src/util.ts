import * as core from "@actions/core";
import fs from "fs";
import micromatch from "micromatch";
import path from "path";
import marked from "marked";

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
  return parseInt(pullNumber, 10);
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
  const fileList = traverseDir(rootDir);
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
  const matcher = new RegExp("^.*.(md|markdown)$");
  const match = matcher.test(filename);
  return match;
}

/**
 * This function loads the markdown template using the template ID
 * abstracting the reading and the searching away.
 * @param template the template id name to load (without the .md extension)
 */
export function loadTemplate(template: string) {
  const filename = path.join(
    path.resolve(__dirname),
    "../template/" + template + ".md"
  );
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
  sanitizedReason = sanitizedReason.replace(/\n/gi, " ");
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
  let ignoreContent: string = "";
  let ignoreList: string[] = [];
  try {
    ignoreContent = readFileContent(filename);
    if (ignoreContent.length <= 0 || ignoreContent === undefined) {
      ignoreList = [];
    } else {
      ignoreList = ignoreContent.split("\n");
    }
  } catch (err) {
    rrlog("Ignore file not found");
    ignoreList = [];
  }
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
  let ignoreList = getReadmeIgnoreList(readmeIgnoreFilename);
  rrlog("ignore list found: " + JSON.stringify(ignoreList));
  const rawWorkspaceFiles = listFiles(workspaceDir);
  core.info("workspace file count: " + rawWorkspaceFiles.length.toString());
  if (ignoreList.length === 0) {
    // match with empty ignorelist will return empty list, so just return
    core.info("ignorelist is empty, proceed with all markdown files");
    ignoreList = ["!**/node_modules/**/*"];
  }
  core.info("ignore file list: " + ignoreList.toString());
  const workspaceFiles = ignoreFiles(rawWorkspaceFiles, ignoreList);
  rrlog("workspaceFiles size: " + workspaceFiles.length.toString());
  return workspaceFiles;
}

export function ignoreFiles(
  rawFiles: string[],
  ignoreList: string[]
): string[] {
  const filteredFiles: string[] = micromatch(rawFiles, ignoreList, {
    dot: true
  });
  const finalFiles: string[] = [];
  for (const filteredFile of filteredFiles) {
    if (filteredFile.indexOf("node_modules") === -1) {
      finalFiles.push(filteredFile);
    }
  }
  return finalFiles;
}

/**
 * This function converts a char index to a line
 * number in the content.
 * ## Example
 * ```ts
 * lineNumber = index2lineNumber("123\n123\n1234", 5)
 * ```
 * The code above should give 2 as the 5th char
 * is in the second line.
 * @param content the content of a file
 * @param index the char index we want to convert
 */
export function index2lineNumber(content: string, index: number): number {
  const firstHalfContent: string = content.slice(0, index);
  const sentences: string[] = firstHalfContent.split("\n");
  const sentenceCnt: number = sentences.length;
  return sentenceCnt;
}

export function generatePermaLink(
  startLine: number,
  endLine: number,
  relativePath: string
): string {
  let permaLink = "";
  const baseUrl = "https://github.com/";
  permaLink += baseUrl;
  const repo = getGitHubRepo();
  permaLink += repo;
  permaLink += "/blob/";
  permaLink += process.env.GITHUB_SHA;
  permaLink += "/";
  permaLink += relativePath;
  permaLink += "#L";
  permaLink += startLine.toString();
  permaLink += "-L";
  permaLink += endLine.toString();
  return permaLink;
}

export function getFilePathsRecursiveHelper(rootDir: string): string[] {
  const entryPaths = fs.readdirSync(rootDir).map(entry => {
    return path.join(rootDir, entry);
  });
  const filePaths = entryPaths.filter(entryPath => {
    return fs.statSync(entryPath).isFile();
  });
  const dirPaths = entryPaths.filter(
    entryPath => !filePaths.includes(entryPath)
  );
  const dirFiles = dirPaths.reduce(
    (prev, curr) => prev.concat(getFilePathsRecursiveHelper(curr)),
    [] as string[]
  );
  const combinedEntries = [...filePaths, ...dirFiles];
  return combinedEntries;
}

export function traverseDir(rootDir: string): string[] {
  const files = getFilePathsRecursiveHelper(rootDir);
  return files;
}

export function markdown2text(markdown: string): string {
  const tokens = marked.lexer(markdown);
  let text: string = "";
  for (const token of tokens) {
    if (token.type === "paragraph") {
      text += token.text;
      if (token.text.charAt(token.text.length - 1) !== ".") {
        text += ".";
      }
    }
  }
  return text;
}

/**
 * Analyze the classification results from the sentences and
 * gather the ones where issues were detected.
 *
 * @param results entries output by the classifier per sentence
 * @param sentences the original sentences
 */
export function gatherToxicSentences(
  label: string,
  results: any[],
  sentences: string[]
) {
  let isToxic: boolean = false;
  const toxicSentences: string[] = [];
  for (let i = 0; i < results.length; ++i) {
    if (results[i].match) {
      isToxic = true;
      const toxicSentence: string = sentences[i];
      toxicSentences.push(toxicSentence);
    }
  }
  return {
    label,
    isToxic,
    toxicSentences
  };
}

/**
 * Composes a single classification result entry to words.
 *
 * @param classification the structured classification result
 */
export function toxicityClassification2paragraph(classification) {
  let content: string = "";
  let title: string = "";
  const translateDict = {
    identity_attack: "* Check for identity attack: ",
    insult: "* Check for insult: ",
    obscene: "* Check for obscene content: ",
    severe_toxicity: "* Check for severe toxic content: ",
    sexual_explicit: "* Check for sexual explicit content: ",
    threat: "* Check for threating content: ",
    toxicity: "* Check for toxic content: "
  };
  title = translateDict[classification.label];
  if (classification.isToxic) {
    content += title;
    content += "issue found in ";
    content += classification.toxicSentences.length.toString();
    content += " sentences. :worried:";
    content += "\n\n";
    for (const toxicSentence of classification.toxicSentences) {
      content += "  * `";
      content += toxicSentence.split("\n").join("");
      content += "`\n";
    }
  } else {
    content = title + "no issue found :ok_hand:\n\n";
  }
  return content;
}
