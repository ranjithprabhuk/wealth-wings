import { IOptionScrips } from '../../types/option-scrips';
import { getLocalStorageValue } from '../../utils/localStorage/getLocalStorageValue';
import { fetchWrapper } from '../fetchWrapper';

export async function getOptionChain(
  exchange: string,
  tsym: string,
  strikePrice: string,
  count = '5',
): Promise<{
  values: IOptionScrips[];
}> {
  return await fetchWrapper(`${import.meta.env.VITE_BASE_URL}/GetOptionChain`, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
    body: `jData=${JSON.stringify({
      uid: getLocalStorageValue('userId'),
      exch: exchange,
      tsym,
      strprc: strikePrice,
      cnt: count,
    })}&jKey=${getLocalStorageValue('token')}`,
  });
}
