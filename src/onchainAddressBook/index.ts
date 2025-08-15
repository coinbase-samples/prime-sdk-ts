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
import { CoinbaseCallOptions, Method, IPrimeApiClient } from '../clients';

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
  ): Promise<ListOnchainAddressBookResponse>;

  createOnchainAddressBookEntry(
    request: CreateOnchainAddressBookEntryRequest,
    options?: CoinbaseCallOptions
  ): Promise<CreateOnchainAddressBookEntryResponse>;

  updateOnchainAddressBookEntry(
    request: UpdateOnchainAddressBookEntryRequest,
    options?: CoinbaseCallOptions
  ): Promise<UpdateOnchainAddressBookEntryResponse>;

  deleteOnchainAddressBook(
    request: DeleteOnchainAddressBookEntryRequest,
    options?: CoinbaseCallOptions
  ): Promise<DeleteOnchainAddressBookEntryResponse>;
}

export class OnchainAddressBookService implements IOnchainAddressBookService {
  private client: IPrimeApiClient;

  constructor(client: IPrimeApiClient) {
    this.client = client;
  }

  async listOnchainAddressBook(
    request: ListOnchainAddressBookRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListOnchainAddressBookResponse> {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/onchain_address_groups`,
      callOptions: options,
    });

    return response.data as ListOnchainAddressBookResponse;
  }

  async createOnchainAddressBookEntry(
    request: CreateOnchainAddressBookEntryRequest,
    options?: CoinbaseCallOptions
  ): Promise<CreateOnchainAddressBookEntryResponse> {
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
  ): Promise<UpdateOnchainAddressBookEntryResponse> {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/onchain_address_group`,
      bodyParams: { ...request, portfolioId: undefined },
      method: Method.PUT,
      callOptions: options,
    });

    return response.data as UpdateOnchainAddressBookEntryResponse;
  }

  async deleteOnchainAddressBook(
    request: DeleteOnchainAddressBookEntryRequest,
    options?: CoinbaseCallOptions
  ): Promise<DeleteOnchainAddressBookEntryResponse> {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/onchain_address_group/${request.addressGroupId}`,
      method: Method.DELETE,
      callOptions: options,
    });

    return response.data as DeleteOnchainAddressBookEntryResponse;
  }
}
