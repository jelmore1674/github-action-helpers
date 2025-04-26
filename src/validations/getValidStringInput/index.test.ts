import * as actionsCore from "@actions/core";
import * as process from "node:process";
import { afterEach, describe, expect, test, vi } from "vitest";
import { getValidStringInput } from "./";

vi.mock("process");

describe("getValidStringInput", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test("Can be successful when returning the string", () => {
    const validInputs = ["test", "string"];

    const expectedString = "test";

    vi.spyOn(actionsCore, "getInput").mockReturnValue(expectedString);
    expect(getValidStringInput("test_string", { validInputs })).toBe(expectedString);
  });

  test("Also successful when input is not required and is empty", () => {
    const validInputs = ["test", "string"];

    const expectedString = "";

    vi.spyOn(actionsCore, "getInput").mockReturnValue(expectedString);
    expect(getValidStringInput("test_string", { validInputs })).toBe(expectedString);
  });

  test("Will throw when string is not valid.", () => {
    const validInputs = ["test", "string"];

    vi.spyOn(actionsCore, "getInput").mockReturnValue("wrong");
    const setFailedMock = vi.spyOn(actionsCore, "setFailed");
    vi.spyOn(process, "exit")
      .mockImplementation((code) => {
        throw new Error(`Code: ${code}`);
      });

    expect(() => getValidStringInput("test_string", { validInputs })).toThrowError();

    expect(setFailedMock).toHaveBeenCalled();
  });
});
