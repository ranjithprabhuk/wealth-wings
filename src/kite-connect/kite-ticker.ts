import { appConfig } from '../config';
import KiteWsTicker from './ticker';
import { Ticker } from './ticker.d';

class ZerodhaTicker {
  private ticker: Ticker;

  constructor() {
    const apiKey = appConfig.apiKey;
    const accessToken = appConfig.accessToken;

    if (!apiKey) {
      throw 'API_KEY must be defined in the .env file';
    }

    if (!accessToken) {
      throw 'ACCESS_TOKEN must be defined in the .env file';
    }

    this.ticker = new KiteWsTicker({
      api_key: apiKey,
      access_token: accessToken,
    });

    this.ticker.connect();
    this.ticker.autoReconnect(true, 10, 5); // 10 retries with interval of 5 seconds
    this.ticker.on('connect', () => {
      console.log('Zerodha Ticker connection Successfull');
    });

    this.ticker.on('noreconnect', () => {
      console.error('Zerodha ticker failed to reconnect after maxim re-attemtps');
    });

    this.ticker.on('reconnect', function (reconnectInterval, reconnections) {
      console.warn(`Zerodha ticker: Reconnecting: attempts ${reconnections} and interval ${reconnectInterval}`);
    });
  }

  getTickerInstance() {
    return this.ticker;
  }

  subscribe(tokens: number[]) {
    this.ticker.subscribe(tokens);
    this.ticker.setMode(this.ticker.modeFull, tokens);
  }

  unsubscribe(tokens: number[]) {
    this.ticker.unsubscribe(tokens);
  }

  disconnect() {
    console.info(`Zerodha ticker disconnect request receievd..`);
    if (this.ticker) {
      this.ticker.disconnect();
    }
  }
}

export const KiteTicker = new ZerodhaTicker();
