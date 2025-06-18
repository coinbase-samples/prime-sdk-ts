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
  GetActivityRequest,
  GetActivityResponse,
  GetPortfolioActivitiesRequest,
  GetPortfolioActivityResponse,
  ListPortfolioActivitiesRequest,
  ListPortfolioActivitiesResponse,
  ListEntityActivitiesRequest,
  ListEntityActivitiesResponse,
} from './types';
import {
  createPaginatedResponse,
  getDefaultPaginationOptions,
  getQueryParams,
  ResponseExtractors,
} from '../shared/paginatedResponse';

export interface IActivitiesService {
  getActivity(request: GetActivityRequest): Promise<GetActivityResponse>;
  getPortfolioActivity(
    request: GetPortfolioActivitiesRequest
  ): Promise<GetPortfolioActivityResponse>;
  listEntityActivities(
    request: ListEntityActivitiesRequest
  ): Promise<ListEntityActivitiesResponse>;
  listPortfolioActivities(
    request: ListPortfolioActivitiesRequest
  ): Promise<ListPortfolioActivitiesResponse>;
}

export class ActivitiesService implements IActivitiesService {
  private client: CoinbasePrimeClient;

  constructor(client: CoinbasePrimeClient) {
    this.client = client;
  }

  async getActivity(
    request: GetActivityRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetActivityResponse> {
    const response = await this.client.request({
      url: `activities/${request.activityId}`,
      callOptions: options,
    });

    return response.data as GetActivityResponse;
  }

  async getPortfolioActivity(
    request: GetPortfolioActivitiesRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetPortfolioActivityResponse> {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/activities/${request.activityId}`,
      callOptions: options,
    });

    return response.data as GetPortfolioActivityResponse;
  }

  async listEntityActivities(
    request: ListEntityActivitiesRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListEntityActivitiesResponse> {
    let queryParams = getQueryParams(this.client, request);
    if (request.startTime) {
      queryParams.startTime = new Date(request.startTime).toISOString();
    }
    if (request.endTime) {
      queryParams.endTime = new Date(request.endTime).toISOString();
    }
    if (request.statuses) {
      queryParams.statuses = request.statuses;
    }
    if (request.categories) {
      queryParams.categories = request.categories;
    }
    if (request.symbols) {
      queryParams.symbols = request.symbols;
    }
    if (request.activityLevel) {
      queryParams.activityLevel = request.activityLevel;
    }

    const response = await this.client.request({
      url: `entities/${request.entityId}/activities`,
      queryParams,
      callOptions: options,
    });

    const paginationOptions = getDefaultPaginationOptions(this.client, options);

    return createPaginatedResponse(
      response.data,
      this.listEntityActivities.bind(this),
      request,
      ResponseExtractors.activities,
      paginationOptions
    ) as ListEntityActivitiesResponse;
  }

  async listPortfolioActivities(
    request: ListPortfolioActivitiesRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListPortfolioActivitiesResponse> {
    const queryParams = getQueryParams(this.client, request);
    if (request.startTime) {
      queryParams.startTime = new Date(request.startTime).toISOString();
    }
    if (request.endTime) {
      queryParams.endTime = new Date(request.endTime).toISOString();
    }
    if (request.statuses) {
      queryParams.statuses = request.statuses;
    }
    if (request.categories) {
      queryParams.categories = request.categories;
    }
    if (request.symbols) {
      queryParams.symbols = request.symbols;
    }

    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/activities`,
      queryParams,
      callOptions: options,
    });

    const paginationOptions = getDefaultPaginationOptions(this.client, options);

    return createPaginatedResponse(
      response.data,
      this.listPortfolioActivities.bind(this),
      request,
      ResponseExtractors.activities,
      paginationOptions
    ) as ListPortfolioActivitiesResponse;
  }
}
