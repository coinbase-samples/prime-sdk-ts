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

// Modular client entry point - for users who want optimized bundle sizes
// with lazy-loaded services and modular type imports

export {
  IPrimeApiClient,
  CoinbasePrimeClientWithServices,
  CoinbasePrimeClientConfig,
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

// Export all model types and enums
export type * from './model/';
export * from './model/enums/';

// Export service interfaces (for TypeScript support with lazy getters)
export type { IActivitiesService } from './activities';
export type { IAddressBooksService } from './addressBooks';
export type { IAllocationService } from './allocations';
export type { IAssetsService } from './assets';
export type { IBalancesService } from './balances';
export type { ICommissionService } from './commission';
export type { IFinancingService } from './financing';
export type { IFuturesService } from './futures';
export type { IInvoicesService } from './invoices';
export type { OnchainAddressBookService } from './onchainAddressBook';
export type { IOrdersService } from './orders';
export type { IPaymentMethodsService } from './paymentMethods';
export type { IPortfoliosService } from './portfolios';
export type { IPositionsService } from './positions';
export type { IProductsService } from './products';
export type { IStakingService } from './staking';
export type { ITransactionsService } from './transactions';
export type { IUsersService } from './users';
export type { IWalletsService } from './wallets';

// NOTE: Service-specific request/response types are NOT exported here.
// For optimal tree-shaking, import them from their dedicated modules:
//
// import type { CreateOrderRequest } from '@coinbase-sample/prime-sdk-ts/orders';
// import type { ListWalletsRequest } from '@coinbase-sample/prime-sdk-ts/wallets';
// import type { GetActivityRequest } from '@coinbase-sample/prime-sdk-ts/activities';
//
// Or import all service types at once:
// import type * from '@coinbase-sample/prime-sdk-ts/types';
//
// This design ensures the modular client bundle stays minimal while
// still providing access to all service interfaces for TypeScript support.
