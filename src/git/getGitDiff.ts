import { debug } from "@actions/core";
import { exec, getExecOutput } from "@actions/exec";
import { readFileSync } from "node:fs";

const ADDITION_REGEX = /^1 \.?(M|A)\.?/;
const DELETION_REGEX = /^1 \.?D\.?/;
const REWRITE_REGEX = /^2 R\./;

/**
 * This is used for creating the type that will be sent to GitHub for file changes.
 */
interface Addition {
  /**
   * The file path to the file with changes.
   */
  path: string;
  /**
   * Base64 encoded file that will be sent to the GitHub api.
   */
  contents: string;
}

/**
 * Get the git diff and prepare it to be sent to the graphql api.
 */
async function getGitDiff() {
  // Ensure to add files before checking diff.
  await exec("git", ["add", "."]);

  const { stdout: diff } = await getExecOutput("git", [
    "status",
    "--porcelain=v2",
    "--branch",
    "--untracked-files=no",
  ]);

  debug(`Diff:\n${diff}`);

  const stagedAdditionFilePaths: string[] = [];
  const stagedDeletionFilePaths: string[] = [];

  const lines = diff.split("\n");

  for (const line of lines) {
    const file = line.split(" ").pop();

    if (file) {
      if (line.match(ADDITION_REGEX)) {
        stagedAdditionFilePaths.push(file);
      }

      if (line.match(DELETION_REGEX)) {
        stagedDeletionFilePaths.push(file);
      }

      if (line.match(REWRITE_REGEX)) {
        stagedAdditionFilePaths.push(file.split("\t")[0]);
        stagedDeletionFilePaths.push(file.split("\t")[1]);
      }
    }
  }

  const fileAdditions = stagedAdditionFilePaths.reduce((acc, path) => {
    debug(`Path: ${path}`);
    const file = readFileSync(path, { encoding: "utf8" });
    acc.push({ path, contents: Buffer.from(file).toString("base64") });
    return acc;
  }, [] as Addition[]);

  const fileDeletions = stagedDeletionFilePaths.map(path => ({
    path,
  }));

  debug(`File Additions: ${JSON.stringify(fileAdditions, null, 2)}`);
  return { fileAdditions, fileDeletions };
}

export { getGitDiff };
