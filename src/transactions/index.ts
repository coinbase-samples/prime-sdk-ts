import { CoinbaseCallOptions, Method } from '../../../core-ts/dist';
import { CoinbasePrimeClient } from '../client';
import {
  CoinbasePrimeClientException,
  CoinbasePrimeException,
} from '../errors';
import {
  CreateConversionRequest,
  CreateConversionResponse,
  CreateTransferRequest,
  CreateTransferResponse,
  CreateWithdrawalRequest,
  CreateWithdrawalResponse,
  GetTransactionRequest,
  GetTransactionResponse,
  ListPortfolioTransactionsRequest,
  ListPortfolioTransactionsResponse,
  ListWalletTransactionsRequest,
  ListWalletTransactionsResponse,
} from './types';

export interface ITransactionsService {
  getTransaction(
    request: GetTransactionRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | GetTransactionResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;

  listPortfolioTransactions(
    request: ListPortfolioTransactionsRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListPortfolioTransactionsResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;

  listWalletTransactions(
    request: ListWalletTransactionsRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListWalletTransactionsResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;

  createConversion(
    request: CreateConversionRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | CreateConversionResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;

  createTransfer(
    request: CreateTransferRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | CreateTransferResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;

  createWithdrawal(
    request: CreateWithdrawalRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | CreateWithdrawalResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;
}

export class TransactionsService implements ITransactionsService {
  private client: CoinbasePrimeClient;

  constructor(client: CoinbasePrimeClient) {
    this.client = client;
  }

  async getTransaction(
    request: GetTransactionRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | GetTransactionResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/transactions/${request.transactionId}`,
      callOptions: options,
    });

    return response.data as GetTransactionResponse;
  }

  async listPortfolioTransactions(
    request: ListPortfolioTransactionsRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListPortfolioTransactionsResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const queryParams = { ...request, portfolioId: undefined };
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/transactions`,
      queryParams,
      callOptions: options,
    });

    return response.data as ListPortfolioTransactionsResponse;
  }

  async listWalletTransactions(
    request: ListWalletTransactionsRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListWalletTransactionsResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const queryParams = {
      ...request,
      portfolioId: undefined,
      walletId: undefined,
    };
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/wallets/${request.walletId}/transactions`,
      queryParams,
      callOptions: options,
    });

    return response.data as ListWalletTransactionsResponse;
  }

  async createConversion(
    request: CreateConversionRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | CreateConversionResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const bodyParams = {
      ...request,
      portfolioId: undefined,
      walletId: undefined,
    };
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/wallets/${request.walletId}/conversions`,
      bodyParams,
      method: Method.POST,
      callOptions: options,
    });

    return response.data as CreateConversionResponse;
  }

  async createTransfer(
    request: CreateTransferRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | CreateTransferResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const bodyParams = {
      ...request,
      portfolioId: undefined,
      walletId: undefined,
    };
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/wallets/${request.walletId}/transfers`,
      bodyParams,
      method: Method.POST,
      callOptions: options,
    });

    return response.data as CreateTransferResponse;
  }

  async createWithdrawal(
    request: CreateWithdrawalRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | CreateWithdrawalResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const bodyParams = {
      ...request,
      portfolioId: undefined,
      walletId: undefined,
    };
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/wallets/${request.walletId}/withdrawals`,
      bodyParams,
      method: Method.POST,
      callOptions: options,
    });

    return response.data as CreateWithdrawalResponse;
  }
}
