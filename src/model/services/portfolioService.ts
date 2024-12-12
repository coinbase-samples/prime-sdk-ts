import { GetPortfolioResponse as internalGet } from '../GetPortfolioResponse';
import { GetPortfoliosResponse } from '../GetPortfoliosResponse';
import { GetPostTradeCreditResponse } from '../GetPostTradeCreditResponse';

export type GetPortfolioRequest = {
  /**
   * The portfolio ID.
   */
  portfolioId: string;
};

export type GetPortfolioResponse = internalGet;

export type ListPortfoliosResponse = GetPortfoliosResponse;

export type GetPortfolioCreditRequest = {
  portfolioId: string;
};

export type GetPortfolioCreditResponse = GetPostTradeCreditResponse;
