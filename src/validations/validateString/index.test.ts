import { describe, expect, test } from "vitest";
import { validateString } from "./";

describe("validateString", () => {
  test("Can pass with valid string", () => {
    const inputOptions = ["test", "string"];

    expect(validateString("string", inputOptions)).toStrictEqual({ isValid: true });
  });

  test("Will fail and show missing inputs message", () => {
    const inputOptions = ["test", "string"];

    expect(validateString("fail", inputOptions)).toStrictEqual({
      isValid: false,
      error: "Expected on of the following inputs: test, string",
    });
  });
});
