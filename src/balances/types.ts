/**
 * Copyright 2024-present Coinbase Global, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { PortfolioBalanceType } from '../model/enums/PortfolioBalanceType';
import { VisibilityStatus } from '../model/enums/VisibilityStatus';
import { GetPortfolioBalancesResponse } from '../model/GetPortfolioBalancesResponse';
import { GetWalletBalanceResponse as internalGetResp } from '../model/GetWalletBalanceResponse';
import { ListWeb3WalletBalancesResponse } from '../model/ListWeb3WalletBalancesResponse';

export type ListPortfolioBalancesRequest = {
  portfolioId: string;
  symbol: string;
  balanceType?: PortfolioBalanceType;
};

export type ListPortfolioBalancesResponse = GetPortfolioBalancesResponse;

export type GetWalletBalanceRequest = {
  portfolioId: string;
  walletId: string;
};

export type GetWalletBalanceResponse = internalGetResp;

export type ListOnchainWalletBalancesRequest = {
  portfolioId: string;
  walletId: string;
  visibilityStatuses?: VisibilityStatus[];
  cursor?: string;
  limit?: number;
};

export type ListOnchainWalletBalancesResponse = ListWeb3WalletBalancesResponse;
