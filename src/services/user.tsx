import { Stat } from '../enum/stat';
import { fetchWrapper } from './fetchWrapper';

export async function getUserProfile(): Promise<{ client: string; emsg: string; stat: Stat; token: string }> {
  return await fetchWrapper(`${import.meta.env.VITE_BASE_URL}/UserDetails`, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
    body: `jData=${JSON.stringify({ uid: window.localStorage.getItem('userId') })}&jKey=${window.localStorage.getItem(
      'token',
    )}`,
  });
}
