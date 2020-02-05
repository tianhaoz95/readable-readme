/**
 * Tests for utility helpers
 */

import path from "path";
import * as util from "../src/util";
import * as testUtil from "./utilities/init_env.test";

describe("Utility test suite", () => {
  beforeAll(() => {
    testUtil.initTestingEnvironmentVariables();
  });

  afterAll(() => {
    testUtil.cleanTestingEnvironmentVariables();
  });

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
    expect(workspaceFiles).toContain(path.join(workspaceDir + "/README.md"));
    expect(workspaceFiles).toContain(path.join(workspaceDir + "/package.json"));
    expect(workspaceFiles).toContain(path.join(workspaceDir + "/LICENSE"));
    expect(workspaceFiles).toContain(path.join(workspaceDir + "/action.yml"));
  });

  it("test workspace file getter deep", () => {
    const workspaceDir = util.getGitHubWorkspace();
    const workspaceFiles = util.listFiles(workspaceDir);
    expect(workspaceFiles).toContain(path.join(workspaceDir + "/src/README.md"));
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
      util.loadTemplate("langReport");
    }).not.toThrow();
  });

  it("test template loader basic", () => {
    expect(util.loadTemplate("langReport")).toContain("{{filename}}");
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
    const matcher = new RegExp("^refs/(tags|heads|pull)/");
    expect(util.getGitHubRef()).toMatch(matcher);
  });

  it("test repo branch ref matcher no crash", () => {
    expect(() => {
      util.isBranchRef("refs/heads/master");
    }).not.toThrow();
  });

  it("test repo branch ref matcher recognize branch ref", () => {
    expect(util.isBranchRef("refs/heads/master")).toBe(true);
  });

  it("test repo branch ref matcher block invalid ref", () => {
    expect(util.isBranchRef("i/am/not/a/ref")).toBe(false);
  });

  it("test repo branch ref matcher block pr ref", () => {
    expect(util.isBranchRef("refs/pull/103/merge")).toBe(false);
  });

  it("test pr ref matcher no crash", () => {
    expect(() => {
      util.isPullRequestRef("refs/pull/103/merge");
    }).not.toThrow();
  });

  it("test pr ref matcher recognize pr ref", () => {
    expect(util.isPullRequestRef("refs/pull/103/merge")).toBe(true);
  });

  it("test pr ref matcher block invalid ref", () => {
    expect(util.isPullRequestRef("i/am/not/a/ref")).toBe(false);
  });

  it("test pr ref matcher block branch ref", () => {
    expect(util.isPullRequestRef("refs/heads/master")).toBe(false);
  });

  it("test tag ref matcher no crash", () => {
    expect(() => {
      util.isTagRef("refs/tags/v1.0-alpha");
    }).not.toThrow();
  });

  it("test tag ref matcher accept tags ref", () => {
    expect(util.isTagRef("refs/tags/v1.0-alpha")).toBe(true);
  });

  it("test tag ref matcher blocks invalid ref", () => {
    expect(util.isTagRef("i/am/not/a/ref")).toBe(false);
  });

  it("test tag ref matcher blocks branch ref", () => {
    expect(util.isTagRef("refs/heads/master")).toBe(false);
  });

  it("test tag ref matcher blocks pr ref", () => {
    expect(util.isTagRef("refs/pull/103/merge")).toBe(false);
  });

  it("test file ref parser no crash", () => {
    expect(() => {
      util.parseFileLinkRef("refs/heads/master");
    }).not.toThrow();
  });

  it("test file ref parser parse branch", () => {
    expect(util.parseFileLinkRef("refs/heads/master")).toBe("master");
  });

  it("test file ref parser block pr", () => {
    expect(util.parseFileLinkRef("refs/pull/103/merge")).toBe("not supported");
  });

  it("test file ref parser block invalid ref", () => {
    expect(util.parseFileLinkRef("i/am/not/a/ref")).toBe("not supported");
  });

  it("test reason sanitizer no crash", () => {
    expect(() => {
      util.sanitizeReason("this test\nhas newline");
    }).not.toThrow();
  });

  it("test reason sanitizer replaces newline", () => {
    expect(util.sanitizeReason("this test\nhas newline")).toBe("this test has newline");
  });

  it("test rrlog no crash", () => {
    expect(() => {
      util.rrlog("test log");
    }).not.toThrow();
  });

  it("test get readme ignore no crash", () => {
    const worksapceDir = util.getGitHubWorkspace();
    const readmeIgnoreFilename = path.join(worksapceDir, "/horrible/.readmeignore");
    expect(() => {
      util.getReadmeIgnoreList(readmeIgnoreFilename);
    }).not.toThrow();
  });

  it("test get readme ignore has correct content", () => {
    const worksapceDir = util.getGitHubWorkspace();
    const readmeIgnoreFilename = path.join(worksapceDir, "/horrible/.readmeignore");
    expect(util.getReadmeIgnoreList(readmeIgnoreFilename)).toContain("**/ignore/**/*.md");
  });

  it("test file list getter no crash", () => {
    const worksapceDir = path.join(util.getGitHubWorkspace(), "/horrible");
    expect(() => {
      util.getLintFileList(worksapceDir);
    }).not.toThrow();
  });

  it ("test index 2 line number no crash", () => {
    expect(() => {
      util.index2lineNumber("abcde", 5);
    }).not.toThrow();
    expect(() => {
      util.index2lineNumber("", 5);
    }).not.toThrow();
  });

  it("test index 2 line number empty", () => {
    expect(util.index2lineNumber("", 5)).toEqual(1);
  });

  it("test index 2 line number basic case", () => {
    const content: string = "123\n123\n123";
    expect(util.index2lineNumber(content, 5)).toEqual(2);
  });

  it("test file ignore special cases", () => {
    const rawList: string[] = [
      "node_modules/README.md",
      "node_modules/@octokit/types/.github/ISSUE_TEMPLATE/04_thanks.md",
      "dot_file/@octokit/types/.github/ISSUE_TEMPLATE/04_thanks.md",
    ];
    const ignoreList: string[] = [
      "!node_modules/*",
      "!node_modules/**/*",
      "!dot_file/**/*",
      "!dot_file/*",
    ];
    expect(util.ignoreFiles(rawList, ignoreList)).not.toContain(
      "node_modules/@octokit/types/.github/ISSUE_TEMPLATE/04_thanks.md",
    );
    expect(util.ignoreFiles(rawList, ignoreList)).not.toContain(
      "node_modules/README.md",
    );
    expect(util.ignoreFiles(rawList, ignoreList)).not.toContain(
      "dot_file/@octokit/types/.github/ISSUE_TEMPLATE/04_thanks.md",
    );
  });

  it("markdown to text should not crash", () => {
    expect(() => {
      util.markdown2text("This is a plain text");
    }).not.toThrow();
  });

  it("markdown to text should filter tags", () => {
    expect(util.markdown2text("# title\n\nplain text\n\nplain text")).toBe("plain text.plain text.");
  });
});
