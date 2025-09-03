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
 * Example: Create Order
 *
 * This example demonstrates how to create a market order using the Orders service.
 *
 * Usage:
 *   node examples/orders/createOrder.js [side] [productId] [baseQuantity]
 *
 * Examples:
 *   node examples/orders/createOrder.js
 *   node examples/orders/createOrder.js BUY BTC-USD 0.001
 *   node examples/orders/createOrder.js SELL ETH-USD 0.1
 */

// #docs operationId: PrimeRESTAPI_CreateOrder
// #docs operationName: Create Order

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;
const side = process.argv[2] || 'BUY';
const productId = process.argv[3] || 'ADA-USD';
const baseQuantity = process.argv[4] || '2';

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

async function createOrderExample() {
  try {
    const order = {
      portfolioId,
      side,
      productId,
      type: 'MARKET',
      baseQuantity,
      clientOrderId: crypto.randomUUID(),
    };

    console.log(`📝 Creating order`);
    console.dir(order);

    const response = await client.orders.createOrder(order);

    console.dir(response, { depth: null });
  } catch (error) {
    console.error(error);
  }
}

createOrderExample();
