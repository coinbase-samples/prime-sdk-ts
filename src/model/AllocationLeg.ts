export type AllocationLeg = {
  /**
   * The ID of the portfolio of the allocation leg
   */
  allocationLegId: string;
  /**
   * The ID of the destination portfolio of the allocation leg
   */
  destinationPortfolioId: string;
  /**
   * The amount size for the allocation leg
   */
  amount: string;
};
