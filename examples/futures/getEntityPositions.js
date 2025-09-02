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
 * Example: Get Entity Futures Positions
 *
 * This example demonstrates how to retrieve futures positions for an entity using the Futures service.
 * You can optionally filter by a specific product ID to get positions for a particular futures contract.
 *
 * Usage:
 *   node examples/futures/getEntityPositions.js [productId]
 *
 * Examples:
 *   node examples/futures/getEntityPositions.js
 *   node examples/futures/getEntityPositions.js BTC-PERP
 *   node examples/futures/getEntityPositions.js ETH-28MAR25
 *
 * Environment Variables Required:
 *   - ENTITY_ID: The ID of the entity to get futures positions for
 */

// #docs operationId: PrimeRESTAPI_GetPositions
// #docs operationName: Get Positions

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const entityId = process.env.ENTITY_ID;
const productId = process.argv[2];

if (!entityId) {
  console.error('Error: ENTITY_ID environment variable is required');
  return;
}

async function getEntityPositionsExample() {
  try {
    let requestMessage = `📈 Getting entity futures positions - Entity ID: ${entityId}`;
    if (productId) requestMessage += `, Product ID: ${productId}`;
    console.log(requestMessage);

    const request = {
      entityId,
    };

    if (productId) request.productId = productId;

    const positionsResponse = await client.futures.getEntityPositions(request);

    console.dir(positionsResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error getting entity futures positions:', error);
  }
}

getEntityPositionsExample();
