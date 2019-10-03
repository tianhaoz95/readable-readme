# Readable Readme

[![Actions Status](https://github.com/tianhaoz95/readable-readme/workflows/PR%20Checks/badge.svg)](https://github.com/tianhaoz95/readable-readme/actions)
[![TypeScript](https://badges.frapsoft.com/typescript/awesome/typescript.png?v=101)](https://github.com/ellerbrock/typescript-badges/)

<!-- TODO(tianhaoz95): add project description -->

> If README is not readable, nothing else will be.

Too often we find a great project, but give up 5 minutes later only because we can't get enough information from its `README`. I wouldn't blame the developers for the poor `README` readability because, first, unlike the code, there has never been a focus on `README` readability, and second, there is no good tools to enforce `README` readability.

The `readable-readme` project aim to build a GitHub action that checks the readability of `README` files and generate reports to help improve it.

## Contribute

Any contribution is greatly appreciated. Please check out [the guide](./CONTRIBUTING.md) for more details.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#github.com/tianhaoz95/readable-readme.git)

### Run unit tests

```bash
source ./script/setupTest.sh    # Mimic GitHub actions environment
npm test                        # Run unit tests
```

### Run integration test

#### If target is readable-readme

Integration test will run a full scan on the current directory like the installed GitHub actions.

```bash
source ./script/setupTest.sh
export GITHUB_TOKEN=[the GitHub identity you want to use]
npm start
```

#### If target is another repository

> for now, the remote repository must be public

```bash
export GITHUB_REPOSITORY=username/repo
source ./script/setupRemoteTest.sh
export GITHUB_TOKEN=[the GitHub identity you want to use]
npm start
```

### Build lib

```bash
npm run build # The compiled code will be in ./lib
```

## Roadmap

* [v0.1.x Design Doc](./docs/v1-design-doc.md)

## API Docs

Check the [auto-generated API docs](http://tianhaoz.com/readable-readme/docs/api/index.html).
