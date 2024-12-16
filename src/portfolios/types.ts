import { GetPortfolioResponse as internalGet } from '../model/GetPortfolioResponse';
import { GetPortfoliosResponse } from '../model/GetPortfoliosResponse';
import { GetPostTradeCreditResponse } from '../model/GetPostTradeCreditResponse';

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
