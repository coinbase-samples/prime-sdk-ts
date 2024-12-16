import { GetPortfolioCommissionResponse as internalGet } from '../model/GetPortfolioCommissionResponse';

export type GetPortfolioCommissionRequest = {
  portfolioId: string;
};

export type GetPortfolioCommissionResponse = internalGet;
