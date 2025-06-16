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
import { GetPortfolioProductsResponse } from '../model/';
import { Pagination } from '../shared/pagination';
import {
  PaginatedResponseMethods,
  BasePaginatedRequest,
} from '../shared/paginatedResponse';

export type ListProductsRequest = Pagination & {
  portfolioId: string;
};

export type BaseListProductsResponse = Brand<
  GetPortfolioProductsResponse,
  'ListProductsResponse'
>;

export type ListProductsResponse = BaseListProductsResponse &
  PaginatedResponseMethods<
    ListProductsRequest & BasePaginatedRequest,
    BaseListProductsResponse,
    any // Transaction type
  >;
