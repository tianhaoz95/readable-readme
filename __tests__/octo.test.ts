import nock from "nock";
import * as octo from "../src/octo";
import * as testUtil from "./utilities/init_env";

const GitHubEndpoint: string = "https://api.github.com";
const AuthScope: string = "/app/installations/2/access_tokens";
const IssueScope: string = "/repos/tianhaoz95/readable-readme/issues";
const FirstIssueScope: string = "/repos/tianhaoz95/readable-readme/issues/1";

nock.disableNetConnect();

describe("octo test suite", () => {
  beforeAll(() => {
    testUtil.initTestingEnvironmentVariables();
  });

  afterAll(() => {
    testUtil.cleanTestingEnvironmentVariables();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  test("octo issue poster no crash", async () => {
    nock(GitHubEndpoint)
      .post(AuthScope)
      .reply(200, { token: "test" });
    nock(GitHubEndpoint)
      .get(IssueScope).reply(200, []);
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
      .get(IssueScope).reply(200, []);
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

  test("octo issue updater basic", async () => {
    nock(GitHubEndpoint)
      .post(AuthScope)
      .reply(200, { token: "test" });
    nock(GitHubEndpoint)
      .get(IssueScope).reply(200, [
        {
          number: 1,
          state: "open",
          title: "test title",
        },
      ]);
    nock(GitHubEndpoint)
      .patch(FirstIssueScope, (body: any): boolean => {
        expect(body).toMatchObject({
          body: "test body",
          title: "test title",
        });
        return true;
      }).reply(200);
    await octo.postGitHubIssue("test title", "test body");
  });

  test("octo issue matcher helper no crash", () => {
    nock(GitHubEndpoint)
      .post(AuthScope)
      .reply(200, { token: "test" });
    nock(GitHubEndpoint)
      .get(IssueScope).reply(200, [
        { title: "test title 1", number: 0, state: "open" },
        { title: "test title 2", number: 1, state: "open" },
      ]);
    return expect(octo.matchIssueTitle(
      "test title 1",
      "readable-readme",
      "tianhaoz95",
    )).resolves.toBeDefined();
  });

  test("octo issue matcher helper match", () => {
    nock(GitHubEndpoint)
      .post(AuthScope)
      .reply(200, { token: "test" });
    nock(GitHubEndpoint)
      .get(IssueScope).reply(200, [
        { title: "test title 1", number: 0, state: "open" },
        { title: "test title 2", number: 1, state: "open" },
      ]);
    return expect(octo.matchIssueTitle(
      "test title 1",
      "readable-readme",
      "tianhaoz95",
    )).resolves.toEqual({
      found: true,
      issueNumber: 0,
    });
  });

  test("octo issue matcher helper no match", () => {
    nock(GitHubEndpoint)
      .post(AuthScope)
      .reply(200, { token: "test" });
    nock(GitHubEndpoint)
      .get(IssueScope).reply(200, [
        { title: "test title 1", number: 0, state: "open" },
        { title: "test title 2", number: 1, state: "open" },
      ]);
    return expect(octo.matchIssueTitle(
      "test title no match",
      "readable-readme",
      "tianhaoz95",
    )).resolves.toEqual({
      found: false,
      issueNumber: -1,
    });
  });

  // TODO(tianhaoz95): add test for closed issues
});
