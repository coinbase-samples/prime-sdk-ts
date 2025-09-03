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
 * Example: List Entity Activities
 *
 * This example demonstrates how to retrieve a list of activities for an entity
 * with optional filtering by category and status.
 *
 * Usage:
 *   node examples/activities/listEntityActivities.js [category] [status]
 *
 * Examples:
 *   node examples/activities/listEntityActivities.js
 *   node examples/activities/listEntityActivities.js ACTIVITY_CATEGORY_TRANSACTION ACTIVITY_STATUS_COMPLETED
 */

// #docs operationId: PrimeRESTAPI_ListEntityActivities
// #docs operationName: List Entity Activities

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const entityId = process.env.ENTITY_ID;
const category = process.argv[2];
const status = process.argv[3];

if (!entityId) {
  console.error('Error: ENTITY_ID environment variable is required');
  return;
}

async function listEntityActivitiesExample() {
  try {
    let requestMessage = `📋 Listing entity activities - Entity ID: ${entityId}`;
    if (category) requestMessage += ` - Category: ${category}`;
    if (status) requestMessage += ` - Status: ${status}`;
    console.log(requestMessage);

    const request = {
      entityId,
      categories: category ? [category] : undefined,
      statuses: status ? [status] : undefined,
    };

    const activitiesResponse =
      await client.activities.listEntityActivities(request);

    console.dir(activitiesResponse, { depth: null });
  } catch (error) {
    console.error(error);
  }
}

listEntityActivitiesExample();
