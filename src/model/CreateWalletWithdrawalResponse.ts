import { BlockchainAddress } from './BlockchainAddress';

export type CreateWalletWithdrawalResponse = {
  /**
   * The activity ID associated with the withdrawal
   */
  activityId?: string;
  /**
   * A URL to the activity in the Prime application
   */
  approvalUrl?: string;
  /**
   * The currency symbol associated with the withdrawal
   */
  symbol?: string;
  /**
   * The amount of the withdrawal
   */
  amount?: string;
  /**
   * The network fee associated with the withdrawal
   */
  fee?: string;
  /**
   * The destination type used for the withdrawal
   */
  destinationType?: string;
  /**
   * The source type used for the withdrawal
   */
  sourceType?: string;
  blockchainDestination?: BlockchainAddress;
  blockchainSource?: BlockchainAddress;
  /**
   * The id of the just created transaction
   */
  transactionId?: string;
};
