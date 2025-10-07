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
 * Example: Edit an existing order
 *
 * Usage:
 *   node examples/orders/editOrder.js <portfolioId> <orderId> <origClientOrderId> <newClientOrderId> [newPrice] [newBaseQuantity]
 *
 * Required CLI arguments:
 *   portfolioId - Portfolio ID containing the order
 *   orderId - Order ID to edit
 *   origClientOrderId - Original client order ID
 *   newClientOrderId - New client order ID
 *
 * Optional CLI arguments:
 *   newPrice - New limit price for the order
 *   newBaseQuantity - New base quantity for the order
 *
 * Example:
 *   node examples/orders/editOrder.js 12345 order_abc123 orig_client_123 new_client_123 50000 0.001
 */

// #docs operationId: PrimeRESTAPI_EditOrder
// #docs operationName: Edit Order

const {
  CoinbasePrimeClientWithServices,
} = require('@coinbase-sample/prime-sdk-ts');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;
const newClientOrderId = crypto.randomUUID();

const orderId = process.argv[2];
const origClientOrderId = process.argv[3];
const newPrice = process.argv[4];
const newBaseQuantity = process.argv[5];

if (!orderId || !origClientOrderId) {
  console.error(
    'Missing required arguments: orderId and origClientOrderId are required'
  );
  process.exit(1);
}

async function editOrder() {
  try {
    console.log(`Editing order ${orderId} in portfolio ${portfolioId}...`);

    const request = {
      portfolioId,
      orderId,
      origClientOrderId,
      clientOrderId: newClientOrderId,
    };

    // Add optional parameters if provided
    if (newPrice) {
      request.limitPrice = newPrice;
    }
    if (newBaseQuantity) {
      request.baseQuantity = newBaseQuantity;
    }

    const response = await client.orders.editOrder(request);

    console.dir(response);
  } catch (error) {
    console.error('Error editing order:', error.message);
    if (error.response?.data) {
      console.error('API Error Details:', error.response.data);
    }
  }
}

editOrder();
