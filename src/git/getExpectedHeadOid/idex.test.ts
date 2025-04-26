import * as actionsExec from "@actions/exec";
import { afterEach, describe, expect, test, vi } from "vitest";

import { getExpectedHeadOid } from "./";

const main = "a6fbbb88e01a19ef87ea63ec8251d02ebbd699c0\trefs/heads/main";
const head = "9430a1583ab55dcdb95a2ad1817eaecc121cb118\trefs/heads/HEAD";

describe("getExpectedHeadOid", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test("Can return the branch oid.", async () => {
    vi.spyOn(actionsExec, "getExecOutput").mockResolvedValueOnce({
      stderr: "",
      stdout: main,
      exitCode: 0,
    }).mockResolvedValueOnce({
      stderr: "",
      stdout: head,
      exitCode: 0,
    });

    const result = await getExpectedHeadOid("main");

    expect(result).toBe(
      "a6fbbb88e01a19ef87ea63ec8251d02ebbd699c0",
    );
  });

  test("Can fallback to the head oid.", async () => {
    vi.spyOn(actionsExec, "getExecOutput").mockResolvedValueOnce({
      stderr: "",
      stdout: "",
      exitCode: 0,
    }).mockResolvedValueOnce({
      stderr: "",
      stdout: head,
      exitCode: 0,
    });

    const result = await getExpectedHeadOid("main");

    expect(result).toBe(
      "9430a1583ab55dcdb95a2ad1817eaecc121cb118",
    );
  });
});
