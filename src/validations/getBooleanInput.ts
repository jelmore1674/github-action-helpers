import { getInput } from "@actions/core";
import { stringToBoolean } from "./stringToBoolean";

/**
 * Get a boolean from the action input. This will take the input string and convert it to a boolean.
 *
 * @param input - The actions input.
 * @param [options={ required: false }] - The options to pass into `getInput`.
 *
 * @example
 * ```js
 * const boolean = getValidBooleanInput("input_name");
 * ```
 */
function getBooleanInput(input: string, options = { required: false }) {
  const actionInput = getInput(input, options);

  return stringToBoolean(actionInput);
}

export { getBooleanInput };
