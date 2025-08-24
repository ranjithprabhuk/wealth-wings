import { fyersModel } from 'fyers-web-sdk-v3';
import type { AuthCodeResponse, GenerateAccessTokenParams } from 'fyers-web-sdk-v3';
import { getLocalStorageValue } from '../../utils/localStorage/getLocalStorageValue';
import { setLocalStorageValue } from '../../utils/localStorage/setLocalStorageValue';
import type {
  HistoricalDataParams,
  HistoricalDataResponse,
  QuoteParams,
  QuoteResponse,
  ProfileResponse,
  FundsResponse,
  HoldingsResponse,
  PositionsResponse,
  OrderBookResponse,
  TradeBookResponse,
  PlaceOrderParams,
  PlaceOrderResponse,
  ModifyOrderParams,
  ModifyOrderResponse,
  CancelOrderParams,
  CancelOrderResponse,
} from '../../types/fyers';

export interface FyersConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  apiBase?: string;
}

/**
 * Environment configuration helper
 */
export const getFyersConfig = (): FyersConfig => {
  const clientId = import.meta.env.VITE_FYERS_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_FYERS_CLIENT_SECRET;
  const redirectUri = import.meta.env.VITE_FYERS_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error('Missing required Fyers environment variables. Please check your .env file.');
  }

  return {
    clientId,
    clientSecret,
    redirectUri,
  };
};

/**
 * Validate environment configuration
 */
export const validateEnvironment = (): void => {
  try {
    getFyersConfig();
    console.log('✅ Fyers environment configuration is valid');
  } catch (error) {
    console.error('❌ Fyers environment configuration error:', error);
    throw error;
  }
};

export class FyersService {
  /**
   * Generate authentication URL for user login
   */
  static generateAuthUrl(): string {
    const config = getFyersConfig();
    const fyers = new fyersModel();
    fyers.setAppId(config.clientId);
    fyers.setRedirectUrl(config.redirectUri);

    const authUrl = fyers.generateAuthCode();
    return authUrl;
  }

  /**
   * Create and configure a Fyers instance with access token
   */
  private static createFyersInstance(): fyersModel {
    const config = getFyersConfig();
    const fyers = new fyersModel();
    fyers.setAppId(config.clientId);

    const accessToken = getLocalStorageValue('fyers-access-token');

    if (!accessToken) {
      throw new Error('No access token found. Please authenticate first.');
    }

    fyers.setAccessToken(accessToken);
    return fyers;
  }

  /**
   * Generate access token from auth code
   */
  static async generateAccessToken(authCode: string): Promise<string> {
    try {
      const config = getFyersConfig();
      const fyers = new fyersModel();
      fyers.setAppId(config.clientId);
      fyers.setRedirectUrl(config.redirectUri);

      const params: GenerateAccessTokenParams = {
        client_id: config.clientId,
        secret_key: config.clientSecret,
        auth_code: authCode,
      };

      const response: AuthCodeResponse = await fyers.generate_access_token(params);

      if (response.s === 'ok' && response.access_token) {
        // Store the access token in local storage
        setLocalStorageValue('fyers-access-token', response.access_token);
        setLocalStorageValue('fyers-auth-timestamp', new Date().toISOString());

        return response.access_token;
      }

      throw new Error(response.message || 'Failed to generate access token');
    } catch (error) {
      console.error('Error generating access token:', error);
      throw error;
    }
  }

  /**
   * Get historical data for a symbol
   */
  static async getHistoricalData(params: HistoricalDataParams): Promise<HistoricalDataResponse> {
    try {
      const fyers = this.createFyersInstance();
      const response: HistoricalDataResponse = await fyers.getHistory(params);

      if (response.s === 'ok') {
        return response;
      }

      throw new Error(`Failed to fetch historical data: ${response.code}`);
    } catch (error) {
      console.error('Error fetching historical data:', error);
      throw error;
    }
  }

  /**
   * Get real-time quotes for symbols
   */
  static async getQuotes(params: QuoteParams): Promise<QuoteResponse> {
    try {
      const fyers = this.createFyersInstance();
      const response: QuoteResponse = await fyers.getQuotes(params);

      if (response.s === 'ok') {
        return response;
      }

      throw new Error(`Failed to fetch quotes: ${response.code}`);
    } catch (error) {
      console.error('Error fetching quotes:', error);
      throw error;
    }
  }

  /**
   * Get user profile information
   */
  static async getProfile(): Promise<ProfileResponse> {
    try {
      const fyers = this.createFyersInstance();
      const response: ProfileResponse = await fyers.get_profile();

      if (response.s === 'ok') {
        return response;
      }

      throw new Error(`Failed to fetch profile: ${response.code}`);
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  }

  /**
   * Get user's funds information
   */
  static async getFunds(): Promise<FundsResponse> {
    try {
      const fyers = this.createFyersInstance();
      const response: FundsResponse = await fyers.get_funds();

      if (response.s === 'ok') {
        return response;
      }

      throw new Error(`Failed to fetch funds: ${response.code}`);
    } catch (error) {
      console.error('Error fetching funds:', error);
      throw error;
    }
  }

  /**
   * Get user's holdings
   */
  static async getHoldings(): Promise<HoldingsResponse> {
    try {
      const fyers = this.createFyersInstance();
      const response: HoldingsResponse = await fyers.get_holdings();

      if (response.s === 'ok') {
        return response;
      }

      throw new Error(`Failed to fetch holdings: ${response.code}`);
    } catch (error) {
      console.error('Error fetching holdings:', error);
      throw error;
    }
  }

  /**
   * Get user's positions
   */
  static async getPositions(): Promise<PositionsResponse> {
    try {
      const fyers = this.createFyersInstance();
      const response: PositionsResponse = await fyers.get_positions();

      if (response.s === 'ok') {
        return response;
      }

      throw new Error(`Failed to fetch positions: ${response.code}`);
    } catch (error) {
      console.error('Error fetching positions:', error);
      throw error;
    }
  }

  /**
   * Get order book
   */
  static async getOrderBook(): Promise<OrderBookResponse> {
    try {
      const fyers = this.createFyersInstance();
      const response: OrderBookResponse = await fyers.orderbook();

      if (response.s === 'ok') {
        return response;
      }

      throw new Error(`Failed to fetch order book: ${response.code}`);
    } catch (error) {
      console.error('Error fetching order book:', error);
      throw error;
    }
  }

  /**
   * Get trade book
   */
  static async getTradeBook(): Promise<TradeBookResponse> {
    try {
      const fyers = this.createFyersInstance();
      const response: TradeBookResponse = await fyers.tradebook();

      if (response.s === 'ok') {
        return response;
      }

      throw new Error(`Failed to fetch trade book: ${response.code}`);
    } catch (error) {
      console.error('Error fetching trade book:', error);
      throw error;
    }
  }

  /**
   * Place a new order
   */
  static async placeOrder(params: PlaceOrderParams): Promise<PlaceOrderResponse> {
    try {
      const fyers = this.createFyersInstance();
      const response: PlaceOrderResponse = await fyers.place_order(params);

      if (response.s === 'ok') {
        return response;
      }

      throw new Error(`Failed to place order: ${response.message || response.code}`);
    } catch (error) {
      console.error('Error placing order:', error);
      throw error;
    }
  }

  /**
   * Modify an existing order
   */
  static async modifyOrder(params: ModifyOrderParams): Promise<ModifyOrderResponse> {
    try {
      const fyers = this.createFyersInstance();
      const response: ModifyOrderResponse = await fyers.modify_order(params);

      if (response.s === 'ok') {
        return response;
      }

      throw new Error(`Failed to modify order: ${response.message || response.code}`);
    } catch (error) {
      console.error('Error modifying order:', error);
      throw error;
    }
  }

  /**
   * Cancel an existing order
   */
  static async cancelOrder(params: CancelOrderParams): Promise<CancelOrderResponse> {
    try {
      const fyers = this.createFyersInstance();
      const response: CancelOrderResponse = await fyers.cancel_order(params);

      if (response.s === 'ok') {
        return response;
      }

      throw new Error(`Failed to cancel order: ${response.message || response.code}`);
    } catch (error) {
      console.error('Error canceling order:', error);
      throw error;
    }
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    const accessToken = getLocalStorageValue('fyers-access-token');
    return !!accessToken;
  }

  /**
   * Get stored access token
   */
  static getAccessToken(): string | null {
    return getLocalStorageValue('fyers-access-token');
  }
}
