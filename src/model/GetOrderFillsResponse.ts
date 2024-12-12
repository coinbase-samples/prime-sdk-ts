import { Fill } from './Fill';
import { PaginatedResponse } from './PaginatedResponse';

export type GetOrderFillsResponse = {
  fills?: Array<Fill>;
  pagination?: PaginatedResponse;
};
