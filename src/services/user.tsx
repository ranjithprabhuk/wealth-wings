import { Stat } from '../enum/stat';
import { getLocalStorageValue } from '../utils/localStorage/getLocalStorageValue';
import { fetchWrapper } from './fetchWrapper';

export async function getUserProfile(): Promise<{ client: string; emsg: string; stat: Stat; token: string }> {
  return await fetchWrapper(`${import.meta.env.VITE_BASE_URL}/UserDetails`, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
    body: `jData=${JSON.stringify({ uid: getLocalStorageValue('userId') })}&jKey=${getLocalStorageValue('token')}`,
  });
}
