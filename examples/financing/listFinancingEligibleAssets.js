/**
 * Copyright 2025-present Coinbase Global, Inc.
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
 */

/**
 * Example: List Financing Eligible Assets
 *
 * This example demonstrates how to retrieve all assets eligible for Trade Finance
 * along with their asset and liability adjustment factors.
 *
 * Usage:
 *   node examples/financing/listFinancingEligibleAssets.js
 */

// #docs operationId: PrimeRESTAPI_ListFinancingEligibleAssets
// #docs operationName: List Financing Eligible Assets

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();

async function listFinancingEligibleAssetsExample() {
  try {
    console.log('💰 Listing financing eligible assets...');

    const response = await client.financing.listFinancingEligibleAssets();
    console.dir(response, { depth: null });
  } catch (error) {
    console.error('❌ Error listing financing eligible assets:', error);
  }
}

listFinancingEligibleAssetsExample();
