import { debug } from "@actions/core";
import { context } from "@actions/github";
import { getOctokit } from "@actions/github";
import { getBranch } from "../getBranch";
import { getExpectedHeadOid } from "../getExpectedHeadOid";
import { getGitDiff } from "../getGitDiff";

/**
 * Commit using the GitHub GraphQL api.
 *
 * @param token - the github api token.
 * @param commitMessage - the commit message.
 *
 * @example
 * ```js
 * const {error} = await commitWithApi(token, "This commit message");
 *
 * if (error) {
 *  // handle error
 * }
 * ```
 */
async function commit(token: string, commitMessage: string) {
  const branch = await getBranch();
  const repo = `${context.repo.owner}/${context.repo.repo}`;

  debug(`repo: ${repo}`);

  const expectedHeadOid = await getExpectedHeadOid(branch);

  const { fileAdditions, fileDeletions } = await getGitDiff();

  if (fileAdditions.length > 0 || fileDeletions.length > 0) {
    try {
      if (!token) {
        throw new Error("Missing GITHUB_TOKEN.");
      }

      await getOctokit(token).graphql(
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

      return {
        isSuccessful: false,
        error: errorMessage,
      };
    }
  }

  return { isSuccessful: true, error: null };
}

export { commit };
