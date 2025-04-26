import { getInput } from "@actions/core";

/**
 * Get a input where you need to use a key value pair.
 *
 * @example
 * ```yaml
 * input_name: key=value,key2=value2
 * input2_name: key=value key2=value2
 * input3_name: key=value|key2=value2
 * ```
 *
 * @param input - the action input
 * @param separator - The separator used to split the keyvalue pair. Default: `","`
 * @param [options={ required: false }] - the options for `getInput`
 *
 * @example
 * ```js
 * const keyValueInput = getKeyValuePairInput("input_name");
 * ```
 */
function getKeyValuePairInput<T = Record<string, string>>(
  input: string,
  separator = ",",
  options = { required: false },
) {
  const actionInput = getInput(input, options);

  if (!actionInput) {
    return undefined;
  }

  return actionInput.split(separator).reduce((acc, value) => {
    acc[value.split("=")[0]] = value.split("=")[1];
    return acc;
  }, {} as Record<string, string>) as T;
}

export { getKeyValuePairInput };
