import * as report from "../src/report";

describe("Report test suite", () => {
  it("generate report no crash", () => {
    expect(() => {
      report.composeReportMetadataToParagraph({
        en: [
          {
            index: 10,
            offset: 5,
            reason: "test rocks!",
          },
          {
            index: 20,
            offset: 3,
            reason: "ahhh I am hungry...",
          },
        ],
        fileContent: "test full context",
        filename: "test filename",
        relativePath: "test relative path",
      });
    }).not.toThrow();
  });

  it("generate report title basic", () => {
    const reportContent = report.composeReportMetadataToParagraph({
      en: [],
      fileContent: "test full context",
      filename: "test filename",
      relativePath: "test relative path",
    });
    expect(reportContent).toContain("test relative path");
    expect(reportContent).toContain("Report for");
  });

  it("generate report lang entry", () => {
    const reportContent = report.composeReportMetadataToParagraph({
      en: [
        {
          index: 10,
          offset: 5,
          reason: "test rocks!",
        },
        {
          index: 20,
          offset: 3,
          reason: "ahhh I am hungry...",
        },
      ],
      fileContent: "test full context",
      filename: "test filename",
    });
    expect(reportContent).toContain("test rocks!");
    expect(reportContent).toContain("ahhh I am hungry...");
    expect(reportContent).toContain("@ index:10 & offset:5");
    expect(reportContent).toContain("@ index:20 & offset:3");
  });

  it("generate report with collapsable entries", () => {
    const reportContent = report.composeReportMetadataToParagraph({
      en: [
        {
          index: 10,
          offset: 5,
          reason: "test rocks!",
        },
        {
          index: 20,
          offset: 3,
          reason: "ahhh I am hungry...",
        },
      ],
      fileContent: "test full context",
      filename: "test filename",
    });
    expect(reportContent).toContain("<details>");
    expect(reportContent).toContain("</details>");
    expect(reportContent).toContain("<summary>");
    expect(reportContent).toContain("</summary>");
  });

  it("get report issue title no crash", () => {
    expect(() => {
      report.getTeportIssueTitle();
    }).not.toThrow();
  });

  it("get issue title basic", () => {
    const issueTitle = report.getTeportIssueTitle();
    expect(issueTitle).toContain("Report for");
    expect(issueTitle).toContain("refs/");
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

  it("snippet compiler no crash", () => {
    expect(() => {
      report.compileSnippet(
        "left context",
        "right context",
        "highlight",
        "plainTextSnippet",
      );
    }).not.toThrow();
  });

  it("snippet compiler basic", () => {
    expect(
      report.compileSnippet(
        "left context",
        "right context",
        "highlight",
        "plainTextSnippet",
      )).toBe("left context**highlight**right context");
  });

  it("snippet compiler tick mark", () => {
    expect(
      report.compileSnippet(
        "left `context`",
        "right `context`",
        "highlight",
        "plainTextSnippet",
      )).toBe("left `context`**highlight**right `context`");
  });

  it("snippet compiler less than", () => {
    expect(
      report.compileSnippet(
        "left <context",
        "right <context",
        "highlight",
        "plainTextSnippet",
      )).toBe("left <context**highlight**right <context");
  });

  it("snippet renderer no crash", () => {
    const testText = "This is a test and hope it works lol!";
    expect(() => {
      report.renderSnippet(10, 4, 4, testText, "plainTextSnippet");
    }).not.toThrow();
  });

  it("snippet renderer basic", () => {
    const testText = "This is a test and hope it works lol!";
    expect(
      report.renderSnippet(5, 2, 100, testText, "plainTextSnippet"),
    ).toBe("This **is** a test and hope it works lol!");
  });

  it("snippet renderer tick marks", () => {
    const testText = "This is a `test` and hope it works lol!";
    expect(
      report.renderSnippet(5, 2, 100, testText, "plainTextSnippet"),
    ).toBe("This **is** a `test` and hope it works lol!");
  });
});
