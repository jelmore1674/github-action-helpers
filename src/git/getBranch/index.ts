import { debug } from "@actions/core";
import { getExecOutput } from "@actions/exec";

/**
 * Get the current git branch.
 */
async function getBranch() {
  const { stdout } = await getExecOutput("git", ["branch", "--show-current"]);
  const output = stdout.trim();

  debug(`branch: ${output}`);
  return output;
}

export { getBranch };
