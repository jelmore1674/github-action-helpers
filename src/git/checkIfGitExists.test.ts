import * as actionsExec from "@actions/exec";
import { afterEach, describe, expect, test, vi } from "vitest";

import { checkIfGitExists } from "./checkIfGitExists";

describe("getExpectedHeadOid", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test("Can return if git is found.", async () => {
    vi.spyOn(actionsExec, "exec").mockResolvedValueOnce(0);

    const result = await checkIfGitExists();

    expect(result).toStrictEqual(
      { isSuccessful: true },
    );
  });

  test("Will return false if git is found.", async () => {
    vi.spyOn(actionsExec, "exec").mockRejectedValue(100);

    const result = await checkIfGitExists();

    expect(result).toStrictEqual(
      { isSuccessful: false, error: "Git binary not found." },
    );
  });
});
