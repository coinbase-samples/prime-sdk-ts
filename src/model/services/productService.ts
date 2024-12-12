import { GetPortfolioProductsResponse } from '../GetPortfolioProductsResponse';
import { Pagination } from './pagination';

export type ListProductsRequest = Pagination & {
  portfolioId: string;
};

export type ListProductsResponse = GetPortfolioProductsResponse;
