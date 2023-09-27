import { Stat } from '../enum/stat';
import { generateSHA256Hash } from '../utils/sha256';
import { fetchWrapper } from './fetchWrapper';

export async function authenticateUser(
  requestCode: string,
): Promise<{ client: string; emsg: string; stat: Stat; token: string }> {
  return await fetchWrapper(`${import.meta.env.VITE_AUTH_URL}/trade/apitoken`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      api_key: import.meta.env.VITE_API_KEY,
      request_code: requestCode,
      api_secret: await generateSHA256Hash(
        import.meta.env.VITE_API_KEY + requestCode + import.meta.env.VITE_API_SECRET_KEY,
      ),
    }),
  });
}
