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
 * Example: Update Onchain Address Book Entry
 *
 * This example demonstrates how to update an existing address group in the onchain
 * address book for a specific portfolio using the OnchainAddressBook service.
 *
 * Usage:
 *   node examples/onchainAddressBook/updateOnchainAddressBookEntry.js [id] [name] [networkType] [addressName] [address] [chainIds]
 *
 * Examples:
 *   node examples/onchainAddressBook/updateOnchainAddressBookEntry.js abc123-def456 UpdatedGroup NETWORK_TYPE_EVM UpdatedWallet 0x742...abc 1,8453
 *   node examples/onchainAddressBook/updateOnchainAddressBookEntry.js xyz789-ghi012 SolanaGroupUpdated NETWORK_TYPE_SOLANA UpdatedSolWallet 9WzDX...789 101
 *
 * Environment Variables Required:
 *   - PORTFOLIO_ID: The ID of the portfolio containing the address book entry
 *
 * Available Network Types:
 *   - NETWORK_TYPE_UNSPECIFIED
 *   - NETWORK_TYPE_EVM
 *   - NETWORK_TYPE_SOLANA
 */

// #docs operationId: PrimeRESTAPI_UpdateOnchainAddressGroup
// #docs operationName: Update Onchain Address Book Entry

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;

// Command line arguments with defaults
const id = process.argv[2];
const name = process.argv[3] || 'Updated Address Group';
const networkType = process.argv[4] || 'NETWORK_TYPE_EVM';
const addressName = process.argv[5] || 'Updated Address';
const address = process.argv[6] || '0x0000000000000000000000000000000000000000';
const chainIds = process.argv[7] ? process.argv[7].split(',') : ['1'];

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

if (!id) {
  console.error(
    'Error: ADDRESS_GROUP_ID environment variable or command line argument is required'
  );
  console.error(
    'Usage: node examples/onchainAddressBook/updateOnchainAddressBookEntry.js <id> [name] [networkType] [addressName] [address] [chainIds]'
  );
  return;
}

async function updateOnchainAddressBookEntryExample() {
  try {
    console.log(
      `
        ✏️ Updating onchain address book entry - Portfolio ID: ${portfolioId}
        Address Group ID: ${id}
        Group Name: ${name}
        Network Type: ${networkType}
        Address Name: ${addressName}
        Address: ${address}
        Chain IDs: ${chainIds.join(', ')}
      `
    );

    const request = {
      portfolioId,
      addressGroup: {
        id,
        name,
        networkType,
        addresses: [
          {
            name: addressName,
            address,
            chainIds,
          },
        ],
      },
    };

    const updateResponse =
      await client.onchainAddressBook.updateOnchainAddressBookEntry(request);

    console.dir(updateResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error updating onchain address book entry:', error);
  }
}

updateOnchainAddressBookEntryExample();
