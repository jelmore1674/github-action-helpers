import * as actionsCore from "@actions/core";
import { afterEach, describe, expect, test, vi } from "vitest";
import { getKeyValuePairInput } from "./";

describe("getArrayInput", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test("Can be successful when returning an object.", () => {
    const expectedObject = { string: "test", test: "string" };

    vi.spyOn(actionsCore, "getInput").mockReturnValue("test=string,string=test");
    expect(getKeyValuePairInput("test_string")).toStrictEqual(expectedObject);
  });

  test("Can accept a custom separator.", () => {
    const expectedObject = { string: "test", test: "string" };

    vi.spyOn(actionsCore, "getInput").mockReturnValue("test=string|string=test");
    expect(getKeyValuePairInput("test_string", "|")).toStrictEqual(expectedObject);
  });

  test("Can return undefined when the input is empty", () => {
    vi.spyOn(actionsCore, "getInput").mockReturnValue("");

    expect(getKeyValuePairInput("test_string", "|")).toBeUndefined();
  });
});
