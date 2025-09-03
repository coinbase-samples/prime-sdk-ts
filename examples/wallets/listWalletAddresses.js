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
 * Example: List Wallet Addresses
 *
 * This example demonstrates how to retrieve all addresses for a specific wallet
 * using the Wallets service. This shows all deposit addresses associated with
 * the wallet, optionally filtered by network.
 *
 * Usage:
 *   node examples/wallets/listWalletAddresses.js [walletId] [networkId]
 *
 * Examples:
 *   node examples/wallets/listWalletAddresses.js abc123-def456
 *   node examples/wallets/listWalletAddresses.js abc123-def456 eth-mainnet
 *
 * Environment Variables Required:
 *   - PORTFOLIO_ID: The ID of the portfolio containing the wallet
 */

// #docs operationId: PrimeRESTAPI_GetWalletAddresses
// #docs operationName: List Wallet Addresses

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;
const walletId = process.argv[2];
const networkId = process.argv[3] || 'ethereum-mainnet';

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

if (!walletId) {
  console.error('Error: WALLET_ID command line argument is required');
  console.error(
    'Usage: node examples/wallets/listWalletAddresses.js [walletId] [networkId]'
  );
  return;
}

async function listWalletAddressesExample() {
  try {
    let requestMessage = `📍 Listing wallet addresses - Portfolio ID: ${portfolioId}, Wallet ID: ${walletId}`;
    if (networkId) requestMessage += `, Network ID: ${networkId}`;
    console.log(requestMessage);

    const request = {
      portfolioId,
      walletId,
      networkId,
    };

    const addressesResponse = await client.wallets.listWalletAddresses(request);

    console.dir(addressesResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error listing wallet addresses:', error);
  }
}

listWalletAddressesExample();
