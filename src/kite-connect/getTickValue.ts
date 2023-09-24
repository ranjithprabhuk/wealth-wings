export function getTickValue(tick: any[], instrumentToken: number) {
  return tick.find((t) => t.instrument_token === instrumentToken);
}
