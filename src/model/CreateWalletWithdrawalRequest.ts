import { BlockchainAddress } from './BlockchainAddress';
import { DestinationType } from './enums/DestinationType';
import { PaymentMethodDestination } from './PaymentMethodDestination';

export type CreateWalletWithdrawalRequest = {
  /**
   * The amount in whole units of the withdrawal
   */
  amount: string;
  destinationType: DestinationType;
  /**
   * The idempotency key associated with the withdrawal
   */
  idempotencyKey: string;
  /**
   * The currency symbol for the withdrawal
   */
  currencySymbol: string;
  paymentMethod?: PaymentMethodDestination;
  blockchainAddress?: BlockchainAddress;
};
