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
import { Brand } from '../shared/brand';
import { PortfolioBalanceType, VisibilityStatus } from '../model/enums/';
import {
  GetPortfolioBalancesResponse,
  GetWalletBalanceResponse as internalGetResp,
  ListWeb3WalletBalancesResponse,
  ListEntityBalancesResponse as internalListEntityBalances,
} from '../model/';
import {
  BasePaginatedRequest,
  PaginatedResponseMethods,
} from '../shared/paginatedResponse';

export type ListPortfolioBalancesRequest = {
  portfolioId: string;
  symbol: string;
  balanceType?: PortfolioBalanceType;
};

export type ListPortfolioBalancesResponse = Brand<
  GetPortfolioBalancesResponse,
  'ListPortfolioBalancesResponse'
>;

export type GetWalletBalanceRequest = {
  portfolioId: string;
  walletId: string;
};

export type GetWalletBalanceResponse = Brand<
  internalGetResp,
  'GetWalletBalanceResponse'
>;

export type ListOnchainWalletBalancesRequest = {
  portfolioId: string;
  walletId: string;
  visibilityStatuses?: VisibilityStatus[];
  cursor?: string;
  limit?: number;
};

export type BaseListOnchainWalletBalancesResponse = Brand<
  ListWeb3WalletBalancesResponse,
  'ListOnchainWalletBalancesResponse'
>;

export type ListOnchainWalletBalancesResponse =
  BaseListOnchainWalletBalancesResponse &
    PaginatedResponseMethods<
      ListOnchainWalletBalancesRequest & BasePaginatedRequest,
      BaseListOnchainWalletBalancesResponse,
      any // OnchainWalletBalance type
    >;

export type ListEntityBalancesRequest = {
  entityId: string;
  symbols?: string;
  cursor?: string;
  limit?: number;
  aggregationType?: PortfolioBalanceType;
};

export type BaseListEntityBalancesResponse = Brand<
  internalListEntityBalances,
  'ListEntityBalancesResponse'
>;

export type ListEntityBalancesResponse = BaseListEntityBalancesResponse &
  PaginatedResponseMethods<
    ListEntityBalancesRequest & BasePaginatedRequest,
    BaseListEntityBalancesResponse,
    any // EntityBalance type
  >;
