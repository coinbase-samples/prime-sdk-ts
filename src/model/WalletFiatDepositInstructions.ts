import { WalletDepositInstructionType } from './enums/WalletDepositInstructionType';

export type WalletFiatDepositInstructions = {
  id?: string;
  name?: string;
  type?: WalletDepositInstructionType;
  accountNumber?: string;
  routingNumber?: string;
  referenceCode?: string;
};
