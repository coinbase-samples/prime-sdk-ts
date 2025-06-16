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
import { CoinbaseCallOptions } from '@coinbase-sample/core-ts';
import { CoinbasePrimeClient } from '../client';

import {
  GetWalletBalanceRequest,
  GetWalletBalanceResponse,
  ListOnchainWalletBalancesRequest,
  ListOnchainWalletBalancesResponse,
  ListPortfolioBalancesRequest,
  ListPortfolioBalancesResponse,
  ListEntityBalancesRequest,
  ListEntityBalancesResponse,
} from './types';
import {
  createPaginatedResponse,
  ResponseExtractors,
  getDefaultPaginationOptions,
  getQueryParams,
} from '../shared/paginatedResponse';

export interface IBalancesService {
  listPortfolioBalances(
    request: ListPortfolioBalancesRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListPortfolioBalancesResponse>;

  getWalletBalance(
    request: GetWalletBalanceRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetWalletBalanceResponse>;

  listOnchainWalletBalances(
    request: ListOnchainWalletBalancesRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListOnchainWalletBalancesResponse>;

  listEntityBalances(
    request: ListEntityBalancesRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListEntityBalancesResponse>;
}

export class BalancesService implements IBalancesService {
  private client: CoinbasePrimeClient;

  constructor(client: CoinbasePrimeClient) {
    this.client = client;
  }

  async listPortfolioBalances(
    request: ListPortfolioBalancesRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListPortfolioBalancesResponse> {
    const queryParams = { ...request, portfolioId: undefined };
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/balances`,
      queryParams,
      callOptions: options,
    });

    return response.data as ListPortfolioBalancesResponse;
  }

  async getWalletBalance(
    request: GetWalletBalanceRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetWalletBalanceResponse> {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/wallets/${request.walletId}/balance`,
      callOptions: options,
    });

    return response.data as GetWalletBalanceResponse;
  }

  async listOnchainWalletBalances(
    request: ListOnchainWalletBalancesRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListOnchainWalletBalancesResponse> {
    let queryParams = getQueryParams(this.client, request);

    if (request.visibilityStatuses) {
      queryParams.visibilityStatuses = request.visibilityStatuses;
    }
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/wallets/${request.walletId}/web3_balances`,
      queryParams,
      callOptions: options,
    });

    const paginationOptions = getDefaultPaginationOptions(this.client, options);

    return createPaginatedResponse(
      response.data,
      this.listOnchainWalletBalances.bind(this),
      request,
      ResponseExtractors.balances,
      paginationOptions
    ) as ListOnchainWalletBalancesResponse;
  }

  async listEntityBalances(
    request: ListEntityBalancesRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListEntityBalancesResponse> {
    let queryParams = getQueryParams(this.client, request);

    if (request.symbols) {
      queryParams.symbols = request.symbols;
    }
    if (request.aggregationType) {
      queryParams.aggregationType = request.aggregationType;
    }
    const response = await this.client.request({
      url: `entities/${request.entityId}/balances`,
      queryParams,
      callOptions: options,
    });

    const paginationOptions = getDefaultPaginationOptions(this.client, options);

    return createPaginatedResponse(
      response.data,
      this.listEntityBalances.bind(this),
      request,
      ResponseExtractors.balances,
      paginationOptions
    ) as ListEntityBalancesResponse;
  }
}
