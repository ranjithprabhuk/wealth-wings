import { IOptionExpiry } from '../../types/option-expiry';
import { getLocalStorageValue } from '../../utils/localStorage/getLocalStorageValue';
import { fetchWrapper } from '../fetchWrapper';

export async function getIndexList(exchange: string): Promise<{
  fut: {
    exch: string;
    token: string;
    tsym: string;
    pp: string;
    ls: string;
    ti: string;
    mult: string;
    exd: string;
  }[];
  opt_exp: IOptionExpiry[];
}> {
  return await fetchWrapper(`${import.meta.env.VITE_BASE_URL}/GetIndexList `, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
    body: `jData=${JSON.stringify({
      uid: getLocalStorageValue('userId'),
      exch: exchange,
    })}&jKey=${getLocalStorageValue('token')}`,
  });
}
