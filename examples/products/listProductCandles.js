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
 * Example: List Product Candles (Beta)
 *
 * This example demonstrates how to retrieve historical candle data for a product.
 * Candles represent time-series market data aggregated into buckets with open, high,
 * low, close, and volume information.
 *
 * Usage:
 *   node examples/products/listProductCandles.js
 *
 * Environment Variables Required:
 *   - PORTFOLIO_ID: The ID of the portfolio requesting market data
 *   - PRODUCT_ID: (Optional) The trading pair (e.g., BTC-USD). Defaults to BTC-USD
 *
 * Note: This feature is in beta. Please reach out to your Coinbase Prime account
 * manager for more information.
 */

// #docs operationId: PrimeRESTAPI_GetCandles
// #docs operationName: List Product Candles

const {
  CoinbasePrimeClientWithServices,
  CandlesGranularity,
} = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;
const productId = process.argv[2] || 'BTC-USD';
const granularity = process.argv[3] || CandlesGranularity.OneHour;
const startTime = process.argv[4]
  ? new Date(process.argv[4])
  : new Date(Date.now() - 24 * 60 * 60 * 1000);
const endTime = process.argv[5] ? new Date(process.argv[5]) : new Date();

async function listProductCandlesExample() {
  try {
    const request = {
      portfolioId,
      productId,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      granularity,
    };

    const candlesResponse = await client.products.listProductCandles(request);

    console.dir(candlesResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error getting product candles:', error);
  }
}

listProductCandlesExample();
