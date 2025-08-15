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
import { IPrimeApiClient, CoinbaseCallOptions } from '../clients';

import {
  ListAggregateEntityPositionsRequest,
  ListAggregateEntityPositionsResponse,
  ListEntityPositionsRequest,
  ListEntityPositionsResponse,
} from './types';
import {
  createPaginatedResponse,
  getDefaultPaginationOptions,
  getQueryParams,
  ResponseExtractors,
} from '../shared/paginatedResponse';

export interface IPositionsService {
  listAggregateEntityPositions(
    request: ListAggregateEntityPositionsRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListAggregateEntityPositionsResponse>;
  listEntityPositions(
    request: ListEntityPositionsRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListEntityPositionsResponse>;
}

export class PositionsService implements IPositionsService {
  private client: IPrimeApiClient;

  constructor(client: IPrimeApiClient) {
    this.client = client;
  }

  async listAggregateEntityPositions(
    request: ListAggregateEntityPositionsRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListAggregateEntityPositionsResponse> {
    const paginationParams = getQueryParams(this.client, request);
    const { limit, cursor, sortDirection, entityId, ...queryParams } = request;
    const finalQueryParams = {
      ...paginationParams,
      ...queryParams,
    };
    const response = await this.client.request({
      url: `entities/${entityId}/aggregate_positions`,
      callOptions: options,
      queryParams: finalQueryParams,
    });

    const paginationOptions = getDefaultPaginationOptions(this.client, options);

    return createPaginatedResponse(
      response.data,
      this.listAggregateEntityPositions.bind(this),
      request,
      ResponseExtractors.positions,
      paginationOptions
    ) as ListAggregateEntityPositionsResponse;
  }

  async listEntityPositions(
    request: ListEntityPositionsRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListEntityPositionsResponse> {
    const paginationParams = getQueryParams(this.client, request);
    const { limit, cursor, sortDirection, entityId, ...queryParams } = request;
    const finalQueryParams = {
      ...paginationParams,
      ...queryParams,
    };
    const response = await this.client.request({
      url: `entities/${entityId}/positions`,
      callOptions: options,
      queryParams: finalQueryParams,
    });

    const paginationOptions = getDefaultPaginationOptions(this.client, options);

    return createPaginatedResponse(
      response.data,
      this.listEntityPositions.bind(this),
      request,
      ResponseExtractors.positions,
      paginationOptions
    ) as ListEntityPositionsResponse;
  }
}
