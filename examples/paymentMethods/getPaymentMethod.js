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
 * Example: Get Payment Method Details
 *
 * This example demonstrates how to retrieve detailed information about payment methods
 * for a specific entity using the PaymentMethods service. This provides more detailed
 * information about the payment methods than the list endpoint.
 *
 * Usage:
 *   node examples/paymentMethods/getPaymentMethod.js [paymentMethodId]
 *
 * Environment Variables Required:
 *   - ENTITY_ID: The ID of the entity to get payment method details for
 */

// #docs operationId: PrimeRESTAPI_GetEntityPaymentMethodDetails
// #docs operationName: Get Payment Method Details

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const entityId = process.env.ENTITY_ID;

if (!entityId) {
  console.error('Error: ENTITY_ID environment variable is required');
  return;
}

const paymentMethodId = process.argv[2];

if (!paymentMethodId) {
  console.error('Error: PAYMENT_METHOD_ID command line argument is required');
  return;
}

async function getPaymentMethodExample() {
  try {
    console.log(`💳 Getting payment method details - Entity ID: ${entityId}`);

    const request = {
      entityId,
      paymentMethodId,
    };

    const paymentMethodResponse =
      await client.paymentMethods.getPaymentMethod(request);

    console.dir(paymentMethodResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error getting payment method details:', error);
  }
}

getPaymentMethodExample();
