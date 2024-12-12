export type CreatePortfolioAddressBookEntryRequest = {
  /**
   * Crypto address to add
   */
  address: string;
  /**
   * Currency symbol of address to add
   */
  currencySymbol: string;
  /**
   * Name of address book entry
   */
  name: string;
  /**
   * Account Identifier (memo/destination tag)
   */
  accountIdentifier?: string;
};
