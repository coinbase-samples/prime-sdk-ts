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
 * Example: List Address Books
 *
 * This example demonstrates how to retrieve a list of address book entries
 * for a portfolio using the AddressBooks service.
 *
 * Usage:
 *   node examples/addressBooks/listAddressBooks.js
 */

// #docs operationId: PrimeRESTAPI_ListAddressBooks
// #docs operationName: List Address Books

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

async function listAddressBooksExample() {
  try {
    console.log(
      `📋 Listing address book entries - Portfolio ID: ${portfolioId}`
    );

    const addressBooksResponse = await client.addressBooks.listAddressBooks({
      portfolioId,
    });

    console.dir(addressBooksResponse, { depth: null });
  } catch (error) {
    console.error(error);
  }
}

listAddressBooksExample();
