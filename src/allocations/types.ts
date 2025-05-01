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
import { Brand } from 'src/shared/brand';
import {
  CreateAllocationRequest as internalCreate,
  CreateAllocationResponse as internalResponse,
  CreateNetAllocationResponse as internalNetCreate,
  GetPortfolioAllocationsResponse,
  GetAllocationResponse as internalGet,
  GetAllocationsByClientNettingIdResponse,
} from '../model/';
import { OrderSide } from '../model/enums/';
import { Pagination } from '../shared/pagination';

export type CreateAllocationRequest = Brand<
  internalCreate,
  'CreateAllocationRequest'
>;

export type CreateAllocationResponse = Brand<
  internalResponse,
  'CreateAllocationResponse'
>;

export type CreateNetAllocationRequest = Brand<
  internalCreate,
  'CreateNetAllocationRequest'
>;

export type CreateNetAllocationResponse = Brand<
  internalNetCreate,
  'CreateNetAllocationResponse'
>;

export type ListPortfolioAllocationsRequest = Pagination & {
  portfolioId: string;
  productIds?: string[];
  orderSide?: OrderSide;
  startDate?: string;
  endDate?: string;
};

export type ListPortfolioAllocationsResponse = Brand<
  GetPortfolioAllocationsResponse,
  'ListPortfolioAllocationsResponse'
>;

export type ListNetAllocationsRequest = {
  portfolioId: string;
  nettingId: string;
  allocationId?: string;
};

export type ListNetAllocationsResponse = Brand<
  GetAllocationsByClientNettingIdResponse,
  'ListNetAllocationsResponse'
>;

export type GetAllocationRequest = {
  portfolioId: string;
  allocationId: string;
};

export type GetAllocationResponse = Brand<internalGet, 'GetAllocationResponse'>;
