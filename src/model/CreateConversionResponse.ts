export type CreateConversionResponse = {
  /**
   * The activity ID for the conversion
   */
  activityId?: string;
  /**
   * The currency symbol to convert from
   */
  sourceSymbol?: string;
  /**
   * The currency symbol to convert to
   */
  destinationSymbol?: string;
  /**
   * The amount in whole units to convert
   */
  amount?: string;
  /**
   * The UUID of the destination wallet
   */
  destination?: string;
  /**
   * The UUID of the source wallet
   */
  source?: string;
  /**
   * The UUID of the conversion transaction
   */
  transactionId?: string;
};
