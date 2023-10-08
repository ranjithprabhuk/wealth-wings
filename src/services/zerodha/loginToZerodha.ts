import { getLocalStorageValue } from '../../utils/localStorage/getLocalStorageValue';
import { fetchWrapper } from '../fetchWrapper';

export async function loginToZerodha(password: string, totp: string): Promise<any> {
  return await fetchWrapper(`/api/zerodha/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      totp,
      password,
      userId: getLocalStorageValue('kite-userid'),
    }),
  });
}
