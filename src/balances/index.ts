import { CoinbaseCallOptions } from '../../../core-ts/dist';
import { CoinbasePrimeClient } from '../client';
import {
  CoinbasePrimeClientException,
  CoinbasePrimeException,
} from '../errors';
import {
  GetWalletBalanceRequest,
  GetWalletBalanceResponse,
  ListOnchainWalletBalancesRequest,
  ListOnchainWalletBalancesResponse,
  ListPortfolioBalancesRequest,
  ListPortfolioBalancesResponse,
} from './types';

export interface IBalancesService {
  listPortfolioBalances(
    request: ListPortfolioBalancesRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListPortfolioBalancesResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;

  getWalletBalance(
    request: GetWalletBalanceRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | GetWalletBalanceResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;

  listOnchainWalletBalances(
    request: ListOnchainWalletBalancesRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListOnchainWalletBalancesResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;
}

export class BalancesService implements IBalancesService {
  private client: CoinbasePrimeClient;

  constructor(client: CoinbasePrimeClient) {
    this.client = client;
  }

  async listPortfolioBalances(
    request: ListPortfolioBalancesRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListPortfolioBalancesResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const queryParams = { ...request, portfolioId: undefined };
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/balances`,
      queryParams,
      callOptions: options,
    });

    return response.data as ListPortfolioBalancesResponse;
  }

  async getWalletBalance(
    request: GetWalletBalanceRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | GetWalletBalanceResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/wallets/${request.walletId}balances`,
      callOptions: options,
    });

    return response.data as GetWalletBalanceResponse;
  }

  async listOnchainWalletBalances(
    request: ListOnchainWalletBalancesRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListOnchainWalletBalancesResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const queryParams = {
      ...request,
      portfolioId: undefined,
      walletId: undefined,
    };
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}wallets/${request.walletId}/web3_balances`,
      queryParams,
      callOptions: options,
    });

    return response.data as ListOnchainWalletBalancesResponse;
  }
}
