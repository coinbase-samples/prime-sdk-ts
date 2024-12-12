import { WalletCryptoDepositInstructions } from './WalletCryptoDepositInstructions';
import { WalletFiatDepositInstructions } from './WalletFiatDepositInstructions';

export type GetWalletDepositInstructionsResponse = {
  cryptoInstructions?: WalletCryptoDepositInstructions;
  fiatInstructions?: WalletFiatDepositInstructions;
};
