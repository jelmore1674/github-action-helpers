import * as actionsCore from "@actions/core";
import { afterEach, describe, expect, test, vi } from "vitest";
import { getBooleanInput } from "./getBooleanInput";

describe("getArrayInput", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test("Can be successful when receiving true.", () => {
    vi.spyOn(actionsCore, "getInput").mockReturnValue("true");
    expect(getBooleanInput("test_boolean")).toBeTruthy();
  });

  test("Can be successful when receiving false.", () => {
    vi.spyOn(actionsCore, "getInput").mockReturnValue("false");
    expect(getBooleanInput("test_boolean")).toBeFalsy();
  });

  test("Will be false when string is empty.", () => {
    vi.spyOn(actionsCore, "getInput").mockReturnValue("");
    expect(getBooleanInput("test_boolean")).toBeFalsy();
  });
});
