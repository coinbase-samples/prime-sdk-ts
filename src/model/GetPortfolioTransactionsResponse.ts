import { PaginatedResponse } from './PaginatedResponse';
import { Transaction } from './Transaction';

export type GetPortfolioTransactionsResponse = {
  transactions?: Array<Transaction>;
  pagination?: PaginatedResponse;
};
