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
 * Example: List Invoices with Filters
 *
 * This example demonstrates how to retrieve invoices for a specific entity
 * with various filtering options including states, billing year, and billing month.
 *
 * Usage:
 *   node examples/invoices/listInvoicesFiltered.js [states] [year] [month]
 *
 * Examples:
 *   node examples/invoices/listInvoicesFiltered.js
 *   node examples/invoices/listInvoicesFiltered.js INVOICE_STATE_PAID
 *   node examples/invoices/listInvoicesFiltered.js INVOICE_STATE_BILLED,INVOICE_STATE_PARTIALLY_PAID
 *   node examples/invoices/listInvoicesFiltered.js INVOICE_STATE_PAID 2024
 *   node examples/invoices/listInvoicesFiltered.js INVOICE_STATE_PAID 2024 12
 *
 * Environment Variables Required:
 *   - ENTITY_ID: The ID of the entity to list invoices for
 *
 * Available Invoice States:
 *   - INVOICE_STATE_UNSPECIFIED
 *   - INVOICE_STATE_IMPORTED
 *   - INVOICE_STATE_BILLED
 *   - INVOICE_STATE_PARTIALLY_PAID
 *   - INVOICE_STATE_PAID
 */

// #docs operationId: PrimeRESTAPI_GetInvoices
// #docs operationName: List Invoices with Filters

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const entityId = process.env.ENTITY_ID;
const statesParam = process.argv[2];
const billingYear = process.argv[3];
const billingMonth = process.argv[4];

if (!entityId) {
  console.error('Error: ENTITY_ID environment variable is required');
  return;
}

async function listInvoicesFilteredExample() {
  try {
    let requestMessage = `📄 Listing filtered invoices - Entity ID: ${entityId}`;

    const request = {
      entityId,
    };

    // Add filters if provided
    if (statesParam) {
      request.states = statesParam.split(',');
      requestMessage += ` - States: ${request.states.join(', ')}`;
    }

    if (billingYear) {
      request.billingYear = billingYear;
      requestMessage += ` - Year: ${billingYear}`;
    }

    if (billingMonth) {
      request.billingMonth = billingMonth;
      requestMessage += ` - Month: ${billingMonth}`;
    }

    console.log(requestMessage);

    const invoicesResponse = await client.invoices.listInvoices(request);

    console.dir(invoicesResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error listing filtered invoices:', error);
  }
}

listInvoicesFilteredExample();
