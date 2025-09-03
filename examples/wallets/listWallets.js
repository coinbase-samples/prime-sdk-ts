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
 * Example: List Wallets
 *
 * This example demonstrates how to retrieve all wallets for a specific portfolio
 * using the Wallets service. Wallets can be filtered by type and symbols.
 *
 * Usage:
 *   node examples/wallets/listWallets.js [walletType] [symbols]
 *
 * Examples:
 *   node examples/wallets/listWallets.js
 *   node examples/wallets/listWallets.js TRADING BTC,ETH
 *
 * Environment Variables Required:
 *   - PORTFOLIO_ID: The ID of the portfolio to list wallets for
 */

// #docs operationId: PrimeRESTAPI_GetWallets
// #docs operationName: List Wallets

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;
const walletType = process.argv[2];
const symbolsCsv = process.argv[3];

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

async function listWalletsExample() {
  try {
    let requestMessage = `💼 Listing wallets - Portfolio ID: ${portfolioId}`;
    requestMessage += ` - Type: ${walletType}`;
    if (symbolsCsv) requestMessage += ` - Symbols: ${symbolsCsv}`;
    console.log(requestMessage);

    const request = {
      portfolioId,
      type: walletType,
      symbols: symbolsCsv ? symbolsCsv.split(',') : undefined,
    };

    const walletsResponse = await client.wallets.listWallets(request);

    console.dir(walletsResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error listing wallets:', error);
  }
}

listWalletsExample();
