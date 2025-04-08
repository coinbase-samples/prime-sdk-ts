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
import { CoinbaseCallOptions, Method } from '@coinbase-sample/core-ts';
import { CoinbasePrimeClient } from '../client';
import {
  CoinbasePrimeClientException,
  CoinbasePrimeException,
} from '../errors';
import {
  ListWalletsRequest,
  ListWalletsResponse,
  GetWalletRequest,
  GetWalletResponse,
  GetWalletDepositInstructionsRequest,
  GetWalletDepositInstructionsResponse,
  ListWalletAddressesRequest,
  ListWalletAddressesResponse,
  CreateWalletRequest,
  CreateWalletResponse,
  CreateWalletDepositAddressRequest,
  CreateWalletDepositAddressResponse,
} from './types';

export interface IWalletsService {
  listWallets(
    request: ListWalletsRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    ListWalletsResponse | CoinbasePrimeClientException | CoinbasePrimeException
  >;

  getWallet(
    request: GetWalletRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    GetWalletResponse | CoinbasePrimeClientException | CoinbasePrimeException
  >;

  getWalletDepositInstructions(
    request: GetWalletDepositInstructionsRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | GetWalletDepositInstructionsResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;

  listWalletAddresses(
    request: ListWalletAddressesRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListWalletAddressesResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;

  createWallet(
    request: CreateWalletRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    CreateWalletResponse | CoinbasePrimeClientException | CoinbasePrimeException
  >;

  createWalletDepositAddress(
    request: CreateWalletDepositAddressRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | CreateWalletDepositAddressResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;
}

export class WalletsService implements IWalletsService {
  private client: CoinbasePrimeClient;

  constructor(client: CoinbasePrimeClient) {
    this.client = client;
  }

  async listWallets(
    request: ListWalletsRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    ListWalletsResponse | CoinbasePrimeClientException | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/wallets`,
      callOptions: options,
    });

    return response.data as ListWalletsResponse;
  }

  async getWallet(
    request: GetWalletRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    GetWalletResponse | CoinbasePrimeClientException | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/wallets/${request.walletId}`,
      callOptions: options,
    });

    return response.data as GetWalletResponse;
  }

  async getWalletDepositInstructions(
    request: GetWalletDepositInstructionsRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | GetWalletDepositInstructionsResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/wallets/${request.walletId}/deposit_instructions`,
      callOptions: options,
    });

    return response.data as GetWalletDepositInstructionsResponse;
  }

  async listWalletAddresses(
    request: ListWalletAddressesRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListWalletAddressesResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    let queryParams: Record<string, string | number> = {};
    if (request.networkId) {
      queryParams['network.id'] = request.networkId;
    }
    if (request.networkType) {
      queryParams['network.type'] = request.networkType;
    }
    if (request.cursor) {
      queryParams.cursor = request.cursor;
    }
    if (request.limit) {
      queryParams.limit = request.limit;
    }
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/wallets/${request.walletId}/addresses`,
      queryParams,
      callOptions: options,
    });

    return response.data as ListWalletAddressesResponse;
  }

  async createWallet(
    request: CreateWalletRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    CreateWalletResponse | CoinbasePrimeClientException | CoinbasePrimeException
  > {
    const bodyParams = { ...request, portfolioId: undefined };
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/wallets`,
      bodyParams,
      method: Method.POST,
      callOptions: options,
    });

    return response.data as CreateWalletResponse;
  }

  async createWalletDepositAddress(
    request: CreateWalletDepositAddressRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | CreateWalletDepositAddressResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    let queryParams: Record<string, string | number> = {};
    if (request.networkId) {
      queryParams['network.id'] = request.networkId;
    }
    if (request.networkType) {
      queryParams['network.type'] = request.networkType;
    }
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/wallets/${request.walletId}/addresses`,
      queryParams,
      method: Method.POST,
      callOptions: options,
    });

    return response.data as CreateWalletDepositAddressResponse;
  }
}
