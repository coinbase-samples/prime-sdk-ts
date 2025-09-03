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
 * Example: Create Wallet Deposit Address
 *
 * This example demonstrates how to create a new deposit address for a specific wallet
 * using the Wallets service. This generates a new blockchain address that can be used
 * to receive deposits for the wallet on the specified network.
 *
 * Usage:
 *   node examples/wallets/createWalletDepositAddress.js [walletId] [networkId]
 *
 * Examples:
 *   node examples/wallets/createWalletDepositAddress.js abc123-def456 eth-mainnet
 *   node examples/wallets/createWalletDepositAddress.js xyz789-ghi012 btc-mainnet
 *
 * Environment Variables Required:
 *   - PORTFOLIO_ID: The ID of the portfolio containing the wallet
 */

// #docs operationId: PrimeRESTAPI_CreateWalletDepositAddress
// #docs operationName: Create Wallet Deposit Address

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;
const walletId = process.argv[2];
const networkId = process.argv[3] || 'eth-mainnet';

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

if (!walletId) {
  console.error('Error: WALLET_ID command line argument is required');
  console.error(
    'Usage: node examples/wallets/createWalletDepositAddress.js [walletId] [networkId]'
  );
  return;
}

async function createWalletDepositAddressExample() {
  try {
    console.log(
      `🔗 Creating wallet deposit address - Portfolio ID: ${portfolioId}, Wallet ID: ${walletId}, Network ID: ${networkId}`
    );

    const request = {
      portfolioId,
      walletId,
      networkId,
    };

    const createAddressResponse =
      await client.wallets.createWalletDepositAddress(request);

    console.dir(createAddressResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error creating wallet deposit address:', error);
  }
}

createWalletDepositAddressExample();
