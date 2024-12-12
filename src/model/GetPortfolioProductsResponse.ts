import { PaginatedResponse } from './PaginatedResponse';
import { Product } from './Product';

export type GetPortfolioProductsResponse = {
  products?: Array<Product>;
  pagination?: PaginatedResponse;
};
