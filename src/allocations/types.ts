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
import { CreateAllocationRequest as internalCreate } from '../model/CreateAllocationRequest';
import { CreateAllocationResponse as internalResponse } from '../model/CreateAllocationResponse';
import { CreateNetAllocationResponse as internalNetCreate } from '../model/CreateNetAllocationResponse';
import { GetPortfolioAllocationsResponse } from '../model/GetPortfolioAllocationsResponse';
import { GetAllocationResponse as internalGet } from '../model/GetAllocationResponse';
import { GetAllocationsByClientNettingIdResponse } from '../model/GetAllocationsByClientNettingIdResponse';
import { OrderSide } from '../model/enums/OrderSide';
import { Pagination } from '../shared/pagination';

export type CreateAllocationRequest = internalCreate;

export type CreateAllocationResponse = internalResponse;

export type CreateNetAllocationRequest = internalCreate;

export type CreateNetAllocationResponse = internalNetCreate;

export type ListPortfolioAllocationsRequest = Pagination & {
  portfolioId: string;
  productIds?: string[];
  orderSide?: OrderSide;
  startDate?: string;
  endDate?: string;
};

export type ListPortfolioAllocationsResponse = GetPortfolioAllocationsResponse;

export type ListNetAllocationsRequest = {
  portfolioId: string;
  nettingId: string;
  allocationId?: string;
};

export type ListNetAllocationsResponse =
  GetAllocationsByClientNettingIdResponse;

export type GetAllocationRequest = {
  portfolioId: string;
  allocationId: string;
};

export type GetAllocationResponse = internalGet;
