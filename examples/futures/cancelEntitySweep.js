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
 * Example: Cancel Entity Futures Sweep
 *
 * This example demonstrates how to cancel pending futures sweeps for an entity
 * using the Futures service. This allows you to cancel any scheduled sweeps
 * that have not yet been executed.
 *
 * Usage:
 *   node examples/futures/cancelEntitySweep.js
 *
 * Environment Variables Required:
 *   - ENTITY_ID: The ID of the entity to cancel sweeps for
 */

// #docs operationId: PrimeRESTAPI_CancelFuturesSweep
// #docs operationName: Cancel Futures Sweep

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const entityId = process.env.ENTITY_ID;

if (!entityId) {
  console.error('Error: ENTITY_ID environment variable is required');
  return;
}

async function cancelEntitySweepExample() {
  try {
    console.log(`🚫 Canceling entity futures sweeps - Entity ID: ${entityId}`);

    const request = {
      entityId,
    };

    const cancelResponse = await client.futures.cancelEntitySweep(request);

    console.dir(cancelResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error canceling entity futures sweeps:', error);
  }
}

cancelEntitySweepExample();
