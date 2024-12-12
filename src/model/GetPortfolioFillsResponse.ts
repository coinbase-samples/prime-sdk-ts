import { Fill } from './Fill';
import { PaginatedResponse } from './PaginatedResponse';

export type GetPortfolioFillsResponse = {
  fills?: Array<Fill>;
  pagination?: PaginatedResponse;
};
