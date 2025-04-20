import { afterEach, describe, expect, test, vi } from "vitest";

import * as actionsExec from "@actions/exec";
import * as fs from "node:fs";
import { gitDiff } from "./git";

vi.mock("fs");

describe("gitDiff", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test("Can get added or deleted files", async () => {
    vi.spyOn(actionsExec, "exec").mockResolvedValue(0);
    vi.spyOn(actionsExec, "getExecOutput").mockResolvedValue({
      stdout: `# branch.oid ca8432cc1b08e1e439f6132e36f6de92609fcbc5
# branch.head main
1 A. N... 000000 100644 100644 0000000000000000000000000000000000000000 18ad259726298b074b8d9e74722010f0d0c76aa6 src/git.test.ts
1 D. N... 100644 000000 000000 05957d9d9f2a4dba63b92f9d3e00e1221077db03 0000000000000000000000000000000000000000 vitest.config.mts
`,
      exitCode: 0,
      stderr: "",
    });
    vi.spyOn(fs, "readFileSync").mockReturnValue("This is a string");

    const contents = Buffer.from("This is a string").toString("base64");

    const expected = {
      fileAdditions: [{ path: "src/git.test.ts", contents }],
      fileDeletions: [{ path: "vitest.config.mts" }],
    };

    const result = await gitDiff();

    expect(result).toStrictEqual(expected);
  });

  test("Can get rewritten or copied files", async () => {
    vi.spyOn(actionsExec, "exec").mockResolvedValue(0);
    vi.spyOn(actionsExec, "getExecOutput").mockResolvedValue({
      stdout: `# branch.oid ca8432cc1b08e1e439f6132e36f6de92609fcbc5
# branch.head main
2 R. N... 100644 100644 100644 05957d9d9f2a4dba63b92f9d3e00e1221077db03 05957d9d9f2a4dba63b92f9d3e00e1221077db03 R100 vitest.config.mtss	vitest.config.mts
`,
      exitCode: 0,
      stderr: "",
    });
    vi.spyOn(fs, "readFileSync").mockReturnValue("This is a string");

    const contents = Buffer.from("This is a string").toString("base64");

    const expected = {
      fileAdditions: [{ path: "vitest.config.mtss", contents }],
      fileDeletions: [{ path: "vitest.config.mts" }],
    };

    const result = await gitDiff();

    expect(result).toStrictEqual(expected);
  });
});
