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
 * Example: Preview Unstake
 *
 * This example demonstrates how to preview an unstaking operation before initiating it.
 * The preview returns the estimated amount that would be unstaked.
 * This feature currently only supports ETH.
 *
 * Usage:
 *   node examples/staking/previewUnstake.js [amount]
 *
 * Examples:
 *   node examples/staking/previewUnstake.js
 *   node examples/staking/previewUnstake.js 1.5
 */

// #docs operationId: PrimeRESTAPI_PreviewUnstake
// #docs operationName: Preview Unstake

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;
const walletId = process.env.WALLET_ID;
const amount = process.argv[2] || '1.0';

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

if (!walletId) {
  console.error('Error: WALLET_ID environment variable is required');
  return;
}

async function previewUnstakeExample() {
  try {
    const request = {
      portfolioId,
      walletId,
      amount,
    };

    console.log(
      `🔍 Previewing unstake - Portfolio ID: ${portfolioId} - Wallet ID: ${walletId} - Amount: ${amount}`
    );

    const response = await client.staking.previewUnstake(request);
    console.dir(response, { depth: null });
  } catch (error) {
    console.error('❌ Error previewing unstake:', error);
  }
}

previewUnstakeExample();
