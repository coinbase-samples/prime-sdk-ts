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
 * Example: Create Transfer
 *
 * This example demonstrates how to create a transfer transaction between two wallets
 * using the Transactions service. This transfers cryptocurrency from one wallet to another
 * within the same portfolio.
 *
 * Usage:
 *   node examples/transactions/createTransfer.js [sourceWalletId] [destinationWalletId] [amount] [currencySymbol]
 *
 * Examples:
 *   node examples/transactions/createTransfer.js abc123-def456 xyz789-ghi012 1.5 BTC
 *   node examples/transactions/createTransfer.js wallet1-id wallet2-id 1000 USDC
 *
 * Environment Variables Required:
 *   - PORTFOLIO_ID: The ID of the portfolio containing the wallets
 */

// #docs operationId: PrimeRESTAPI_CreateWalletTransfer
// #docs operationName: Create Transfer

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;
const sourceWalletId = process.argv[2];
const destinationWalletId = process.argv[3];
const amount = process.argv[4] || '1.0';
const currencySymbol = process.argv[5] || 'BTC';

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

if (!sourceWalletId || !destinationWalletId) {
  console.error('Error: Source and destination wallet IDs are required');
  console.error(
    'Usage: node examples/transactions/createTransfer.js [sourceWalletId] [destinationWalletId] [amount] [currencySymbol]'
  );
  return;
}

async function createTransferExample() {
  try {
    console.log(`
        💸 Creating transfer - Portfolio ID: ${portfolioId}, Amount: ${amount} ${currencySymbol}
        Source Wallet: ${sourceWalletId}
        Destination Wallet: ${destinationWalletId}`);

    const request = {
      portfolioId,
      walletId: sourceWalletId,
      amount,
      destination: destinationWalletId,
      currencySymbol,
      idempotencyKey: crypto.randomUUID(),
    };

    const transferResponse = await client.transactions.createTransfer(request);

    console.dir(transferResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error creating transfer:', error);
  }
}

createTransferExample();
