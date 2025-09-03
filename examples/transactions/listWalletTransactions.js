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
 * Example: List Wallet Transactions
 *
 * This example demonstrates how to retrieve transaction history for a specific wallet
 * using the Transactions service. Transactions can be filtered by types and time range.
 *
 * Usage:
 *   node examples/transactions/listWalletTransactions.js [walletId] [types] [startTime] [endTime]
 *
 * Examples:
 *   node examples/transactions/listWalletTransactions.js abc123-def456
 *   node examples/transactions/listWalletTransactions.js abc123-def456 DEPOSIT,WITHDRAWAL
 *   node examples/transactions/listWalletTransactions.js abc123-def456 DEPOSIT,WITHDRAWAL 2024-01-01T00:00:00Z 2024-12-31T23:59:59Z
 *
 * Environment Variables Required:
 *   - PORTFOLIO_ID: The ID of the portfolio containing the wallet
 */

// #docs operationId: PrimeRESTAPI_GetWalletTransactions
// #docs operationName: List Wallet Transactions

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;
const walletId = process.argv[2];
const typesCsv = process.argv[3];
const startTime = process.argv[4];
const endTime = process.argv[5];

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

if (!walletId) {
  console.error('Error: WALLET_ID command line argument is required');
  console.error(
    'Usage: node examples/transactions/listWalletTransactions.js [walletId] [types] [startTime] [endTime]'
  );
  return;
}

async function listWalletTransactionsExample() {
  try {
    let requestMessage = `📊 Listing wallet transactions - Portfolio ID: ${portfolioId}, Wallet ID: ${walletId}`;
    if (typesCsv) requestMessage += ` - Types: ${typesCsv}`;
    if (startTime) requestMessage += ` - Start: ${startTime}`;
    if (endTime) requestMessage += ` - End: ${endTime}`;
    console.log(requestMessage);

    const request = {
      portfolioId,
      walletId,
      types: typesCsv ? typesCsv.split(',') : undefined,
      startTime,
      endTime,
    };

    const transactionsResponse =
      await client.transactions.listWalletTransactions(request);

    console.dir(transactionsResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error listing wallet transactions:', error);
  }
}

listWalletTransactionsExample();
