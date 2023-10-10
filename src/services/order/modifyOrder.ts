import { ProductType } from '../../enum/product-type';
import { RetentionType } from '../../enum/rentention-type';
import { Stat } from '../../enum/stat';
import { IInstrument } from '../../types/instrument';
import { getLocalStorageValue } from '../../utils/localStorage/getLocalStorageValue';
import { fetchWrapper } from '../fetchWrapper';

export async function modifyOrder(
  norenordno: string,
  exchange: string,
  tsym: string,
  qty: string,
  prctyp: ProductType,
  prc: string,
  ret: RetentionType,
  trgprc?: string, // Stop loss price SL Limit and SL Market order
): Promise<{
  stat: Stat;
  values: IInstrument[];
}> {
  const payload = {
    uid: getLocalStorageValue('userId'),
    exch: exchange,
    norenordno,
    prctyp,
    prc,
    qty,
    tsym,
    ret,
  };

  if (prctyp === ProductType.SL_Limit || prctyp === ProductType.SL_Market) {
    if (trgprc) payload['trgprc'] = trgprc;
    else throw 'Stop loss is required for SL Limit and SL Market Orders';
  }

  return await fetchWrapper(`${import.meta.env.VITE_BASE_URL}/ModifyOrder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
    body: `jData=${JSON.stringify(payload)}&jKey=${getLocalStorageValue('token')}`,
  });
}
