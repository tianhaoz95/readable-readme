import nock from "nock";
import * as octo from "../src/octo";

const GitHubEndpoint: string = "https://api.github.com";
const AuthScope: string = "/app/installations/2/access_tokens";
const IssueScope: string = "/repos/tianhaoz95/readable-readme/issues";

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
    return expect(octo.postGitHubIssue(
      "test title",
      "test body",
    )).resolves.toBeDefined();
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

  test("octo issue exist helper no crash", () => {
    nock(GitHubEndpoint)
      .post(AuthScope)
      .reply(200, { token: "test" });
    nock(GitHubEndpoint)
      .get(IssueScope).reply(200, [
        { title: "test title 1" },
        { title: "test title 2" },
      ]);
    return expect(octo.issueTitleExist(
      "test title 1",
      "readable-readme",
      "tianhaoz95",
    )).resolves.toBeDefined();
  });
});
