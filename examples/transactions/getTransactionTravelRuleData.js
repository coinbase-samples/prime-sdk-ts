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
 * Example: Get Transaction Travel Rule Data
 *
 * This example demonstrates how to retrieve fulfilled travel rule data for a
 * transaction. Returns originator and beneficiary information along with
 * fulfillment status.
 *
 * Usage:
 *   node examples/transactions/getTransactionTravelRuleData.js [transactionId]
 *
 * Examples:
 *   node examples/transactions/getTransactionTravelRuleData.js abc123-def456-ghi789
 *
 * Environment Variables Required:
 *   - PORTFOLIO_ID: The ID of the portfolio containing the transaction
 */

// #docs operationId: PrimeRESTAPI_GetTransactionTravelRuleData
// #docs operationName: Get Transaction Travel Rule Data

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
    'Usage: node examples/transactions/getTransactionTravelRuleData.js [transactionId]'
  );
  return;
}

async function getTransactionTravelRuleDataExample() {
  try {
    console.log(`
        Fetching travel rule data - Portfolio ID: ${portfolioId}
        Transaction ID: ${transactionId}`);

    const request = {
      portfolioId,
      transactionId,
    };

    const response =
      await client.transactions.getTransactionTravelRuleData(request);

    console.dir(response, { depth: null });
  } catch (error) {
    console.error('Error fetching transaction travel rule data:', error);
  }
}

getTransactionTravelRuleDataExample();
