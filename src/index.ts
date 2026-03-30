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

// Re-export commonly used core-ts objects for convenience
// This allows users to import everything from a single package
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
  CoinbasePrimeClientWithServices,
  CoinbasePrimeClientConfig,
  CoinbasePrimeClient,
  IPrimeApiClient,
} from './clients';
export { CoinbasePrimeCredentials } from './credentials';
export { createCredentialsFromEnv } from './shared/envUtils';
export { CoinbasePrimeClientException, CoinbasePrimeException } from './errors';
export { validate, isValidUUID } from './shared/validation';
export type { ValidationError, PropertyValidator } from './shared/validation';

export {
  AdvancedTransfersService,
  IAdvancedTransfersService,
} from './advancedTransfers';
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

export type * from './model/';
export * from './model/enums/';

// preferring named exports of types
export type {
  CancelAdvancedTransferRequest,
  CancelAdvancedTransferResponse,
  CreateAdvancedTransferRequest,
  CreateAdvancedTransferResponse,
  ListAdvancedTransferTransactionsRequest,
  ListAdvancedTransferTransactionsResponse,
  ListAdvancedTransfersRequest,
  ListAdvancedTransfersResponse,
} from './advancedTransfers/types';
export type {
  GetActivityRequest,
  GetActivityResponse,
  GetPortfolioActivitiesRequest,
  GetPortfolioActivityResponse,
  ListEntityActivitiesRequest,
  ListEntityActivitiesResponse,
  ListPortfolioActivitiesRequest,
  ListPortfolioActivitiesResponse,
} from './activities/types';
export type {
  CreateAddressBookRequest,
  CreateAddressBookResponse,
  ListAddressBooksRequest,
  ListAddressBooksResponse,
} from './addressBooks/types';
export type {
  CreateAllocationRequest,
  CreateAllocationResponse,
  CreateNetAllocationRequest,
  CreateNetAllocationResponse,
  ListNetAllocationsRequest,
  ListNetAllocationsResponse,
  ListPortfolioAllocationsRequest,
  ListPortfolioAllocationsResponse,
  GetAllocationRequest,
  GetAllocationResponse,
} from './allocations/types';
export type { ListAssetsRequest, ListAssetsResponse } from './assets/types';
export type {
  GetWalletBalanceRequest,
  GetWalletBalanceResponse,
  ListOnchainWalletBalancesRequest,
  ListOnchainWalletBalancesResponse,
  ListPortfolioBalancesRequest,
  ListPortfolioBalancesResponse,
  ListEntityBalancesRequest,
  ListEntityBalancesResponse,
} from './balances/types';
export type {
  GetPortfolioCommissionRequest,
  GetPortfolioCommissionResponse,
} from './commission/types';
export type {
  ListExistingLocatesRequest,
  ListExistingLocatesResponse,
  ListInterestAccrualsRequest,
  ListInterestAccrualsResponse,
  ListPortfolioInterestAccrualsRequest,
  ListPortfolioInterestAccrualsResponse,
  ListMarginCallSummariesRequest,
  ListMarginCallSummariesResponse,
  ListMarginConversionsRequest,
  ListMarginConversionsResponse,
  GetEntityLocateAvailabilitiesRequest,
  GetEntityLocateAvailabilitiesResponse,
  GetMarginInformationRequest,
  GetMarginInformationResponse,
  GetPortfolioBuyingPowerRequest,
  GetPortfolioBuyingPowerResponse,
  GetPortfolioCreditInformationRequest,
  GetPortfolioCreditInformationResponse,
  GetPortfolioWithdrawalPowerRequest,
  GetPortfolioWithdrawalPowerResponse,
  GetFcmMarginCallDetailsRequest,
  GetFcmMarginCallDetailsResponse,
  GetFcmRiskLimitsRequest,
  GetFcmRiskLimitsResponse,
  GetTieredPricingFeesRequest,
  GetTieredPricingFeesResponse,
  CreateNewLocatesRequest,
  CreateNewLocatesResponse,
  GetCrossMarginOverviewRequest,
  GetCrossMarginOverviewResponse,
} from './financing/types';
export type {
  CancelEntitySweepRequest,
  CancelEntitySweepResponse,
  GetEntityFuturesBalanceRequest,
  GetEntityFuturesBalanceResponse,
  GetEntityFuturesPositionsRequest,
  GetEntityFuturesPositionsResponse,
  ListEntityFuturesSweepsRequest,
  ListEntityFuturesSweepsResponse,
  ScheduleEntityFuturesSweepRequest,
  ScheduleEntityFuturesSweepResponse,
  UpdateEntityFuturesAutoSweepRequest,
  UpdateEntityFuturesAutoSweepResponse,
  GetEntityFcmEquityRequest,
  GetEntityFcmEquityResponse,
} from './futures/types';
export type {
  ListInvoicesRequest,
  ListInvoicesResponse,
} from './invoices/types';
export type {
  CreateOnchainAddressBookEntryRequest,
  CreateOnchainAddressBookEntryResponse,
  DeleteOnchainAddressBookEntryRequest,
  DeleteOnchainAddressBookEntryResponse,
  ListOnchainAddressBookRequest,
  ListOnchainAddressBookResponse,
  UpdateOnchainAddressBookEntryRequest,
  UpdateOnchainAddressBookEntryResponse,
} from './onchainAddressBook/types';
export type {
  AcceptQuoteRequest,
  AcceptQuoteResponse,
  CancelOrderRequest,
  CancelOrderResponse,
  CreateOrderPreviewRequest,
  CreateOrderPreviewResponse,
  CreateOrderRequest,
  CreateOrderResponse,
  CreateQuoteRequest,
  CreateQuoteResponse,
  GetOrderRequest,
  GetOrderResponse,
  GetOrderEditHistoryRequest,
  GetOrderEditHistoryResponse,
  ListOpenOrdersRequest,
  ListOpenOrdersResponse,
  ListOrderFillsRequest,
  ListOrderFillsResponse,
  ListPortfolioFillsRequest,
  ListPortfolioFillsResponse,
  ListPortfolioOrdersRequest,
  ListPortfolioOrdersResponse,
  EditOrderRequest,
  EditOrderResponse,
} from './orders/types';
export type {
  GetPaymentMethodRequest,
  GetPaymentMethodResponse,
  ListEntityPaymentMethodsRequest,
  ListEntityPaymentMethodsResponse,
} from './paymentMethods/types';
export type {
  ListPortfoliosRequest,
  ListPortfoliosResponse,
  GetPortfolioCreditRequest,
  GetPortfolioCreditResponse,
  GetPortfolioRequest,
  GetPortfolioResponse,
  GetCounterpartyIdRequest,
  GetCounterpartyIdResponse,
} from './portfolios/types';
export type {
  ListAggregateEntityPositionsRequest,
  ListAggregateEntityPositionsResponse,
  ListEntityPositionsRequest,
  ListEntityPositionsResponse,
} from './positions/types';
export type {
  ListProductsRequest,
  ListProductsResponse,
  ListProductCandlesRequest,
  ListProductCandlesResponse,
} from './products/types';
export type {
  CreateStakeRequest,
  CreateStakeResponse,
  CreateUnstakeRequest,
  CreateUnstakeResponse,
  CreatePortfolioStakeRequest,
  CreatePortfolioStakeResponse,
  CreatePortfolioUnstakeRequest,
  CreatePortfolioUnstakeResponse,
  QueryTransactionValidatorsRequest,
  QueryTransactionValidatorsResponse,
  BaseQueryTransactionValidatorsResponse,
  ClaimRewardsRequest,
  ClaimRewardsResponse,
} from './staking/types';
export type {
  CreateConversionRequest,
  CreateConversionResponse,
  CreateOnchainTransactionRequest,
  CreateOnchainTransactionResponse,
  CreateTransferRequest,
  CreateTransferResponse,
  CreateWithdrawalRequest,
  CreateWithdrawalResponse,
  GetTransactionRequest,
  GetTransactionResponse,
  ListPortfolioTransactionsRequest,
  ListPortfolioTransactionsResponse,
  ListWalletTransactionsRequest,
  ListWalletTransactionsResponse,
} from './transactions/types';
export type {
  ListPortfolioUsersRequest,
  ListPortfolioUsersResponse,
  ListUsersRequest,
  ListUsersResponse,
} from './users/types';
export type {
  CreateWalletRequest,
  CreateWalletResponse,
  CreateWalletDepositAddressRequest,
  CreateWalletDepositAddressResponse,
  GetWalletDepositInstructionsRequest,
  GetWalletDepositInstructionsResponse,
  GetWalletRequest,
  GetWalletResponse,
  ListWalletAddressesRequest,
  ListWalletAddressesResponse,
  ListWalletsRequest,
  ListWalletsResponse,
} from './wallets/types';
