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
 * Example: Get Portfolio
 *
 * This example demonstrates how to retrieve detailed information about a specific portfolio
 * using the Portfolios service. This provides comprehensive portfolio details including
 * configuration, status, and metadata.
 *
 * Usage:
 *   node examples/portfolios/getPortfolio.js [portfolioId]
 *
 * Examples:
 *   node examples/portfolios/getPortfolio.js abc123-def456-ghi789
 *
 * Environment Variables Required:
 *   - PORTFOLIO_ID: (Optional) The ID of the portfolio to get details for (can be overridden by command line argument)
 */

// #docs operationId: PrimeRESTAPI_GetPortfolio
// #docs operationName: Get Portfolio

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.argv[2] || process.env.PORTFOLIO_ID;

if (!portfolioId) {
  console.error(
    'Error: PORTFOLIO_ID environment variable or command line argument is required'
  );
  console.error(
    'Usage: node examples/portfolios/getPortfolio.js [portfolioId]'
  );
  return;
}

async function getPortfolioExample() {
  try {
    console.log(`📁 Getting portfolio details - Portfolio ID: ${portfolioId}`);

    const request = {
      portfolioId,
    };

    const portfolioResponse = await client.portfolios.getPortfolio(request);

    console.dir(portfolioResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error getting portfolio details:', error);
  }
}

getPortfolioExample();
