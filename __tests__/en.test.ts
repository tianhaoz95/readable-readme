import * as en from "../src/en";

describe("English lang test suite", () => {
  it("test no crash", () => {
    expect(() => {
      en.generateEnglishLangReport("Thank you!");
    }).not.toThrow();
  });

  it("test no false alarm basic", () => {
    expect(en.generateEnglishLangReport("Thank you!")).toEqual([]);
  });

  it("test line number exist", () => {
    expect(en.generateEnglishLangReport("Thank you!\nI just want to drink\n")[0].fromLine).toEqual(2);
    expect(en.generateEnglishLangReport("Thank you!\nI just want to drink\n")[0].toLine).toEqual(2);
  });
});
