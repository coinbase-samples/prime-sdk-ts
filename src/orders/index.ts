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
import { CoinbaseCallOptions, Method } from '@coinbase-sample/core-ts';
import { CoinbasePrimeClient } from '../client';
import {
  CoinbasePrimeClientException,
  CoinbasePrimeException,
} from '../errors';
import {
  ListOpenOrdersResponse,
  ListOpenOrdersRequest,
  ListOrderFillsRequest,
  ListOrderFillsResponse,
  ListPortfolioOrdersResponse,
  ListPortfolioOrdersRequest,
  GetOrderResponse,
  GetOrderRequest,
  ListPortfolioFillsRequest,
  ListPortfolioFillsResponse,
  CreateOrderPreviewRequest,
  CreateOrderPreviewResponse,
  CancelOrderRequest,
  CancelOrderResponse,
  CreateOrderRequest,
  CreateOrderResponse,
  CreateQuoteRequest,
  CreateQuoteResponse,
  AcceptQuoteRequest,
  AcceptQuoteResponse,
} from './types';

export interface IOrdersService {
  getOrder(
    request: GetOrderRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    GetOrderResponse | CoinbasePrimeClientException | CoinbasePrimeException
  >;

  listPortfolioFills(
    request: ListPortfolioFillsRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListPortfolioFillsResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;

  listPortfolioOrders(
    request: ListPortfolioOrdersRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListPortfolioOrdersResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;

  listOrderFills(
    request: ListOrderFillsRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListOrderFillsResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;

  listOpenOrders(
    request: ListOpenOrdersRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListOpenOrdersResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;

  createOrderPreview(
    request: CreateOrderPreviewRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | CreateOrderPreviewResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;

  cancelOrder(
    request: CancelOrderRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    CancelOrderResponse | CoinbasePrimeClientException | CoinbasePrimeException
  >;

  createOrder(
    request: CreateOrderRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    CreateOrderResponse | CoinbasePrimeClientException | CoinbasePrimeException
  >;

  createQuote(
    request: CreateQuoteRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    CreateQuoteResponse | CoinbasePrimeClientException | CoinbasePrimeException
  >;

  acceptQuote(
    request: AcceptQuoteRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    AcceptQuoteResponse | CoinbasePrimeClientException | CoinbasePrimeException
  >;
}

export class OrdersService implements IOrdersService {
  private client: CoinbasePrimeClient;

  constructor(client: CoinbasePrimeClient) {
    this.client = client;
  }

  async getOrder(
    request: GetOrderRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    GetOrderResponse | CoinbasePrimeClientException | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/orders/${request.orderId}`,
      callOptions: options,
    });

    return response.data as GetOrderResponse;
  }

  async listPortfolioFills(
    request: ListPortfolioFillsRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListPortfolioFillsResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const queryParams = { ...request, portfolioId: undefined };
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/fills`,
      queryParams,
      callOptions: options,
    });

    return response.data as ListPortfolioFillsResponse;
  }

  async listPortfolioOrders(
    request: ListPortfolioOrdersRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListPortfolioOrdersResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const queryParams = { ...request, portfolioId: undefined };
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/orders`,
      queryParams,
      callOptions: options,
    });
    return response.data as ListPortfolioOrdersResponse;
  }

  async listOrderFills(
    request: ListOrderFillsRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListOrderFillsResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const queryParams = {
      ...request,
      portfolioId: undefined,
      orderId: undefined,
    };
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/orders/${request.orderId}/fills`,
      queryParams,
      callOptions: options,
    });
    return response.data as ListOrderFillsResponse;
  }

  async listOpenOrders(
    request: ListOpenOrdersRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListOpenOrdersResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const queryParams = { ...request, portfolioId: undefined };
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/open_orders`,
      queryParams,
      callOptions: options,
    });
    return response.data as ListOpenOrdersResponse;
  }

  async createOrderPreview(
    request: CreateOrderPreviewRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | CreateOrderPreviewResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/orders_preview`,
      method: Method.POST,
      bodyParams: request,
      callOptions: options,
    });
    return response.data as CreateOrderPreviewResponse;
  }

  async cancelOrder(
    request: CancelOrderRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    CancelOrderResponse | CoinbasePrimeClientException | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/orders/${request.orderId}/cancel`,
      method: Method.POST,
      callOptions: options,
    });
    return response.data as CancelOrderResponse;
  }

  async createOrder(
    request: CreateOrderRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    CreateOrderResponse | CoinbasePrimeClientException | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/order`,
      method: Method.POST,
      bodyParams: request,
      callOptions: options,
    });
    return response.data as CreateOrderResponse;
  }

  async createQuote(
    request: CreateQuoteRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    CreateQuoteResponse | CoinbasePrimeClientException | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/rfq`,
      method: Method.POST,
      bodyParams: request,
      callOptions: options,
    });
    return response.data as CreateQuoteResponse;
  }

  async acceptQuote(
    request: AcceptQuoteRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    AcceptQuoteResponse | CoinbasePrimeClientException | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/accept_quote`,
      method: Method.POST,
      bodyParams: request,
      callOptions: options,
    });
    return response.data as AcceptQuoteResponse;
  }
}
