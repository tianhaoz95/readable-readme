"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const util = __importStar(require("./util"));
function getOctokit() {
    let token = core.getInput("token");
    if (process.env.TEST_GITHUB_TOKEN) {
        token = process.env.TEST_GITHUB_TOKEN;
    }
    const kit = new github.GitHub(token);
    return kit;
}
exports.octokit = getOctokit();
function matchIssueTitle(title, repo, owner) {
    return __awaiter(this, void 0, void 0, function* () {
        const allIssues = yield exports.octokit.issues.listForRepo({
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
    });
}
exports.matchIssueTitle = matchIssueTitle;
function postResultToGitHub(title, body) {
    return __awaiter(this, void 0, void 0, function* () {
        const repoRef = util.getGitHubRef();
        if (util.isBranchRef(repoRef)) {
            yield postGitHubIssue(title, body);
        }
        else if (util.isPullRequestRef(repoRef)) {
            const content = "Title: " + title + "\n\n" + body;
            yield postGitHubPullRequestComment(content);
        }
        else if (util.isTagRef(repoRef)) {
            yield postGitHubIssue(title, body);
        }
        else {
            util.rrlog("Unknown ref found: " + repoRef);
        }
    });
}
exports.postResultToGitHub = postResultToGitHub;
function postGitHubPullRequestComment(content) {
    return __awaiter(this, void 0, void 0, function* () {
        const repoOwner = util.getGitHubRepoOwner();
        const repoId = util.getGitHubRepoId();
        const pullRequestNumber = util.parsePullRequestNumber(util.getGitHubRef());
        yield exports.octokit.issues.createComment({
            body: content,
            issue_number: pullRequestNumber,
            owner: repoOwner,
            repo: repoId,
        });
    });
}
exports.postGitHubPullRequestComment = postGitHubPullRequestComment;
function postGitHubIssue(title, body) {
    return __awaiter(this, void 0, void 0, function* () {
        const repoOwner = util.getGitHubRepoOwner();
        const repoId = util.getGitHubRepoId();
        const issueMatch = yield matchIssueTitle(title, repoId, repoOwner);
        if (issueMatch.found) {
            util.rrlog("issue exist, updating existing issue...");
            yield exports.octokit.issues.update({
                body,
                issue_number: issueMatch.issueNumber,
                owner: repoOwner,
                repo: repoId,
                title,
            });
        }
        else {
            util.rrlog("issue not exist, creating new issue...");
            yield exports.octokit.issues.create({
                body,
                owner: repoOwner,
                repo: repoId,
                title,
            });
        }
        return "OK";
    });
}
exports.postGitHubIssue = postGitHubIssue;
