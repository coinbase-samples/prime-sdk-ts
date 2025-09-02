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
 * Example: Create Onchain Transaction
 *
 * This example demonstrates how to create an onchain transaction using a raw unsigned
 * transaction using the Transactions service. This supports both EVM and Solana networks.
 *
 * Usage:
 *   node examples/transactions/createOnchainTransaction.js [walletId] [rawUnsignedTxn]
 *
 * Examples:
 *   node examples/transactions/createOnchainTransaction.js abc123-def456 0x02f86c0182...
 *   node examples/transactions/createOnchainTransaction.js wallet-id raw-hex-transaction-data
 *
 * Environment Variables Required:
 *   - PORTFOLIO_ID: The ID of the portfolio containing the wallet
 *
 * Note: This is an advanced example requiring a properly formatted raw unsigned transaction.
 * In practice, you would generate this using a blockchain library or signing service.
 */

// #docs operationId: PrimeRESTAPI_CreateOnchainTransaction
// #docs operationName: Create Onchain Transaction

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;
const walletId = process.argv[2];
const rawUnsignedTxn = process.argv[3];

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

if (!walletId || !rawUnsignedTxn) {
  console.error(
    'Error: WALLET_ID and rawUnsignedTxn command line arguments are required'
  );
  console.error(
    'Usage: node examples/transactions/createOnchainTransaction.js [walletId] [rawUnsignedTxn]'
  );
  return;
}

async function createOnchainTransactionExample() {
  try {
    console.log(`
        ⛓️  Creating onchain transaction - Portfolio ID: ${portfolioId}, Wallet ID: ${walletId}
        Raw Unsigned Transaction: ${rawUnsignedTxn.substring(0, 50)}...`);

    const request = {
      portfolioId,
      walletId,
      rawUnsignedTxn,
    };

    const onchainTransactionResponse =
      await client.transactions.createOnchainTransaction(request);

    console.dir(onchainTransactionResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error creating onchain transaction:', error);
  }
}

createOnchainTransactionExample();
