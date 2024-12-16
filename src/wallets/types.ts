import { WalletType } from '../model/enums/WalletType';
import { Pagination } from '../shared/pagination';
import { GetWalletsResponse } from '../model/GetWalletsResponse';
import { GetWalletResponse as internalGet } from '../model/GetWalletResponse';
import { GetWalletDepositInstructionsResponse as internalGetInstructs } from '../model/GetWalletDepositInstructionsResponse';
import { CreateWalletRequest as internalCreate } from '../model/CreateWalletRequest';
import { CreateWalletResponse as internalCreateResp } from '../model/CreateWalletResponse';

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
