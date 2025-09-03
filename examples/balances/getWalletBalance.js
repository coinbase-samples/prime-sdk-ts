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
 * Example: Get Wallet Balance
 *
 * This example demonstrates how to retrieve balance information for a specific wallet
 * using the Balances service.
 *
 * Usage:
 *   node examples/balances/getWalletBalance.js <walletId>
 *
 * Example:
 *   node examples/balances/getWalletBalance.js wallet-123
 */

// #docs operationId: PrimeRESTAPI_GetWalletBalance
// #docs operationName: Get Wallet Balance

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;
const walletId = process.argv[2];

if (!walletId) {
  console.error(
    `
    Error: Wallet ID is required
    Usage: node examples/balances/getWalletBalance.js <walletId>
    
    Example:
      node examples/balances/getWalletBalance.js wallet-123
    `
  );
  return;
}

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

async function getWalletBalanceExample() {
  try {
    console.log(
      `🔍 Fetching wallet balance - Portfolio ID: ${portfolioId} - Wallet ID: ${walletId}`
    );

    const walletBalance = await client.balances.getWalletBalance({
      portfolioId,
      walletId,
    });

    console.dir(walletBalance, { depth: null });
  } catch (error) {
    console.error(error);
  }
}

getWalletBalanceExample();


