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
 * Example: List Portfolio Allocations
 *
 * This example demonstrates how to retrieve a list of allocations for a specific portfolio
 * using the Allocations service.
 *
 * Usage:
 *   node examples/allocations/listPortfolioAllocations.js [startDate] [productId] [allocationStatus]
 *
 * Examples:
 *   node examples/allocations/listPortfolioAllocations.js
 *   node examples/allocations/listPortfolioAllocations.js 2024-01-01
 *   node examples/allocations/listPortfolioAllocations.js 2024-06-15T10:30:00Z
 *   node examples/allocations/listPortfolioAllocations.js 2024-01-01 BTC-USD ALLOCATION_STATUS_PENDING
 */

// #docs operationId: PrimeRESTAPI_GetPortfolioAllocations
// #docs operationName: List Portfolio Allocations

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;
const startDateArg = process.argv[2];
const productId = process.argv[3];
const allocationStatus = process.argv[4];

// Set start date to provided argument or default to January 1st of current year
// Format as ISO 8601 timestamp as expected by the API
const currentYear = new Date().getFullYear();
let startDate;
if (startDateArg) {
  // Parse user input and convert to ISO format
  const inputDate = new Date(startDateArg);
  startDate = inputDate.toISOString();
} else {
  // Default to January 1st of current year at midnight UTC
  const defaultDate = new Date(`${currentYear}-01-01T00:00:00.000Z`);
  startDate = defaultDate.toISOString();
}

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

async function listPortfolioAllocationsExample() {
  try {
    let requestMessage = `📋 Listing portfolio allocations - Portfolio ID: ${portfolioId} - Start Date: ${startDate}`;
    if (productId) requestMessage += ` - Product: ${productId}`;
    if (allocationStatus) requestMessage += ` - Status: ${allocationStatus}`;
    console.log(requestMessage);

    const request = {
      portfolioId,
      startDate,
      productId,
      allocationStatus,
    };

    const allocationsResponse =
      await client.allocations.listPortfolioAllocations(request);

    console.dir(allocationsResponse, { depth: null });
  } catch (error) {
    console.error(error);
  }
}

listPortfolioAllocationsExample();
