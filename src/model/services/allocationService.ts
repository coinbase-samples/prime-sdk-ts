import { CreateAllocationRequest as internalCreate } from '../CreateAllocationRequest';
import { CreateAllocationResponse as internalResponse } from '../CreateAllocationResponse';
import { CreateNetAllocationResponse as internalNetCreate } from '../CreateNetAllocationResponse';
import { GetPortfolioAllocationsResponse } from '../GetPortfolioAllocationsResponse';
import { GetAllocationResponse as internalGet } from '../GetAllocationResponse';
import { GetAllocationsByClientNettingIdResponse } from '../GetAllocationsByClientNettingIdResponse';

export type CreateAllocationRequest = internalCreate;

export type CreateAllocationResponse = internalResponse;

export type CreateNetAllocationRequest = internalCreate;

export type CreateNetAllocationResponse = internalNetCreate;

export type ListPortfolioAllocationsRequest = {
  portfolioId: string;
};

export type ListPortfolioAllocationsResponse = GetPortfolioAllocationsResponse;

export type ListNetAllocationsRequest = {
  portfolioId: string;
  nettingId: string;
};

export type ListNetAllocationsResponse =
  GetAllocationsByClientNettingIdResponse;

export type GetAllocationRequest = {
  portfolioId: string;
  allocationId: string;
};

export type GetAllocationResponse = internalGet;
