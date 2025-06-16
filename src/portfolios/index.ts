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
  GetPortfolioRequest,
  GetPortfolioResponse,
  GetPortfolioCreditRequest,
  GetPortfolioCreditResponse,
  ListPortfoliosResponse,
  ListPortfoliosRequest,
} from './types';
import {
  createPaginatedResponse,
  getDefaultPaginationOptions,
  ResponseExtractors,
} from '../shared/paginatedResponse';

export interface IPortfoliosService {
  getPortfolio(
    request: GetPortfolioRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetPortfolioResponse>;

  getPortfolioCredit(
    request: GetPortfolioCreditRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetPortfolioCreditResponse>;

  listPortfolios(
    request: ListPortfoliosRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListPortfoliosResponse>;
}

export class PortfoliosService implements IPortfoliosService {
  private client: CoinbasePrimeClient;

  constructor(client: CoinbasePrimeClient) {
    this.client = client;
  }

  async getPortfolio(
    request: GetPortfolioRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetPortfolioResponse> {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}`,
      callOptions: options,
    });

    return response.data as GetPortfolioResponse;
  }

  async getPortfolioCredit(
    request: GetPortfolioCreditRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetPortfolioCreditResponse> {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/credit`,
      callOptions: options,
    });

    return response.data as GetPortfolioCreditResponse;
  }

  async listPortfolios(
    request?: ListPortfoliosRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListPortfoliosResponse> {
    const response = await this.client.request({
      url: `portfolios`,
      callOptions: options,
    });

    const paginationOptions = getDefaultPaginationOptions(this.client, options);

    return createPaginatedResponse(
      response.data,
      this.listPortfolios.bind(this),
      request ?? {},
      ResponseExtractors.portfolios,
      paginationOptions
    ) as ListPortfoliosResponse;
  }
}
