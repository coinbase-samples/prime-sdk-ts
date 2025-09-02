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
 * Example: List Invoices
 *
 * This example demonstrates how to retrieve invoices for a specific entity
 * using the Invoices service.
 *
 * Usage:
 *   node examples/invoices/listInvoices.js
 *
 * Environment Variables Required:
 *   - ENTITY_ID: The ID of the entity to list invoices for
 */

// #docs operationId: PrimeRESTAPI_GetInvoices
// #docs operationName: List Invoices

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const entityId = process.env.ENTITY_ID;

if (!entityId) {
  console.error('Error: ENTITY_ID environment variable is required');
  return;
}

async function listInvoicesExample() {
  try {
    console.log(`📄 Listing invoices - Entity ID: ${entityId}`);

    const request = {
      entityId,
    };

    const invoicesResponse = await client.invoices.listInvoices(request);

    console.dir(invoicesResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error listing invoices:', error);
  }
}

listInvoicesExample();
