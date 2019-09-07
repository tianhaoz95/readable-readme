/**
 * Tests for utility helpers
 */

import path from "path";
import * as util from "../src/util";

describe("Utility test suite", () => {
  it("test workspace getter", () => {
    expect(util.getGitHubWorkspace()).toContain("/readable-readme");
  });

  it("test file getter", () => {
    const currentDir = path.resolve(__dirname);
    expect(util.listFiles(currentDir)).toContain(currentDir + "/util.test.ts");
  });

  it("test workspace file getter shallow", () => {
    const workspaceDir = util.getGitHubWorkspace();
    const workspaceFiles = util.listFiles(workspaceDir);
    expect(workspaceFiles).toContain(workspaceDir + "/README.md");
    expect(workspaceFiles).toContain(workspaceDir + "/package.json");
    expect(workspaceFiles).toContain(workspaceDir + "/LICENSE");
    expect(workspaceFiles).toContain(workspaceDir + "/action.yml");
  });

  it("test workspace file getter deep", () => {
    const workspaceDir = util.getGitHubWorkspace();
    const workspaceFiles = util.listFiles(workspaceDir);
    expect(workspaceFiles).toContain(workspaceDir + "/src/README.md");
  });

  it("test file reading", () => {
    const targetFilename = path.join(path.resolve(__dirname), "/util.test.ts");
    const fileContent = util.readFileContent(targetFilename);
    expect(fileContent).toContain("Tests for utility helpers");
  });

  it("test file reading in workspace", () => {
    const workspaceDir = util.getGitHubWorkspace();
    const targetFilename = path.join(workspaceDir, "/README.md");
    const fileContent = util.readFileContent(targetFilename);
    expect(fileContent).toContain("Readable Readme");
  });
});
