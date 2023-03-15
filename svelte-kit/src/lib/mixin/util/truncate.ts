/**
 * Truncates the given string to the given maxLength parameter.
 * If the string was truncated, it will be returned suffixed by the third parameter ('...' by default).
 *
 * @throws {Error} Will throw an error if maxLength is not a positive number.
 */
export const truncateString = (
  string: string,
  maxLength: number | null = null,
  offset: number | null = null,
  suffix = '...',
  prefix = '...',
  trim = true,
) => {
  if (maxLength !== null && maxLength < 0) {
    throw new Error(`Parameter "maxLength" for function "truncateString" must be a positive number, ${maxLength} given.`, { cause: maxLength });
  }

  let truncated = string;
  let prefixLength = 0;

  if (offset && truncated.length > offset) {
    const truncateStart = truncated.slice(offset);

    truncated = `${prefix}${trim ? truncateStart.trimStart() : truncateStart}`;
    prefixLength = prefix.length;
  }

  if (maxLength && truncated.length > maxLength) {
    const truncateEnd = truncated.slice(prefixLength, maxLength + prefixLength);

    truncated = `${prefixLength > 0 ? prefix : ''}${trim ? truncateEnd.trimEnd() : truncateEnd}${suffix}`;
  }

  return truncated;
};
