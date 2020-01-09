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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const mustache_1 = __importDefault(require("mustache"));
const path = __importStar(require("path"));
const en_1 = __importDefault(require("./en"));
const octo = __importStar(require("./octo"));
const report = __importStar(require("./report"));
const util = __importStar(require("./util"));
function lintWorkspace() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const verbose = core.getInput("verbose") ? core.getInput("verbose") : "default";
            util.rrlog(`verbose level: ${verbose}`);
            const workspaceDir = util.getGitHubWorkspace();
            const workspaceFiles = util.getLintFileList(workspaceDir);
            const reportsMetadata = new Array();
            util.rrlog(`start scanning the workspace ${workspaceDir} (${workspaceFiles.length} files in total)`);
            for (const workspaceFile of workspaceFiles) {
                if (util.isReadmeFilename(workspaceFile)) {
                    util.rrlog(`Analyzing file ${workspaceFile}`);
                    const readmeFileContent = util.readFileContent(workspaceFile);
                    const relativePath = path.relative(workspaceDir, workspaceFile);
                    const reportEntry = {
                        en: null,
                        fileContent: readmeFileContent,
                        filename: workspaceFile,
                        relativePath,
                    };
                    reportEntry.en = en_1.default(readmeFileContent);
                    util.rrlog(`report entry is: ${reportEntry}`);
                    reportsMetadata.push(reportEntry);
                }
            }
            let finalReport = "";
            for (const reportMetadata of reportsMetadata) {
                const reportEntry = report.composeReportMetadataToParagraph(reportMetadata);
                // TODO(tianhaoz95): let the compose take the responsibility of decisiding
                // whether the report for certain file should be generated.
                // TODO(tianhaoz95): add a test for no suggestion composing
                // (shouldn't generate anything).
                if (reportMetadata.en.length > 0) {
                    finalReport += "\n\n";
                    finalReport += reportEntry;
                    finalReport += "\n\n";
                }
                else {
                    util.rrlog(`Skipping ${reportMetadata.filename} because no suggestion is generated`);
                }
            }
            const reportTitle = report.getTeportIssueTitle();
            const issueTemplate = util.loadTemplate("reportIssueBody");
            const composedIssue = mustache_1.default.render(issueTemplate, {
                reportContent: finalReport,
            });
            yield octo.postResultToGitHub(reportTitle, composedIssue);
            return "OK";
        }
        catch (error) {
            // TODO(tianhaoz95): move this to the upper level main function
            core.error(JSON.stringify(error));
            core.setFailed(error.message);
        }
    });
}
exports.lintWorkspace = lintWorkspace;
