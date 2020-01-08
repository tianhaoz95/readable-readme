# Contributing

Just submit a PR and I will review and leave comments as soon as possible.

## Developing on the cloud

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#github.com/tianhaoz95/readable-readme.git)

## Run unit tests

```bash
source ./script/setupTest.sh    # Mimic GitHub actions environment
npm test                        # Run unit tests
```

## Run integration test

### If target is readable-readme

Integration test will run a full scan on the current directory like the installed GitHub actions.

```bash
source ./script/setupTest.sh
export GITHUB_TOKEN=[the GitHub identity you want to use]
npm start
```

### If target is another repository

> for now, the remote repository must be public

```bash
export GITHUB_REPOSITORY=username/repo
source ./script/setupRemoteTest.sh
export GITHUB_TOKEN=[the GitHub identity you want to use]
npm start
```

## Build lib

```bash
npm run build # The compiled code will be in ./lib
```

## Roadmap

* [v0.1.x Design Doc](./docs/v1-design-doc.md)

## API Docs

Check the [auto-generated API docs](http://tianhaoz.com/readable-readme/docs/api/index.html).