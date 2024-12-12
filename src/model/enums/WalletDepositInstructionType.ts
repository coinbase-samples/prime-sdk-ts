/**
 * - UNKNOWN_WALLET_DEPOSIT_TYPE: nil value  - CRYPTO: A cryptocurrency deposit  - WIRE: A wire deposit  - SEN: A Silvergate Exchange Network deposit  - SWIFT: A SWIFT deposit
 */
export enum WalletDepositInstructionType {
  UnknownWalletDepositType = 'UNKNOWN_WALLET_DEPOSIT_TYPE',
  Crypto = 'CRYPTO',
  Wire = 'WIRE',
  Sen = 'SEN',
  Swift = 'SWIFT',
}
