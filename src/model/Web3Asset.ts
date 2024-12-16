/**
 * Copyright 2024-present Coinbase Global, Inc.
 *
 * This file is generated by Openapi Generator https://github.com/openapitools/openapi-generato
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *  Do not edit the class manually.
 */

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
