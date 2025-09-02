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
 * Example: Update Entity Futures Auto Sweep
 *
 * This example demonstrates how to enable or disable automatic futures sweeps for an entity
 * using the Futures service. Auto sweep automatically transfers funds between spot and futures
 * accounts to maintain margin requirements without manual intervention.
 *
 * Usage:
 *   node examples/futures/updateEntityAutoSweep.js [autoSweep]
 *
 * Examples:
 *   node examples/futures/updateEntityAutoSweep.js true
 *   node examples/futures/updateEntityAutoSweep.js false
 *
 * Environment Variables Required:
 *   - ENTITY_ID: The ID of the entity to update auto sweep setting for
 */

// #docs operationId: PrimeRESTAPI_SetAutoSweep
// #docs operationName: Set Auto Sweep

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const entityId = process.env.ENTITY_ID;
const autoSweepArg = process.argv[2];

if (!entityId) {
  console.error('Error: ENTITY_ID environment variable is required');
  return;
}

if (!autoSweepArg) {
  console.error(`
    Error: autoSweep parameter is required
    Usage: node examples/futures/updateEntityAutoSweep.js [autoSweep]
    Examples:
      node examples/futures/updateEntityAutoSweep.js true
      node examples/futures/updateEntityAutoSweep.js false
  `);
  return;
}

const autoSweep = autoSweepArg.toLowerCase() === 'true';

async function updateEntityAutoSweepExample() {
  try {
    console.log(
      `⚙️ Updating entity auto sweep setting - Entity ID: ${entityId}, Auto Sweep: ${autoSweep}`
    );

    const request = {
      entityId,
      autoSweep,
    };

    const autoSweepResponse =
      await client.futures.updateEntityAutoSweep(request);

    console.dir(autoSweepResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error updating entity auto sweep setting:', error);
  }
}

updateEntityAutoSweepExample();
