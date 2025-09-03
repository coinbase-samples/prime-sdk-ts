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
 * Example: Create Conversion
 *
 * This example demonstrates how to create a currency conversion transaction
 * using the Transactions service. This converts one cryptocurrency to another
 * within the same portfolio.
 *
 * Usage:
 *   node examples/transactions/createConversion.js [sourceWalletId] [destinationWalletId] [amount] [sourceSymbol] [destinationSymbol]
 *
 * Examples:
 *   node examples/transactions/createConversion.js abc123-def456 xyz789-ghi012 1.5 BTC ETH
 *   node examples/transactions/createConversion.js wallet1-id wallet2-id 1000 USDC USD
 *
 * Environment Variables Required:
 *   - PORTFOLIO_ID: The ID of the portfolio containing the wallets
 */

// #docs operationId: PrimeRESTAPI_CreateConversion
// #docs operationName: Create Conversion

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;
const sourceWalletId = process.argv[2];
const destinationWalletId = process.argv[3];
const amount = process.argv[4] || '1.0';
const sourceSymbol = process.argv[5] || 'BTC';
const destinationSymbol = process.argv[6] || 'ETH';

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

if (!sourceWalletId || !destinationWalletId) {
  console.error('Error: Source and destination wallet IDs are required');
  console.error(
    'Usage: node examples/transactions/createConversion.js [sourceWalletId] [destinationWalletId] [amount] [sourceSymbol] [destinationSymbol]'
  );
  return;
}

async function createConversionExample() {
  try {
    console.log(`
        🔄 Creating conversion - Portfolio ID: ${portfolioId}, Amount: ${amount} ${sourceSymbol} → ${destinationSymbol}
        Source Wallet: ${sourceWalletId}
        Destination Wallet: ${destinationWalletId}`);

    const request = {
      portfolioId,
      walletId: sourceWalletId,
      amount,
      destination: destinationWalletId,
      sourceSymbol,
      destinationSymbol,
      idempotencyKey: crypto.randomUUID(),
    };

    const conversionResponse =
      await client.transactions.createConversion(request);

    console.dir(conversionResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error creating conversion:', error);
  }
}

createConversionExample();
