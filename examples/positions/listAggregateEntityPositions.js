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
 * Example: List Aggregate Entity Positions
 *
 * This example demonstrates how to retrieve aggregate positions for a specific entity
 * using the Positions service. Aggregate positions provide a consolidated view of
 * positions across all portfolios within an entity.
 *
 * Usage:
 *   node examples/positions/listAggregateEntityPositions.js
 *
 * Environment Variables Required:
 *   - ENTITY_ID: The ID of the entity to list aggregate positions for
 */

// #docs operationId: PrimeRESTAPI_ListAggregateEntityPositions
// #docs operationName: List Aggregate Entity Positions

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const entityId = process.env.ENTITY_ID;

if (!entityId) {
  console.error('Error: ENTITY_ID environment variable is required');
  return;
}

async function listAggregateEntityPositionsExample() {
  try {
    console.log(
      `📊 Listing aggregate entity positions - Entity ID: ${entityId}`
    );

    const request = {
      entityId,
    };

    const positionsResponse =
      await client.positions.listAggregateEntityPositions(request);

    console.dir(positionsResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error listing aggregate entity positions:', error);
  }
}

listAggregateEntityPositionsExample();
