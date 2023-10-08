export function createStrikePriceList(price: string, count = 5) {
  if (price > '30000') {
    const strikePrice = parseInt(price.substring(0, 3)) * 100;
    const strikePriceList = [];
    for (let i = -count; i <= count; i++) {
      strikePriceList.push(`${strikePrice + i * 100}`);
    }

    return strikePriceList;
  } else {
    const strikePrice = parseInt(price.substring(0, 3)) * 50;
    const strikePriceList = [];
    for (let i = -count; i <= count; i++) {
      strikePriceList.push(`${strikePrice + i * 50}`);
    }

    return strikePrice;
  }
}
