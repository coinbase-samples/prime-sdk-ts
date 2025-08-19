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
 * Example: Create Stake
 *
 * This example demonstrates how to create a staking request for a wallet.
 *
 * Usage:
 *   node createStake.js [amount]
 *
 * Examples:
 *   node createStake.js
 *   node createStake.js 0.5
 */

// #docs operationId: PrimeRESTAPI_CreateStake
// #docs operationName: Create Stake

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;
const walletId = process.env.WALLET_ID;
const amount = process.argv[2] || '0.01';

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

if (!walletId) {
  console.error('Error: WALLET_ID environment variable is required');
  return;
}

async function createStakeExample() {
  try {
    const request = {
      portfolioId,
      walletId,
      idempotency_key: crypto.randomUUID(),
      inputs: {
        amount,
      },
    };

    console.log(
      `🥩 Creating stake - Portfolio ID: ${portfolioId} - Wallet ID: ${walletId} - Amount: ${amount}`
    );

    const response = await client.staking.createStake(request);

    console.dir(response, { depth: null });
  } catch (error) {
    console.error(error);
  }
}

createStakeExample();
