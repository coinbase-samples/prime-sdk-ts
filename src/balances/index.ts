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
  CoinbasePrimeClientException,
  CoinbasePrimeException,
} from '../errors';
import {
  GetWalletBalanceRequest,
  GetWalletBalanceResponse,
  ListOnchainWalletBalancesRequest,
  ListOnchainWalletBalancesResponse,
  ListPortfolioBalancesRequest,
  ListPortfolioBalancesResponse,
} from './types';

export interface IBalancesService {
  listPortfolioBalances(
    request: ListPortfolioBalancesRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListPortfolioBalancesResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;

  getWalletBalance(
    request: GetWalletBalanceRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | GetWalletBalanceResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;

  listOnchainWalletBalances(
    request: ListOnchainWalletBalancesRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListOnchainWalletBalancesResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;
}

export class BalancesService implements IBalancesService {
  private client: CoinbasePrimeClient;

  constructor(client: CoinbasePrimeClient) {
    this.client = client;
  }

  async listPortfolioBalances(
    request: ListPortfolioBalancesRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListPortfolioBalancesResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
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
  ): Promise<
    | GetWalletBalanceResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/wallets/${request.walletId}balances`,
      callOptions: options,
    });

    return response.data as GetWalletBalanceResponse;
  }

  async listOnchainWalletBalances(
    request: ListOnchainWalletBalancesRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListOnchainWalletBalancesResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const queryParams = {
      ...request,
      portfolioId: undefined,
      walletId: undefined,
    };
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}wallets/${request.walletId}/web3_balances`,
      queryParams,
      callOptions: options,
    });

    return response.data as ListOnchainWalletBalancesResponse;
  }
}
