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
 * Example: List Trade Finance Obligations
 *
 * This example demonstrates how to list trade finance obligations (loans) for an entity.
 * The response includes portfolio ID, symbol, amount due, notional amount, and due date.
 *
 * Usage:
 *   node examples/financing/listTFObligations.js [entityId]
 *
 * Examples:
 *   node examples/financing/listTFObligations.js
 *   node examples/financing/listTFObligations.js entity-123
 */

// #docs operationId: PrimeRESTAPI_ListTFObligations
// #docs operationName: List Trade Finance Obligations

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const entityId = process.argv[2] || process.env.ENTITY_ID;

if (!entityId) {
  console.error(
    'Error: ENTITY_ID environment variable or command line argument is required'
  );
  return;
}

async function listTFObligationsExample() {
  try {
    const request = {
      entityId,
    };

    console.log(
      `📋 Listing Trade Finance obligations - Entity ID: ${entityId}`
    );

    const response = await client.financing.listTFObligations(request);
    console.dir(response, { depth: null });
  } catch (error) {
    console.error('❌ Error listing Trade Finance obligations:', error);
  }
}

listTFObligationsExample();
