import lint from "../src/lint";

describe("Lint test suite", () => {
  it("test lint execute without crashing", () => {
    expect(() => {
      lint();
    }).not.toThrow();
  });
});
