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
 * Example: Create Address Book Entry
 *
 * This example demonstrates how to create a new address book entry
 * for a portfolio using the AddressBooks service.
 *
 * Usage:
 *   node examples/addressBooks/createAddressBook.js <currencySymbol> <name> <address> [accountIdentifier]
 *
 * Examples:
 *   node examples/addressBooks/createAddressBook.js BTC Main_BTC_Wallet 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
 *   node examples/addressBooks/createAddressBook.js XRP Main_XRP_Wallet rn7d8bZhsdz9ecf586XsvbmVePfxYGrs22 750937718
 */

// #docs operationId: PrimeRESTAPI_CreateAddressBook
// #docs operationName: Create Address Book Entry

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;
const currencySymbol = process.argv[2];
const name = process.argv[3];
const address = process.argv[4];
const accountIdentifier = process.argv[5];

if (!currencySymbol || !name || !address) {
  console.error(
    `
    Error: Currency symbol, name, and address are required
    Usage: node examples/addressBooks/createAddressBook.js <currencySymbol> <name> <address> [accountIdentifier]
    
    Examples:
      node examples/addressBooks/createAddressBook.js BTC Main_BTC_Wallet 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
      node examples/addressBooks/createAddressBook.js XRP Main_XRP_Wallet rn7d8bZhsdz9ecf586XsvbmVePfxYGrs22 750937718
    `
  );
  return;
}

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

async function createAddressBookExample() {
  try {
    console.log(
      `📝 Creating address book entry - Portfolio ID: ${portfolioId} - Currency: ${currencySymbol} - Name: ${name} - Address: ${address}`
    );

    const request = {
      portfolioId,
      address,
      currencySymbol,
      name,
      accountIdentifier,
    };

    const addressBookResponse =
      await client.addressBooks.createAddressBook(request);

    console.dir(addressBookResponse, { depth: null });
  } catch (error) {
    console.error(error);
  }
}

createAddressBookExample();
