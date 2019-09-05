import * as util from "../src/util";

describe("Utility test suite", () => {
  it("test workspace getter", () => {
    expect(util.getGitHubWorkspace()).toContain("/readable-readme");
  });
});
