import { getLocalStorageValue } from '../../utils/localStorage/getLocalStorageValue';
import { fetchWrapper } from '../fetchWrapper';

export async function zerodhaFetchWrapper(url: string, method: string, payload?: Record<string, any>): Promise<any> {
  return await fetchWrapper(`/api/zerodha`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: `${import.meta.env.VITE_ZERODHA_BASE_URL}${url}`,
      method,
      payload,
      authToken: getLocalStorageValue('zerodha-token'),
      userId: getLocalStorageValue('kite-userid'),
    }),
  });
}
