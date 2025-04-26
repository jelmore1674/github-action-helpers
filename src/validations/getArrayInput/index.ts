import { getInput } from "@actions/core";
/**
 * Get an array from the action input.
 *
 * @param input - The action input.
 * @param [separator=","] - The separator used in your action input. Defaults to `","`
 * @param [options={ required: false }] - Input options.
 */
function getArrayInput(input: string, separator = ",", options = { required: false }) {
  return getInput(input, options).split(separator).filter(Boolean);
}

export { getArrayInput };
