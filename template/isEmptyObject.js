/**
 * Camelize a hyphen-delimited string.
 */
const camelizeRE = /-(w)/g;
export const camelize = (str) =>
  str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ""));

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
