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
 * Example: Set FCM Settings
 *
 * This example demonstrates how to update the FCM settings for an entity.
 * You can set the target derivatives excess amount (only non-negative numbers allowed).
 *
 * Usage:
 *   node examples/futures/setFcmSettings.js [targetDerivativesExcess]
 *
 * Examples:
 *   node examples/futures/setFcmSettings.js
 *   node examples/futures/setFcmSettings.js 1000.00
 */

// #docs operationId: PrimeRESTAPI_SetFcmSettings
// #docs operationName: Set FCM Settings

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const entityId = process.env.ENTITY_ID;
const targetDerivativesExcess = process.argv[2] || '1000.00';

if (!entityId) {
  console.error('Error: ENTITY_ID environment variable is required');
  return;
}

async function setFcmSettingsExample() {
  try {
    const request = {
      entityId,
      targetDerivativesExcess,
    };

    console.log(
      `⚙️ Setting FCM settings - Entity ID: ${entityId} - Target Derivatives Excess: ${targetDerivativesExcess}`
    );

    const response = await client.futures.setFcmSettings(request);
    console.dir(response, { depth: null });
  } catch (error) {
    console.error('❌ Error setting FCM settings:', error);
  }
}

setFcmSettingsExample();
