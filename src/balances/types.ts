import { PortfolioBalanceType } from '../model/enums/PortfolioBalanceType';
import { VisibilityStatus } from '../model/enums/VisibilityStatus';
import { GetPortfolioBalancesResponse } from '../model/GetPortfolioBalancesResponse';
import { GetWalletBalanceResponse } from '../model/GetWalletBalanceResponse';
import { ListWeb3WalletBalancesResponse } from '../model/ListWeb3WalletBalancesResponse';

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
