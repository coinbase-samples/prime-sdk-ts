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
