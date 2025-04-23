/**
 * Convert the strings `"true"` or `"false"` to a boolean value.
 *
 * @param string - the string to check
 */
function stringToBoolean(string: string) {
  return string.toLowerCase() === "true";
}

export { stringToBoolean };
