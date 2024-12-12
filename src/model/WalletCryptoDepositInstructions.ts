import { WalletDepositInstructionType } from './enums/WalletDepositInstructionType';

export type WalletCryptoDepositInstructions = {
  /**
   * The ID of the wallet
   */
  id?: string;
  /**
   * The name of the wallet
   */
  name?: string;
  type?: WalletDepositInstructionType;
  /**
   * The address of the wallet
   */
  address?: string;
  /**
   * The tag/memo of the address, if applicable -- required for certain assets (e.g. XRP, XLM, etc.)
   */
  accountIdentifier?: string;
  /**
   * The blockchain network\'s terminology for the unique identifier used to identify the receiver of the transaction (different blockchain networks use different names, such as `destination_tag` or `memo`)
   */
  accountIdentifierName?: string;
};
