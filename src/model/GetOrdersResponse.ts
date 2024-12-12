import { Order } from './Order';
import { PaginatedResponse } from './PaginatedResponse';

export type GetOrdersResponse = {
  orders?: Array<Order>;
  pagination?: PaginatedResponse;
};
