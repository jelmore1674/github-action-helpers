import { exec } from "@actions/exec";

/**
 * Check if git exists before running git commands.
 *
 * @returns - whether the git binary is found.
 */
async function checkIfGitExists() {
  try {
    await exec("git", ["--version"]);
    return { isSuccessful: true };
  } catch (_error) {
    return {
      isSuccessful: false,
      error: "Git binary not found.",
    };
  }
}

export { checkIfGitExists };
