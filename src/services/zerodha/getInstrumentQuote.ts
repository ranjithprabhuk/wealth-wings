import { getLocalStorageValue } from '../../utils/localStorage/getLocalStorageValue';
import { setLocalStorageValue } from '../../utils/localStorage/setLocalStorageValue';
import { zerodhaFetchWrapper } from './zerodhaFetchWrapper';

export async function getInstrumentQuote(instrumentWithExchange: string): Promise<any> {
  return await zerodhaFetchWrapper(`/quote?i=${instrumentWithExchange}`, 'GET');
}

export async function getInstrumentToken(instrumentWithExchange: string): Promise<number> {
  let token: number = parseInt(getLocalStorageValue(`instrument_token_${instrumentWithExchange}`));
  if (token) return token;

  const response = await zerodhaFetchWrapper(
    `api/marketwatch/7/items`,
    'POST',
    {
      segment: 'NFO-FUT',
      tradingsymbol: instrumentWithExchange,
      watch_id: '7',
      weight: '15',
    },
    true,
  );

  token = response?.data?.instrument_token || 0;

  if (token) setLocalStorageValue(`instrument_token_${instrumentWithExchange}`, token as any);

  return token;
}
