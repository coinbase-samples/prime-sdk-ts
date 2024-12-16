import { CoinbaseCallOptions } from '../../../core-ts/dist';
import { CoinbasePrimeClient } from '../client';
import {
  CoinbasePrimeClientException,
  CoinbasePrimeException,
} from '../errors';
import {
  ListPortfolioUsersRequest,
  ListPortfolioUsersResponse,
  ListUsersRequest,
  ListUsersResponse,
} from './types';

export interface IUsersService {
  listUsers(
    request: ListUsersRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    ListUsersResponse | CoinbasePrimeClientException | CoinbasePrimeException
  >;
  listPortfolioUsers(
    request: ListPortfolioUsersRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListPortfolioUsersResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;
}

export class UsersService implements IUsersService {
  private client: CoinbasePrimeClient;

  constructor(client: CoinbasePrimeClient) {
    this.client = client;
  }

  async listUsers(
    request: ListUsersRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    ListUsersResponse | CoinbasePrimeClientException | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `entities/${request.entityId}/users`,
      callOptions: options,
    });

    return response.data as ListPortfolioUsersResponse;
  }

  async listPortfolioUsers(
    request: ListPortfolioUsersRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListPortfolioUsersResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/users`,
      callOptions: options,
    });

    return response.data as ListPortfolioUsersResponse;
  }
}
