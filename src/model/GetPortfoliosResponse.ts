import { Portfolio } from './Portfolio';

export type GetPortfoliosResponse = {
  /**
   * A list of portfolios.
   */
  portfolios?: Array<Portfolio>;
};
