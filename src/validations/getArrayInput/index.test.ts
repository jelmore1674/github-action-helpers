import * as actionsCore from "@actions/core";
import { afterEach, describe, expect, test, vi } from "vitest";
import { getArrayInput } from "./";

describe("getArrayInput", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test("Can be successful when returning array.", () => {
    const expectedArray = ["test", "string"];

    vi.spyOn(actionsCore, "getInput").mockReturnValue("test,string");
    expect(getArrayInput("test_string")).toStrictEqual(expectedArray);
  });

  test("Can accept a custom separator.", () => {
    const expectedArray = ["test", "string"];

    vi.spyOn(actionsCore, "getInput").mockReturnValue("test|string");

    expect(getArrayInput("test_string", "|")).toStrictEqual(expectedArray);
  });

  test("Can return an empty array with the input is empty", () => {
    vi.spyOn(actionsCore, "getInput").mockReturnValue("");

    expect(getArrayInput("test_string", "|")).toStrictEqual([]);
  });
});
