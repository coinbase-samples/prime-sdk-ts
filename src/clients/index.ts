export { CoinbasePrimeClient } from './client';
export { CoinbasePrimeClientWithServices } from './clientWithServices';
export {
  CoinbasePrimeClientConfig,
  IPrimeApiClient,
  LazyService,
} from './types';

// Re-export core-ts objects for central control of service's usage of core-ts
export {
  CoinbaseClient,
  CoinbaseHttpClientRetryOptions,
  CoinbaseCallOptions,
  Method,
  CoinbaseClientException,
  CoinbaseError,
  CoinbaseResponse,
  TransformRequestFn,
  TransformResponseFn,
} from '@coinbase-sample/core-ts';
