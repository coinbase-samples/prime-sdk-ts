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
 * Example: Get FCM Equity
 *
 * This example demonstrates how to retrieve the equity data for an entity
 * using the Futures service. This provides information about prior EOD account
 * equity, unrealized P&L, current excess/deficit, and available sweep amounts.
 *
 * Usage:
 *   node examples/futures/getEntityEquity.js
 *
 * Environment Variables Required:
 *   - ENTITY_ID: The ID of the entity to get FCM equity for
 */

// #docs operationId: PrimeRESTAPI_GetFcmEquity
// #docs operationName: Get FCM Equity

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const entityId = process.env.ENTITY_ID;

if (!entityId) {
  console.error('Error: ENTITY_ID environment variable is required');
  return;
}

async function getEntityEquityExample() {
  try {
    console.log(`📊 Getting entity FCM equity - Entity ID: ${entityId}`);

    const request = {
      entityId,
    };

    const equityResponse = await client.futures.getEntityEquity(request);

    console.dir(equityResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error getting entity FCM equity:', error);
  }
}

getEntityEquityExample();
