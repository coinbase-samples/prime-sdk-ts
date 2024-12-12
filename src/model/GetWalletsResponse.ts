import { PaginatedResponse } from './PaginatedResponse';
import { Wallet } from './Wallet';

export type GetWalletsResponse = {
  wallets?: Array<Wallet>;
  pagination?: PaginatedResponse;
};
