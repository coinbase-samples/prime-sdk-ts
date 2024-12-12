import { Order } from './Order';
import { PaginatedResponse } from './PaginatedResponse';

export type GetOpenOrdersResponse = {
  orders?: Array<Order>;
  pagination?: PaginatedResponse;
};
