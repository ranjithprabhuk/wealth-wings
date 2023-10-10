import { Order } from '../../types/order';
import { getLocalStorageValue } from '../../utils/localStorage/getLocalStorageValue';
import { fetchWrapper } from '../fetchWrapper';

export async function getOrderBook(): Promise<Order[]> {
  return await fetchWrapper(`${import.meta.env.VITE_BASE_URL}/OrderBook `, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
    body: `jData=${JSON.stringify({ uid: getLocalStorageValue('userId') })}&jKey=${getLocalStorageValue('token')}`,
  });
}
