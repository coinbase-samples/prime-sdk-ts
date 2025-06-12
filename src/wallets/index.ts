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
  ): Promise<ListWalletsResponse>;

  getWallet(
    request: GetWalletRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetWalletResponse>;

  getWalletDepositInstructions(
    request: GetWalletDepositInstructionsRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetWalletDepositInstructionsResponse>;

  listWalletAddresses(
    request: ListWalletAddressesRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListWalletAddressesResponse>;

  createWallet(
    request: CreateWalletRequest,
    options?: CoinbaseCallOptions
  ): Promise<CreateWalletResponse>;

  createWalletDepositAddress(
    request: CreateWalletDepositAddressRequest,
    options?: CoinbaseCallOptions
  ): Promise<CreateWalletDepositAddressResponse>;
}

export class WalletsService implements IWalletsService {
  private client: CoinbasePrimeClient;

  constructor(client: CoinbasePrimeClient) {
    this.client = client;
  }

  async listWallets(
    request: ListWalletsRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListWalletsResponse> {
    let queryParams: Record<string, string | number> = {};
    if (request.limit) {
      queryParams.limit = request.limit;
    }
    if (request.cursor) {
      queryParams.cursor = request.cursor;
    }
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/wallets`,
      queryParams,
      callOptions: options,
    });

    return response.data as ListWalletsResponse;
  }

  async getWallet(
    request: GetWalletRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetWalletResponse> {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/wallets/${request.walletId}`,
      callOptions: options,
    });

    return response.data as GetWalletResponse;
  }

  async getWalletDepositInstructions(
    request: GetWalletDepositInstructionsRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetWalletDepositInstructionsResponse> {
    let queryParams: Record<string, string | number> = {
      depositType: request.depositType,
    };
    if (request.networkType) {
      queryParams['network.type'] = request.networkType;
    }
    if (request.networkId) {
      queryParams['network.id'] = request.networkId;
    }
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/wallets/${request.walletId}/deposit_instructions`,
      callOptions: options,
      queryParams,
    });

    return response.data as GetWalletDepositInstructionsResponse;
  }

  async listWalletAddresses(
    request: ListWalletAddressesRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListWalletAddressesResponse> {
    let queryParams: Record<string, string | number> = {};
    if (request.networkId) {
      queryParams.networkId = request.networkId;
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
  ): Promise<CreateWalletResponse> {
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
  ): Promise<CreateWalletDepositAddressResponse> {
    const bodyParams = {
      networkId: request.networkId,
    };

    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/wallets/${request.walletId}/addresses`,
      bodyParams,
      method: Method.POST,
      callOptions: options,
    });

    return response.data as CreateWalletDepositAddressResponse;
  }
}
