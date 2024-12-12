export type DestinationAlloc = {
  /**
   * The ID unique to each leg of an allocation.
   */
  legId?: string;
  /**
   * Portfolio ID of the source portfolio.
   */
  portfolioId?: string;
  /**
   * Amount allocated in base asset units.
   */
  allocationBase?: string;
  /**
   * Amount allocated in quote asset units.
   */
  allocationQuote?: string;
  /**
   * Pro rata fees for each leg. Adding up the fees for each leg will sum up to equal the total allocation level fees.
   */
  feesAllocatedLeg?: string;
};
