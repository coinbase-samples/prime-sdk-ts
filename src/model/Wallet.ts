import { WalletType } from './enums/WalletType';

export type Wallet = {
  id?: string;
  name?: string;
  symbol?: string;
  type?: WalletType;
  createdAt?: Date;
  address?: string;
};
