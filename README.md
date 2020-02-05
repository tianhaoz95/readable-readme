# Readable Readme

[![Actions Status](https://github.com/tianhaoz95/readable-readme/workflows/Guardians%20of%20the%20Pull%20Requests/badge.svg)](https://github.com/tianhaoz95/readable-readme/actions)
[![Actions Status](https://github.com/tianhaoz95/readable-readme/workflows/Heimdall/badge.svg)](https://github.com/tianhaoz95/readable-readme/actions)


> If README is not readable, nothing else will be.

Too often we find a great project, but give up 5 minutes later only because we can't get enough information from its `README`. I wouldn't blame the developers for the poor `README` readability because, first, unlike the code, there has never been a focus on `README` readability, and second, there is no good tools to enforce `README` readability.

The `readable-readme` project aim to build a GitHub action that checks the readability of `README` files and generate reports to help improve it.

## Getting Started

Add the following code into your workflow steps:

```yml
- uses: actions/checkout@v1
- name: Readable Readme
  uses: tianhaoz95/readable-readme@v1.0.4-beta
  with:
    token: your_github_token_from_secrets
```

> note: the token is used to post analyze report as GitHub issues.

## How does it work?

![strcture diagram](./asset/structure_diagram.png)

Also, check out the [documentation](https://tianhaoz.com/readable-readme/docs/api/index.html).

## Contribute

Any contribution is greatly appreciated. Please check out [the guide](https://github.com/tianhaoz95/readable-readme/blob/master/CONTRIBUTING.md) for more details.

