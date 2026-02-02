/**
 * Copyright 2026-present Coinbase Global, Inc.
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
 * Example: Get Staking Status
 *
 * This example demonstrates how to get the staking status for a wallet.
 * Returns estimated completion times for active staking requests.
 *
 * Usage:
 *   node examples/staking/getStakingStatus.js
 *
 * Environment Variables Required:
 *   - PORTFOLIO_ID: The portfolio ID
 *   - WALLET_ID: The wallet ID
 */

// #docs operationId: PrimeRESTAPI_GetStakingStatus
// #docs operationName: Get Staking Status

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;
const walletId = process.env.WALLET_ID;

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

if (!walletId) {
  console.error('Error: WALLET_ID environment variable is required');
  return;
}

async function getStakingStatusExample() {
  try {
    const request = {
      portfolioId,
      walletId,
    };

    console.log(
      `📊 Getting staking status - Portfolio ID: ${portfolioId} - Wallet ID: ${walletId}`
    );

    const response = await client.staking.getStakingStatus(request);
    console.dir(response, { depth: null });
  } catch (error) {
    console.error('❌ Error getting staking status:', error);
  }
}

getStakingStatusExample();
