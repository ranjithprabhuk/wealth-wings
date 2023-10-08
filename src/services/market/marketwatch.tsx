import { Stat } from '../../enum/stat';
import { IInstrument } from '../../types/instrument';
import { getLocalStorageValue } from '../../utils/localStorage/getLocalStorageValue';
import { fetchWrapper } from '../fetchWrapper';

export async function getMarketWatchList(listNumber: string): Promise<{
  stat: Stat;
  values: IInstrument[];
}> {
  return await fetchWrapper(`${import.meta.env.VITE_BASE_URL}/MarketWatch`, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
    body: `jData=${JSON.stringify({
      uid: getLocalStorageValue('userId'),
      wlname: listNumber,
    })}&jKey=${getLocalStorageValue('token')}`,
  });
}
