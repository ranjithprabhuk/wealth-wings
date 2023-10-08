import { getLocalStorageValue } from '../../utils/localStorage/getLocalStorageValue';
import { fetchWrapper } from '../fetchWrapper';

export async function getQuotes(
  exchange: string,
  token: string,
): Promise<{
  request_time: string;
  stat: string;
  exch: string;
  tsym: string;
  cname: string;
  symname: string;
  seg: string;
  exd: string;
  instname: string;
  optt: string;
  pp: string;
  ls: string;
  ti: string;
  mult: string;
  lut: string;
  uc: string;
  lc: string;
  oi: string;
  strprc: string;
  prcftr_d: string;
  token: string;
  lp: string;
  c: string;
  h: string;
  l: string;
  ap: string;
  o: string;
  v: string;
  ltq: string;
  ltt: string;
  tbq: string;
  tsq: string;
  bp1: string;
  sp1: string;
  bp2: string;
  sp2: string;
  bp3: string;
  sp3: string;
  bp4: string;
  sp4: string;
  bp5: string;
  sp5: string;
  bq1: string;
  sq1: string;
  bq2: string;
  sq2: string;
  bq3: string;
  sq3: string;
  bq4: string;
  sq4: string;
  bq5: string;
  sq5: string;
  bo1: string;
  so1: string;
  bo2: string;
  so2: string;
  bo3: string;
  so3: string;
  bo4: string;
  so4: string;
  bo5: string;
  so5: string;
}> {
  return await fetchWrapper(`${import.meta.env.VITE_BASE_URL}/GetQuotes`, {
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
