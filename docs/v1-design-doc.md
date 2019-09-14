# V1 Design Doc

In V1 we want to achieve an end-to-end GitHub Action that give suggestions on naive grammar issues and present in an intuitive fashion.

- [ ] compose suggestions into an report
  - [ ] suggestion context getter
    - [ ] snippet getter
    - [ ] snippet renderer
  - [ ] suggsetion composer (struct data to human language)
- [ ] post composed report into an issue
  - [ ] issue title generator
    - [ ] date getter
    - [ ] commit indicator
    - [ ] summary generator
  - [ ] issue body generator
  - [ ] issue poster (octokit)
    - [ ] owner getter
    - [ ] repo id getter
    - [ ] token getter (if needed, can slip)
