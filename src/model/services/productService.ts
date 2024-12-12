import { GetPortfolioProductsResponse } from '../GetPortfolioProductsResponse';
import { PaginatedResponse } from '../PaginatedResponse';

export type ListProductsRequest = PaginatedResponse & {
  portfolioId: string;
};

export type ListProductsResponse = GetPortfolioProductsResponse;
