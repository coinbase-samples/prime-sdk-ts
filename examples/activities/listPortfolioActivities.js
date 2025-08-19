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
 * Example: List Portfolio Activities
 *
 * This example demonstrates how to retrieve a list of activities for a portfolio
 * with optional filtering by category and type.
 *
 * Usage:
 *   node examples/activities/listPortfolioActivities.js [category] [type]
 *
 * Examples:
 *   node examples/activities/listPortfolioActivities.js
 *   node examples/activities/listPortfolioActivities.js ACTIVITY_CATEGORY_TRANSACTION ACTIVITY_STATUS_COMPLETED
 */

// #docs operationId: PrimeRESTAPI_ListPortfolioActivities
// #docs operationName: List Portfolio Activities

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;
const category = process.argv[2];
const status = process.argv[3];

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

async function listPortfolioActivitiesExample() {
  try {
    let requestMessage = `📋 Listing portfolio activities - Portfolio ID: ${portfolioId}`;
    console.log(requestMessage);
    if (category) requestMessage += ` - Category: ${category}`;
    if (status) requestMessage += ` - Status: ${status}`;
    console.log(requestMessage);

    const request = {
      portfolioId,
      categories: [category],
      statuses: [status],
    };

    const activitiesResponse =
      await client.activities.listPortfolioActivities(request);

    console.dir(activitiesResponse, { depth: null });
  } catch (error) {
    console.error(error);
  }
}

listPortfolioActivitiesExample();
