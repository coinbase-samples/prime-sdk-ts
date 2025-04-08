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
  ListAggregateEntityPositionsRequest,
  ListAggregateEntityPositionsResponse,
  ListEntityPositionsRequest,
  ListEntityPositionsResponse,
} from './types';

export interface IPositionsService {
  listAggregateEntityPositions(
    request: ListAggregateEntityPositionsRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListAggregateEntityPositionsResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;
  listEntityPositions(
    request: ListEntityPositionsRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListEntityPositionsResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;
}

export class PositionsService implements IPositionsService {
  private client: CoinbasePrimeClient;

  constructor(client: CoinbasePrimeClient) {
    this.client = client;
  }

  async listAggregateEntityPositions(
    request: ListAggregateEntityPositionsRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListAggregateEntityPositionsResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const queryParams = {
      ...request,
      entityId: undefined,
    };
    const response = await this.client.request({
      url: `portfolios/${request.entityId}/aggregate_positions`,
      callOptions: options,
      queryParams,
    });

    return response.data as ListAggregateEntityPositionsResponse;
  }

  async listEntityPositions(
    request: ListEntityPositionsRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListEntityPositionsResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const queryParams = {
      ...request,
      entityId: undefined,
    };
    const response = await this.client.request({
      url: `portfolios/${request.entityId}/positions`,
      callOptions: options,
      queryParams,
    });

    return response.data as ListEntityPositionsResponse;
  }
}
