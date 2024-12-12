import { CoinbaseClient } from '../../core-ts/dist';

import { API_BASE_PATH, USER_AGENT } from './constants';
import { CoinbasePrimeCredentials } from './credentials';

export class CoinbasePrimeClient extends CoinbaseClient {
  constructor(apiKey?: string, apiSecret?: string, signingKey?: string) {
    if (!apiKey || !apiSecret || !signingKey) {
      super(API_BASE_PATH, undefined, USER_AGENT);
    } else {
      super(
        API_BASE_PATH,
        new CoinbasePrimeCredentials(apiKey, apiSecret, signingKey),
        USER_AGENT
      );
    }
  }
}
