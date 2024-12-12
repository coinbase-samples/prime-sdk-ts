import { WalletType } from './enums/WalletType';

export type CreateWalletRequest = {
  name: string;
  symbol: string;
  walletType?: WalletType;
  idempotencyKey?: string;
};
