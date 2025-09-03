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
 * Example: List Onchain Wallet Balances
 *
 * This example demonstrates how to retrieve onchain balance information for a specific wallet
 * using the Balances service.
 *
 * Usage:
 *   node examples/balances/listOnchainWalletBalances.js <walletId> [visibilityStatus]
 *
 * Examples:
 *   node examples/balances/listOnchainWalletBalances.js wallet-123
 *   node examples/balances/listOnchainWalletBalances.js wallet-123 VISIBILITY_STATUS_VISIBLE
 */

// #docs operationId: PrimeRESTAPI_ListOnchainWalletBalances
// #docs operationName: List Onchain Wallet Balances

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;
const walletId = process.argv[2];
const visibilityStatus = process.argv[3];

if (!walletId) {
  console.error(
    `
    Error: Wallet ID is required
    Usage: node examples/balances/listOnchainWalletBalances.js <walletId> [visibilityStatus]
    
    Examples:
      node examples/balances/listOnchainWalletBalances.js wallet-123
      node examples/balances/listOnchainWalletBalances.js wallet-123 VISIBILITY_STATUS_VISIBLE
    `
  );
  return;
}

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

async function listOnchainWalletBalancesExample() {
  try {
    let requestMessage = `📋 Listing onchain wallet balances - Portfolio ID: ${portfolioId} - Wallet ID: ${walletId}`;
    if (visibilityStatus)
      requestMessage += ` - Visibility: ${visibilityStatus}`;
    console.log(requestMessage);

    const request = {
      portfolioId,
      walletId,
      visibilityStatus,
    };

    const onchainBalancesResponse =
      await client.balances.listOnchainWalletBalances(request);

    console.dir(onchainBalancesResponse, { depth: null });
  } catch (error) {
    console.error(error);
  }
}

listOnchainWalletBalancesExample();


