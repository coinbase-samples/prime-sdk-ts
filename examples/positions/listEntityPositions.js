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
 * Example: List Entity Positions
 *
 * This example demonstrates how to retrieve detailed positions for a specific entity
 * using the Positions service. This provides a detailed view of positions across
 * all portfolios within an entity, including individual position breakdowns.
 *
 * Usage:
 *   node examples/positions/listEntityPositions.js
 *
 * Environment Variables Required:
 *   - ENTITY_ID: The ID of the entity to list positions for
 */

// #docs operationId: PrimeRESTAPI_ListEntityPositions
// #docs operationName: List Entity Positions

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const entityId = process.env.ENTITY_ID;

if (!entityId) {
  console.error('Error: ENTITY_ID environment variable is required');
  return;
}

async function listEntityPositionsExample() {
  try {
    console.log(`📈 Listing entity positions - Entity ID: ${entityId}`);

    const request = {
      entityId,
    };

    const positionsResponse =
      await client.positions.listEntityPositions(request);

    console.dir(positionsResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error listing entity positions:', error);
  }
}

listEntityPositionsExample();
