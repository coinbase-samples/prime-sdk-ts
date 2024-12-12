export type CreateWalletTransferResponse = {
  /**
   * The activity ID for the transfer
   */
  activityId?: string;
  /**
   * A URL to the activity associated with this transfer for approval
   */
  approvalUrl?: string;
  /**
   * The currency symbol of the transfer
   */
  symbol?: string;
  /**
   * The amount of the transfer
   */
  amount?: string;
  /**
   * The network fee associated with the transfer
   */
  fee?: string;
  /**
   * The destination address of the transfer
   */
  destinationAddress?: string;
  /**
   * The destination type of the transfer
   */
  destinationType?: string;
  /**
   * The source address used for the transfer
   */
  sourceAddress?: string;
  /**
   * The source type used for the transfer
   */
  sourceType?: string;
  /**
   * The id of the just created transaction
   */
  transactionId?: string;
};
