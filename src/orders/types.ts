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
import { Brand } from '../shared/brand';
import { OrderSide, OrderStatus, OrderType } from '../model/enums/';
import {
  GetOpenOrdersResponse,
  GetOrderFillsResponse,
  GetOrderResponse as internalGet,
  GetOrdersResponse,
  GetPortfolioFillsResponse,
  OrderPreviewRequest,
  PostOrderPreviewResponse,
  CancelOrderResponse as internalCancel,
  CreateOrderResponse as internalCreateResp,
  CreateOrderRequest as internalCreate,
  QuoteResponse,
  AcceptQuoteRequest as internalAcceptQuoteReq,
  AcceptQuoteResponse as internalAcceptQuoteResp,
} from '../model/';
import { Pagination } from '../shared/pagination';
import {
  BasePaginatedRequest,
  PaginatedResponseMethods,
} from '../shared/paginatedResponse';

export type GetOrderRequest = {
  portfolioId: string;
  orderId: string;
};

export type GetOrderResponse = Brand<internalGet, 'GetOrderResponse'>;

export type ListPortfolioFillsRequest = Pagination & {
  portfolioId: string;
  startDate?: string;
  endDate?: string;
};

export type BaseListPortfolioFillsResponse = Brand<
  GetPortfolioFillsResponse,
  'ListPortfolioFillsResponse'
>;

export type ListPortfolioFillsResponse = BaseListPortfolioFillsResponse &
  PaginatedResponseMethods<
    ListPortfolioFillsRequest & BasePaginatedRequest,
    BaseListPortfolioFillsResponse,
    any // Fill type
  >;

export type ListPortfolioOrdersRequest = Pagination & {
  portfolioId: string;
  orderStatuses?: OrderStatus[];
  productIds?: string[];
  orderType?: OrderType;
  orderSide?: OrderSide;
  startDate?: string;
  endDate?: string;
};

export type BaseListPortfolioOrdersResponse = Brand<
  GetOrdersResponse,
  'ListPortfolioOrdersResponse'
>;

export type ListPortfolioOrdersResponse = BaseListPortfolioOrdersResponse &
  PaginatedResponseMethods<
    ListPortfolioOrdersRequest & BasePaginatedRequest,
    BaseListPortfolioOrdersResponse,
    any // Order type
  >;

export type ListOrderFillsRequest = Pagination & {
  portfolioId: string;
  orderId: string;
};

export type BaseListOrderFillsResponse = Brand<
  GetOrderFillsResponse,
  'ListOrderFillsResponse'
>;

export type ListOrderFillsResponse = BaseListOrderFillsResponse &
  PaginatedResponseMethods<
    ListOrderFillsRequest & BasePaginatedRequest,
    BaseListOrderFillsResponse,
    any // Fill type
  >;

export type ListOpenOrdersRequest = Pagination & {
  portfolioId: string;
  productIds?: string[];
  orderType?: OrderType;
  orderSide?: OrderSide;
  startDate?: string;
  endDate: string;
};

export type BaseListOpenOrdersResponse = Brand<
  GetOpenOrdersResponse,
  'ListOpenOrdersResponse'
>;

export type ListOpenOrdersResponse = BaseListOpenOrdersResponse &
  PaginatedResponseMethods<
    ListOpenOrdersRequest & BasePaginatedRequest,
    BaseListOpenOrdersResponse,
    any // Order type
  >;

export type CreateOrderPreviewRequest = OrderPreviewRequest & {
  portfolioId: string;
};

export type CreateOrderPreviewResponse = Brand<
  PostOrderPreviewResponse,
  'CreateOrderPreviewResponse'
>;

export type CancelOrderRequest = {
  portfolioId: string;
  orderId: string;
};

export type CancelOrderResponse = Brand<internalCancel, 'CancelOrderResponse'>;

export type CreateOrderRequest = internalCreate & {
  portfolioId: string;
};
export type CreateOrderResponse = Brand<
  internalCreateResp,
  'CreateOrderResponse'
>;

export type CreateQuoteRequest = internalCreate & {
  portfolioId: string;
};

export type CreateQuoteResponse = Brand<QuoteResponse, 'CreateQuoteResponse'>;

export type AcceptQuoteRequest = internalAcceptQuoteReq & {
  portfolioId: string;
};

export type AcceptQuoteResponse = Brand<
  internalAcceptQuoteResp,
  'AcceptQuoteResponse'
>;
