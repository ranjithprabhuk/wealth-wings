export function calculateVWAP(
  open: number,
  high: number,
  low: number,
  close: number,
  volume: number,
  cumulativeTypicalPriceVolume: number,
  cumulativeVolume: number
) {
  const typicalPrice = (open + high + low + close) / 4;

  cumulativeTypicalPriceVolume += typicalPrice * volume;
  cumulativeVolume += volume;

  return { vwap: cumulativeTypicalPriceVolume / cumulativeVolume, cumulativeTypicalPriceVolume, cumulativeVolume };
}
