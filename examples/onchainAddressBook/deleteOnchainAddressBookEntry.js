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
 * Example: Delete Onchain Address Book Entry
 *
 * This example demonstrates how to delete an address group from the onchain
 * address book for a specific portfolio using the OnchainAddressBook service.
 *
 * Usage:
 *   node examples/onchainAddressBook/deleteOnchainAddressBookEntry.js [addressGroupId]
 *
 * Examples:
 *   node examples/onchainAddressBook/deleteOnchainAddressBookEntry.js abc123-def456-ghi789
 *   node examples/onchainAddressBook/deleteOnchainAddressBookEntry.js
 *
 * Environment Variables Required:
 *   - PORTFOLIO_ID: The ID of the portfolio containing the address book entry
 *   - ADDRESS_GROUP_ID: (Optional) The ID of the address group to delete (can be overridden by command line argument)
 */

// #docs operationId: PrimeRESTAPI_DeleteOnchainAddressGroup
// #docs operationName: Delete Onchain Address Book Entry

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;
const addressGroupId = process.argv[2];

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

if (!addressGroupId) {
  console.error('Error: ADDRESS_GROUP_ID command line argument is required');
  console.error(
    'Usage: node examples/onchainAddressBook/deleteOnchainAddressBookEntry.js [addressGroupId]'
  );
  return;
}

async function deleteOnchainAddressBookEntryExample() {
  try {
    console.log(`
      🗑️  Deleting onchain address book entry - Portfolio ID: ${portfolioId}
      Address Group ID: ${addressGroupId}`);

    const request = {
      portfolioId,
      addressGroupId,
    };

    const deleteResponse =
      await client.onchainAddressBook.deleteOnchainAddressBook(request);

    console.dir(deleteResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error deleting onchain address book entry:', error);
  }
}

deleteOnchainAddressBookEntryExample();
