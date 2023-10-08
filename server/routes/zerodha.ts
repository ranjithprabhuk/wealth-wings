import express from 'express';
import { fetchWrapper } from '../../src/services/fetchWrapper';

export const zerodhaRouter = express.Router();

zerodhaRouter.post('/', async (req, res) => {
  const { url, method, authToken, userId } = req.body;

  const response = await fetchWrapper(url, {
    method,
    headers: {
      accept: 'application/json, text/plain, */*',
      'accept-language': 'en-US,en;q=0.9',
      authorization: `enctoken ${authToken}`,
      'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'x-kite-app-uuid': '67d9e614-146e-4d45-a1f8-1dfc3c4a4920',
      'x-kite-userid': userId,
      'x-kite-version': '3.0.0',
    },
    body: null,
  });

  return res.json({ ...response });
});

zerodhaRouter.post('/login', async (req, res) => {
  const { userId, password, totp } = req.body;
  const loginResponse = await fetchWrapper('https://kite.zerodha.com/api/login', {
    headers: {
      accept: 'application/json, text/plain, */*',
      'accept-language': 'en-US,en;q=0.9',
      'content-type': 'application/x-www-form-urlencoded',
      'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'x-csrftoken': 'Yhs8c75Zgs5nBsK49RZIVattLlw6jr3M',
      'x-kite-app-uuid': '67d9e614-146e-4d45-a1f8-1dfc3c4a4920',
      'x-kite-userid': userId,
      'x-kite-version': '3.0.0',
    },
    referrer: 'https://kite.zerodha.com/',
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: `user_id=${userId}&password=${encodeURIComponent(password)}`,
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
  });

  const otpResponse = await fetch('https://kite.zerodha.com/api/twofa', {
    headers: {
      accept: 'application/json, text/plain, */*',
      'accept-language': 'en-US,en;q=0.9',
      'content-type': 'application/x-www-form-urlencoded',
      'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'x-csrftoken': 'Yhs8c75Zgs5nBsK49RZIVattLlw6jr3M',
      'x-kite-app-uuid': '67d9e614-146e-4d45-a1f8-1dfc3c4a4920',
      'x-kite-userid': userId,
      'x-kite-version': '3.0.0',
    },
    referrer: 'https://kite.zerodha.com/',
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: `user_id=${userId}&request_id=${loginResponse.data.request_id}&twofa_value=${totp}&twofa_type=app_code&skip_session=`,
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
  })
    .then(response => {
      return { ...response.json(), headers: response.headers.getSetCookie() };
    })
    .then(data => {
      return data;
    })
    .catch(err => {
      return err;
    });

  return res.json({ ...otpResponse });
});
