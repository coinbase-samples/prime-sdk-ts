import { AssetChangeType } from './enums/AssetChangeType';
import { NFTCollection } from './NFTCollection';
import { NFTItem } from './NFTItem';

export type AssetChange = {
  type?: AssetChangeType;
  /**
   * The currency symbol associated with the balance operation
   */
  symbol?: string;
  /**
   * The amount in whole units being transferred or approved
   */
  amount?: string;
  collection?: NFTCollection;
  item?: NFTItem;
};
