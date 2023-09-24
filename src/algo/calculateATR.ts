export function calculateATR(
  currentTR: number,
  previousATR: number | null,
  trueRangeListLength: number,
  timePeriod: number = 10
) {
  // use the array of True Range Values to get the Simple Moving //Average of the true range, ie., ATR
  // const trueRangeListLength = trueRangeList.length;
  // if (timePeriod >= trueRangeListLength) {
  //   if (trueRangeListLength === 1) {
  //     return trueRangeList[trueRangeListLength - 1];
  //   } else {
  //     return
  //   }
  //   const atr =
  //     trueRangeList.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / trueRangeList.length;

  //   return atr;
  // } else {
  //   const atr =
  //     trueRangeList.slice(timePeriod * -1).reduce((accumulator, currentValue) => accumulator + currentValue, 0) /
  //     timePeriod;
  //   return atr;
  // }

  if (trueRangeListLength <= timePeriod) {
    if (!previousATR) {
      return currentTR;
    } else {
      return (previousATR * trueRangeListLength + currentTR) / (trueRangeListLength + 1);
    }
  }

  return ((previousATR as number) * (timePeriod - 1) + currentTR) / 14;
}
