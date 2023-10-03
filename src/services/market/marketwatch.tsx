import { Stat } from '../../enum/stat';
import { IMarketWatch } from '../../types/marketwatch';
import { fetchWrapper } from '../fetchWrapper';

export async function getMarketWatchList(listNumber: string): Promise<{
  stat: Stat;
  values: IMarketWatch[];
}> {
  return await fetchWrapper(`${import.meta.env.VITE_BASE_URL}/MarketWatch`, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
    body: `jData=${JSON.stringify({
      uid: window.localStorage.getItem('userId'),
      wlname: listNumber,
    })}&jKey=${window.localStorage.getItem('token')}`,
  });
}
