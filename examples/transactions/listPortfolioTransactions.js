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
 * Example: List Portfolio Transactions
 *
 * This example demonstrates how to retrieve transaction history for a specific portfolio
 * using the Transactions service. Transactions can be filtered by symbols, types, and time range.
 *
 * Usage:
 *   node examples/transactions/listPortfolioTransactions.js [symbols] [types] [startTime] [endTime]
 *
 * Examples:
 *   node examples/transactions/listPortfolioTransactions.js
 *   node examples/transactions/listPortfolioTransactions.js BTC,ETH
 *   node examples/transactions/listPortfolioTransactions.js BTC,ETH DEPOSIT,WITHDRAWAL
 *   node examples/transactions/listPortfolioTransactions.js BTC,ETH DEPOSIT,WITHDRAWAL 2024-01-01T00:00:00Z 2024-12-31T23:59:59Z
 *
 * Environment Variables Required:
 *   - PORTFOLIO_ID: The ID of the portfolio to list transactions for
 */

// #docs operationId: PrimeRESTAPI_GetPortfolioTransactions
// #docs operationName: List Portfolio Transactions

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;
const symbolsCsv = process.argv[2];
const typesCsv = process.argv[3];
const startTime = process.argv[4];
const endTime = process.argv[5];

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

async function listPortfolioTransactionsExample() {
  try {
    let requestMessage = `📊 Listing portfolio transactions - Portfolio ID: ${portfolioId}`;
    if (symbolsCsv) requestMessage += ` - Symbols: ${symbolsCsv}`;
    if (typesCsv) requestMessage += ` - Types: ${typesCsv}`;
    if (startTime) requestMessage += ` - Start: ${startTime}`;
    if (endTime) requestMessage += ` - End: ${endTime}`;
    console.log(requestMessage);

    const request = {
      portfolioId,
      symbols: symbolsCsv ? symbolsCsv.split(',') : undefined,
      types: typesCsv ? typesCsv.split(',') : undefined,
      startTime,
      endTime,
    };

    const transactionsResponse =
      await client.transactions.listPortfolioTransactions(request);

    console.dir(transactionsResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error listing portfolio transactions:', error);
  }
}

listPortfolioTransactionsExample();
