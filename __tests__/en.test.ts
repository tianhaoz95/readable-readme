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

  it("test line number exist", () => {
    expect(en("Thank you!\nI just want to drink\n")[0].fromLine).toEqual(2);
    expect(en("Thank you!\nI just want to drink\n")[0].toLine).toEqual(2);
  });
});
