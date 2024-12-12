import { TransactionType } from '../enums/TransactionType';
import { GetPortfolioTransactionsResponse } from '../GetPortfolioTransactionsResponse';
import { GetWalletTransactionsResponse } from '../GetWalletTransactionsResponse';
import { GetTransactionResponse as internalGet } from '../GetTransactionResponse';
import { CreateConversionRequest as internalCreateConversion } from '../CreateConversionRequest';
import { CreateConversionResponse as internalCreateConversionResp } from '../CreateConversionResponse';
import { CreateATransferBetweenTwoWallets } from '../createATransferBetweenTwoWallets';
import { CreateWalletWithdrawalRequest } from '../CreateWalletWithdrawalRequest';
import { CreateWalletWithdrawalResponse } from '../CreateWalletWithdrawalResponse';
import { Pagination } from './pagination';
import { CreateWalletTransferResponse } from '../CreateWalletTransferResponse';

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
