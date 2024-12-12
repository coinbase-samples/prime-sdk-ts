import { PaginatedResponse } from './PaginatedResponse';
import { Transaction } from './Transaction';

export type GetWalletTransactionsResponse = {
  transactions?: Array<Transaction>;
  pagination?: PaginatedResponse;
};
