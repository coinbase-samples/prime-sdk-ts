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
 * Example: List Assets
 *
 * This example demonstrates how to retrieve a list of assets for an entity
 * using the Assets service.
 *
 * Usage:
 *   node examples/assets/listAssets.js
 */

// #docs operationId: PrimeRESTAPI_GetEntityAssets
// #docs operationName: List Assets

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const entityId = process.env.ENTITY_ID;

if (!entityId) {
  console.error('Error: ENTITY_ID environment variable is required');
  return;
}

async function listAssetsExample() {
  try {
    console.log(`📋 Listing assets - Entity ID: ${entityId}`);

    const assetsResponse = await client.assets.listAssets({
      entityId,
    });

    console.dir(assetsResponse, { depth: null });
  } catch (error) {
    console.error(error);
  }
}

listAssetsExample();
