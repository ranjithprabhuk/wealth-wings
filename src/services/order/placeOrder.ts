import { OrderType } from '../../enum/order-type';
import { ProductName } from '../../enum/product-name';
import { ProductType } from '../../enum/product-type';
import { RetentionType } from '../../enum/rentention-type';
import { Stat } from '../../enum/stat';
import { IMarketWatch } from '../../types/marketwatch';
import { getLocalStorageValue } from '../../utils/localStorage/getLocalStorageValue';
import { fetchWrapper } from '../fetchWrapper';

export async function placeOrder(
  exchange: string,
  tsym: string,
  qty: string,
  prd: ProductName,
  prctyp: ProductType,
  trantype: OrderType,
  prc: string,
  ret: RetentionType,
  trgprc?: string, // Stop loss price SL Limit and SL Market order
  // Bracker Order Params
  bpprc?: string, // book profit price
  blprc?: string, // book loss price
  mkt_protection = 5,
): Promise<{
  stat: Stat;
  values: IMarketWatch[];
}> {
  const payload = {
    uid: getLocalStorageValue('userId'),
    actid: getLocalStorageValue('userId'),
    exch: exchange,
    tsym,
    qty,
    mkt_protection,
    prc,
    prd,
    trantype,
    prctyp,
    ret,
    ordersource: 'API',
  };

  if (prctyp === ProductType.SL_Limit || prctyp === ProductType.SL_Market) {
    if (trgprc) payload['trgprc'] = trgprc;
    else throw 'Stop loss is required for SL Limit and SL Market Orders';
  }

  if (prd === ProductName.BO) {
    if (bpprc && blprc) {
      payload['bpprc'] = bpprc;
      payload['blprc'] = blprc;
    } else {
      throw 'Profit target and stop loss price are required for bracker orders';
    }
  }

  return await fetchWrapper(`${import.meta.env.VITE_BASE_URL}/PlaceOrder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
    body: `jData=${JSON.stringify(payload)}&jKey=${getLocalStorageValue('token')}`,
  });
}
