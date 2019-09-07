import en from "../src/en";

describe("English lang test suite", () => {
  it("test no crash", () => {
    expect(() => {
      en("Thank you!");
    }).not.toThrow();
  });

  it("test no false alarm basic", () => {
    expect(en("Thank you!")).toEqual([]);
  });
});
