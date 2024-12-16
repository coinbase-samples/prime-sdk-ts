import { CoinbaseCallOptions } from '../../../core-ts/dist';
import { CoinbasePrimeClient } from '../client';
import {
  CoinbasePrimeClientException,
  CoinbasePrimeException,
} from '../errors';
import {
  GetBalanceRequest,
  GetBalanceResponse,
  ListOnchainWalletBalancesRequest,
  ListOnchainWalletBalancesResponse,
  ListPortfolioBalancesRequest,
  ListPortfolioBalancesResponse,
} from './types';

export interface BalancesService {
  listPortfolioBalances(
    request: ListPortfolioBalancesRequest
  ): Promise<
    | ListPortfolioBalancesResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;

  getBalance(
    request: GetBalanceRequest
  ): Promise<
    GetBalanceResponse | CoinbasePrimeClientException | CoinbasePrimeException
  >;

  listOnchainWalletBalances(
    request: ListOnchainWalletBalancesRequest
  ): Promise<
    | ListOnchainWalletBalancesResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;
}

export class BalancesService implements BalancesService {
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
    request: GetBalanceRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    GetBalanceResponse | CoinbasePrimeClientException | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/wallets/${request.walletId}balances`,
      callOptions: options,
    });

    return response.data as GetBalanceResponse;
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
