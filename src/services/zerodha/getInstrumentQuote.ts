import { zerodhaFetchWrapper } from './zerodhaFetchWrapper';

export async function getInstrumentQuote(instrumentWithExchange: string): Promise<any> {
  return await zerodhaFetchWrapper(`/quote?i=${instrumentWithExchange}`, 'GET');
}
