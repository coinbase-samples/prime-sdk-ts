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
 * Example: Edit Order (Beta)
 *
 * This example demonstrates how to edit an open order.
 * This feature is in beta - please reach out to your Coinbase Prime account manager for more information.
 *
 * Usage:
 *   node examples/orders/editOrder.js [orderId] [origClientOrderId] [limitPrice] [baseQuantity]
 *
 * Examples:
 *   node examples/orders/editOrder.js
 *   node examples/orders/editOrder.js order-123 client-order-456 50000.00 0.001
 */

// #docs operationId: PrimeRESTAPI_EditOrder
// #docs operationName: Edit Order

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;
const orderId = process.argv[2] || process.env.ORDER_ID;
const origClientOrderId = process.argv[3] || process.env.ORIG_CLIENT_ORDER_ID;
const limitPrice = process.argv[4] || '50000.00';
const baseQuantity = process.argv[5] || '0.001';

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

if (!orderId) {
  console.error(
    'Error: ORDER_ID environment variable or command line argument is required'
  );
  console.log(
    'Usage: node examples/orders/editOrder.js [orderId] [origClientOrderId] [limitPrice] [baseQuantity]'
  );
  return;
}

if (!origClientOrderId) {
  console.error(
    'Error: ORIG_CLIENT_ORDER_ID environment variable or command line argument is required'
  );
  console.log(
    'Usage: node examples/orders/editOrder.js [orderId] [origClientOrderId] [limitPrice] [baseQuantity]'
  );
  return;
}

async function editOrderExample() {
  try {
    const request = {
      portfolioId,
      orderId,
      origClientOrderId,
      clientOrderId: crypto.randomUUID(), // New client order ID
      limitPrice,
      baseQuantity,
    };

    console.log(`✏  Editing order - Order`);
    console.dir(request);

    const response = await client.orders.editOrder(request);

    console.dir(response);
  } catch (error) {
    console.error('\n❌ Error editing order:');
    console.error(error);
  }
}

editOrderExample();
