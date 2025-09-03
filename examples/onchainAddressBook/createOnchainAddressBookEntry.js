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
 * Example: Create Onchain Address Book Entry
 *
 * This example demonstrates how to create a new address group in the onchain
 * address book for a specific portfolio using the OnchainAddressBook service.
 *
 * Usage:
 *   node examples/onchainAddressBook/createOnchainAddressBookEntry.js [name] [networkType] [addressName] [address] [chainIds]
 *
 * Examples:
 *   node examples/onchainAddressBook/createOnchainAddressBookEntry.js
 *   node examples/onchainAddressBook/createOnchainAddressBookEntry.js MyGroup NETWORK_TYPE_EVM MainWallet 0x742...abc 1,8453
 *   node examples/onchainAddressBook/createOnchainAddressBookEntry.js SolanaGroup NETWORK_TYPE_SOLANA SolWallet 9WzDX...789 101
 *
 * Environment Variables Required:
 *   - PORTFOLIO_ID: The ID of the portfolio to create the address book entry in
 *
 * Available Network Types:
 *   - NETWORK_TYPE_UNSPECIFIED
 *   - NETWORK_TYPE_EVM
 *   - NETWORK_TYPE_SOLANA
 */

// #docs operationId: PrimeRESTAPI_CreateOnchainAddressGroup
// #docs operationName: Create Onchain Address Book Entry

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;

// Command line arguments with defaults
const groupName = process.argv[2] || 'Example Address Group';
const networkType = process.argv[3] || 'NETWORK_TYPE_EVM';
const name = process.argv[4] || 'Example Address';
const address = process.argv[5] || '0x0000000000000000000000000000000000000000';
const chainIds = process.argv[6] ? process.argv[6].split(',') : ['1'];

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

async function createOnchainAddressBookEntryExample() {
  try {
    console.log(
      `
        📝 Creating onchain address book entry - Portfolio ID: ${portfolioId}
        Group Name: ${groupName}
        Network Type: ${networkType}
        Address Name: ${name}
        Address: ${address}
        Chain IDs: ${chainIds.join(', ')}
      `
    );

    const request = {
      portfolioId,
      addressGroup: {
        portfolioId,
        name: groupName,
        networkType,
        addresses: [
          {
            name,
            address,
            chainIds,
          },
        ],
      },
    };

    const createResponse =
      await client.onchainAddressBook.createOnchainAddressBookEntry(request);

    console.dir(createResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error creating onchain address book entry:', error);
  }
}

createOnchainAddressBookEntryExample();
