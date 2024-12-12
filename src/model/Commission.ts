export type Commission = {
  /**
   * Hardcode type to all_in. When we support cost+, we will have cost_plus type
   */
  type?: string;
  /**
   * Commission rate (in whole percentage. Commission of 15bps is \"0.0015\")
   */
  rate?: string;
  /**
   * Average 30 days over past 3 months (e.g. 90 days divided by 3)
   */
  tradingVolume?: string;
};
