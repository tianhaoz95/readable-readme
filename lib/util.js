"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const fs_1 = __importDefault(require("fs"));
const micromatch_1 = __importDefault(require("micromatch"));
const path_1 = __importDefault(require("path"));
/**
 * This function get the GitHub workspace directory
 * from the environment variables.
 */
function getGitHubWorkspace() {
    // TODO(tianhaoz95): take a look at the equivalent in the @action/core
    // and replace this method if the alternative is better.
    const workspaceDir = process.env.GITHUB_WORKSPACE;
    if (!workspaceDir) {
        const errMsg = "Cannot find GITHUB_WORKSPACE in environment";
        throw errMsg;
    }
    else {
        return workspaceDir;
    }
}
exports.getGitHubWorkspace = getGitHubWorkspace;
/**
 * This function gets the GitHub repo from the environment
 * variables. e.g. tianhaoz95/readable-readme.
 */
function getGitHubRepo() {
    // TODO(tianhaoz95): take a look at the equivalent in the @action/core
    // and replace this method if the alternative is better.
    const repo = process.env.GITHUB_REPOSITORY;
    if (!repo) {
        const errMsg = "Cannot find GITHUB_REPOSITORY in environment";
        throw errMsg;
    }
    else {
        if (!validateGitHubRepo(repo)) {
            const errMsg = "Repository " + repo + " is not valid";
            throw errMsg;
        }
        return repo;
    }
}
exports.getGitHubRepo = getGitHubRepo;
/**
 * This function validates if a GitHub repo from the environment
 * variable is valid.
 * @param repo the GitHub repo output from [[getGitHubRepo]]
 */
function validateGitHubRepo(repo) {
    const matcher = new RegExp("^[^/]+/[^/]+$");
    const match = matcher.test(repo);
    return match;
}
exports.validateGitHubRepo = validateGitHubRepo;
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
function parseGitHubRepoOwner(repo) {
    // TODO(tianhaoz95): this function requires the input
    // repo to be valid which is not great. Change the
    // validator to throw error by itself for better
    // reuseability.
    const scopes = repo.split("/");
    const repoOwner = scopes[0];
    return repoOwner;
}
exports.parseGitHubRepoOwner = parseGitHubRepoOwner;
/**
 * This function is a wrapper on top of [[parseGitHubRepoOwner]],
 * [[getGitHubRepo]] and [[validateGitHubRepo]] since
 * in this project there is no need to get owners other than the one
 * the GitHub action is running on.
 */
function getGitHubRepoOwner() {
    const repo = getGitHubRepo();
    const repoOwner = parseGitHubRepoOwner(repo);
    return repoOwner;
}
exports.getGitHubRepoOwner = getGitHubRepoOwner;
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
function parseGitHubRepoId(repo) {
    const scopes = repo.split("/");
    const repoOwner = scopes[1];
    return repoOwner;
}
exports.parseGitHubRepoId = parseGitHubRepoId;
/**
 * This function is a wrapper on top of [[parseGitHubRepoId]],
 * [[getGitHubRepo]] and [[validateGitHubRepo]] since
 * in this project there is no need to get repo IDs other than the one
 * the GitHub action is running on.
 */
function getGitHubRepoId() {
    const repo = getGitHubRepo();
    const repoId = parseGitHubRepoId(repo);
    return repoId;
}
exports.getGitHubRepoId = getGitHubRepoId;
/**
 * This function get the current repo reference from
 * the environment variables.
 */
function getGitHubRef() {
    const ref = process.env.GITHUB_REF;
    if (!ref) {
        const errMsg = "GITHUB_REF not set";
        throw errMsg;
    }
    else {
        if (isBranchRef(ref)) {
            return ref;
        }
        else if (isPullRequestRef(ref)) {
            return ref;
        }
        else if (isTagRef(ref)) {
            return ref;
        }
        else {
            const unknownRef = "unknown ref";
            rrlog(ref + " not recognized, returning " + unknownRef);
            return unknownRef;
        }
    }
}
exports.getGitHubRef = getGitHubRef;
/**
 * This function checks if a GitHub reference is
 * referring to a branch.
 */
function isBranchRef(ref) {
    const matcher = new RegExp("^refs/heads/");
    const match = matcher.test(ref);
    return match;
}
exports.isBranchRef = isBranchRef;
/**
 * This function checks if a GiHub reference is
 * referring to a pull request.
 */
function isPullRequestRef(ref) {
    const matcher = new RegExp("^refs/pull/[0-9]+");
    const match = matcher.test(ref);
    return match;
}
exports.isPullRequestRef = isPullRequestRef;
/**
 * This function parses the pull request number from
 * the entire reference. For example, it should parse
 * pull request number 234 form reference refs/pull/234.
 * @param ref The reference of the repository
 */
function parsePullRequestNumber(ref) {
    const scopes = ref.split("/");
    const pullNumber = scopes[2];
    return parseInt(pullNumber, 10);
}
exports.parsePullRequestNumber = parsePullRequestNumber;
/**
 * This function validates if a GitHub reference is
 * a tag.
 * @param ref The GitHub reference to be validated
 */
function isTagRef(ref) {
    const matcher = new RegExp("^refs/tags/");
    const match = matcher.test(ref);
    return match;
}
exports.isTagRef = isTagRef;
/**
 * This function parses the ref used for file link url
 * from the GitHub reference.
 */
function parseFileLinkRef(ref) {
    if (isBranchRef(ref)) {
        const fileRef = ref.replace(/refs\/heads\//gi, "");
        return fileRef;
    }
    else if (isPullRequestRef(ref)) {
        const fileRef = "not supported";
        return fileRef;
    }
    else {
        const fileRef = "not supported";
        return fileRef;
    }
}
exports.parseFileLinkRef = parseFileLinkRef;
/**
 * This function lists all the items in the
 * target root directory recurrsively.
 * @param rootDir the root directory to be walked
 */
function listFiles(rootDir) {
    const fileList = traverseDir(rootDir);
    return fileList;
}
exports.listFiles = listFiles;
/**
 * This function reads the content of a file.
 * @param filename the filename of the file to be read
 */
function readFileContent(filename) {
    const fileContent = fs_1.default.readFileSync(filename, "utf8");
    return fileContent;
}
exports.readFileContent = readFileContent;
/**
 * This function checks if a filename is a markdown.
 * @param filename the filename that needs to be checked
 */
function isReadmeFilename(filename) {
    const matcher = new RegExp("^.*\.(md|markdown)$");
    const match = matcher.test(filename);
    return match;
}
exports.isReadmeFilename = isReadmeFilename;
/**
 * This function loads the markdown template using the template ID
 * abstracting the reading and the searching away.
 * @param template the template id name to load (without the .md extension)
 */
function loadTemplate(template) {
    const filename = path_1.default.join(path_1.default.resolve(__dirname), "../template/" + template + ".md");
    const templateContent = fs_1.default.readFileSync(filename, "utf8");
    return templateContent;
}
exports.loadTemplate = loadTemplate;
/**
 * This function sanitizes unwanted characters out of text
 */
function sanitizeMarkdown(rawText) {
    /** Clean out unicode */
    let sanitizedMarkdown = rawText.replace(/&#x60;/gi, "`");
    sanitizedMarkdown = sanitizedMarkdown.replace(/\n/gi, "");
    return sanitizedMarkdown;
}
exports.sanitizeMarkdown = sanitizeMarkdown;
/**
 * This function sanitizes the reason output
 */
function sanitizeReason(rawReason) {
    let sanitizedReason = rawReason;
    sanitizedReason = sanitizedReason.replace(/\n/ig, " ");
    return sanitizedReason;
}
exports.sanitizeReason = sanitizeReason;
/**
 * This function is used to log information for debugging
 */
function rrlog(logMsg) {
    const logFlag = process.env.RRLOG;
    if (logFlag && logFlag === "true") {
        core.debug(logMsg);
    }
}
exports.rrlog = rrlog;
/**
 * This function reads the readme ignore file and convert it
 * to a list that can be used by the matcher.
 */
function getReadmeIgnoreList(filename) {
    // TODO(tianhaoz95): add test for this.
    let ignoreContent = "";
    let ignoreList = [];
    try {
        ignoreContent = readFileContent(filename);
        if (ignoreContent.length <= 0 || ignoreContent === undefined) {
            ignoreList = [];
        }
        else {
            ignoreList = ignoreContent.split("\n");
        }
    }
    catch (err) {
        rrlog("Ignore file not found");
        ignoreList = [];
    }
    const sanitizedIgnoreList = [];
    for (const ignoreEntry of ignoreList) {
        if (ignoreEntry.length > 0) {
            sanitizedIgnoreList.push(ignoreEntry);
        }
    }
    rrlog("Ignored list: " + JSON.stringify(sanitizedIgnoreList));
    return sanitizedIgnoreList;
}
exports.getReadmeIgnoreList = getReadmeIgnoreList;
/**
 * This function returns the files to be linted after stripping
 * off the ignored files.
 * @param worksapceDir The dir to find ignore and readme files
 */
function getLintFileList(workspaceDir) {
    // TODO(tianhaoz95): add test for this.
    const readmeIgnoreFilename = path_1.default.join(workspaceDir, "/.readmeignore");
    let ignoreList = getReadmeIgnoreList(readmeIgnoreFilename);
    rrlog("ignore list found: " + JSON.stringify(ignoreList));
    const rawWorkspaceFiles = listFiles(workspaceDir);
    rrlog("rawWorkspaceFiles size: " + rawWorkspaceFiles.length.toString());
    if (ignoreList.length === 0) {
        // match with empty ignorelist will return empty list, so just return
        rrlog("ignorelist is empty, proceed with all markdown files");
        ignoreList = ["!**/node_modules/**/*"];
    }
    const workspaceFiles = ignoreFiles(rawWorkspaceFiles, ignoreList);
    rrlog("workspaceFiles size: " + workspaceFiles.length.toString());
    return workspaceFiles;
}
exports.getLintFileList = getLintFileList;
function ignoreFiles(rawFiles, ignoreList) {
    const filteredFiles = micromatch_1.default(rawFiles, ignoreList, { dot: true });
    const finalFiles = [];
    for (const filteredFile of filteredFiles) {
        if (filteredFile.indexOf("node_modules") === -1) {
            finalFiles.push(filteredFile);
        }
    }
    return finalFiles;
}
exports.ignoreFiles = ignoreFiles;
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
function index2lineNumber(content, index) {
    const firstHalfContent = content.slice(0, index);
    const sentences = firstHalfContent.split("\n");
    const sentenceCnt = sentences.length;
    return sentenceCnt;
}
exports.index2lineNumber = index2lineNumber;
function generatePermaLink(startLine, endLine, relativePath) {
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
exports.generatePermaLink = generatePermaLink;
function getFilePathsRecursiveHelper(rootDir) {
    const entryPaths = fs_1.default.readdirSync(rootDir).map((entry) => {
        return path_1.default.join(rootDir, entry);
    });
    const filePaths = entryPaths.filter((entryPath) => {
        return fs_1.default.statSync(entryPath).isFile();
    });
    const dirPaths = entryPaths.filter((entryPath) => !filePaths.includes(entryPath));
    const dirFiles = dirPaths.reduce((prev, curr) => prev.concat(getFilePathsRecursiveHelper(curr)), []);
    const combinedEntries = [...filePaths, ...dirFiles];
    return combinedEntries;
}
exports.getFilePathsRecursiveHelper = getFilePathsRecursiveHelper;
function traverseDir(rootDir) {
    const files = getFilePathsRecursiveHelper(rootDir);
    return files;
}
exports.traverseDir = traverseDir;
