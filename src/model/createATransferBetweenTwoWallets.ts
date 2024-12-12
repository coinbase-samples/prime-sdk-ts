export type CreateATransferBetweenTwoWallets = {
  /**
   * The amount in whole units to send
   */
  amount: string;
  /**
   * The UUID of the destination wallet
   */
  destination: string;
  /**
   * The idempotency key associated with this transfer
   */
  idempotencyKey: string;
  /**
   * The currency symbol to transfer
   */
  currencySymbol: string;
};
