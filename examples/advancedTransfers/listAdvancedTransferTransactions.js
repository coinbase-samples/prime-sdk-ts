/**
 * Copyright 2026-present Coinbase Global, Inc.
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
 * Example: List Advanced Transfer Transactions
 *
 * This example demonstrates how to list the transactions associated with a
 * specific advanced transfer. This API is not available to all clients —
 * reach out to Prime Operations for access.
 *
 * Usage:
 *   node examples/advancedTransfers/listAdvancedTransferTransactions.js <advancedTransferId>
 *
 * Examples:
 *   node examples/advancedTransfers/listAdvancedTransferTransactions.js abc123-def456-ghi789
 *
 * Environment Variables Required:
 *   - PORTFOLIO_ID: The ID of the portfolio containing the advanced transfer
 */

// #docs operationId: PrimeRESTAPI_ListAdvancedTransferTransactions
// #docs operationName: List Advanced Transfer Transactions

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;
const advancedTransferId = process.argv[2];

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  process.exit(1);
}

if (!advancedTransferId) {
  console.error('Error: Advanced Transfer ID is required');
  console.error(
    'Usage: node examples/advancedTransfers/listAdvancedTransferTransactions.js <advancedTransferId>'
  );
  process.exit(1);
}

async function listAdvancedTransferTransactionsExample() {
  try {
    console.log(
      `Listing transactions for advanced transfer - Portfolio ID: ${portfolioId}, Transfer ID: ${advancedTransferId}`
    );

    const request = {
      portfolioId,
      advancedTransferId,
    };

    const response =
      await client.advancedTransfers.listAdvancedTransferTransactions(request);

    console.dir(response, { depth: null });
  } catch (error) {
    console.error('Error listing advanced transfer transactions:', error);
  }
}

listAdvancedTransferTransactionsExample();
