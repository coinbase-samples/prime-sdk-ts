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
 * Example: Get FCM Settings
 *
 * This example demonstrates how to retrieve the FCM settings for an entity.
 * FCM settings include target derivatives excess configuration.
 *
 * Usage:
 *   node examples/futures/getFcmSettings.js [entityId]
 *
 * Examples:
 *   node examples/futures/getFcmSettings.js
 *   node examples/futures/getFcmSettings.js entity-123
 */

// #docs operationId: PrimeRESTAPI_GetFcmSettings
// #docs operationName: Get FCM Settings

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const entityId = process.argv[2] || process.env.ENTITY_ID;

if (!entityId) {
  console.error(
    'Error: ENTITY_ID environment variable or command line argument is required'
  );
  return;
}

async function getFcmSettingsExample() {
  try {
    const request = {
      entityId,
    };

    console.log(`⚙️ Getting FCM settings - Entity ID: ${entityId}`);

    const response = await client.futures.getFcmSettings(request);
    console.dir(response, { depth: null });
  } catch (error) {
    console.error('❌ Error getting FCM settings:', error);
  }
}

getFcmSettingsExample();
