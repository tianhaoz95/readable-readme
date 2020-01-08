"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
function initTestingEnvironmentVariables() {
    process.env.GITHUB_WORKSPACE = path_1.default.join(__dirname, "../../");
    process.env.GITHUB_REPOSITORY = "tianhaoz95/readable-readme";
    process.env.GITHUB_REF = "refs/heads/master";
    process.env.GITHUB_WORKFLOW = "test_workflow";
    process.env.GITHUB_ACTION = "readable-readme";
    process.env.GITHUB_SHA = "abc250abc";
    process.env.RRLOG = "false";
}
exports.initTestingEnvironmentVariables = initTestingEnvironmentVariables;
function cleanTestingEnvironmentVariables() {
    process.env.GITHUB_WORKSPACE = undefined;
    process.env.GITHUB_REPOSITORY = undefined;
    process.env.GITHUB_REF = undefined;
    process.env.GITHUB_WORKFLOW = undefined;
    process.env.GITHUB_ACTION = undefined;
    process.env.GITHUB_SHA = undefined;
    process.env.RRLOG = undefined;
}
exports.cleanTestingEnvironmentVariables = cleanTestingEnvironmentVariables;
