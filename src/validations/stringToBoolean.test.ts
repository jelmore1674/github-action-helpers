import { expect, test } from "vitest";
import { stringToBoolean } from "./stringToBoolean";

test.each([
  { input: "true", expected: true },
  { input: "false", expected: false },
  { input: "FALSE", expected: false },
  { input: "TRUE", expected: true },
  { input: "randomWord", expected: false },
])("stringToBoolean($input) -> $expected", ({ input, expected }) => {
  expect(stringToBoolean(input)).toBe(expected);
});
