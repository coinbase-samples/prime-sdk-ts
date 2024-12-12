export type Asset = {
  /**
   * The name of the asset
   */
  name?: string;
  /**
   * The mutable series of letters used to identify the asset
   */
  symbol?: string;
  /**
   * The number of decimals supported for the asset
   */
  decimalPrecision?: string;
  /**
   * Indicates whether this asset can be traded
   */
  tradingSupported?: boolean;
  /**
   * Base URL to our recommended block explorer (crypto only)
   */
  explorerUrl?: string;
};
