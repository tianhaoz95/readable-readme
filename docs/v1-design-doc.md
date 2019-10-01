# V1 Design Doc

In V1 we want to achieve an end-to-end GitHub Action that give suggestions on naive grammar issues and present in an intuitive fashion.

* compose suggestions into an report :heavy_check_mark:
  * suggestion context getter :heavy_check_mark:
    * snippet getter :heavy_check_mark:
    * snippet renderer :heavy_check_mark:
  * suggsetion composer (struct data to human language)
* post composed report into an issue :heavy_check_mark:
  * issue title generator :heavy_check_mark:
    * ~~date getter~~ (removed due to time line)
    * ~~commit indicator~~ (removed due to time line)
    * ~~summary generator~~ (removed due to time line)
  * issue body generator :heavy_check_mark:
  * issue poster (octokit) :heavy_check_mark:
    * owner getter :heavy_check_mark:
    * repo id getter :heavy_check_mark:
    * token getter (if needed, can slip) :heavy_check_mark:
