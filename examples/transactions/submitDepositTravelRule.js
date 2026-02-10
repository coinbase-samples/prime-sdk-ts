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
 * Example: Submit Deposit Travel Rule Data
 *
 * This example demonstrates how to submit travel rule data for an existing
 * deposit transaction. Travel rule compliance requires providing originator
 * and beneficiary information for certain transactions.
 *
 * Usage:
 *   node examples/transactions/submitDepositTravelRule.js [transactionId]
 *
 * Examples:
 *   node examples/transactions/submitDepositTravelRule.js abc123-def456-ghi789
 *
 * Environment Variables Required:
 *   - PORTFOLIO_ID: The ID of the portfolio containing the transaction
 */

// #docs operationId: PrimeRESTAPI_SubmitDepositTravelRuleData
// #docs operationName: Submit Deposit Travel Rule Data

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;
const transactionId = process.argv[2];

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

if (!transactionId) {
  console.error('Error: Transaction ID is required');
  console.error(
    'Usage: node examples/transactions/submitDepositTravelRule.js [transactionId]'
  );
  return;
}

async function submitDepositTravelRuleExample() {
  try {
    console.log(`
        📋 Submitting travel rule data - Portfolio ID: ${portfolioId}
        Transaction ID: ${transactionId}`);

    const request = {
      portfolioId,
      transactionId,
      // Originator information (the sender of the funds)
      originator: {
        name: 'John Doe',
        walletType: 'TRAVEL_RULE_WALLET_TYPE_VASP',
        vaspName: 'Example Exchange',
        // Optional fields:
        // personalId: 'PASSPORT123456',
        // accountId: 'account-123',
      },
      // Beneficiary information (the receiver of the funds)
      beneficiary: {
        name: 'Your Company Name',
        walletType: 'TRAVEL_RULE_WALLET_TYPE_VASP',
        vaspName: 'Coinbase Prime',
      },
      // Set to true if the originator and beneficiary are the same party
      isSelf: false,
      // Set to true to opt out of ownership verification (if applicable)
      // optOutOfOwnershipVerification: false,
    };

    const response = await client.transactions.submitDepositTravelRule(request);

    console.dir(response, { depth: null });
  } catch (error) {
    console.error('❌ Error submitting travel rule data:', error);
  }
}

submitDepositTravelRuleExample();
