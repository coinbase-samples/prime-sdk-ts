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
require('dotenv').config();
const { randomUUID } = require('crypto');
const {
  CoinbasePrimeClient,
  CoinbasePrimeCredentials,
  TransactionsService,
} = require('../dist');

const creds = JSON.parse(process.env.PRIME_CREDENTIALS);
const portfolioId = process.env.PORTFOLIO_ID;
const walletId = process.argv[2] || process.env.WALLET_ID;
const amount = process.argv[3];
const sourceSymbol = process.argv[4];
const destinationSymbol = process.argv[5];
const destinationWalletId = process.argv[6];

if (
  !walletId ||
  !amount ||
  !sourceSymbol ||
  !destinationSymbol ||
  !destinationWalletId
) {
  console.error(
    'Usage: node createConversion.js <walletId> <amount> <sourceSymbol> <destinationSymbol> <destinationWalletId>'
  );
  process.exit(1);
}

const baseUrl = process.env.BASE_URL;
const credentials = new CoinbasePrimeCredentials(
  creds.AccessKey,
  creds.SecretKey,
  creds.Passphrase
);
const client = new CoinbasePrimeClient(credentials, baseUrl);
const service = new TransactionsService(client);

const request = {
  portfolioId,
  walletId,
  amount,
  sourceSymbol,
  destinationSymbol,
  destination: destinationWalletId,
  idempotencyKey: randomUUID(),
};

console.log('Creating conversion with request:');
console.dir(request, { depth: null });
console.log('');

service
  .createConversion(request)
  .then((response) => {
    console.log('Conversion created successfully:');
    console.dir(response, { depth: null });
  })
  .catch((err) => {
    console.error('Error creating conversion:');
    console.error(err);
  });
