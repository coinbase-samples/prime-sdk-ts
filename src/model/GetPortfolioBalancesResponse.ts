import { AggregatedFiatBalance } from './AggregatedFiatBalance';
import { Balance } from './Balance';
import { PortfolioBalanceType } from './enums/PortfolioBalanceType';

export type GetPortfolioBalancesResponse = {
  /**
   * A list of balances.
   */
  balances?: Array<Balance>;
  type?: PortfolioBalanceType;
  tradingBalances?: AggregatedFiatBalance;
  vaultBalances?: AggregatedFiatBalance;
};
