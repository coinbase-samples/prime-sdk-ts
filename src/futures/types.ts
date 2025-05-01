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
import { Brand } from 'src/shared/brand';
import {
  GetFcmBalanceResponse,
  GetFuturesSweepsResponse,
  GetPositionsResponse,
  SetAutoSweepResponse,
  ScheduleFuturesSweepRequest,
  ScheduleFuturesSweepResponse,
  CancelFuturesSweepResponse,
} from '../model/';

export type ListEntityFuturesSweepsRequest = {
  entityId: string;
};

export type ListEntityFuturesSweepsResponse = Brand<
  GetFuturesSweepsResponse,
  'ListEntityFuturesSweepsResponse'
>;

export type GetEntityFuturesBalanceRequest = {
  entityId: string;
};

export type GetEntityFuturesBalanceResponse = Brand<
  GetFcmBalanceResponse,
  'GetEntityFuturesBalanceResponse'
>;

export type GetEntityFuturesPositionsRequest = {
  entityId: string;
  productId?: string;
};

export type GetEntityFuturesPositionsResponse = Brand<
  GetPositionsResponse,
  'GetEntityFuturesPositionsResponse'
>;

export type UpdateEntityFuturesAutoSweepRequest = {
  entityId: string;
  autoSweep: boolean;
};

export type UpdateEntityFuturesAutoSweepResponse = Brand<
  SetAutoSweepResponse,
  'UpdateEntityFuturesAutoSweepResponse'
>;

export type ScheduleEntityFuturesSweepRequest = ScheduleFuturesSweepRequest & {
  entityId: string;
};

export type ScheduleEntityFuturesSweepResponse = Brand<
  ScheduleFuturesSweepResponse,
  'ScheduleEntityFuturesSweepResponse'
>;

export type CancelEntitySweepRequest = {
  entityId: string;
};

export type CancelEntitySweepResponse = Brand<
  CancelFuturesSweepResponse,
  'CancelEntitySweepResponse'
>;
