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

import { ListInvoicesRequest, ListInvoicesResponse } from './types';
import {
  createPaginatedResponse,
  getDefaultPaginationOptions,
  getQueryParams,
  ResponseExtractors,
} from '../shared/paginatedResponse';

export interface IInvoicesService {
  listInvoices(
    request: ListInvoicesRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListInvoicesResponse>;
}

export class InvoicesService implements IInvoicesService {
  private client: CoinbasePrimeClient;

  constructor(client: CoinbasePrimeClient) {
    this.client = client;
  }

  async listInvoices(
    request: ListInvoicesRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListInvoicesResponse> {
    const paginationParams = getQueryParams(this.client, request);
    const { limit, cursor, sortDirection, entityId, ...queryParams } = request;
    const finalQueryParams = {
      ...paginationParams,
      ...queryParams,
    };

    const response = await this.client.request({
      url: `entities/${entityId}/invoices`,
      queryParams: finalQueryParams,
      callOptions: options,
    });

    const paginationOptions = getDefaultPaginationOptions(this.client, options);

    return createPaginatedResponse(
      response.data,
      this.listInvoices.bind(this),
      request,
      ResponseExtractors.invoices,
      paginationOptions
    ) as ListInvoicesResponse;
  }
}
