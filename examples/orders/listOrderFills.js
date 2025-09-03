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
 * Example: List Order Fills
 *
 * This example demonstrates how to list all fills for a specific order using the Orders service.
 * Order fills represent the executed portions of an order, showing detailed execution information
 * including partial fills, prices, quantities, fees, and timestamps for each execution.
 *
 * Usage:
 *   node examples/orders/listOrderFills.js [orderId]
 *
 * Examples:
 *   node examples/orders/listOrderFills.js abc123-def456-ghi789
 *   node examples/orders/listOrderFills.js order-uuid-12345
 *
 * Environment Variables Required:
 *   - PORTFOLIO_ID: The ID of the portfolio containing the order
 */

// #docs operationId: PrimeRESTAPI_GetOrderFills
// #docs operationName: Get Order Fills

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;
const orderId = process.argv[2];

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

if (!orderId) {
  console.error(`
    Error: ORDER_ID command line argument is required
    Usage: node examples/orders/listOrderFills.js [orderId]
  `);
  return;
}

async function listOrderFillsExample() {
  try {
    console.log(`
      📊 Listing order fills - Portfolio ID: ${portfolioId}, Order ID: ${orderId}
    `);

    const request = {
      portfolioId,
      orderId,
    };

    const fillsResponse = await client.orders.listOrderFills(request);

    console.dir(fillsResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error listing order fills:', error);
  }
}

listOrderFillsExample();
