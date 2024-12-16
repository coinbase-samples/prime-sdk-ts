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
import { TransactionType } from '../model/enums/TransactionType';
import { GetPortfolioTransactionsResponse } from '../model/GetPortfolioTransactionsResponse';
import { GetWalletTransactionsResponse } from '../model/GetWalletTransactionsResponse';
import { GetTransactionResponse as internalGet } from '../model/GetTransactionResponse';
import { CreateConversionRequest as internalCreateConversion } from '../model/CreateConversionRequest';
import { CreateConversionResponse as internalCreateConversionResp } from '../model/CreateConversionResponse';
import { CreateATransferBetweenTwoWallets } from '../model/createATransferBetweenTwoWallets';
import { CreateWalletWithdrawalRequest } from '../model/CreateWalletWithdrawalRequest';
import { CreateWalletWithdrawalResponse } from '../model/CreateWalletWithdrawalResponse';
import { Pagination } from '../shared/pagination';
import { CreateWalletTransferResponse } from '../model/CreateWalletTransferResponse';

export type ListPortfolioTransactionsRequest = Pagination & {
  portfolioId: string;
  symbols?: string[];
  types?: TransactionType[];
  startTime?: string;
  endTime?: string;
};

export type ListPortfolioTransactionsResponse =
  GetPortfolioTransactionsResponse;

export type ListWalletTransactionsRequest = Pagination & {
  portfolioId: string;
  walletId: string;
  types?: TransactionType[];
  startTime?: string;
  endTime?: string;
};

export type ListWalletTransactionsResponse = GetWalletTransactionsResponse;

export type GetTransactionRequest = {
  portfolioId: string;
  transactionId: string;
};

export type GetTransactionResponse = internalGet;

export type CreateConversionRequest = internalCreateConversion & {
  portfolioId: string;
  walletId: string;
};

export type CreateConversionResponse = internalCreateConversionResp;

export type CreateTransferRequest = CreateATransferBetweenTwoWallets & {
  portfolioId: string;
  walletId: string;
};

export type CreateTransferResponse = CreateWalletTransferResponse;

export type CreateWithdrawalRequest = CreateWalletWithdrawalRequest & {
  portfolioId: string;
  walletId: string;
};

export type CreateWithdrawalResponse = CreateWalletWithdrawalResponse;
