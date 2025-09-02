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
 * Example: Get Portfolio Commission
 *
 * This example demonstrates how to retrieve commission information for a specific portfolio
 * using the Commission service. The commission information includes the fee model type,
 * commission rate, and average trading volume.
 *
 * Usage:
 *   node examples/commission/getPortfolioCommission.js
 *
 * Environment Variables Required:
 *   - PORTFOLIO_ID: The ID of the portfolio to get commission information for
 */

// #docs operationId: PrimeRESTAPI_GetPortfolioCommission
// #docs operationName: Get Portfolio Commission

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

async function getPortfolioCommissionExample() {
  try {
    console.log(
      `💰 Getting portfolio commission information - Portfolio ID: ${portfolioId}`
    );

    const request = {
      portfolioId,
    };

    const commissionResponse =
      await client.commission.getPortfolioCommission(request);

    console.dir(commissionResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error getting portfolio commission:', error);
  }
}

getPortfolioCommissionExample();
