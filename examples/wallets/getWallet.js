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
 * Example: Get Wallet
 *
 * This example demonstrates how to retrieve detailed information about a specific wallet
 * using the Wallets service. This provides comprehensive wallet details including
 * balances, addresses, and configuration.
 *
 * Usage:
 *   node examples/wallets/getWallet.js [walletId]
 *
 * Examples:
 *   node examples/wallets/getWallet.js abc123-def456-ghi789
 *
 * Environment Variables Required:
 *   - PORTFOLIO_ID: The ID of the portfolio containing the wallet
 */

// #docs operationId: PrimeRESTAPI_GetWallet
// #docs operationName: Get Wallet

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;
const walletId = process.argv[2];

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

if (!walletId) {
  console.error('Error: WALLET_ID command line argument is required');
  console.error('Usage: node examples/wallets/getWallet.js [walletId]');
  return;
}

async function getWalletExample() {
  try {
    console.log(
      `💼 Getting wallet details - Portfolio ID: ${portfolioId}, Wallet ID: ${walletId}`
    );

    const request = {
      portfolioId,
      walletId,
    };

    const walletResponse = await client.wallets.getWallet(request);

    console.dir(walletResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error getting wallet details:', error);
  }
}

getWalletExample();
