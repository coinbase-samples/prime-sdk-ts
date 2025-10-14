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
 * Example: Query Transaction Validators
 *
 * This example demonstrates how to query ETH 0x02 validators associated with
 * wallet-level stake transactions for a given portfolio.
 *
 * Usage:
 *   node examples/staking/queryTransactionValidators.js [transactionId1] [transactionId2] ...
 *
 * Examples:
 *   node examples/staking/queryTransactionValidators.js
 *   node examples/staking/queryTransactionValidators.js tx-123 tx-456
 */

// #docs operationId: PrimeRESTAPI_ListTransactionValidators
// #docs operationName: Query Transaction Validators

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;
const transactionIds = process.argv.slice(2);

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

if (transactionIds.length === 0) {
  console.error('Error: At least one transaction ID is required');
  console.log(
    'Usage: node examples/staking/queryTransactionValidators.js [transactionId1] [transactionId2] ...'
  );
  return;
}

async function queryTransactionValidatorsExample() {
  try {
    const request = {
      portfolioId,
      transactionIds,
      limit: 100,
    };

    console.log(
      `🔍 Querying transaction validators - Portfolio ID: ${portfolioId} - Transaction IDs: ${transactionIds.join(', ')}`
    );

    const response = await client.staking.queryTransactionValidators(request);

    console.dir(response.transactionValidators, { depth: null });
  } catch (error) {
    console.error(error);
  }
}

queryTransactionValidatorsExample();
