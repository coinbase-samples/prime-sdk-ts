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
 * Example: Get Prime Cross Margin Overview (Beta)
 *
 * This example demonstrates how to retrieve full live cross-margin (XM) margin
 * information for an entity, including margin summary, control status, margin
 * level, and detailed equity breakdowns.
 *
 * Usage:
 *   node examples/financing/getCrossMarginPrimeOverview.js [entityId]
 *
 * Environment Variables Required:
 *   - ENTITY_ID: The Prime Entity ID for the XM customer
 */

// #docs operationId: PrimeBeta_GetCrossMarginPrimeOverview
// #docs operationName: Get Prime Cross Margin Overview

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const entityId = process.argv[2] || process.env.ENTITY_ID;

if (!entityId) {
  console.error(
    'Error: ENTITY_ID environment variable or command line argument is required'
  );
  process.exit(1);
}

async function getCrossMarginPrimeOverviewExample() {
  try {
    console.log(`Getting Prime Cross Margin overview - Entity ID: ${entityId}`);

    const request = { entityId };

    const response = await client.financing.getCrossMarginPrimeOverview(request);

    console.dir(response, { depth: null });
  } catch (error) {
    console.error('Error:', error);
  }
}

getCrossMarginPrimeOverviewExample();
