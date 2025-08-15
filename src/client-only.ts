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

// Client-only entry point - for ultra-minimal bundles when using services separately
// Perfect for services-only approach where you want the smallest possible client bundle

export {
  CoinbasePrimeClient,
  CoinbasePrimeClientWithServices,
  CoinbasePrimeClientConfig,
  IPrimeApiClient,
  CoinbaseClient,
  CoinbaseHttpClientRetryOptions,
  CoinbaseCallOptions,
  Method,
  CoinbaseClientException,
  CoinbaseError,
  CoinbaseResponse,
  TransformRequestFn,
  TransformResponseFn,
} from './clients';

export { CoinbasePrimeCredentials } from './credentials';
export { createCredentialsFromEnv } from './shared/envUtils';
