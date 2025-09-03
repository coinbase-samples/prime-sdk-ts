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
 * Example: List Portfolio Users
 *
 * This example demonstrates how to retrieve all users associated with a specific portfolio
 * using the Users service. This provides information about users who have access to the
 * specific portfolio, including their roles and permissions at the portfolio level.
 *
 * Usage:
 *   node examples/users/listPortfolioUsers.js
 *
 * Environment Variables Required:
 *   - PORTFOLIO_ID: The ID of the portfolio to list users for
 */

// #docs operationId: PrimeRESTAPI_GetPortfolioUsers
// #docs operationName: List Portfolio Users

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

async function listPortfolioUsersExample() {
  try {
    console.log(`👥 Listing portfolio users - Portfolio ID: ${portfolioId}`);

    const request = {
      portfolioId,
    };

    const usersResponse = await client.users.listPortfolioUsers(request);

    console.dir(usersResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error listing portfolio users:', error);
  }
}

listPortfolioUsersExample();
