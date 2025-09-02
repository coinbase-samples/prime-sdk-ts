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
 * Example: List Entity Payment Methods
 *
 * This example demonstrates how to retrieve all payment methods for a specific entity
 * using the PaymentMethods service. Payment methods include bank accounts, wire transfers,
 * and other funding sources configured for the entity.
 *
 * Usage:
 *   node examples/paymentMethods/listEntityPaymentMethods.js
 *
 * Environment Variables Required:
 *   - ENTITY_ID: The ID of the entity to list payment methods for
 */

// #docs operationId: PrimeRESTAPI_GetEntityPaymentMethods
// #docs operationName: List Entity Payment Methods

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const entityId = process.env.ENTITY_ID;

if (!entityId) {
  console.error('Error: ENTITY_ID environment variable is required');
  return;
}

async function listEntityPaymentMethodsExample() {
  try {
    console.log(`💳 Listing entity payment methods - Entity ID: ${entityId}`);

    const request = {
      entityId,
    };

    const paymentMethodsResponse =
      await client.paymentMethods.listEntityPaymentMethods(request);

    console.dir(paymentMethodsResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error listing entity payment methods:', error);
  }
}

listEntityPaymentMethodsExample();
