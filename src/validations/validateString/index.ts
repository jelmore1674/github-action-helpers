/**
 * Validates if the input is a specific string.
 *
 * @param input - The input from the workflow.
 * @param validStrings - An array of all valid strings.
 */
function validateString(input: string, validStrings: string[]) {
  if (validStrings.includes(input)) {
    return { isValid: true };
  }

  return {
    isValid: false,
    error: `Expected on of the following inputs: ${validStrings.join(", ")}`,
  };
}

export { validateString };
