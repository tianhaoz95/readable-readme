import * as report from "../src/report";

describe("Report test suite", () => {
  it("generate report no crash", () => {
    expect(() => {
      report.composeReportMetadataToParagraph({
        en: [
          "test suggestion 1",
          "test suggestion 2",
        ],
        filename: "test filename",
      });
    }).not.toThrow();
  });

  it("generate report title basic", () => {
    const reportContent = report.composeReportMetadataToParagraph({
      en: [],
      filename: "test filename",
    });
    expect(reportContent).toContain("test filename");
    expect(reportContent).toContain("English Language Report");
    expect(reportContent).toContain("write-good");
  });

  it("generate report lang entry", () => {
    const reportContent = report.composeReportMetadataToParagraph({
      en: [
        {
          index: 10,
          offset: 5,
          suggestion: "test rocks!",
        },
        {
          index: 20,
          offset: 3,
          suggestion: "ahhh I am hungry...",
        },
      ],
      filename: "test filename",
    });
    expect(reportContent).toContain("test rocks!");
    expect(reportContent).toContain("ahhh I am hungry...");
    expect(reportContent).toContain("index: 10, offset: 5");
    expect(reportContent).toContain("index: 20, offset: 3");
  });

  it("get report issue title no crash", () => {
    expect(() => {
      report.getTeportIssueTitle();
    }).not.toThrow();
  });

  it("snippet getter no crash", () => {
    expect(() => {
      const testText = "This is a test and hope it works lol!";
      report.getSnippet(5, 2, 1, testText);
    }).not.toThrow();
  });

  it("snippet getter basic", () => {
    const testText = "This is a test and hope it works lol!";
    expect(
      report.getSnippet(10, 4, 4, testText),
    ).toEqual({
      fullSnippet: "s a test and",
      highlight: "test",
      leftContext: "s a ",
      rightContext: " and",
    });
  });

  it("snippet getter out of bound", () => {
    const testText = "This is a test and hope it works lol!";
    expect(
      report.getSnippet(10, 4, 100, testText),
    ).toEqual({
      fullSnippet: "This is a test and hope it works lol!",
      highlight: "test",
      leftContext: "This is a ",
      rightContext: " and hope it works lol!",
    });
  });
});
