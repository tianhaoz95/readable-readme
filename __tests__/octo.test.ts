import nock from "nock";
import * as octo from "../src/octo";

const GitHubEndpoint = "https://api.github.com";
const AuthScope = "/app/installations/2/access_tokens";
const IssueScope = "/repos/tianhaoz95/readable-readme/issues";

nock.disableNetConnect();

describe("octo test suite", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  test("octo issue poster no crash", async () => {
    nock(GitHubEndpoint)
      .post(AuthScope)
      .reply(200, { token: "test" });
    nock(GitHubEndpoint)
      .post(IssueScope).reply(200);
    expect(async () => {
      await octo.postGitHubIssue(
        "test title",
        "test body",
      );
    }).not.toThrow();
  });

  test("octo issue poster basic", async () => {
    nock(GitHubEndpoint)
      .post(AuthScope)
      .reply(200, { token: "test" });
    nock(GitHubEndpoint)
      .post(IssueScope, (body: any): boolean => {
        expect(body).toMatchObject({
          body: "test body",
          title: "test title",
        });
        return true;
      }).reply(200);
    await octo.postGitHubIssue("test title", "test body");
  });
});
