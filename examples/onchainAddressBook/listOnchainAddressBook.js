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
 * Example: List Onchain Address Book
 *
 * This example demonstrates how to retrieve all address groups from the onchain
 * address book for a specific portfolio using the OnchainAddressBook service.
 *
 * Usage:
 *   node examples/onchainAddressBook/listOnchainAddressBook.js
 *
 * Environment Variables Required:
 *   - PORTFOLIO_ID: The ID of the portfolio to list address book entries for
 */

// #docs operationId: PrimeRESTAPI_ListOnchainAddressGroups
// #docs operationName: List Onchain Address Book

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

async function listOnchainAddressBookExample() {
  try {
    console.log(
      `📋 Listing onchain address book - Portfolio ID: ${portfolioId}`
    );

    const request = {
      portfolioId,
    };

    const addressBookResponse =
      await client.onchainAddressBook.listOnchainAddressBook(request);

    console.dir(addressBookResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error listing onchain address book:', error);
  }
}

listOnchainAddressBookExample();
