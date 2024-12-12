import { CoinbaseCallOptions, Method } from '../../../core-ts/dist';
import { CoinbasePrimeClient } from '../client';
import {
  CoinbasePrimeClientException,
  CoinbasePrimeException,
} from '../errors';
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
} from '../model/services/allocationService';

export interface AllocationService {
  createAllocation(
    request: CreateAllocationRequest
  ): Promise<
    | CreateAllocationResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;

  createNetAllocation(
    request: CreateNetAllocationRequest
  ): Promise<
    | CreateNetAllocationResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;

  listPortfolioAllocations(
    request: ListPortfolioAllocationsRequest
  ): Promise<
    | ListPortfolioAllocationsResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;

  listNetAllocations(
    request: CreateNetAllocationRequest
  ): Promise<
    | ListNetAllocationsResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;

  getAllocation(
    request: GetAllocationRequest
  ): Promise<
    | GetAllocationResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;
}

export class AllocationService implements AllocationService {
  private client: CoinbasePrimeClient;

  constructor(client: CoinbasePrimeClient) {
    this.client = client;
  }

  async createAllocation(
    request: CreateAllocationRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | CreateAllocationResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
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
  ): Promise<
    | CreateNetAllocationResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
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
  ): Promise<
    | ListPortfolioAllocationsResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/allocations`,
      callOptions: options,
    });

    return response.data as ListPortfolioAllocationsResponse;
  }

  async listNetAllocations(
    request: ListNetAllocationsRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListNetAllocationsResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/allocations/net/${request.nettingId}`,
      callOptions: options,
    });

    return response.data as ListNetAllocationsResponse;
  }

  async getAllocation(
    request: GetAllocationRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | GetAllocationResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/allocations/${request.allocationId}`,
      callOptions: options,
    });

    return response.data as GetAllocationResponse;
  }
}
