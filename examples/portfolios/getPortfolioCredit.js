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
 * Example: Get Portfolio Credit
 *
 * This example demonstrates how to retrieve credit information for a specific portfolio
 * using the Portfolios service. This provides details about available credit, limits,
 * and credit-related configurations for the portfolio.
 *
 * Usage:
 *   node examples/portfolios/getPortfolioCredit.js [portfolioId]
 *
 * Examples:
 *   node examples/portfolios/getPortfolioCredit.js abc123-def456-ghi789
 *
 * Environment Variables Required:
 *   - PORTFOLIO_ID: (Optional) The ID of the portfolio to get credit information for (can be overridden by command line argument)
 */

// #docs operationId: PrimeRESTAPI_GetPortfolioCredit
// #docs operationName: Get Portfolio Credit

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.argv[2] || process.env.PORTFOLIO_ID;

if (!portfolioId) {
  console.error(
    'Error: PORTFOLIO_ID environment variable or command line argument is required'
  );
  console.error(
    'Usage: node examples/portfolios/getPortfolioCredit.js [portfolioId]'
  );
  return;
}

async function getPortfolioCreditExample() {
  try {
    console.log(
      `💳 Getting portfolio credit information - Portfolio ID: ${portfolioId}`
    );

    const request = {
      portfolioId,
    };

    const creditResponse = await client.portfolios.getPortfolioCredit(request);

    console.dir(creditResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error getting portfolio credit information:', error);
  }
}

getPortfolioCreditExample();
