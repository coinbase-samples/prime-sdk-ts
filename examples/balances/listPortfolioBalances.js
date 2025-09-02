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
 * Example: List Portfolio Balances
 *
 * This example demonstrates how to retrieve balance information for a specific portfolio
 * using the Balances service.
 *
 * Usage:
 *   node examples/balances/listPortfolioBalances.js [balanceType] [symbolsCsv]
 *
 * Examples:
 *   node examples/balances/listPortfolioBalances.js
 *   node examples/balances/listPortfolioBalances.js TRADING_BALANCES
 *   node examples/balances/listPortfolioBalances.js VAULT_BALANCES BTC,ETH
 */

// #docs operationId: PrimeRESTAPI_GetPortfolioBalances
// #docs operationName: List Portfolio Balances

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;
const balanceType = process.argv[2];
const symbolsCsv = process.argv[3];

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

async function listPortfolioBalancesExample() {
  try {
    let requestMessage = `📋 Listing portfolio balances - Portfolio ID: ${portfolioId}`;
    if (balanceType) requestMessage += ` - Type: ${balanceType}`;
    if (symbolsCsv) requestMessage += ` - Symbols: ${symbolsCsv}`;
    console.log(requestMessage);

    const request = {
      portfolioId,
      balanceType,
      symbols: symbolsCsv ? symbolsCsv.split(',') : undefined,
    };

    const balancesResponse =
      await client.balances.listPortfolioBalances(request);

    console.dir(balancesResponse, { depth: null });
  } catch (error) {
    console.error(error);
  }
}

listPortfolioBalancesExample();
