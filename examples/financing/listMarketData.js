/**
 * Copyright 2026-present Coinbase Global, Inc.
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
 * Example: Get Market Data (Beta)
 *
 * This example demonstrates how to retrieve market data including volatility
 * (5-day, 30-day, 90-day, weighted) and average daily volume for assets
 * associated with an entity.
 *
 * Usage:
 *   node examples/financing/listMarketData.js [entityId]
 *
 * Environment Variables Required:
 *   - ENTITY_ID: The Prime Entity ID
 */

// #docs operationId: PrimeBeta_GetMarketData
// #docs operationName: Get Market Data

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const entityId = process.argv[2] || process.env.ENTITY_ID;

if (!entityId) {
  console.error(
    'Error: ENTITY_ID environment variable or command line argument is required'
  );
  process.exit(1);
}

async function listMarketDataExample() {
  try {
    console.log(`Getting market data - Entity ID: ${entityId}`);

    const request = { entityId };

    const response = await client.financing.listMarketData(request);

    console.dir(response, { depth: null });
  } catch (error) {
    console.error('Error:', error);
  }
}

listMarketDataExample();
