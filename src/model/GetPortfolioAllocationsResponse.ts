import { Allocation } from './Allocation';
import { PaginatedResponse } from './PaginatedResponse';

export type GetPortfolioAllocationsResponse = {
  /**
   * List of allocations.
   */
  allocations?: Array<Allocation>;
  pagination?: PaginatedResponse;
};
