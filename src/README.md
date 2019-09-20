# Readable Readme Developer Guide

The readable-readme project is an automated `Markdown` linting process written in `Typescript`. It can be used in any automated system like travis CI, circle CI, but preferrably GitHub Actions as it will work out-of-box with zero configuration.

The structure is:
* `report.ts` is responsible converting structured data into human-readable reports.
* `main.ts ` is the entry point to the end-to-end process.
* `octo.ts` is an abstraction arounnd the GitHub API library `octokit.js`.
* `util.ts` is a collection of small and shallow helper functions.