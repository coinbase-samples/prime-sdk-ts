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
 * Example: Schedule Entity Futures Sweep
 *
 * This example demonstrates how to schedule a futures sweep for an entity using the Futures service.
 * A futures sweep transfers funds between spot and futures accounts to manage margin requirements.
 * You can specify an amount or let it sweep all available funds.
 *
 * Usage:
 *   node examples/futures/scheduleEntitySweep.js [currency] [amount]
 *
 * Examples:
 *   node examples/futures/scheduleEntitySweep.js USD
 *   node examples/futures/scheduleEntitySweep.js USD 1000.00
 *   node examples/futures/scheduleEntitySweep.js BTC 0.5
 *
 * Environment Variables Required:
 *   - ENTITY_ID: The ID of the entity to schedule sweep for
 */

// #docs operationId: PrimeRESTAPI_ScheduleFuturesSweep
// #docs operationName: Schedule Futures Sweep

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const entityId = process.env.ENTITY_ID;
const currency = process.argv[2] || 'USD';
const amount = process.argv[3];

if (!entityId) {
  console.error('Error: ENTITY_ID environment variable is required');
  return;
}

async function scheduleEntitySweepExample() {
  try {
    let requestMessage = `🔄 Scheduling entity futures sweep - Entity ID: ${entityId}, Currency: ${currency}`;
    if (amount) requestMessage += `, Amount: ${amount}`;
    else requestMessage += ` (sweep all)`;
    console.log(requestMessage);

    const request = {
      entityId,
      currency,
    };

    if (amount) request.amount = amount;

    const sweepResponse = await client.futures.scheduleEntitySweep(request);

    console.dir(sweepResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error scheduling entity futures sweep:', error);
  }
}

scheduleEntitySweepExample();
