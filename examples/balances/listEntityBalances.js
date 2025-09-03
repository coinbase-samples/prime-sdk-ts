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
 * Example: List Entity Balances
 *
 * This example demonstrates how to retrieve balance information for a specific entity
 * using the Balances service. This provides an entity-level view of balances across
 * all portfolios within the entity.
 *
 * Usage:
 *   node examples/balances/listEntityBalances.js [aggregationType] [symbols]
 *
 * Examples:
 *   node examples/balances/listEntityBalances.js
 *   node examples/balances/listEntityBalances.js TRADING_BALANCES
 *   node examples/balances/listEntityBalances.js TRADING_BALANCES BTC,ETH
 *
 * Environment Variables Required:
 *   - ENTITY_ID: The ID of the entity to list balances for
 */

// #docs operationId: PrimeRESTAPI_ListEntityBalances
// #docs operationName: List Entity Balances

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const entityId = process.env.ENTITY_ID;
const aggregationType = process.argv[2];
const symbolsCsv = process.argv[3];

if (!entityId) {
  console.error('Error: ENTITY_ID environment variable is required');
  return;
}

async function listEntityBalancesExample() {
  try {
    let requestMessage = `💰 Listing entity balances - Entity ID: ${entityId}`;
    if (aggregationType)
      requestMessage += ` - Aggregation Type: ${aggregationType}`;
    if (symbolsCsv) requestMessage += ` - Symbols: ${symbolsCsv}`;
    console.log(requestMessage);

    const request = {
      entityId,
      symbols: symbolsCsv ? symbolsCsv.split(',') : undefined,
      aggregationType,
    };

    const balancesResponse = await client.balances.listEntityBalances(request);

    console.dir(balancesResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error listing entity balances:', error);
  }
}

listEntityBalancesExample();
