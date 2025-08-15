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

import type { IActivitiesService } from '../activities';
import type { IAddressBooksService } from '../addressBooks';
import type { IAllocationService } from '../allocations';
import type { IAssetsService } from '../assets';
import type { IBalancesService } from '../balances';
import type { ICommissionService } from '../commission';
import type { IFinancingService } from '../financing';
import type { IFuturesService } from '../futures';
import type { IInvoicesService } from '../invoices';
import type { OnchainAddressBookService } from '../onchainAddressBook';
import type { IOrdersService } from '../orders';
import type { IPaymentMethodsService } from '../paymentMethods';
import type { IPortfoliosService } from '../portfolios';
import type { IPositionsService } from '../positions';
import type { IProductsService } from '../products';
import type { IStakingService } from '../staking';
import type { ITransactionsService } from '../transactions';
import type { IUsersService } from '../users';
import type { IWalletsService } from '../wallets';

/**
 * Interface defining all lazy service getters for the modular client
 */
export interface LazyServiceGetters {
  /**
   * Activities service for managing portfolio and entity activities
   */
  readonly activities: IActivitiesService;

  /**
   * Address books service for managing portfolio address books
   */
  readonly addressBooks: IAddressBooksService;

  /**
   * Allocations service for managing portfolio allocations
   */
  readonly allocations: IAllocationService;

  /**
   * Assets service for managing entity assets
   */
  readonly assets: IAssetsService;

  /**
   * Balances service for managing wallet and portfolio balances
   */
  readonly balances: IBalancesService;

  /**
   * Commission service for retrieving commission information
   */
  readonly commission: ICommissionService;

  /**
   * Financing service for margin, buying power, and FCM operations
   */
  readonly financing: IFinancingService;

  /**
   * Futures service for managing futures positions and sweeps
   */
  readonly futures: IFuturesService;

  /**
   * Invoices service for managing entity invoices
   */
  readonly invoices: IInvoicesService;

  /**
   * Onchain address book service for managing blockchain addresses
   */
  readonly onchainAddressBook: OnchainAddressBookService;

  /**
   * Orders service for creating and managing trading orders
   */
  readonly orders: IOrdersService;

  /**
   * Payment methods service for managing entity payment methods
   */
  readonly paymentMethods: IPaymentMethodsService;

  /**
   * Portfolios service for managing portfolio information
   */
  readonly portfolios: IPortfoliosService;

  /**
   * Positions service for managing trading positions
   */
  readonly positions: IPositionsService;

  /**
   * Products service for retrieving available trading products
   */
  readonly products: IProductsService;

  /**
   * Staking service for managing staking operations
   */
  readonly staking: IStakingService;

  /**
   * Transactions service for managing transaction history
   */
  readonly transactions: ITransactionsService;

  /**
   * Users service for managing entity and portfolio users
   */
  readonly users: IUsersService;

  /**
   * Wallets service for managing portfolio wallets
   */
  readonly wallets: IWalletsService;
}
