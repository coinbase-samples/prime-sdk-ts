import { AddressBookEntry } from './AddressBookEntry';
import { PaginatedResponse } from './PaginatedResponse';

export type GetPortfolioAddressBookResponse = {
  /**
   * List of addresses added to Address Book
   */
  addresses: Array<AddressBookEntry>;
  pagination: PaginatedResponse;
};
