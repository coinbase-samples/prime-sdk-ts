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
