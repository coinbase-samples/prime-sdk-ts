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
 * Example: Get Entity Futures Balance
 *
 * This example demonstrates how to retrieve the futures balance summary for an entity
 * using the Futures service. This provides information about the entity's futures
 * account including available margin, used margin, and other balance details.
 *
 * Usage:
 *   node examples/futures/getEntityBalance.js
 *
 * Environment Variables Required:
 *   - ENTITY_ID: The ID of the entity to get futures balance for
 */

// #docs operationId: PrimeRESTAPI_GetFCMBalance
// #docs operationName: Get FCM Balance

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const entityId = process.env.ENTITY_ID;

if (!entityId) {
  console.error('Error: ENTITY_ID environment variable is required');
  return;
}

async function getEntityBalanceExample() {
  try {
    console.log(`💰 Getting entity futures balance - Entity ID: ${entityId}`);

    const request = {
      entityId,
    };

    const balanceResponse = await client.futures.getEntityBalance(request);

    console.dir(balanceResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error getting entity futures balance:', error);
  }
}

getEntityBalanceExample();
