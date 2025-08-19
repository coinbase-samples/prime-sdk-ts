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
 * Example: List Portfolios
 *
 * This example demonstrates how to list all portfolios for the authenticated entity.
 *
 * Usage:
 *   node examples/portfolios/listPortfolios.js
 *
 * Example:
 *   node examples/portfolios/listPortfolios.js
 */

// #docs operationId: PrimeRESTAPI_ListPortfolios
// #docs operationName: List Portfolios

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();

async function listPortfoliosExample() {
  try {
    console.log('📁 Listing portfolios');

    const response = await client.portfolios.listPortfolios();

    console.dir(response, { depth: null });
  } catch (error) {
    console.error(error);
  }
}

listPortfoliosExample();
