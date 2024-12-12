import { DefiBalance } from './DefiBalance';
import { PaginatedResponse } from './PaginatedResponse';
import { Web3Balance } from './Web3Balance';

export type ListWeb3WalletBalancesResponse = {
  balances?: Array<Web3Balance>;
  pagination?: PaginatedResponse;
  /**
   * DeFi balances only return for the initial request. No pagination support.
   */
  defiBalances?: Array<DefiBalance>;
};
