import { getInput, setFailed } from "@actions/core";
import { exit } from "node:process";
import { validateString } from "./validateString";

interface InputOptions {
  /**
   * Whether the input is required.
   *
   * @default false
   */
  required?: boolean;

  /**
   * Valid inputs to check string against if needed a specific string.
   */
  validInputs?: string[];
}

function getValidStringInput<T = string>(input: string, inputOptions: InputOptions) {
  const actionInput = getInput(input, { required: Boolean(inputOptions.required) });

  if (inputOptions.validInputs) {
    const { error } = validateString(actionInput, inputOptions.validInputs);

    if (error) {
      setFailed(`The input "${input}" is not valid.\n\n${error}`);
      exit(1);
    }
  }

  return actionInput as T;
}

export { getValidStringInput };
