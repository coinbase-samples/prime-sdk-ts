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
 * Example: List Portfolio Orders
 *
 * This example demonstrates how to list all orders for a portfolio using the Orders service.
 * You can filter by order status, product IDs, order type, order side, and date range.
 * This provides comprehensive order history and current order status across the portfolio.
 *
 * Usage:
 *   node examples/orders/listPortfolioOrders.js [orderStatuses] [productIds] [orderType] [orderSide] [startDate] [endDate]
 *
 * Examples:
 *   node examples/orders/listPortfolioOrders.js
 *   node examples/orders/listPortfolioOrders.js FILLED
 *   node examples/orders/listPortfolioOrders.js FILLED BTC-USD,ETH-USD
 *   node examples/orders/listPortfolioOrders.js CANCELLED BTC-USD LIMIT BUY
 *   node examples/orders/listPortfolioOrders.js FILLED BTC-USD MARKET SELL 2024-01-01T00:00:00Z 2024-01-31T23:59:59Z
 *
 * Environment Variables Required:
 *   - PORTFOLIO_ID: The ID of the portfolio to list orders for
 */

// #docs operationId: PrimeRESTAPI_GetOrders
// #docs operationName: Get Orders

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;
const orderStatusesArg = process.argv[2];
const productIdsArg = process.argv[3];
const orderType = process.argv[4];
const orderSide = process.argv[5];
const startDate = process.argv[6];
const endDate = process.argv[7];

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

async function listPortfolioOrdersExample() {
  try {
    let requestMessage = `📋 Listing portfolio orders - Portfolio ID: ${portfolioId}`;
    if (orderStatusesArg)
      requestMessage += `, Order Statuses: ${orderStatusesArg}`;
    if (productIdsArg) requestMessage += `, Product IDs: ${productIdsArg}`;
    if (orderType) requestMessage += `, Order Type: ${orderType}`;
    if (orderSide) requestMessage += `, Order Side: ${orderSide}`;
    if (startDate) requestMessage += `, Start Date: ${startDate}`;
    if (endDate) requestMessage += `, End Date: ${endDate}`;

    console.log(requestMessage);

    const request = {
      portfolioId,
    };

    if (orderStatusesArg) request.orderStatuses = orderStatusesArg.split(',');
    if (productIdsArg) request.productIds = productIdsArg.split(',');
    if (orderType) request.orderType = orderType;
    if (orderSide) request.orderSide = orderSide;
    if (startDate) request.startDate = startDate;
    if (endDate) request.endDate = endDate;

    const ordersResponse = await client.orders.listPortfolioOrders(request);

    console.dir(ordersResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error listing portfolio orders:', error);
  }
}

listPortfolioOrdersExample();
