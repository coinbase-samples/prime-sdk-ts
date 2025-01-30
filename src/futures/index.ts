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
  ListEntityFuturesSweeps,
  ListEntityFuturesSweepsResponse,
  GetEntityFuturesBalanceRequest,
  GetEntityFuturesBalanceResponse,
  GetEntityFuturesPositionsRequest,
  GetEntityFuturesPositionsResponse,
  ScheduleEntityFuturesSweepRequest,
  ScheduleEntityFuturesSweepResponse,
  UpdateEntityFuturesAutoSweep,
  UpdateEntityFuturesAutoSweepResponse,
  CancelEntitySweepRequest,
  CancelEntitySweepResponse,
} from './types';

export interface IFuturesService {
  listEntitySweeps(
    request: ListEntityFuturesSweeps,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListEntityFuturesSweepsResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;

  getEntityBalance(
    request: GetEntityFuturesBalanceRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | GetEntityFuturesBalanceResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;

  getEntityPositions(
    request: GetEntityFuturesPositionsRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | GetEntityFuturesPositionsResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;

  scheduleEntitySweep(
    request: ScheduleEntityFuturesSweepRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ScheduleEntityFuturesSweepResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;

  updateEntityAutoSweep(
    request: UpdateEntityFuturesAutoSweep,
    options?: CoinbaseCallOptions
  ): Promise<
    | UpdateEntityFuturesAutoSweepResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;

  cancelEntitySweep(
    request: CancelEntitySweepRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | CancelEntitySweepResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;
}

export class FuturesService implements IFuturesService {
  private client: CoinbasePrimeClient;

  constructor(client: CoinbasePrimeClient) {
    this.client = client;
  }

  async listEntitySweeps(
    request: ListEntityFuturesSweeps,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListEntityFuturesSweepsResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `entities/${request.entityId}/futures/sweeps`,
      callOptions: options,
    });

    return response.data as ListEntityFuturesSweepsResponse;
  }

  async getEntityBalance(
    request: GetEntityFuturesBalanceRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | GetEntityFuturesBalanceResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `entities/${request.entityId}/futures/balance_summary`,
      callOptions: options,
    });

    return response.data as GetEntityFuturesBalanceResponse;
  }

  async getEntityPositions(
    request: GetEntityFuturesPositionsRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | GetEntityFuturesPositionsResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const queryParams = { ...request, entityId: undefined };
    const response = await this.client.request({
      url: `entities/${request.entityId}/futures/positions`,
      queryParams,
      callOptions: options,
    });

    return response.data as GetEntityFuturesPositionsResponse;
  }

  async scheduleEntitySweep(
    request: ScheduleEntityFuturesSweepRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ScheduleEntityFuturesSweepResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `entities/${request.entityId}/futures/sweeps`,
      method: Method.POST,
      bodyParams: { ...request, entityId: undefined },
      callOptions: options,
    });

    return response.data as ScheduleEntityFuturesSweepResponse;
  }

  async updateEntityAutoSweep(
    request: UpdateEntityFuturesAutoSweep,
    options?: CoinbaseCallOptions
  ): Promise<
    | UpdateEntityFuturesAutoSweepResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `entities/${request.entityId}/futures/auto_sweep`,
      method: Method.POST,
      bodyParams: { ...request, entityId: undefined },
      callOptions: options,
    });

    return response.data as UpdateEntityFuturesAutoSweepResponse;
  }

  async cancelEntitySweep(
    request: CancelEntitySweepRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | CancelEntitySweepResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `entities/${request.entityId}/futures/sweeps`,
      method: Method.DELETE,
      callOptions: options,
    });

    return response.data as CancelEntitySweepResponse;
  }
}
