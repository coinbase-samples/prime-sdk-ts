import { PortfolioBalanceType } from '../enums/PortfolioBalanceType';
import { VisibilityStatus } from '../enums/VisibilityStatus';
import { GetPortfolioBalancesResponse } from '../GetPortfolioBalancesResponse';
import { GetWalletBalanceResponse } from '../GetWalletBalanceResponse';
import { ListWeb3WalletBalancesResponse } from '../ListWeb3WalletBalancesResponse';

export type ListPortfolioBalancesRequest = {
  portfolioId: string;
  symbol: string;
  balanceType?: PortfolioBalanceType;
};

export type ListPortfolioBalancesResponse = GetPortfolioBalancesResponse;

export type GetBalanceRequest = {
  portfolioId: string;
  walletId: string;
};

export type GetBalanceResponse = GetWalletBalanceResponse;

export type ListOnchainWalletBalancesRequest = {
  portfolioId: string;
  walletId: string;
  visibilityStatuses?: VisibilityStatus[];
  cursor?: string;
  limit?: number;
};

export type ListOnchainWalletBalancesResponse = ListWeb3WalletBalancesResponse;
