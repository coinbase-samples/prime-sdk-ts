import { WalletType } from '../enums/WalletType';
import { Pagination } from './pagination';
import { GetWalletsResponse } from '../GetWalletsResponse';
import { GetWalletResponse as internalGet } from '../GetWalletResponse';
import { GetWalletDepositInstructionsResponse as internalGetInstructs } from '../GetWalletDepositInstructionsResponse';
import { CreateWalletRequest as internalCreate } from '../CreateWalletRequest';
import { CreateWalletResponse as internalCreateResp } from '../CreateWalletResponse';

export type ListWalletsRequest = Pagination & {
  portfolioId: string;
  type: WalletType;
  symbols?: string[];
};

export type ListWalletsResponse = GetWalletsResponse;

export type GetWalletRequest = {
  portfolioId: string;
  walletId: string;
};

export type GetWalletResponse = internalGet;

export type GetWalletDepositInstructionsRequest = {
  portfolioId: string;
  walletId: string;
};

export type GetWalletDepositInstructionsResponse = internalGetInstructs;

export type CreateWalletRequest = internalCreate & {
  portfolioId: string;
};

export type CreateWalletResponse = internalCreateResp;
