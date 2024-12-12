import { AmountDue } from './AmountDue';

export type PostTradeCreditInformation = {
  /**
   * The unique ID of the portfolio
   */
  portfolioId?: string;
  /**
   * The currency symbol credit is denoted in
   */
  currency?: string;
  /**
   * The maximum credit limit
   */
  limit?: string;
  /**
   * The amount of credit used
   */
  utilized?: string;
  /**
   * The amount of credit available
   */
  available?: string;
  /**
   * Whether or not a portfolio is frozen due to balance outstanding or other reason
   */
  frozen?: boolean;
  /**
   * The reason why the portfolio is frozen
   */
  frozenReason?: string;
  amountsDue?: Array<AmountDue>;
  /**
   * Whether the portfolio has credit enabled
   */
  enabled?: boolean;
  /**
   * The amount of adjusted credit used
   */
  adjustedCreditUtilized?: string;
  /**
   * The amount of adjusted portfolio equity
   */
  adjustedPortfolioEquity?: string;
};
