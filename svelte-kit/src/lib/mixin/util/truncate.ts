/**
 * Truncates the given string to the given maxLength parameter.
 * If the string was truncated, it will be returned suffixed by the third parameter ('...' by default).
 *
 * @throws {Error} Will throw an error if maxLength is not a positive number.
 */
export const truncateString = (string: string, maxLength: number, suffix = '...') => {
  if (maxLength < 0) {
    throw new Error(`Parameter "maxLength" for function "truncateString" must be a positive number, ${maxLength} given.`, { cause: maxLength });
  }

  if (string.length <= maxLength) {
    return string;
  }

  return `${string.slice(0, maxLength)}${suffix}`;
};
