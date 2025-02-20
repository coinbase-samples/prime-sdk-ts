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
import { CoinbaseCallOptions, Method } from '@coinbase-sample/core-ts';
import { CoinbasePrimeClient } from '../client';
import {
  CoinbasePrimeClientException,
  CoinbasePrimeException,
} from '../errors';
import {
  ListOnchainAddressBookRequest,
  ListOnchainAddressBookResponse,
  CreateOnchainAddressBookEntryRequest,
  CreateOnchainAddressBookEntryResponse,
  UpdateOnchainAddressBookEntryRequest,
  UpdateOnchainAddressBookEntryResponse,
  DeleteOnchainAddressBookEntryRequest,
  DeleteOnchainAddressBookEntryResponse,
} from './types';

export interface IOnchainAddressBookService {
  listOnchainAddressBook(
    request: ListOnchainAddressBookRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListOnchainAddressBookResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;

  createOnchainAddressBookEntry(
    request: CreateOnchainAddressBookEntryRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | CreateOnchainAddressBookEntryResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;

  updateOnchainAddressBookEntry(
    request: UpdateOnchainAddressBookEntryRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | UpdateOnchainAddressBookEntryResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;

  deleteOnchainAddressBook(
    request: DeleteOnchainAddressBookEntryRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | DeleteOnchainAddressBookEntryResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;
}

export class OnchainAddressBookService implements IOnchainAddressBookService {
  private client: CoinbasePrimeClient;

  constructor(client: CoinbasePrimeClient) {
    this.client = client;
  }

  async listOnchainAddressBook(
    request: ListOnchainAddressBookRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListOnchainAddressBookResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/onchain_address_groups`,
      callOptions: options,
    });

    return response.data as ListOnchainAddressBookResponse;
  }

  async createOnchainAddressBookEntry(
    request: CreateOnchainAddressBookEntryRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | CreateOnchainAddressBookEntryResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/onchain_address_group`,
      bodyParams: { ...request, portfolioId: undefined },
      method: Method.POST,
      callOptions: options,
    });

    return response.data as CreateOnchainAddressBookEntryResponse;
  }

  async updateOnchainAddressBookEntry(
    request: UpdateOnchainAddressBookEntryRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | UpdateOnchainAddressBookEntryResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/onchain_address_group`,
      bodyParams: { ...request, portfolioId: undefined },
      method: Method.PUT,
      callOptions: options,
    });

    return response.data as CreateOnchainAddressBookEntryResponse;
  }

  async deleteOnchainAddressBook(
    request: DeleteOnchainAddressBookEntryRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | DeleteOnchainAddressBookEntryResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/onchain_address_group/${request.addressGroupId}`,
      method: Method.DELETE,
      callOptions: options,
    });

    return response.data as DeleteOnchainAddressBookEntryResponse;
  }
}
