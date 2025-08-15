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

// Services-only entry point - for users who want to import specific services
// without pulling in client classes. Ideal for custom client implementations
// or when using dependency injection frameworks.

// Export all service classes and interfaces
export { ActivitiesService, IActivitiesService } from './activities';
export { AddressBooksService, IAddressBooksService } from './addressBooks';
export { AllocationService, IAllocationService } from './allocations';
export { AssetsService, IAssetsService } from './assets';
export { BalancesService, IBalancesService } from './balances';
export { CommissionService, ICommissionService } from './commission';
export { FinancingService, IFinancingService } from './financing';
export { FuturesService, IFuturesService } from './futures';
export { InvoicesService, IInvoicesService } from './invoices';
export { OnchainAddressBookService } from './onchainAddressBook';
export { OrdersService, IOrdersService } from './orders';
export {
  PaymentMethodsService,
  IPaymentMethodsService,
} from './paymentMethods';
export { PortfoliosService, IPortfoliosService } from './portfolios';
export { PositionsService, IPositionsService } from './positions';
export { ProductsService, IProductsService } from './products';
export { StakingService, IStakingService } from './staking';
export { TransactionsService, ITransactionsService } from './transactions';
export { UsersService, IUsersService } from './users';
export { WalletsService, IWalletsService } from './wallets';

// Export model types and enums
export type * from './model/';
export * from './model/enums/';

// Export only the types that services actually need
export type {
  IPrimeApiClient, // Interface for client dependency injection
  CoinbaseCallOptions, // Optional parameters for service methods
  Method, // HTTP method enum for requests
} from './clients';
