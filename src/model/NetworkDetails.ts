/**
 * Copyright 2025-present Coinbase Global, Inc.
 *
 * This file is generated by Openapi Generator https://github.com/openapitools/openapi-generator
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

import { Network } from './Network';

export type NetworkDetails = {
  network?: Network;
  /**
   * The name of the network
   */
  name?: string;
  /**
   * The maximum number of decimals supported for this network
   */
  maxDecimals?: string;
  /**
   * Indicates whether this network is the default network for the asset
   */
  _default?: boolean;
  /**
   * Indicates whether this network supports trading
   */
  tradingSupported?: boolean;
  /**
   * Indicates whether this network supports vault
   */
  vaultSupported?: boolean;
  /**
   * Indicates whether this network supports prime custody
   */
  primeCustodySupported?: boolean;
  /**
   * Indicates whether this network requires a destination tag
   */
  destinationTagRequired?: boolean;
  /**
   * Base URL to our recommended block explorer (crypto only)
   */
  networkLink?: string;
};
