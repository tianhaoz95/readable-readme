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

  it("generate report basic", () => {
    const reportContent = report.composeReportMetadataToParagraph({
      en: [
        "test suggestion 1",
        "test suggestion 2",
      ],
      filename: "test filename",
    });
    expect(reportContent).toContain("test filename");
    expect(reportContent).toContain("English Language Report");
    expect(reportContent).toContain("write-good");
  });
});
