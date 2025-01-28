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
