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
  ListPortfolioUsersRequest,
  ListPortfolioUsersResponse,
  ListUsersRequest,
  ListUsersResponse,
} from './types';
import {
  createPaginatedResponse,
  getDefaultPaginationOptions,
  getQueryParams,
  ResponseExtractors,
} from '../shared/paginatedResponse';

export interface IUsersService {
  listUsers(
    request: ListUsersRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListUsersResponse>;
  listPortfolioUsers(
    request: ListPortfolioUsersRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListPortfolioUsersResponse>;
}

export class UsersService implements IUsersService {
  private client: CoinbasePrimeClient;

  constructor(client: CoinbasePrimeClient) {
    this.client = client;
  }

  async listUsers(
    request: ListUsersRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListUsersResponse> {
    const paginationParams = getQueryParams(this.client, request);
    const { limit, cursor, sortDirection, entityId, ...queryParams } = request;
    const finalQueryParams = {
      ...paginationParams,
      ...queryParams,
    };
    const response = await this.client.request({
      url: `entities/${entityId}/users`,
      queryParams: finalQueryParams,
      callOptions: options,
    });

    const responseData = response.data;

    const paginationOptions = getDefaultPaginationOptions(this.client, options);

    return createPaginatedResponse(
      responseData,
      this.listUsers.bind(this),
      request,
      ResponseExtractors.users,
      paginationOptions
    ) as ListUsersResponse;
  }

  async listPortfolioUsers(
    request: ListPortfolioUsersRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListPortfolioUsersResponse> {
    const paginationParams = getQueryParams(this.client, request);
    const { limit, cursor, sortDirection, portfolioId, ...queryParams } =
      request;
    const finalQueryParams = {
      ...paginationParams,
      ...queryParams,
    };
    const response = await this.client.request({
      url: `portfolios/${portfolioId}/users`,
      queryParams: finalQueryParams,
      callOptions: options,
    });

    const responseData = response.data;

    const paginationOptions = getDefaultPaginationOptions(this.client, options);

    return createPaginatedResponse(
      responseData,
      this.listPortfolioUsers.bind(this),
      request,
      ResponseExtractors.users,
      paginationOptions
    ) as ListPortfolioUsersResponse;
  }
}
