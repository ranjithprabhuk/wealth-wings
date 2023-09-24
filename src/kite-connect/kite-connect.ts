import { appConfig } from '../config';
import KiteApiConnect from './connect';
import { Connect } from './connect.d';

class ZerodhaConnect {
  kiteConnect: Connect;
  constructor() {
    const apiKey = appConfig.apiKey;
    const accessToken = appConfig.accessToken;

    if (!apiKey) {
      throw 'API_KEY must be defined in the .env file';
    }

    if (!accessToken) {
      throw 'ACCESS_TOKEN must be defined in the .env file';
    }

    this.kiteConnect = new KiteApiConnect(apiKey);
    this.kiteConnect.setAccessToken(accessToken);
  }
}

export const KiteConnect = new ZerodhaConnect().kiteConnect;
