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
} from '../model/services/usersService';

export interface UsersService {
  listUsers(
    request: ListUsersRequest
  ): Promise<
    ListUsersResponse | CoinbasePrimeClientException | CoinbasePrimeException
  >;
  listPortfolioUsers(
    request: ListPortfolioUsersRequest
  ): Promise<
    | ListPortfolioUsersResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;
}

export class UsersService implements UsersService {
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
