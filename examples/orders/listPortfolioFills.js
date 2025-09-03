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
 * Example: List Portfolio Fills
 *
 * This example demonstrates how to list all order fills for a portfolio using the Orders service.
 * Order fills represent the executed portions of orders, showing trade details including price,
 * quantity, fees, and execution timestamps. You can optionally filter by date range.
 *
 * Usage:
 *   node examples/orders/listPortfolioFills.js [startDate] [endDate]
 *
 * Examples:
 *   node examples/orders/listPortfolioFills.js
 *   node examples/orders/listPortfolioFills.js 2024-01-01T00:00:00Z
 *   node examples/orders/listPortfolioFills.js 2024-01-01T00:00:00Z 2024-01-31T23:59:59Z
 *   node examples/orders/listPortfolioFills.js 2024-06-15T10:30:00Z 2024-06-15T18:00:00Z
 *
 * Note: If no start date is provided, defaults to the first day of the current year (YYYY-01-01T00:00:00Z).
 *
 * Environment Variables Required:
 *   - PORTFOLIO_ID: The ID of the portfolio to list fills for
 */

// #docs operationId: PrimeRESTAPI_GetPortfolioFills
// #docs operationName: Get Portfolio Fills

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;
const startDate =
  process.argv[2] || `${new Date().getFullYear()}-01-01T00:00:00Z`;
const endDate = process.argv[3];

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

async function listPortfolioFillsExample() {
  try {
    let requestMessage = `📊 Listing portfolio fills - Portfolio ID: ${portfolioId}`;
    requestMessage += `, Start Date: ${startDate}`;
    if (endDate) requestMessage += `, End Date: ${endDate}`;
    console.log(requestMessage);

    const request = {
      portfolioId,
      startDate,
    };

    if (endDate) request.endDate = endDate;

    const fillsResponse = await client.orders.listPortfolioFills(request);

    console.dir(fillsResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error listing portfolio fills:', error);
  }
}

listPortfolioFillsExample();
