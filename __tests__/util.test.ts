/**
 * Tests for utility helpers
 */

import path from "path";
import * as util from "../src/util";

describe("Utility test suite", () => {
  it("test workspace getter", () => {
    expect(util.getGitHubWorkspace()).toContain("/readable-readme");
  });

  it("test repo getter no crash", () => {
    expect(() => {
      util.getGitHubRepo();
    }).not.toThrow();
  });

  it("test repo getter without specific owner checking", () => {
    expect(util.getGitHubRepo()).toContain("/readable-readme");
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

  it("test markdown filename extension matcher basic", () => {
    expect(util.isReadmeFilename("test.markdown")).toBe(true);
    expect(util.isReadmeFilename("test.md")).toBe(true);
    expect(util.isReadmeFilename("test.js")).toBe(false);
    expect(util.isReadmeFilename("test.jsx")).toBe(false);
    expect(util.isReadmeFilename("test.cpp")).toBe(false);
    expect(util.isReadmeFilename("test.cc")).toBe(false);
    expect(util.isReadmeFilename("test.ts")).toBe(false);
    expect(util.isReadmeFilename("test.css")).toBe(false);
    expect(util.isReadmeFilename("test.html")).toBe(false);
    expect(util.isReadmeFilename("test.json")).toBe(false);
  });

  it("test markdown filename extension matcher complex", () => {
    expect(util.isReadmeFilename("test.example.markdown")).toBe(true);
    expect(util.isReadmeFilename("test.example.md")).toBe(true);
    expect(util.isReadmeFilename("test.example.md.js")).toBe(false);
    expect(util.isReadmeFilename("test.example.markdown.ts")).toBe(false);
    expect(util.isReadmeFilename("test.example.markdown.json")).toBe(false);
  });

  it("test template loader run without crashing", () => {
    expect(() => {
      util.loadTemplate("title");
    }).not.toThrow();
  });

  it("test template loader basic", () => {
    expect(util.loadTemplate("title")).toContain("{{filename}}");
  });

  it("test repo validator run no crash", () => {
    expect(() => {
      util.validateGitHubRepo("tianhaoz95/readable-readme");
    }).not.toThrow();
    expect(() => {
      util.validateGitHubRepo("what the hell is this?");
    }).not.toThrow();
  });
});
