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
import type {
  LazyServiceGetters,
  CoinbasePrimeClientConfig,
} from './clientWithServicesTypes';

// Import service interfaces for proper typing
import type { IActivitiesService } from './activities';
import type { IAddressBooksService } from './addressBooks';
import type { IAllocationService } from './allocations';
import type { IAssetsService } from './assets';
import type { IBalancesService } from './balances';
import type { ICommissionService } from './commission';
import type { IFinancingService } from './financing';
import type { IFuturesService } from './futures';
import type { IInvoicesService } from './invoices';
import type { OnchainAddressBookService } from './onchainAddressBook';
import type { IOrdersService } from './orders';
import type { IPaymentMethodsService } from './paymentMethods';
import type { IPortfoliosService } from './portfolios';
import type { IPositionsService } from './positions';
import type { IProductsService } from './products';
import type { IStakingService } from './staking';
import type { ITransactionsService } from './transactions';
import type { IUsersService } from './users';
import type { IWalletsService } from './wallets';

/**
 * Enhanced Coinbase Prime Client with lazy-loaded service getters.
 * Services are only instantiated when first accessed, improving tree-shaking
 * and reducing initial bundle size.
 */
export class CoinbasePrimeClientWithServices
  extends CoinbaseClient
  implements LazyServiceGetters
{
  // Private cached service instances
  private _activitiesService?: IActivitiesService;
  private _addressBooksService?: IAddressBooksService;
  private _allocationService?: IAllocationService;
  private _assetsService?: IAssetsService;
  private _balancesService?: IBalancesService;
  private _commissionService?: ICommissionService;
  private _financingService?: IFinancingService;
  private _futuresService?: IFuturesService;
  private _invoicesService?: IInvoicesService;
  private _onchainAddressBookService?: OnchainAddressBookService;
  private _ordersService?: IOrdersService;
  private _paymentMethodsService?: IPaymentMethodsService;
  private _portfoliosService?: IPortfoliosService;
  private _positionsService?: IPositionsService;
  private _productsService?: IProductsService;
  private _stakingService?: IStakingService;
  private _transactionsService?: ITransactionsService;
  private _usersService?: IUsersService;
  private _walletsService?: IWalletsService;

  constructor(
    credentials?: CoinbasePrimeCredentials,
    apiBasePath?: string,
    options?: CoinbasePrimeClientConfig
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
    baseUrl?: string,
    options?: CoinbasePrimeClientConfig
  ): CoinbasePrimeClientWithServices {
    const credentials = createCredentialsFromEnv();
    return new CoinbasePrimeClientWithServices(credentials, baseUrl, options);
  }

  /**
   * Lazy getter for ActivitiesService
   * @example
   * ```typescript
   * const activities = await client.activities.listPortfolioActivities({ portfolioId });
   * ```
   */
  get activities(): IActivitiesService {
    if (!this._activitiesService) {
      const { ActivitiesService } = require('./activities');
      this._activitiesService = new ActivitiesService(this);
    }
    return this._activitiesService!;
  }

  /**
   * Lazy getter for AddressBooksService
   * @example
   * ```typescript
   * const addressBooks = await client.addressBooks.listAddressBooks({ portfolioId });
   * ```
   */
  get addressBooks(): IAddressBooksService {
    if (!this._addressBooksService) {
      const { AddressBooksService } = require('./addressBooks');
      this._addressBooksService = new AddressBooksService(this);
    }
    return this._addressBooksService!;
  }

  /**
   * Lazy getter for AllocationService
   * @example
   * ```typescript
   * const allocation = await client.allocations.createAllocation({ portfolioId, ... });
   * ```
   */
  get allocations(): IAllocationService {
    if (!this._allocationService) {
      const { AllocationService } = require('./allocations');
      this._allocationService = new AllocationService(this);
    }
    return this._allocationService!;
  }

  /**
   * Lazy getter for AssetsService
   * @example
   * ```typescript
   * const assets = await client.assets.listAssets({ entityId });
   * ```
   */
  get assets(): IAssetsService {
    if (!this._assetsService) {
      const { AssetsService } = require('./assets');
      this._assetsService = new AssetsService(this);
    }
    return this._assetsService!;
  }

  /**
   * Lazy getter for BalancesService
   * @example
   * ```typescript
   * const balance = await client.balances.getWalletBalance({ portfolioId, walletId });
   * ```
   */
  get balances(): IBalancesService {
    if (!this._balancesService) {
      const { BalancesService } = require('./balances');
      this._balancesService = new BalancesService(this);
    }
    return this._balancesService!;
  }

  /**
   * Lazy getter for CommissionService
   * @example
   * ```typescript
   * const commission = await client.commission.getPortfolioCommission({ portfolioId });
   * ```
   */
  get commission(): ICommissionService {
    if (!this._commissionService) {
      const { CommissionService } = require('./commission');
      this._commissionService = new CommissionService(this);
    }
    return this._commissionService!;
  }

  /**
   * Lazy getter for FinancingService
   * @example
   * ```typescript
   * const buyingPower = await client.financing.getPortfolioBuyingPower({ portfolioId });
   * ```
   */
  get financing(): IFinancingService {
    if (!this._financingService) {
      const { FinancingService } = require('./financing');
      this._financingService = new FinancingService(this);
    }
    return this._financingService!;
  }

  /**
   * Lazy getter for FuturesService
   * @example
   * ```typescript
   * const positions = await client.futures.getEntityFuturesPositions({ entityId });
   * ```
   */
  get futures(): IFuturesService {
    if (!this._futuresService) {
      const { FuturesService } = require('./futures');
      this._futuresService = new FuturesService(this);
    }
    return this._futuresService!;
  }

  /**
   * Lazy getter for InvoicesService
   * @example
   * ```typescript
   * const invoices = await client.invoices.listInvoices({ entityId });
   * ```
   */
  get invoices(): IInvoicesService {
    if (!this._invoicesService) {
      const { InvoicesService } = require('./invoices');
      this._invoicesService = new InvoicesService(this);
    }
    return this._invoicesService!;
  }

  /**
   * Lazy getter for OnchainAddressBookService
   * @example
   * ```typescript
   * const addressBook = await client.onchainAddressBook.listOnchainAddressBook({ portfolioId });
   * ```
   */
  get onchainAddressBook(): OnchainAddressBookService {
    if (!this._onchainAddressBookService) {
      const { OnchainAddressBookService } = require('./onchainAddressBook');
      this._onchainAddressBookService = new OnchainAddressBookService(this);
    }
    return this._onchainAddressBookService!;
  }

  /**
   * Lazy getter for OrdersService
   * @example
   * ```typescript
   * const order = await client.orders.createOrder({
   *   portfolioId: "123",
   *   side: "BUY",
   *   productId: "BTC-USD",
   *   type: "MARKET",
   *   baseQuantity: "0.001"
   * });
   * ```
   */
  get orders(): IOrdersService {
    if (!this._ordersService) {
      const { OrdersService } = require('./orders');
      this._ordersService = new OrdersService(this);
    }
    return this._ordersService!;
  }

  /**
   * Lazy getter for PaymentMethodsService
   * @example
   * ```typescript
   * const paymentMethods = await client.paymentMethods.listEntityPaymentMethods({ entityId });
   * ```
   */
  get paymentMethods(): IPaymentMethodsService {
    if (!this._paymentMethodsService) {
      const { PaymentMethodsService } = require('./paymentMethods');
      this._paymentMethodsService = new PaymentMethodsService(this);
    }
    return this._paymentMethodsService!;
  }

  /**
   * Lazy getter for PortfoliosService
   * @example
   * ```typescript
   * const portfolios = await client.portfolios.listPortfolios();
   * ```
   */
  get portfolios(): IPortfoliosService {
    if (!this._portfoliosService) {
      const { PortfoliosService } = require('./portfolios');
      this._portfoliosService = new PortfoliosService(this);
    }
    return this._portfoliosService!;
  }

  /**
   * Lazy getter for PositionsService
   * @example
   * ```typescript
   * const positions = await client.positions.listAggregateEntityPositions({ entityId });
   * ```
   */
  get positions(): IPositionsService {
    if (!this._positionsService) {
      const { PositionsService } = require('./positions');
      this._positionsService = new PositionsService(this);
    }
    return this._positionsService!;
  }

  /**
   * Lazy getter for ProductsService
   * @example
   * ```typescript
   * const products = await client.products.listProducts({ portfolioId });
   * ```
   */
  get products(): IProductsService {
    if (!this._productsService) {
      const { ProductsService } = require('./products');
      this._productsService = new ProductsService(this);
    }
    return this._productsService!;
  }

  /**
   * Lazy getter for StakingService
   * @example
   * ```typescript
   * const stake = await client.staking.createStake({ walletId, assetId, amount });
   * ```
   */
  get staking(): IStakingService {
    if (!this._stakingService) {
      const { StakingService } = require('./staking');
      this._stakingService = new StakingService(this);
    }
    return this._stakingService!;
  }

  /**
   * Lazy getter for TransactionsService
   * @example
   * ```typescript
   * const transaction = await client.transactions.getTransaction({ portfolioId, transactionId });
   * ```
   */
  get transactions(): ITransactionsService {
    if (!this._transactionsService) {
      const { TransactionsService } = require('./transactions');
      this._transactionsService = new TransactionsService(this);
    }
    return this._transactionsService!;
  }

  /**
   * Lazy getter for UsersService
   * @example
   * ```typescript
   * const users = await client.users.listUsers({ entityId });
   * ```
   */
  get users(): IUsersService {
    if (!this._usersService) {
      const { UsersService } = require('./users');
      this._usersService = new UsersService(this);
    }
    return this._usersService!;
  }

  /**
   * Lazy getter for WalletsService
   * @example
   * ```typescript
   * const wallets = await client.wallets.listWallets({ portfolioId });
   * ```
   */
  get wallets(): IWalletsService {
    if (!this._walletsService) {
      const { WalletsService } = require('./wallets');
      this._walletsService = new WalletsService(this);
    }
    return this._walletsService!;
  }
}
