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
 * Example: Create Order Preview
 *
 * This example demonstrates how to preview an order before placing it using the Orders service.
 * Order preview shows estimated execution details, fees, and market impact without actually
 * placing the order. This is useful for validating order parameters and understanding costs.
 *
 * Usage:
 *   node examples/orders/createOrderPreview.js [productId] [side] [type] [baseQuantity] [limitPrice]
 *
 * Examples:
 *   node examples/orders/createOrderPreview.js BTC-USD BUY LIMIT 0.1 120000
 *   node examples/orders/createOrderPreview.js ETH-USD SELL MARKET 1.0
 *
 * Available Order Types: MARKET, LIMIT, STOP, STOP_LIMIT
 * Available Sides: BUY, SELL
 *
 * Environment Variables Required:
 *   - PORTFOLIO_ID: The ID of the portfolio to preview the order for
 */

// #docs operationId: PrimeRESTAPI_PostOrderPreview
// #docs operationName: Post Order Preview

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;
const productId = process.argv[2] || 'BTC-USD';
const side = process.argv[3] || 'BUY';
const type = process.argv[4] || 'LIMIT';
const baseQuantity = process.argv[5] || '0.001';
const limitPrice = process.argv[6] || '130000';

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

async function createOrderPreviewExample() {
  try {
    console.log(`
      👁️  Creating order preview - Portfolio ID: ${portfolioId}
      Product: ${productId}
      Side: ${side}
      Type: ${type}
      Base Quantity: ${baseQuantity}
      ${type === 'LIMIT' || type === 'STOP_LIMIT' ? `Limit Price: ${limitPrice}` : ''}
    `);

    const request = {
      portfolioId,
      productId,
      side,
      type,
      baseQuantity,
    };

    // Add limit price for LIMIT and STOP_LIMIT orders
    if (type === 'LIMIT' || type === 'STOP_LIMIT') {
      request.limitPrice = limitPrice;
    }

    const previewResponse = await client.orders.createOrderPreview(request);

    console.dir(previewResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error creating order preview:', error);
  }
}

createOrderPreviewExample();
