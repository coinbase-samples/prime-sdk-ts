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
 * Example: Claim Staking Rewards (Alpha)
 *
 * This example demonstrates how to claim staking rewards for a wallet.
 * This feature is in alpha - please reach out to your Coinbase Prime account manager for more information.
 *
 * Usage:
 *   node examples/staking/claimRewards.js [amount]
 *
 * Examples:
 *   node examples/staking/claimRewards.js
 *   node examples/staking/claimRewards.js 0.5
 */

// #docs operationId: PrimeRESTAPI_StakingClaimRewards
// #docs operationName: Claim Staking Rewards

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;
const walletId = process.env.WALLET_ID;
const amount = process.argv[2];

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

if (!walletId) {
  console.error('Error: WALLET_ID environment variable is required');
  return;
}

async function claimRewardsExample() {
  try {
    const request = {
      portfolioId,
      walletId,
      idempotencyKey: crypto.randomUUID(),
    };

    // Optional: specify amount (ETH only). If omitted, claims maximum available.
    if (amount) {
      request.inputs = {
        amount,
      };
    }

    console.log(
      `💰 Claiming staking rewards - Portfolio ID: ${portfolioId} - Wallet ID: ${walletId}${amount ? ` - Amount: ${amount}` : ' - Amount: MAX'}`
    );

    const response = await client.staking.claimRewards(request);

    console.dir(response);
  } catch (error) {
    console.error(error);
  }
}

claimRewardsExample();
