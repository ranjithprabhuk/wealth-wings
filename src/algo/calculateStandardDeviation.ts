export function calculateStandardDeviation(arr: number[], sampleLength = 0) {
  if (sampleLength && arr.length > sampleLength) {
    arr = arr.splice(0, arr.length - sampleLength);
  }
  const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
  return Math.sqrt(
    arr.reduce((acc, val) => acc.concat((val - mean) ** 2), []).reduce((acc, val) => acc + val, 0) / arr.length,
  );
}
