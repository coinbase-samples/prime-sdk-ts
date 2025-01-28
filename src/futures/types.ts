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
import { GetFcmBalanceResponse } from '../model/GetFcmBalanceResponse';
import { GetFuturesSweepsResponse } from '../model/GetFuturesSweepsResponse';
import { GetPositionsResponse } from '../model/GetPositionsResponse';
import { SetAutoSweepResponse } from '../model/SetAutoSweepResponse';
import { ScheduleFuturesSweepRequest } from '../model/ScheduleFuturesSweepRequest';
import { ScheduleFuturesSweepResponse } from '../model/ScheduleFuturesSweepResponse';
import { CancelFuturesSweepResponse } from '../model/CancelFuturesSweepResponse';

export type ListEntityFuturesSweeps = {
  entityId: string;
};

export type ListEntityFuturesSweepsResponse = GetFuturesSweepsResponse;

export type GetEntityFuturesBalanceRequest = {
  entityId: string;
};

export type GetEntityFuturesBalanceResponse = GetFcmBalanceResponse;

export type GetEntityFuturesPositionsRequest = {
  entityId: string;
  productId?: string;
};

export type GetEntityFuturesPositionsResponse = GetPositionsResponse;

export type UpdateEntityFuturesAutoSweep = {
  entityId: string;
  autoSweep: boolean;
};

export type UpdateEntityFuturesAutoSweepResponse = SetAutoSweepResponse;

export type ScheduleEntityFuturesSweepRequest = ScheduleFuturesSweepRequest & {
  entityId: string;
};

export type ScheduleEntityFuturesSweepResponse = ScheduleFuturesSweepResponse;

export type CancelEntitySweepRequest = {
  entityId: string;
};

export type CancelEntitySweepResponse = CancelFuturesSweepResponse;
