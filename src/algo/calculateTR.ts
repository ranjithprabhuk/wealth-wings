export function calculateTR(high, low, previousClose) {
  const highMinusLow = Math.abs(high - low);
  const highMinusClose = Math.abs(high - previousClose);
  const lowMinusClose = Math.abs(low - previousClose);

  return Math.max(highMinusLow, highMinusClose, lowMinusClose);
}
