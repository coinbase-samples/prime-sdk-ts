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
 * Example: Get Order
 *
 * This example demonstrates how to retrieve detailed information about a specific order
 * using the Orders service. This provides comprehensive order details including status,
 * fills, timestamps, and execution information.
 *
 * Usage:
 *   node examples/orders/getOrder.js [orderId]
 *
 * Examples:
 *   node examples/orders/getOrder.js abc123-def456-ghi789
 *   node examples/orders/getOrder.js order-uuid-12345
 *
 * Environment Variables Required:
 *   - PORTFOLIO_ID: The ID of the portfolio containing the order
 */

// #docs operationId: PrimeRESTAPI_GetOrder
// #docs operationName: Get Order

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
    Usage: node examples/orders/getOrder.js [orderId]
  `);
  return;
}

async function getOrderExample() {
  try {
    console.log(`
      📋 Getting order details - Portfolio ID: ${portfolioId}, Order ID: ${orderId}
    `);

    const request = {
      portfolioId,
      orderId,
    };

    const orderResponse = await client.orders.getOrder(request);

    console.dir(orderResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error getting order:', error);
  }
}

getOrderExample();
