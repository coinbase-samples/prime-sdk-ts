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
 * Example: Get Activity Details
 *
 * This example demonstrates how to retrieve detailed information about a specific activity
 * using the Activities service.
 *
 * Usage:
 *   node getActivity.js <activityId>
 *
 * Example:
 *   node getActivity.js 550e8400-e29b-41d4-a716-446655440000
 */

// #docs operationId: PrimeRESTAPI_GetActivity
// #docs operationName: Get Activity

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;
const activityId = process.argv[2];

if (!activityId) {
  console.error(
    `
    Error: Activity ID is required
    Usage: node getActivity.js <activityId>
    Example: node getActivity.js 550e8400-e29b-41d4-a716-446655440000
    `
  );
  return;
}

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

async function getActivityExample() {
  try {
    console.log(
      `🔍 Fetching activity details - Portfolio ID: ${portfolioId} - Activity ID: ${activityId}`
    );

    const activity = await client.activities.getActivity({
      portfolioId,
      activityId,
    });

    console.dir(activity, { depth: null });
  } catch (error) {
    console.error(error);
  }
}

getActivityExample();
