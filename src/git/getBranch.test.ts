import * as actionsExec from "@actions/exec";
import { afterEach, describe, expect, test, vi } from "vitest";

import { getBranch } from "./getBranch";

const main = "main";

describe("get the current branch", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test("Can return the branch oid.", async () => {
    vi.spyOn(actionsExec, "getExecOutput").mockResolvedValueOnce({
      stderr: "",
      stdout: main,
      exitCode: 0,
    });

    const result = await getBranch();

    expect(result).toBe(
      "main",
    );
  });
});
