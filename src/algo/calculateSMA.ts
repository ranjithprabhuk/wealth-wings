export function calculateSMA(close: number, previousSMA: number | null, smaLength: number, timePeriod: number = 12) {
  if (smaLength <= timePeriod) {
    if (!previousSMA) {
      return close;
    } else {
      return (previousSMA * smaLength + close) / (smaLength + 1);
    }
  }

  return ((previousSMA as number) * (timePeriod - 1) + close) / timePeriod;
}
