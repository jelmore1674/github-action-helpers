import { debug, getInput, setFailed } from "@actions/core";
import { context } from "@actions/github";
import { getOctokit } from "@actions/github";
import { exit } from "node:process";
import { getExpectedHeadOid, gitBranch, gitDiff } from "./git";

const githubToken = getInput("token", { required: true });

/**
 * Commit using the GitHub GraphQL api.
 *
 * @param commitMessage - the commit message.
 *
 * @returns the target branch
 */
async function commitWithApi(commitMessage: string) {
  const branch = await gitBranch();
  const repo = `${context.repo.owner}/${context.repo.repo}`;

  debug(`repo: ${repo}`);

  const expectedHeadOid = await getExpectedHeadOid(branch);

  const { fileAdditions, fileDeletions } = await gitDiff();

  if (fileAdditions.length > 0 || fileDeletions.length > 0) {
    try {
      await getOctokit(githubToken).graphql(
        `mutation($expectedHeadOid: GitObjectID!, $fileAdditions: [FileAddition!]!, $fileDeletions: [FileDeletion!]!) {
          createCommitOnBranch(
            input: {
              branch: {
                repositoryNameWithOwner: "${repo}",
                branchName: "${branch}"
              },
              message: { headline: "${commitMessage}" },
              fileChanges: {
                additions: $fileAdditions,
                deletions: $fileDeletions
              },
              expectedHeadOid: $expectedHeadOid
            }
          ){
            commit {
              url,
              changedFilesIfAvailable
            }
          }
        }`,
        {
          expectedHeadOid,
          fileAdditions,
          fileDeletions,
        },
      );
    } catch (error) {
      let errorMessage = "Unable to create commit.";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      setFailed(errorMessage);
      exit(1);
    }
  }

  return true;
}

export { commitWithApi };
