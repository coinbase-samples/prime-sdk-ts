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
  ListOpenOrdersResponse,
  ListOpenOrdersRequest,
  ListOrderFillsRequest,
  ListOrderFillsResponse,
  ListPortfolioOrdersResponse,
  ListPortfolioOrdersRequest,
  GetOrderResponse,
  GetOrderRequest,
  GetOrderEditHistoryRequest,
  GetOrderEditHistoryResponse,
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
import {
  createPaginatedResponse,
  getDefaultPaginationOptions,
  getQueryParams,
  ResponseExtractors,
} from '../shared/paginatedResponse';

export interface IOrdersService {
  getOrder(
    request: GetOrderRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetOrderResponse>;

  getOrderEditHistory(
    request: GetOrderEditHistoryRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetOrderEditHistoryResponse>;

  listPortfolioFills(
    request: ListPortfolioFillsRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListPortfolioFillsResponse>;

  listPortfolioOrders(
    request: ListPortfolioOrdersRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListPortfolioOrdersResponse>;

  listOrderFills(
    request: ListOrderFillsRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListOrderFillsResponse>;

  listOpenOrders(
    request: ListOpenOrdersRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListOpenOrdersResponse>;

  createOrderPreview(
    request: CreateOrderPreviewRequest,
    options?: CoinbaseCallOptions
  ): Promise<CreateOrderPreviewResponse>;

  cancelOrder(
    request: CancelOrderRequest,
    options?: CoinbaseCallOptions
  ): Promise<CancelOrderResponse>;

  createOrder(
    request: CreateOrderRequest,
    options?: CoinbaseCallOptions
  ): Promise<CreateOrderResponse>;

  createQuote(
    request: CreateQuoteRequest,
    options?: CoinbaseCallOptions
  ): Promise<CreateQuoteResponse>;

  acceptQuote(
    request: AcceptQuoteRequest,
    options?: CoinbaseCallOptions
  ): Promise<AcceptQuoteResponse>;
}

export class OrdersService implements IOrdersService {
  private client: CoinbasePrimeClient;

  constructor(client: CoinbasePrimeClient) {
    this.client = client;
  }

  async getOrder(
    request: GetOrderRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetOrderResponse> {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/orders/${request.orderId}`,
      callOptions: options,
    });

    return response.data as GetOrderResponse;
  }

  async getOrderEditHistory(
    request: GetOrderEditHistoryRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetOrderEditHistoryResponse> {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/orders/${request.orderId}/edit_history`,
      callOptions: options,
    });

    // drop deprecated field
    delete response.data.orderEditHistory;

    return response.data as GetOrderEditHistoryResponse;
  }

  async listPortfolioFills(
    request: ListPortfolioFillsRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListPortfolioFillsResponse> {
    let queryParams = getQueryParams(this.client, request);

    if (request.startDate) {
      queryParams.startDate = new Date(request.startDate).toISOString();
    }
    if (request.endDate) {
      queryParams.endDate = new Date(request.endDate).toISOString();
    }
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/fills`,
      queryParams,
      callOptions: options,
    });

    const paginationOptions = getDefaultPaginationOptions(this.client, options);

    return createPaginatedResponse(
      response.data,
      this.listPortfolioFills.bind(this),
      request,
      ResponseExtractors.fills,
      paginationOptions
    ) as ListPortfolioFillsResponse;
  }

  async listPortfolioOrders(
    request: ListPortfolioOrdersRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListPortfolioOrdersResponse> {
    let queryParams = getQueryParams(this.client, request);

    if (request.orderStatuses) {
      queryParams.orderStatuses = request.orderStatuses;
    }
    if (request.productIds) {
      queryParams.productIds = request.productIds;
    }
    if (request.orderType) {
      queryParams.orderType = request.orderType;
    }
    if (request.orderSide) {
      queryParams.orderSide = request.orderSide;
    }
    if (request.startDate) {
      queryParams.startDate = new Date(request.startDate).toISOString();
    }
    if (request.endDate) {
      queryParams.endDate = new Date(request.endDate).toISOString();
    }
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/orders`,
      queryParams,
      callOptions: options,
    });

    const paginationOptions = getDefaultPaginationOptions(this.client, options);

    return createPaginatedResponse(
      response.data,
      this.listPortfolioOrders.bind(this),
      request,
      ResponseExtractors.orders,
      paginationOptions
    ) as ListPortfolioOrdersResponse;
  }

  async listOrderFills(
    request: ListOrderFillsRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListOrderFillsResponse> {
    const queryParams = getQueryParams(this.client, request);

    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/orders/${request.orderId}/fills`,
      queryParams,
      callOptions: options,
    });

    const paginationOptions = getDefaultPaginationOptions(this.client, options);

    return createPaginatedResponse(
      response.data,
      this.listOrderFills.bind(this),
      request,
      ResponseExtractors.fills,
      paginationOptions
    ) as ListOrderFillsResponse;
  }

  async listOpenOrders(
    request: ListOpenOrdersRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListOpenOrdersResponse> {
    let queryParams = getQueryParams(this.client, request);
    if (request.productIds) {
      queryParams.productIds = request.productIds;
    }
    if (request.orderType) {
      queryParams.orderType = request.orderType;
    }
    if (request.orderSide) {
      queryParams.orderSide = request.orderSide;
    }
    if (request.startDate) {
      queryParams.startDate = new Date(request.startDate).toISOString();
    }
    if (request.endDate) {
      queryParams.endDate = new Date(request.endDate).toISOString();
    }
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/open_orders`,
      queryParams,
      callOptions: options,
    });

    const paginationOptions = getDefaultPaginationOptions(this.client, options);

    return createPaginatedResponse(
      response.data,
      this.listOpenOrders.bind(this),
      request,
      ResponseExtractors.orders,
      paginationOptions
    ) as ListOpenOrdersResponse;
  }

  async createOrderPreview(
    request: CreateOrderPreviewRequest,
    options?: CoinbaseCallOptions
  ): Promise<CreateOrderPreviewResponse> {
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
  ): Promise<CancelOrderResponse> {
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
  ): Promise<CreateOrderResponse> {
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
  ): Promise<CreateQuoteResponse> {
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
  ): Promise<AcceptQuoteResponse> {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/accept_quote`,
      method: Method.POST,
      bodyParams: request,
      callOptions: options,
    });
    return response.data as AcceptQuoteResponse;
  }
}
