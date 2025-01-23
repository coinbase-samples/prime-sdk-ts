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
import { ListProductsRequest, ListProductsResponse } from './types';

export interface IProductsService {
  listProducts(
    request: ListProductsRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    ListProductsResponse | CoinbasePrimeClientException | CoinbasePrimeException
  >;
}

export class ProductsService implements IProductsService {
  private client: CoinbasePrimeClient;

  constructor(client: CoinbasePrimeClient) {
    this.client = client;
  }

  async listProducts(
    request: ListProductsRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    ListProductsResponse | CoinbasePrimeClientException | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/products`,
      callOptions: options,
    });

    return response.data as ListProductsResponse;
  }
}
