export function getStringBetween(str, startStr, endStr) {
  const pos = str.indexOf(startStr) + startStr.length;
  return str.substring(pos, str.indexOf(endStr, pos));
}
