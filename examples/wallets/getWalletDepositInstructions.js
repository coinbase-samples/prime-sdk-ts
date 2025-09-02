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
 * Example: Get Wallet Deposit Instructions
 *
 * This example demonstrates how to retrieve deposit instructions for a specific wallet
 * using the Wallets service. This provides the necessary information to deposit funds
 * into the wallet, including addresses and network-specific details.
 *
 * Usage:
 *   node examples/wallets/getWalletDepositInstructions.js [walletId] [depositType] [networkId] [networkType]
 *
 * Examples:
 *   node examples/wallets/getWalletDepositInstructions.js abc123-def456 WALLET_DEPOSIT_INSTRUCTION_TYPE_CRYPTO_ADDRESS
 *   node examples/wallets/getWalletDepositInstructions.js abc123-def456 WALLET_DEPOSIT_INSTRUCTION_TYPE_CRYPTO_ADDRESS eth-mainnet ETHEREUM
 *
 * Environment Variables Required:
 *   - PORTFOLIO_ID: The ID of the portfolio containing the wallet
 *   - WALLET_ID: (Optional) The ID of the wallet to get deposit instructions for
 */

// #docs operationId: PrimeRESTAPI_GetWalletDepositInstructions
// #docs operationName: Get Wallet Deposit Instructions

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;
const walletId = process.argv[2] || process.env.WALLET_ID;
const networkId = process.argv[3];
const networkType = process.argv[4];
const depositType = 'CRYPTO';

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

if (!walletId) {
  console.error(
    'Error: WALLET_ID environment variable or command line argument is required'
  );
  console.error(
    'Usage: node examples/wallets/getWalletDepositInstructions.js [walletId] [networkId] [networkType]'
  );
  return;
}

async function getWalletDepositInstructionsExample() {
  try {
    let requestMessage = `📥 Getting wallet deposit instructions - Portfolio ID: ${portfolioId}, Wallet ID: ${walletId}, Deposit Type: ${depositType}`;
    if (networkId) requestMessage += `, Network ID: ${networkId}`;
    if (networkType) requestMessage += `, Network Type: ${networkType}`;
    console.log(requestMessage);

    const request = {
      portfolioId,
      walletId,
      depositType,
      networkId,
      networkType,
    };

    const depositInstructionsResponse =
      await client.wallets.getWalletDepositInstructions(request);

    console.dir(depositInstructionsResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error getting wallet deposit instructions:', error);
  }
}

getWalletDepositInstructionsExample();
