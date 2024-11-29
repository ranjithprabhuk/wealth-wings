export function getNearestFiveDigitNumber(n) {
  // Ensure the input is a 5-digit number
  if (n < 10000 || n > 99999) {
    throw new Error('Input must be a 5-digit number.');
  }

  // Find the nearest multiple of 50 upwards (rounding up)
  const roundUp = Math.ceil(n / 50) * 50 + 50;

  // Find the nearest multiple of 50 downwards (rounding down)
  const roundDown = Math.floor(n / 50) * 50 - 50;

  return { roundUp, roundDown };
}
