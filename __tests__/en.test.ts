import * as en from "../src/en";
import nock from "nock";

jest.setTimeout(100000);

describe("English lang test suite", () => {
  beforeEach(() => {
    nock.enableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
  });
  it("test no crash", () => {
    expect(() => {
      en.generateEnglishLangReport("Thank you!");
    }).not.toThrow();
  });

  it("test no false alarm basic", () => {
    expect(en.generateEnglishLangReport("Thank you!")).toEqual([]);
  });

  it("test line number exist", () => {
    expect(
      en.generateEnglishLangReport("Thank you!\nI just want to drink\n")[0]
        .fromLine
    ).toEqual(2);
    expect(
      en.generateEnglishLangReport("Thank you!\nI just want to drink\n")[0]
        .toLine
    ).toEqual(2);
  });

  it("toxicity linter should output labels", async () => {
    const report = await en.generateToxicityReport("Thanks!");
    expect(report).toContain("Check for identity attack");
    expect(report).toContain("Check for threating content");
  });

  it("toxicity linter should pass on good word", async () => {
    const report = await en.generateToxicityReport("Thanks!");
    expect(report).toContain(":ok_hand:");
    expect(report).not.toContain(":worried:");
  });

  it("toxicity linter should stop on bad word", async () => {
    const report = await en.generateToxicityReport("you suck! fuck this!");
    expect(report).toContain(":worried:");
  });
});
