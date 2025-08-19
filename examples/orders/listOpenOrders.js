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
 * Example: List Open Orders
 *
 * This example demonstrates how to list open orders for a portfolio.
 *
 * Usage:
 *   node listOpenOrders.js [productId]
 *
 * Examples:
 *   node listOpenOrders.js
 *   node listOpenOrders.js BTC-USD
 */

// #docs operationId: PrimeRESTAPI_ListOpenOrders
// #docs operationName: List Open Orders

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;
const productId = process.argv[2];

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

async function listOpenOrdersExample() {
  try {
    let requestMessage = `📋 Listing open orders - Portfolio ID: ${portfolioId}`;
    if (productId) requestMessage += ` - Product ID: ${productId}`;
    console.log(requestMessage);

    const request = {
      portfolioId,
    };

    if (productId) request.productId = productId;

    const response = await client.orders.listOpenOrders(request);

    console.dir(response, { depth: null });
  } catch (error) {
    console.error(error);
  }
}

listOpenOrdersExample();
