# GITHUB_REPOSITORY has to be set before running this script

export REMOTE_TEST_DIR=/tmp/readable-readme-test
export GITHUB_REF=refs/heads/master
export GITHUB_WORKFLOW=test_workflow
export GITHUB_ACTION=readable-readme
export RRLOG=false

mkdir -p ${REMOTE_TEST_DIR}
git clone https://github.com/${GITHUB_REPOSITORY}.git ${REMOTE_TEST_DIR}/${GITHUB_REPOSITORY}

export GITHUB_WORKSPACE=${REMOTE_TEST_DIR}/${GITHUB_REPOSITORY}