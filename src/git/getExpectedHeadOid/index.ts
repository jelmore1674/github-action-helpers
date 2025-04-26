import { debug } from "@actions/core";
import { getExecOutput } from "@actions/exec";

/**
 * The git commit oid expected at the head of the branch prior to the commit.
 *
 * @param branch - the branch we are currently on.
 */
async function getExpectedHeadOid(branch: string) {
  const { stdout: branchOid } = await getExecOutput("git", [
    "ls-remote",
    "origin",
    `refs/heads/${branch}`,
  ]);

  const { stdout: headOid } = await getExecOutput("git", [
    "ls-remote",
    "origin",
    "refs/heads/HEAD",
  ]);

  // Fallback to the HEAD oid.
  const output = branchOid.split("\t")[0] || headOid.split("\t")[0];

  debug(`getExpectedHeadOid: ${output}`);

  return output;
}

export { getExpectedHeadOid };
