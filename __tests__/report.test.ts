import * as report from "../src/report";

describe("Report test suite", () => {
  it("generate report without crashing", () => {
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
});
