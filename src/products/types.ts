import { GetPortfolioProductsResponse } from '../model/GetPortfolioProductsResponse';
import { Pagination } from '../shared/pagination';

export type ListProductsRequest = Pagination & {
  portfolioId: string;
};

export type ListProductsResponse = GetPortfolioProductsResponse;
