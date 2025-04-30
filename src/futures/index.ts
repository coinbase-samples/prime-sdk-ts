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
  ListEntityFuturesSweepsRequest,
  ListEntityFuturesSweepsResponse,
  GetEntityFuturesBalanceRequest,
  GetEntityFuturesBalanceResponse,
  GetEntityFuturesPositionsRequest,
  GetEntityFuturesPositionsResponse,
  ScheduleEntityFuturesSweepRequest,
  ScheduleEntityFuturesSweepResponse,
  UpdateEntityFuturesAutoSweepRequest,
  UpdateEntityFuturesAutoSweepResponse,
  CancelEntitySweepRequest,
  CancelEntitySweepResponse,
} from './types';

export interface IFuturesService {
  listEntitySweeps(
    request: ListEntityFuturesSweepsRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListEntityFuturesSweepsResponse>;

  getEntityBalance(
    request: GetEntityFuturesBalanceRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetEntityFuturesBalanceResponse>;

  getEntityPositions(
    request: GetEntityFuturesPositionsRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetEntityFuturesPositionsResponse>;

  scheduleEntitySweep(
    request: ScheduleEntityFuturesSweepRequest,
    options?: CoinbaseCallOptions
  ): Promise<ScheduleEntityFuturesSweepResponse>;

  updateEntityAutoSweep(
    request: UpdateEntityFuturesAutoSweepRequest,
    options?: CoinbaseCallOptions
  ): Promise<UpdateEntityFuturesAutoSweepResponse>;

  cancelEntitySweep(
    request: CancelEntitySweepRequest,
    options?: CoinbaseCallOptions
  ): Promise<CancelEntitySweepResponse>;
}

export class FuturesService implements IFuturesService {
  private client: CoinbasePrimeClient;

  constructor(client: CoinbasePrimeClient) {
    this.client = client;
  }

  async listEntitySweeps(
    request: ListEntityFuturesSweepsRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListEntityFuturesSweepsResponse> {
    const response = await this.client.request({
      url: `entities/${request.entityId}/futures/sweeps`,
      callOptions: options,
    });

    return response.data as ListEntityFuturesSweepsResponse;
  }

  async getEntityBalance(
    request: GetEntityFuturesBalanceRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetEntityFuturesBalanceResponse> {
    const response = await this.client.request({
      url: `entities/${request.entityId}/futures/balance_summary`,
      callOptions: options,
    });

    return response.data as GetEntityFuturesBalanceResponse;
  }

  async getEntityPositions(
    request: GetEntityFuturesPositionsRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetEntityFuturesPositionsResponse> {
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
  ): Promise<ScheduleEntityFuturesSweepResponse> {
    const response = await this.client.request({
      url: `entities/${request.entityId}/futures/sweeps`,
      method: Method.POST,
      bodyParams: { ...request, entityId: undefined },
      callOptions: options,
    });

    return response.data as ScheduleEntityFuturesSweepResponse;
  }

  async updateEntityAutoSweep(
    request: UpdateEntityFuturesAutoSweepRequest,
    options?: CoinbaseCallOptions
  ): Promise<UpdateEntityFuturesAutoSweepResponse> {
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
  ): Promise<CancelEntitySweepResponse> {
    const response = await this.client.request({
      url: `entities/${request.entityId}/futures/sweeps`,
      method: Method.DELETE,
      callOptions: options,
    });

    return response.data as CancelEntitySweepResponse;
  }
}
