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
import { validate } from '../shared/validation';

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
  GetEntityFuturesRiskLimitsRequest,
  GetEntityFuturesRiskLimitsResponse,
  GetEntityFuturesMarginCallDetailsRequest,
  GetEntityFuturesMarginCallDetailsResponse,
  GetFcmSettingsRequest,
  GetFcmSettingsResponse,
  SetFcmSettingsRequest,
  SetFcmSettingsResponse,
  GetEntityFcmEquityRequest,
  GetEntityFcmEquityResponse,
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

  getRiskLimits(
    request: GetEntityFuturesRiskLimitsRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetEntityFuturesRiskLimitsResponse>;

  getMarginCallDetails(
    request: GetEntityFuturesMarginCallDetailsRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetEntityFuturesMarginCallDetailsResponse>;

  getFcmSettings(
    request: GetFcmSettingsRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetFcmSettingsResponse>;

  setFcmSettings(
    request: SetFcmSettingsRequest,
    options?: CoinbaseCallOptions
  ): Promise<SetFcmSettingsResponse>;

  getEntityEquity(
    request: GetEntityFcmEquityRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetEntityFcmEquityResponse>;
}

export class FuturesService implements IFuturesService {
  private client: IPrimeApiClient;

  constructor(client: IPrimeApiClient) {
    this.client = client;
  }

  async listEntitySweeps(
    request: ListEntityFuturesSweepsRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListEntityFuturesSweepsResponse> {
    validate(request)
      .requiredUUID((r) => r.entityId)
      .check();

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
    validate(request)
      .requiredUUID((r) => r.entityId)
      .check();

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
    validate(request)
      .requiredUUID((r) => r.entityId)
      .check();

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
    validate(request)
      .requiredUUID((r) => r.entityId)
      .requiredString((r) => r.currency)
      .check();

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
    validate(request)
      .requiredUUID((r) => r.entityId)
      .requiredBoolean((r) => r.autoSweep)
      .check();

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
    validate(request)
      .requiredUUID((r) => r.entityId)
      .check();

    const response = await this.client.request({
      url: `entities/${request.entityId}/futures/sweeps`,
      method: Method.DELETE,
      callOptions: options,
    });

    return response.data as CancelEntitySweepResponse;
  }

  async getRiskLimits(
    request: GetEntityFuturesRiskLimitsRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetEntityFuturesRiskLimitsResponse> {
    validate(request)
      .requiredUUID((r) => r.entityId)
      .check();

    const response = await this.client.request({
      url: `entities/${request.entityId}/futures/risk_limits`,
      callOptions: options,
    });

    return response.data as GetEntityFuturesRiskLimitsResponse;
  }

  async getMarginCallDetails(
    request: GetEntityFuturesMarginCallDetailsRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetEntityFuturesMarginCallDetailsResponse> {
    validate(request)
      .requiredUUID((r) => r.entityId)
      .check();

    const response = await this.client.request({
      url: `entities/${request.entityId}/futures/margin_call_details`,
      callOptions: options,
    });

    return response.data as GetEntityFuturesMarginCallDetailsResponse;
  }

  async getFcmSettings(
    request: GetFcmSettingsRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetFcmSettingsResponse> {
    validate(request)
      .requiredUUID((r) => r.entityId)
      .check();

    const response = await this.client.request({
      url: `entities/${request.entityId}/futures/settings`,
      callOptions: options,
    });

    return response.data as GetFcmSettingsResponse;
  }

  async setFcmSettings(
    request: SetFcmSettingsRequest,
    options?: CoinbaseCallOptions
  ): Promise<SetFcmSettingsResponse> {
    validate(request)
      .requiredUUID((r) => r.entityId)
      .check();

    const response = await this.client.request({
      url: `entities/${request.entityId}/futures/settings`,
      method: Method.POST,
      bodyParams: { targetDerivativesExcess: request.targetDerivativesExcess },
      callOptions: options,
    });

    return response.data as SetFcmSettingsResponse;
  }

  async getEntityEquity(
    request: GetEntityFcmEquityRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetEntityFcmEquityResponse> {
    validate(request)
      .requiredUUID((r) => r.entityId)
      .check();

    const response = await this.client.request({
      url: `entities/${request.entityId}/futures/equity`,
      callOptions: options,
    });

    return response.data as GetEntityFcmEquityResponse;
  }
}

export type {
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
  GetEntityFuturesRiskLimitsRequest,
  GetEntityFuturesRiskLimitsResponse,
  GetEntityFuturesMarginCallDetailsRequest,
  GetEntityFuturesMarginCallDetailsResponse,
  GetFcmSettingsRequest,
  GetFcmSettingsResponse,
  SetFcmSettingsRequest,
  SetFcmSettingsResponse,
  GetEntityFcmEquityRequest,
  GetEntityFcmEquityResponse,
} from './types';
