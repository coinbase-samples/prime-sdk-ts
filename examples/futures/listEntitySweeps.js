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
 * Example: List Entity Futures Sweeps
 *
 * This example demonstrates how to list all futures sweeps for an entity using the Futures service.
 * Futures sweeps are transfers between spot and futures accounts to manage margin requirements
 * and collateral positioning.
 *
 * Usage:
 *   node examples/futures/listEntitySweeps.js
 *
 * Environment Variables Required:
 *   - ENTITY_ID: The ID of the entity to list futures sweeps for
 */

// #docs operationId: PrimeRESTAPI_GetFuturesSweeps
// #docs operationName: Get Futures Sweeps

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const entityId = process.env.ENTITY_ID;

if (!entityId) {
  console.error('Error: ENTITY_ID environment variable is required');
  return;
}

async function listEntitySweepsExample() {
  try {
    console.log(`🔄 Listing entity futures sweeps - Entity ID: ${entityId}`);

    const request = {
      entityId,
    };

    const sweepsResponse = await client.futures.listEntitySweeps(request);

    console.dir(sweepsResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error listing entity futures sweeps:', error);
  }
}

listEntitySweepsExample();
