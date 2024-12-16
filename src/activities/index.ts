import { CoinbaseCallOptions } from '../../../core-ts/dist';
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

export interface ActivitiesService {
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

export class ActivitiesService implements ActivitiesService {
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
