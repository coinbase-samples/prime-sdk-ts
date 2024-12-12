export type CreateConversionRequest = {
  /**
   * The amount in whole units to convert
   */
  amount: string;
  /**
   * The UUID of the destination wallet
   */
  destination: string;
  /**
   * The idempotency key associated with this conversion
   */
  idempotencyKey: string;
  /**
   * The currency symbol to convert from
   */
  sourceSymbol: string;
  /**
   * The currency symbol to convert to
   */
  destinationSymbol: string;
};
