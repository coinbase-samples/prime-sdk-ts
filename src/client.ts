/**
 * Copyright 2024-present Coinbase Global, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {
  CoinbaseClient,
  CoinbaseHttpClientRetryOptions,
} from '@coinbase-sample/core-ts';

import {
  API_BASE_PATH,
  DEFAULT_PAGINATION_LIMIT,
  DEFAULT_MAX_ITEMS,
  DEFAULT_MAX_PAGES,
  USER_AGENT,
} from './constants';
import { CoinbasePrimeCredentials } from './credentials';
import { toCamelCase } from './shared/toCamelCase';
import { createCredentialsFromEnv } from './shared/envUtils';

export class CoinbasePrimeClient extends CoinbaseClient {
  constructor(
    credentials?: CoinbasePrimeCredentials,
    apiBasePath?: string,
    options?: CoinbaseHttpClientRetryOptions
  ) {
    const defaultClientOptions = {
      defaultLimit: DEFAULT_PAGINATION_LIMIT,
      maxPages: DEFAULT_MAX_PAGES,
      maxItems: DEFAULT_MAX_ITEMS,
      ...options,
    };
    let basePath = API_BASE_PATH;
    if (apiBasePath && apiBasePath.length > 0) {
      basePath = apiBasePath;
    }
    super(basePath, credentials, USER_AGENT, defaultClientOptions);

    // transform the response data to camelCase
    this.addTransformResponse((response) => {
      return {
        ...response,
        data: toCamelCase(response.data),
      };
    });
  }

  /**
   * Create a client from environment variables
   * Requires PRIME_CREDENTIALS environment variable with JSON containing:
   * { "AccessKey": "...", "SecretKey": "...", "Passphrase": "..." }
   */
  static fromEnv(
    apiBaseUrl?: string,
    options?: CoinbaseHttpClientRetryOptions
  ): CoinbasePrimeClient {
    const credentials = createCredentialsFromEnv();
    return new CoinbasePrimeClient(credentials, apiBaseUrl, options);
  }
}
