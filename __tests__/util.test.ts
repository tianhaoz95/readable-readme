/**
 * Tests for utility helpers
 */

import * as path from "path";
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

  it("test template loader no crash", () => {
    expect(() => {
      util.loadTemplate("title");
    }).not.toThrow();
  });

  it("test template loader basic", () => {
    expect(util.loadTemplate("title")).toContain("{{filename}}");
  });

  it("test repo validator no crash", () => {
    expect(() => {
      util.validateGitHubRepo("tianhaoz95/readable-readme");
    }).not.toThrow();
    expect(() => {
      util.validateGitHubRepo("what the hell is this?");
    }).not.toThrow();
  });

  it("test repo validator basic", () => {
    expect(util.validateGitHubRepo("tianhaoz95/readable-readme")).toBe(true);
    expect(util.validateGitHubRepo("tianhaoz95-readable-readme")).toBe(false);
    expect(util.validateGitHubRepo("tianhaoz95/readable-readme/README.md")).toBe(false);
    expect(util.validateGitHubRepo("/readable-readme")).toBe(false);
    expect(util.validateGitHubRepo("readable-readme/")).toBe(false);
  });

  it("test owner parser no crash", () => {
    expect(() => {
      util.parseGitHubRepoOwner("tianhaoz95/readable-readme");
    }).not.toThrow();
  });

  it("test owner parser functional basic", () => {
    expect(util.parseGitHubRepoOwner("tianhaoz95/readable-readme")).toBe("tianhaoz95");
    expect(util.parseGitHubRepoOwner("jacksonz/readable-readme")).toBe("jacksonz");
  });

  it("test owner getter no crash", () => {
    expect(() => {
      util.getGitHubRepoOwner();
    }).not.toThrow();
  });

  it("test owner getter functional basic", () => {
    expect(util.getGitHubRepoOwner()).toBe("tianhaoz95");
  });

  it("test parse repo id no crash", () => {
    expect(() => {
      util.parseGitHubRepoId("tianhaoz95/readable-readme");
    }).not.toThrow();
  });

  it("test parse repo id functional", () => {
    expect(util.parseGitHubRepoId("tianhaoz95/readable-readme")).toBe("readable-readme");
  });

  it("test get repo id no crash", () => {
    expect(() => {
      util.getGitHubRepoId();
    }).not.toThrow();
  });

  it("test get repo id functional", () => {
    expect(util.getGitHubRepoId()).toBe("readable-readme");
  });

  it("test sanitize raw markdown tick mark", () => {
    const wrongMarkdown = "This **is** a &#x60;test&#x60; and hope it works lol!";
    const correctMarkdown = "This **is** a `test` and hope it works lol!";
    expect(util.sanitizeMarkdown(wrongMarkdown)).toBe(correctMarkdown);
  });

  it("test repo ref getter no crash", () => {
    expect(() => {
      util.getGitHubRef();
    }).not.toThrow();
  });

  it("test repo ref getter gets master", () => {
    expect(util.getGitHubRef()).toBe("refs/heads/master");
  });

  it("test repo branch ref matcher no crash", () => {
    expect(() => {
      util.isBranchRef("refs/heads/master");
    }).not.toThrow();
  });

  it("test repo branch ref matcher recognize branch ref", () => {
    expect(util.isBranchRef("refs/heads/master")).toBe(true);
  });

  it("test repo branch ref matcher block non branch ref", () => {
    expect(util.isBranchRef("i/am/not/a/branch")).toBe(false);
  });
});
