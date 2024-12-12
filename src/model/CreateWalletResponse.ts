import { WalletType } from './enums/WalletType';

export type CreateWalletResponse = {
  activityId?: string;
  name?: string;
  symbol?: string;
  walletType?: WalletType;
};
