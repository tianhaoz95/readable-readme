# Readable Readme

[![Actions Status](https://github.com/tianhaoz95/readable-readme/workflows/PR%20Checks/badge.svg)](https://github.com/tianhaoz95/readable-readme/actions)

<!-- TODO(tianhaoz95): add project description -->
> If README is not readable, nothing else will be.

Too often we find a great project, but give up 5 minutes later only because we can't get enough information from its `README`. I wouldn't blame the developers for the poor `README` readability because, first, unlike the code, there has never been a focus on `README` readability, and second, there is no good tools to enforce `README` readability.

The `readable-readme` project aim to build a GitHub action that checks the readability of `README` files and generate reports to help improve it.

## Development

### Run unit tests

```bash
source ./script/setupTest.sh    # Mimic GitHub actions environment
npm test                        # Run unit tests
```

### Build lib

```bash
npm run build
```

## Roadmap

* [v1](./docs/v1-design-doc.md)

## API Docs

Check the [auto-generated docs](./docs/api/index.html).
