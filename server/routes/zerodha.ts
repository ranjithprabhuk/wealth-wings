import express from 'express';
import { fetchWrapper } from '../../src/services/fetchWrapper';

export const zerodhaRouter = express.Router();

function objectToFormData(obj) {
  const urlencoded = new URLSearchParams();
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      urlencoded.append(key, obj[key]);
    }
  }

  return urlencoded;
}

export function getStringBetween(str, startStr, endStr) {
  const pos = str.indexOf(startStr) + startStr.length;
  return str.substring(pos, str.indexOf(endStr, pos));
}

function getHeaders(authToken, userId, isFormData = false) {
  function getStringBetween(str, start, end) {
    const startIndex = str.indexOf(start) + start.length;
    const endIndex = str.indexOf(end, startIndex);
    return str.substring(startIndex, endIndex);
  }

  const headers = {
    accept: 'application/json, text/plain, */*',

    'accept-language': 'en-US,en;q=0.9',
    'content-type': isFormData ? 'application/x-www-form-urlencoded' : 'text/plain; charset=utf-8',
    priority: 'u=1, i',
    'sec-ch-ua': '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'x-csrftoken': getStringBetween(authToken[2], 'public_token=', ';'),
    'x-kite-app-uuid': '6962797a-3a0a-4dcc-bbd6-15e5f8f1bb5f',
    'x-kite-userid': userId,
    'x-kite-version': '3.0.0',
    cookie: authToken.join('; '),
    Referer: 'https://kite.zerodha.com/dashboard',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  };

  if (!isFormData) {
    headers['authorization'] = `enctoken ${getStringBetween(authToken[3], 'enctoken=', ';')}`;
  }

  return headers;
}

zerodhaRouter.post('/', async (req, res) => {
  const { url, method, authToken, userId, payload, isFormData } = req.body;
  const headers = getHeaders(authToken, userId, isFormData);

  const response = await fetch(url, {
    headers,
    body: isFormData ? objectToFormData(payload) : payload || null,
    method,
  }).then(res => res.json());

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
