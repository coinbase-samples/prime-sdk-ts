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
  CreateAllocationRequest,
  CreateAllocationResponse,
  CreateNetAllocationRequest,
  CreateNetAllocationResponse,
  ListPortfolioAllocationsRequest,
  ListPortfolioAllocationsResponse,
  ListNetAllocationsRequest,
  ListNetAllocationsResponse,
  GetAllocationRequest,
  GetAllocationResponse,
} from './types';

export interface IAllocationService {
  createAllocation(
    request: CreateAllocationRequest,
    options?: CoinbaseCallOptions
  ): Promise<CreateAllocationResponse>;

  createNetAllocation(
    request: CreateNetAllocationRequest,
    options?: CoinbaseCallOptions
  ): Promise<CreateNetAllocationResponse>;

  listPortfolioAllocations(
    request: ListPortfolioAllocationsRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListPortfolioAllocationsResponse>;

  listNetAllocations(
    request: ListNetAllocationsRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListNetAllocationsResponse>;

  getAllocation(
    request: GetAllocationRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetAllocationResponse>;
}

export class AllocationService implements IAllocationService {
  private client: CoinbasePrimeClient;

  constructor(client: CoinbasePrimeClient) {
    this.client = client;
  }

  async createAllocation(
    request: CreateAllocationRequest,
    options?: CoinbaseCallOptions
  ): Promise<CreateAllocationResponse> {
    const response = await this.client.request({
      url: `allocations`,
      bodyParams: request,
      method: Method.POST,
      callOptions: options,
    });

    return response.data as CreateAllocationResponse;
  }

  async createNetAllocation(
    request: CreateNetAllocationRequest,
    options?: CoinbaseCallOptions
  ): Promise<CreateNetAllocationResponse> {
    const response = await this.client.request({
      url: `allocations/net`,
      bodyParams: request,
      method: Method.POST,
      callOptions: options,
    });

    return response.data as CreateNetAllocationResponse;
  }

  async listPortfolioAllocations(
    request: ListPortfolioAllocationsRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListPortfolioAllocationsResponse> {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/allocations`,
      callOptions: options,
    });

    return response.data as ListPortfolioAllocationsResponse;
  }

  async listNetAllocations(
    request: ListNetAllocationsRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListNetAllocationsResponse> {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/allocations/net/${request.nettingId}`,
      callOptions: options,
    });

    return response.data as ListNetAllocationsResponse;
  }

  async getAllocation(
    request: GetAllocationRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetAllocationResponse> {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/allocations/${request.allocationId}`,
      callOptions: options,
    });

    return response.data as GetAllocationResponse;
  }
}
