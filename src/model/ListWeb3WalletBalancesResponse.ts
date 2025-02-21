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

import { DefiBalance } from './DefiBalance';
import { PaginatedResponse } from './PaginatedResponse';
import { Web3Balance } from './Web3Balance';

export type ListWeb3WalletBalancesResponse = {
  balances?: Array<Web3Balance>;
  pagination?: PaginatedResponse;
  /**
   * DeFi balances only return for the initial request. No pagination support.
   */
  defiBalances?: Array<DefiBalance>;
};
