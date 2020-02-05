import nock from "nock";
import * as lint from "../src/lint";
import * as testUtil from "./utilities/init_env.test";

jest.setTimeout(100000);

const GitHubEndpoint: string = "https://api.github.com";
const AuthScope: string = "/app/installations/2/access_tokens";
const IssueScope: string = "/repos/tianhaoz95/readable-readme/issues";
const PullRequestCommentScope = new RegExp(
  "^/repos/tianhaoz95/readable-readme/issues/[0-9]+/comments$"
);

nock(GitHubEndpoint)
  .post(AuthScope)
  .reply(200, { token: "test" });
nock(GitHubEndpoint)
  .post(IssueScope)
  .reply(200);
nock(GitHubEndpoint)
  .post(PullRequestCommentScope)
  .reply(200);
nock(GitHubEndpoint)
  .get(IssueScope)
  .reply(200, [{ title: "test title 1" }, { title: "test title 2" }]);

describe("Lint test suite", () => {
  beforeAll(() => {
    testUtil.initTestingEnvironmentVariables();
    testUtil.overrideWorkspaceToHorrible();
  });
  afterAll(() => {
    testUtil.cleanTestingEnvironmentVariables();
  });
  beforeEach(() => {
    nock.enableNetConnect();
  });
  afterEach(() => {
    nock.cleanAll();
  });
  it("test lint execute without crashing", () => {
    return expect(lint.lintWorkspace()).resolves.toBe("OK");
  });
});
