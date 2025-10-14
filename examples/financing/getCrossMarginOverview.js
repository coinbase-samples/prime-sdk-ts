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
 * Example: Get Cross Margin Overview
 *
 * This example demonstrates how to retrieve live Cross Margin (XM) data for a specific XM customer.
 * Cross Margin allows customers to use their portfolio as collateral across multiple trading venues.
 *
 * Usage:
 *   node examples/financing/getCrossMarginOverview.js [entityId]
 *
 * Examples:
 *   node examples/financing/getCrossMarginOverview.js
 *   node examples/financing/getCrossMarginOverview.js entity-123
 */

// #docs operationId: PrimeRESTAPI_GetCrossMarginOverview
// #docs operationName: Get Cross Margin Overview

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const entityId = process.argv[2] || process.env.ENTITY_ID;

if (!entityId) {
  console.error(
    'Error: ENTITY_ID environment variable or command line argument is required'
  );
  return;
}

async function getCrossMarginOverviewExample() {
  try {
    const request = {
      entityId,
    };

    console.log(`📊 Getting Cross Margin overview - Entity ID: ${entityId}`);

    const response = await client.financing.getCrossMarginOverview(request);

    console.dir(response, { depth: null });
  } catch (error) {
    console.error(error);
  }
}

getCrossMarginOverviewExample();
