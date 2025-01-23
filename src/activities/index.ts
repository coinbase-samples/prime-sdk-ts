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
  GetActivityRequest,
  GetActivityResponse,
  GetPortfolioActivitiesRequest,
  GetPortfolioActivityResponse,
  ListPortfolioActivitiesRequest,
  ListPortfolioActivitiesResponse,
  ListEntityActivitiesRequest,
  ListEntityActivitiesResponse,
} from './types';

export interface IActivitiesService {
  getActivity(
    request: GetActivityRequest
  ): Promise<
    GetActivityResponse | CoinbasePrimeClientException | CoinbasePrimeException
  >;
  getPortfolioActivity(
    request: GetPortfolioActivitiesRequest
  ): Promise<
    | GetPortfolioActivityResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;
  listEntityActivities(
    request: ListEntityActivitiesRequest
  ): Promise<
    | ListEntityActivitiesResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;
  listPortfolioActivities(
    request: ListPortfolioActivitiesRequest
  ): Promise<
    | ListPortfolioActivitiesResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;
}

export class ActivitiesService implements IActivitiesService {
  private client: CoinbasePrimeClient;

  constructor(client: CoinbasePrimeClient) {
    this.client = client;
  }

  async getActivity(
    request: GetActivityRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    GetActivityResponse | CoinbasePrimeClientException | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `activities/${request.activityId}`,
      callOptions: options,
    });

    return response.data as GetActivityResponse;
  }

  async getPortfolioActivity(
    request: GetPortfolioActivitiesRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | GetPortfolioActivityResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/activities/${request.activityId}`,
      callOptions: options,
    });

    return response.data as GetPortfolioActivityResponse;
  }

  async listEntityActivities(
    request: ListEntityActivitiesRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListEntityActivitiesResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const queryParams = { ...request, entityId: undefined };
    const response = await this.client.request({
      url: `entities/${request.entityId}/activities`,
      queryParams,
      callOptions: options,
    });

    return response.data as ListEntityActivitiesResponse;
  }

  async listPortfolioActivities(
    request: ListPortfolioActivitiesRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListPortfolioActivitiesResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const queryParams = { ...request, portfolioId: undefined };
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/activities`,
      queryParams,
      callOptions: options,
    });

    return response.data as ListPortfolioActivitiesResponse;
  }
}
