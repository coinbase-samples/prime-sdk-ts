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

import { IPrimeApiClient, CoinbaseCallOptions } from '../clients';

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
  private client: IPrimeApiClient;

  constructor(client: IPrimeApiClient) {
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
    const paginationParams = getQueryParams(this.client, request);
    const { limit, cursor, sortDirection, entityId, ...queryParams } = request;
    const finalQueryParams = {
      ...paginationParams,
      ...queryParams,
    };

    const response = await this.client.request({
      url: `entities/${entityId}/activities`,
      queryParams: finalQueryParams,
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
    const paginationParams = getQueryParams(this.client, request);
    const { limit, cursor, sortDirection, portfolioId, ...queryParams } =
      request;
    const finalQueryParams = {
      ...paginationParams,
      ...queryParams,
    };

    const response = await this.client.request({
      url: `portfolios/${portfolioId}/activities`,
      queryParams: finalQueryParams,
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
