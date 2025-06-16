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
import { Brand } from '../shared/brand';
import { ActivityCategory, ActivityStatus } from '../model/enums/';
import {
  GetActivityResponse as internalGet,
  GetEntityActivitiesResponse,
  GetPortfolioActivitiesResponse,
  GetPortfolioActivityResponse as internalGetPortAct,
} from '../model/';
import { Pagination } from '../shared/pagination';

export type ActivityFilters = Pagination & {
  symbols?: string[];
  categories?: ActivityCategory[];
  statuses?: ActivityStatus[];
  startTime?: string;
  endTime?: string;
};

export type GetActivityRequest = {
  activityId: string;
};

export type GetActivityResponse = Brand<internalGet, 'GetActivityResponse'>;

export type ListEntityActivitiesRequest = Pagination &
  ActivityFilters & {
    entityId: string;
    activityLevel?: string;
  };

export type ListEntityActivitiesResponse = GetEntityActivitiesResponse;

export type ListPortfolioActivitiesRequest = Pagination &
  ActivityFilters & {
    portfolioId: string;
  };

export type ListPortfolioActivitiesResponse = Brand<
  GetPortfolioActivitiesResponse,
  'ListPortfolioActivitiesResponse'
>;

export type GetPortfolioActivitiesRequest = {
  portfolioId: string;
  activityId: string;
};

export type GetPortfolioActivityResponse = Brand<
  internalGetPortAct,
  'GetPortfolioActivityResponse'
>;
