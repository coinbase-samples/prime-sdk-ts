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
  ListEntityPaymentMethodsRequest,
  ListEntityPaymentMethodsResponse,
  GetPaymentMethodRequest,
  GetPaymentMethodResponse,
} from './types';

export interface IPaymentMethodsService {
  listEntityPaymentMethods(
    request: ListEntityPaymentMethodsRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListEntityPaymentMethodsResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;
  getPaymentMethod(
    request: GetPaymentMethodRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | GetPaymentMethodResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;
}

export class PaymentMethodsService implements IPaymentMethodsService {
  private client: CoinbasePrimeClient;

  constructor(client: CoinbasePrimeClient) {
    this.client = client;
  }

  async listEntityPaymentMethods(
    request: ListEntityPaymentMethodsRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListEntityPaymentMethodsResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `entities/${request.entityId}/payment-methods`,
      callOptions: options,
    });

    return response.data as ListEntityPaymentMethodsResponse;
  }

  async getPaymentMethod(
    request: GetPaymentMethodRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | GetPaymentMethodResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `entities/${request.entityId}/payment-methods`,
      callOptions: options,
    });

    return response.data as GetPaymentMethodResponse;
  }
}
