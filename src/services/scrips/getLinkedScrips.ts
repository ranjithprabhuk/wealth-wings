import { IFuturesInstrument } from '../../types/futures-instrument';
import { IOptionExpiry } from '../../types/option-expiry';
import { getLocalStorageValue } from '../../utils/localStorage/getLocalStorageValue';
import { fetchWrapper } from '../fetchWrapper';

export async function getLinkedScrips(
  exchange: string,
  token: string,
): Promise<{
  fut: IFuturesInstrument[];
  opt_exp: IOptionExpiry[];
}> {
  return await fetchWrapper(`${import.meta.env.VITE_BASE_URL}/GetLinkedScrips`, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
    body: `jData=${JSON.stringify({
      uid: getLocalStorageValue('userId'),
      exch: exchange,
      token,
    })}&jKey=${getLocalStorageValue('token')}`,
  });
}
