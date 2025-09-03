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
 * Example: Create Wallet
 *
 * This example demonstrates how to create a new wallet for a specific portfolio
 * using the Wallets service. This creates a new wallet that can hold and manage
 * cryptocurrency assets.
 *
 * Usage:
 *   node examples/wallets/createWallet.js [name] [symbol] [walletType] [networkFamily]
 *
 * Examples:
 *   node examples/wallets/createWallet.js MyBTCWallet BTC TRADING
 *   node examples/wallets/createWallet.js MyETHWallet ETH VAULT ETHEREUM
 *
 * Environment Variables Required:
 *   - PORTFOLIO_ID: The ID of the portfolio to create the wallet in
 */

// #docs operationId: PrimeRESTAPI_CreateWallet
// #docs operationName: Create Wallet

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;

// Command line arguments with defaults
const name = process.argv[2] || 'Example Wallet';
const symbol = process.argv[3] || 'BTC';
const walletType = process.argv[4] || 'TRADING';
const networkFamily = process.argv[5];

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

async function createWalletExample() {
  try {
    let requestMessage = `🆕 Creating wallet - Portfolio ID: ${portfolioId}, Name: ${name}, Symbol: ${symbol}, Type: ${walletType}`;
    if (networkFamily) requestMessage += `, Network Family: ${networkFamily}`;
    console.log(requestMessage);

    const request = {
      portfolioId,
      name,
      symbol,
      walletType,
      networkFamily,
    };

    const createResponse = await client.wallets.createWallet(request);

    console.dir(createResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error creating wallet:', error);
  }
}

createWalletExample();
