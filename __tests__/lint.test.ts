import * as lint from "../src/lint";

describe("Lint test suite", () => {
  it("test lint execute without crashing", () => {
    expect(() => {
      lint.lintWorkspace();
    }).not.toThrow();
  });
});
