import { AddressBookType } from './enums/AddressBookType';
import { DisplayUser } from './DisplayUser';

export type AddressBookEntry = {
  /**
   * UUID identifying this address book entry
   */
  id: string;
  /**
   * Currency symbol
   */
  currencySymbol?: string;
  /**
   * Name for this address book entry
   */
  name: string;
  /**
   * Cryptocurrency address
   */
  address?: string;
  /**
   * Memo or destination tag for currencies which support them
   */
  accountIdentifier?: string;
  /**
   * Name of the account identifier. For instance Destination Tag
   */
  accountIdentifierName?: string;
  /**
   * State of this address book entry
   */
  state: string;
  /**
   * Link to a blockchain explorer
   */
  explorerLink?: string;
  /**
   * When this entry was last used for a transaction
   */
  lastUsedAt?: Date;
  /**
   * When this entry was added to the address book
   */
  addedAt?: Date;
  addedBy: DisplayUser;
  type?: AddressBookType;
  /**
   * counterparty id
   */
  counterpartyId?: string;
};
