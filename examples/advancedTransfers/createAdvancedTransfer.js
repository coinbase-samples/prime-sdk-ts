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
 * Example: Create Advanced Transfer
 *
 * This example demonstrates how to create an advanced transfer for a given
 * portfolio. Advanced transfers support complex operations such as blind match
 * settlements. This API is not available to all clients — reach out to Prime
 * Operations for access.
 *
 * Usage:
 *   node examples/advancedTransfers/createAdvancedTransfer.js
 *
 * Environment Variables Required:
 *   - PORTFOLIO_ID: The ID of the portfolio to create the advanced transfer in
 */

// #docs operationId: PrimeRESTAPI_CreateAdvancedTransfer
// #docs operationName: Create Advanced Transfer

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  process.exit(1);
}

async function createAdvancedTransferExample() {
  try {
    console.log(`Creating advanced transfer - Portfolio ID: ${portfolioId}`);

    const request = {
      portfolioId,
      advancedTransfer: {
        type: 'ADVANCED_TRANSFER_TYPE_BLIND_MATCH',
      },
    };

    const response = await client.advancedTransfers.createAdvancedTransfer(request);

    console.dir(response, { depth: null });
  } catch (error) {
    console.error('Error creating advanced transfer:', error);
  }
}

createAdvancedTransferExample();
