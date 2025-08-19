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
 * This example demonstrates how to list wallets for a portfolio.
 *
 * Usage:
 *   node examples/wallets/listWallets.js [type]
 *
 * Examples:
 *   node examples/wallets/listWallets.js
 *   node examples/wallets/listWallets.js VAULT
 *   node examples/wallets/listWallets.js TRADING
 */

// #docs operationId: PrimeRESTAPI_ListWallets
// #docs operationName: List Wallets

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;
const type = process.argv[2];

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

async function listWalletsExample() {
  try {
    let requestMessage = `💼 Listing wallets - Portfolio ID: ${portfolioId}`;
    if (type) requestMessage += ` - Type: ${type}`;
    console.log(requestMessage);

    const response = await client.wallets.listWallets({
      portfolioId,
      type,
    });

    console.dir(response, { depth: null });
  } catch (error) {
    console.error(error);
  }
}

listWalletsExample();
