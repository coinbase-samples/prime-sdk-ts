/**
 * Copyright 2026-present Coinbase Global, Inc.
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
import { validate } from '../shared/validation';
import {
  CancelAdvancedTransferRequest,
  CancelAdvancedTransferResponse,
  CreateAdvancedTransferRequest,
  CreateAdvancedTransferResponse,
  ListAdvancedTransferTransactionsRequest,
  ListAdvancedTransferTransactionsResponse,
  ListAdvancedTransfersRequest,
  ListAdvancedTransfersResponse,
} from './types';

export interface IAdvancedTransfersService {
  listAdvancedTransfers(
    request: ListAdvancedTransfersRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListAdvancedTransfersResponse>;

  createAdvancedTransfer(
    request: CreateAdvancedTransferRequest,
    options?: CoinbaseCallOptions
  ): Promise<CreateAdvancedTransferResponse>;

  cancelAdvancedTransfer(
    request: CancelAdvancedTransferRequest,
    options?: CoinbaseCallOptions
  ): Promise<CancelAdvancedTransferResponse>;

  listAdvancedTransferTransactions(
    request: ListAdvancedTransferTransactionsRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListAdvancedTransferTransactionsResponse>;
}

export class AdvancedTransfersService implements IAdvancedTransfersService {
  private client: IPrimeApiClient;

  constructor(client: IPrimeApiClient) {
    this.client = client;
  }

  async listAdvancedTransfers(
    request: ListAdvancedTransfersRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListAdvancedTransfersResponse> {
    validate(request).requiredUUID((r) => r.portfolioId).check();

    const paginationParams = getQueryParams(this.client, request);
    const {
      limit,
      cursor,
      sortDirection,
      portfolioId,
      ...queryParams
    } = request;
    const finalQueryParams = {
      ...paginationParams,
      ...queryParams,
    };

    const response = await this.client.request({
      url: `portfolios/${portfolioId}/advanced_transfers`,
      queryParams: finalQueryParams,
      callOptions: options,
    });

    const paginationOptions = getDefaultPaginationOptions(this.client, options);

    return createPaginatedResponse(
      response.data,
      this.listAdvancedTransfers.bind(this),
      request,
      ResponseExtractors.advancedTransfers,
      paginationOptions
    ) as ListAdvancedTransfersResponse;
  }

  async createAdvancedTransfer(
    request: CreateAdvancedTransferRequest,
    options?: CoinbaseCallOptions
  ): Promise<CreateAdvancedTransferResponse> {
    validate(request).requiredUUID((r) => r.portfolioId).check();

    const { portfolioId, advancedTransfer } = request;
    const response = await this.client.request({
      url: `portfolios/${portfolioId}/advanced_transfers`,
      bodyParams: { advancedTransfer },
      method: Method.POST,
      callOptions: options,
    });

    return response.data as CreateAdvancedTransferResponse;
  }

  async cancelAdvancedTransfer(
    request: CancelAdvancedTransferRequest,
    options?: CoinbaseCallOptions
  ): Promise<CancelAdvancedTransferResponse> {
    validate(request)
      .requiredUUID((r) => r.portfolioId)
      .requiredUUID((r) => r.advancedTransferId)
      .check();

    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/advanced_transfers/${request.advancedTransferId}/cancel`,
      bodyParams: {},
      method: Method.POST,
      callOptions: options,
    });

    return response.data as CancelAdvancedTransferResponse;
  }

  async listAdvancedTransferTransactions(
    request: ListAdvancedTransferTransactionsRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListAdvancedTransferTransactionsResponse> {
    validate(request)
      .requiredUUID((r) => r.portfolioId)
      .requiredUUID((r) => r.advancedTransferId)
      .check();

    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/advanced_transfers/${request.advancedTransferId}/transactions`,
      callOptions: options,
    });

    return response.data as ListAdvancedTransferTransactionsResponse;
  }
}
