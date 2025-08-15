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
import { IPrimeApiClient, CoinbaseCallOptions, Method } from '../clients';
import {
  createPaginatedResponse,
  ResponseExtractors,
  getDefaultPaginationOptions,
  getQueryParams,
} from '../shared/paginatedResponse';
import {
  CreateConversionRequest,
  CreateConversionResponse,
  CreateOnchainTransactionRequest,
  CreateOnchainTransactionResponse,
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
  ): Promise<GetTransactionResponse>;

  listPortfolioTransactions(
    request: ListPortfolioTransactionsRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListPortfolioTransactionsResponse>;

  listWalletTransactions(
    request: ListWalletTransactionsRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListWalletTransactionsResponse>;

  createConversion(
    request: CreateConversionRequest,
    options?: CoinbaseCallOptions
  ): Promise<CreateConversionResponse>;

  createTransfer(
    request: CreateTransferRequest,
    options?: CoinbaseCallOptions
  ): Promise<CreateTransferResponse>;

  createWithdrawal(
    request: CreateWithdrawalRequest,
    options?: CoinbaseCallOptions
  ): Promise<CreateWithdrawalResponse>;

  createOnchainTransaction(
    request: CreateOnchainTransactionRequest,
    options?: CoinbaseCallOptions
  ): Promise<CreateOnchainTransactionResponse>;
}

export class TransactionsService implements ITransactionsService {
  private client: IPrimeApiClient;

  constructor(client: IPrimeApiClient) {
    this.client = client;
  }

  async getTransaction(
    request: GetTransactionRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetTransactionResponse> {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/transactions/${request.transactionId}`,
      callOptions: options,
    });

    return response.data as GetTransactionResponse;
  }

  async listPortfolioTransactions(
    request: ListPortfolioTransactionsRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListPortfolioTransactionsResponse> {
    const paginationParams = getQueryParams(this.client, request);
    const { limit, cursor, sortDirection, portfolioId, ...queryParams } =
      request;
    const finalQueryParams = {
      ...paginationParams,
      ...queryParams,
    };
    const response = await this.client.request({
      url: `portfolios/${portfolioId}/transactions`,
      queryParams: finalQueryParams,
      callOptions: options,
    });

    const responseData = response.data;

    // Merge client defaults with call options
    const paginationOptions = getDefaultPaginationOptions(this.client, options);

    // Enhance the response with pagination methods
    return createPaginatedResponse(
      responseData,
      this.listPortfolioTransactions.bind(this),
      request,
      ResponseExtractors.transactions,
      paginationOptions
    ) as ListPortfolioTransactionsResponse;
  }

  async listWalletTransactions(
    request: ListWalletTransactionsRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListWalletTransactionsResponse> {
    const paginationParams = getQueryParams(this.client, request);
    const {
      limit,
      cursor,
      sortDirection,
      portfolioId,
      walletId,
      ...queryParams
    } = request;
    const finalQueryParams = {
      ...paginationParams,
      ...queryParams,
    };
    const response = await this.client.request({
      url: `portfolios/${portfolioId}/wallets/${walletId}/transactions`,
      queryParams: finalQueryParams,
      callOptions: options,
    });

    const responseData = response.data;

    // Merge client defaults with call options
    const paginationOptions = getDefaultPaginationOptions(this.client, options);

    // Enhance the response with pagination methods
    return createPaginatedResponse(
      responseData,
      this.listWalletTransactions.bind(this),
      request,
      ResponseExtractors.transactions,
      paginationOptions
    ) as ListWalletTransactionsResponse;
  }

  async createConversion(
    request: CreateConversionRequest,
    options?: CoinbaseCallOptions
  ): Promise<CreateConversionResponse> {
    const bodyParams = {
      ...request,
      portfolioId: undefined,
      walletId: undefined,
    };
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/wallets/${request.walletId}/conversion`,
      bodyParams,
      method: Method.POST,
      callOptions: options,
    });

    return response.data as CreateConversionResponse;
  }

  async createTransfer(
    request: CreateTransferRequest,
    options?: CoinbaseCallOptions
  ): Promise<CreateTransferResponse> {
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
  ): Promise<CreateWithdrawalResponse> {
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

  async createOnchainTransaction(
    request: CreateOnchainTransactionRequest,
    options?: CoinbaseCallOptions
  ): Promise<CreateOnchainTransactionResponse> {
    const bodyParams = {
      ...request,
      portfolioId: undefined,
      walletId: undefined,
    };
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/wallets/${request.walletId}/onchain_transaction`,
      bodyParams,
      method: Method.POST,
      callOptions: options,
    });

    return response.data as CreateOnchainTransactionResponse;
  }
}
