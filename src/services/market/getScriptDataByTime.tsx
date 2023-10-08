import { Stat } from '../../enum/stat';
import { IInstrument } from '../../types/instrument';
import { getLocalStorageValue } from '../../utils/localStorage/getLocalStorageValue';
import { fetchWrapper } from '../fetchWrapper';

export async function getScriptDataByTime(
  exchange: string,
  token: string,
  startTime: string,
  endTime: string,
  interval: string = '1',
): Promise<{
  stat: Stat;
  values: IInstrument[];
}> {
  return await fetchWrapper(`${import.meta.env.VITE_BASE_URL}/TPSeries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
    body: `jData=${JSON.stringify({
      uid: getLocalStorageValue('userId'),
      exch: exchange,
      token,
      st: "1695017020",
      et: "1695420800",
      intrv: interval,
    })}&jKey=${getLocalStorageValue('token')}`,
  });
}


//jData={"uid":"FT032085","exch":"NFO","token":"FINNIFTY31OCT23F","st":"1695017020","et":"1695420800","intrv":"3"}&jKey=e76aab6a8020d2a32299b2a806d7181ea911a8db52f71ddbc1afc64aea3ce861