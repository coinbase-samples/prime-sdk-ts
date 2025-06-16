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
import { Brand } from '../shared/brand';
import { TransactionType } from '../model/enums/';
import {
  GetPortfolioTransactionsResponse,
  GetWalletTransactionsResponse,
  GetTransactionResponse as internalGet,
  CreateConversionRequest as internalCreateConversion,
  CreateConversionResponse as internalCreateConversionResp,
  CreateATransferBetweenTwoWallets,
  CreateWalletWithdrawalRequest,
  CreateWalletWithdrawalResponse,
  CreateWalletTransferResponse,
  CreateOnchainTransactionRequest as internalCreate,
  CreateOnchainTransactionResponse as internalCreateResp,
} from '../model/';
import { Pagination } from '../shared/pagination';
import {
  PaginatedResponseMethods,
  BasePaginatedRequest,
} from '../shared/paginatedResponse';

export type ListPortfolioTransactionsRequest = Pagination & {
  portfolioId: string;
  symbols?: string[];
  types?: TransactionType[];
  startTime?: string;
  endTime?: string;
};

// Base response type
type BaseListPortfolioTransactionsResponse = Brand<
  GetPortfolioTransactionsResponse,
  'ListPortfolioTransactionsResponse'
>;

// Extended response type with pagination methods
export type ListPortfolioTransactionsResponse =
  BaseListPortfolioTransactionsResponse &
    PaginatedResponseMethods<
      ListPortfolioTransactionsRequest & BasePaginatedRequest,
      BaseListPortfolioTransactionsResponse,
      any // Transaction type
    >;

export type ListWalletTransactionsRequest = Pagination & {
  portfolioId: string;
  walletId: string;
  types?: TransactionType[];
  startTime?: string;
  endTime?: string;
};

export type BaseListWalletTransactionsResponse = Brand<
  GetWalletTransactionsResponse,
  'ListWalletTransactionsResponse'
>;

export type ListWalletTransactionsResponse =
  BaseListWalletTransactionsResponse &
    PaginatedResponseMethods<
      ListWalletTransactionsRequest & BasePaginatedRequest,
      BaseListWalletTransactionsResponse,
      any // Transaction type
    >;

export type GetTransactionRequest = {
  portfolioId: string;
  transactionId: string;
};

export type GetTransactionResponse = Brand<
  internalGet,
  'GetTransactionResponse'
>;

export type CreateConversionRequest = internalCreateConversion & {
  portfolioId: string;
  walletId: string;
};

export type CreateConversionResponse = Brand<
  internalCreateConversionResp,
  'CreateConversionResponse'
>;

export type CreateTransferRequest = CreateATransferBetweenTwoWallets & {
  portfolioId: string;
  walletId: string;
};

export type CreateTransferResponse = Brand<
  CreateWalletTransferResponse,
  'CreateTransferResponse'
>;

export type CreateWithdrawalRequest = CreateWalletWithdrawalRequest & {
  portfolioId: string;
  walletId: string;
};

export type CreateWithdrawalResponse = Brand<
  CreateWalletWithdrawalResponse,
  'CreateWithdrawalResponse'
>;

export type CreateOnchainTransactionRequest = internalCreate & {
  portfolioId: string;
  walletId: string;
};

export type CreateOnchainTransactionResponse = Brand<
  internalCreateResp,
  'CreateOnchainTransactionResponse'
>;
