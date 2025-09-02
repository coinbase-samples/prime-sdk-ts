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
 * with optional filtering by categories and statuses. Multiple values can be
 * provided as comma-separated lists.
 *
 * Usage:
 *   node examples/activities/listPortfolioActivities.js [categories] [statuses]
 *
 * Examples:
 *   node examples/activities/listPortfolioActivities.js
 *   node examples/activities/listPortfolioActivities.js ACTIVITY_CATEGORY_TRANSACTION
 *   node examples/activities/listPortfolioActivities.js ACTIVITY_CATEGORY_TRANSACTION,ACTIVITY_CATEGORY_TRANSFER
 *   node examples/activities/listPortfolioActivities.js ACTIVITY_CATEGORY_TRANSACTION ACTIVITY_STATUS_COMPLETED
 *   node examples/activities/listPortfolioActivities.js ACTIVITY_CATEGORY_TRANSACTION,ACTIVITY_CATEGORY_TRANSFER ACTIVITY_STATUS_COMPLETED,ACTIVITY_STATUS_PENDING
 */

// #docs operationId: PrimeRESTAPI_ListPortfolioActivities
// #docs operationName: List Portfolio Activities

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;
const categoriesArg = process.argv[2];
const statusesArg = process.argv[3];

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

async function listPortfolioActivitiesExample() {
  try {
    let requestMessage = `📋 Listing portfolio activities - Portfolio ID: ${portfolioId}`;
    if (categoriesArg) requestMessage += `, Categories: ${categoriesArg}`;
    if (statusesArg) requestMessage += `, Statuses: ${statusesArg}`;

    console.log(requestMessage);

    const request = {
      portfolioId,
    };

    if (categoriesArg) request.categories = categoriesArg.split(',');
    if (statusesArg) request.statuses = statusesArg.split(',');

    const activitiesResponse =
      await client.activities.listPortfolioActivities(request);

    console.dir(activitiesResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error listing portfolio activities:', error);
  }
}

listPortfolioActivitiesExample();
