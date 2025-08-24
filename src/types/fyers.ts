export interface HistoricalDataParams {
  symbol: string;
  resolution: string;
  date_format: 0 | 1;
  range_from: string;
  range_to: string;
  cont_flag?: number;
  oi_flag?: number;
}

export interface HistoricalDataResponse {
  s: 'ok' | 'error';
  code: number;
  candles: [number, number, number, number, number, number, number][]; // [timestamp, open, high, low, close, volume, oi]
}

export interface QuoteParams {
  symbols: string;
}

export interface QuoteData {
  n: string; // symbol name
  o: number; // open
  h: number; // high
  l: number; // low
  c: number; // close/ltp
  ch: number; // change
  chp: number; // change percentage
  lp: number; // last price
  spread: number;
  ask: number;
  bid: number;
  v: number; // volume
  avg_price: number;
  lower_ckt: number;
  upper_ckt: number;
  tot_buy_qty: number;
  tot_sell_qty: number;
  fyToken: string;
  desc: string;
  original_name: string;
}

export interface QuoteResponse {
  s: 'ok' | 'error';
  code: number;
  d: QuoteData[];
}

export interface ProfileData {
  fy_id: string;
  email_id: string;
  name: string;
  display_name: string;
  image: string;
  pin_change_date: string;
  pwd_to_login: boolean;
  token_validity: string;
  access_token: string;
}

export interface ProfileResponse {
  s: 'ok' | 'error';
  code: number;
  data: ProfileData;
}

export interface FundsData {
  id: string;
  title: string;
  currency: string;
  net_balance: number;
  available_balance: number;
  used_balance: number;
  payin_amount: number;
  span_amount: number;
  adhoc_amount: number;
  notional_cash: number;
  start_balance: number;
  end_balance: number;
  credits: number;
  debits: number;
}

export interface FundsResponse {
  s: 'ok' | 'error';
  code: number;
  fund_limit: FundsData[];
}

export interface HoldingData {
  fyToken: string;
  symbol: string;
  id: string;
  holdingType: string;
  qty: number;
  costPrice: number;
  marketVal: number;
  pl: number;
  plpercent: number;
  ltp: number;
  sellableQty: number;
  productType: string;
}

export interface HoldingsResponse {
  s: 'ok' | 'error';
  code: number;
  holdings: HoldingData[];
  overall: {
    count_total: number;
    count_open: number;
    pl_total: number;
    pl_realized: number;
    pl_unrealized: number;
  };
}

export interface PositionData {
  fyToken: string;
  symbol: string;
  id: string;
  side: number; // 1 for buy, -1 for sell
  segment: string;
  productType: string;
  qty: number;
  buyQty: number;
  sellQty: number;
  avgPrice: number;
  costPrice: number;
  ltp: number;
  pl: number;
  plpercent: number;
  buyAvg: number;
  sellAvg: number;
  realized_profit: number;
  unrealized_profit: number;
  crossCurrency: string;
  rbiRefRate: number;
  qtyMulti_com: number;
}

export interface PositionsResponse {
  s: 'ok' | 'error';
  code: number;
  netPositions: PositionData[];
  overall: {
    count_total: number;
    count_open: number;
    pl_total: number;
    pl_realized: number;
    pl_unrealized: number;
  };
}

export interface OrderData {
  id: string;
  fyToken: string;
  symbol: string;
  productType: string;
  side: number; // 1 for buy, -1 for sell
  type: number; // 1 for market, 2 for limit, 3 for stop, 4 for stoplimit
  qty: number;
  remainingQuantity: number;
  filledQty: number;
  limitPrice: number;
  stopPrice: number;
  status: number; // 1 for cancelled, 2 for traded, 4 for transit, 5 for rejected, 6 for pending
  orderDateTime: string;
  orderValidity: string;
  pan: string;
  clientId: string;
  orderTag: string;
  segment: string;
  instrument: string;
  message: string;
  offlineOrder: boolean;
  orderNumStatus: string;
  slNo: number;
  dqQtyRem: number;
  disclosedQty: number;
  dqQtyRem2: number;
  orderTime: string;
  ch: number;
  chp: number;
  lp: number;
}

export interface OrderBookResponse {
  s: 'ok' | 'error';
  code: number;
  orderBook: OrderData[];
}

export interface TradeData {
  id: string;
  orderNumber: string;
  exchangeOrderNo: string;
  fyToken: string;
  symbol: string;
  productType: string;
  side: number; // 1 for buy, -1 for sell
  type: number;
  qty: number;
  rate: number;
  amount: number;
  orderTag: string;
  segment: string;
  tradeNumber: string;
  tradeTime: string;
  tradeDate: string;
  pan: string;
  clientId: string;
  slNo: number;
  row: number;
}

export interface TradeBookResponse {
  s: 'ok' | 'error';
  code: number;
  tradeBook: TradeData[];
}

export interface PlaceOrderParams {
  symbol: string;
  qty: number;
  type: number; // 1 for market, 2 for limit, 3 for stop, 4 for stoplimit
  side: number; // 1 for buy, -1 for sell
  productType: string;
  limitPrice?: number;
  stopPrice?: number;
  validity?: string;
  disclosedQty?: number;
  offlineOrder?: boolean;
  stopLoss?: number;
  takeProfit?: number;
  orderTag?: string;
}

export interface PlaceOrderResponse {
  s: 'ok' | 'error';
  code: number;
  id?: string;
  message?: string;
}

export interface ModifyOrderParams {
  id: string;
  type?: number;
  qty?: number;
  limitPrice?: number;
  stopPrice?: number;
  disclosedQty?: number;
}

export interface ModifyOrderResponse {
  s: 'ok' | 'error';
  code: number;
  id?: string;
  message?: string;
}

export interface CancelOrderParams {
  id: string;
}

export interface CancelOrderResponse {
  s: 'ok' | 'error';
  code: number;
  id?: string;
  message?: string;
}

// Base response interface for common fields
export interface FyersBaseResponse {
  s: 'ok' | 'error';
  code: number;
  message?: string;
}
