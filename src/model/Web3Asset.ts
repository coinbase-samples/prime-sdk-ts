export type Web3Asset = {
  network?: string;
  /**
   * Contract Address of this asset (empty for native assets).
   */
  contractAddress?: string;
  /**
   * Symbol of this asset.
   */
  symbol?: string;
  /**
   * Token ID of this asset (empty for non  NFT assets).
   */
  tokenId?: string;
  /**
   * Name of this asset, either the name of the crypto token or the NFT collection name.
   */
  name?: string;
};
