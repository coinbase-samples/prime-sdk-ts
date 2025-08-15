/**
 * Copyright 2025-present Coinbase Global, Inc.
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
import type {
  CoinbaseHttpClientRetryOptions,
  CoinbaseHttpRequestOptions,
  CoinbaseResponse,
} from '@coinbase-sample/core-ts';

/**
 * Configuration options for Prime SDK clients.
 *
 * This unified interface is used by:
 * - CoinbasePrimeClient (traditional client)
 * - CoinbasePrimeClientWithServices (enhanced client)
 *
 * Note: We use Omit<> to cleanly override pagination properties that may
 * have different type constraints between core-ts and Prime SDK.
 */

export interface CoinbasePrimeClientConfig
  extends Omit<
    CoinbaseHttpClientRetryOptions,
    'defaultLimit' | 'maxPages' | 'maxItems'
  > {
  // Prime-specific pagination options (may override core-ts defaults)
  defaultLimit?: number;
  maxPages?: number;
  maxItems?: number;
}

export interface IPrimeApiClient {
  request(options: CoinbaseHttpRequestOptions): Promise<CoinbaseResponse>;
  getDefaultPaginationLimit(): number;
  getMaxPages(): number;
  getMaxItems(): number;
}

/**
 * Factory function type for creating service instances
 */
export type ServiceFactory<T> = () => T;

/**
 * Type helper for lazy service initialization
 */
export type LazyService<T> = {
  instance?: T;
  factory: ServiceFactory<T>;
};
