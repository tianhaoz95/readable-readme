import path from "path";

export function initTestingEnvironmentVariables() {
  process.env.GITHUB_WORKSPACE = path.join(__dirname, "../../");
  process.env.GITHUB_REPOSITORY = "tianhaoz95/readable-readme";
  process.env.GITHUB_REF = "refs/heads/master";
  process.env.GITHUB_WORKFLOW = "test_workflow";
  process.env.GITHUB_ACTION = "readable-readme";
  process.env.GITHUB_SHA = "abc250abc";
  process.env.RRLOG = "false";
  process.env.TEST_GITHUB_TOKEN = "test_token";
}

export function cleanTestingEnvironmentVariables() {
  process.env.GITHUB_WORKSPACE = undefined;
  process.env.GITHUB_REPOSITORY = undefined;
  process.env.GITHUB_REF = undefined;
  process.env.GITHUB_WORKFLOW = undefined;
  process.env.GITHUB_ACTION = undefined;
  process.env.GITHUB_SHA = undefined;
  process.env.RRLOG = undefined;
  process.env.TEST_GITHUB_TOKEN = undefined;
}

describe("helper tests", () => {
  it("init clean no crash", () => {
    expect(() => {
      initTestingEnvironmentVariables();
      cleanTestingEnvironmentVariables();
    }).not.toThrow();
  });
});
