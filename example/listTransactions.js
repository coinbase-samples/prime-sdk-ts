/**
 * Copyright 2024-present Coinbase Global, Inc.
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
const {
  CoinbasePrimeClient,
  CoinbasePrimeCredentials,
  TransactionsService,
} = require('../dist');

const creds = JSON.parse(process.env.PRIME_CREDENTIALS);
const portfolioId = process.env.PORTFOLIO_ID;

const credentials = new CoinbasePrimeCredentials(
  creds.AccessKey,
  creds.SecretKey,
  creds.Passphrase
);

const client = new CoinbasePrimeClient(credentials, undefined, { maxPages: 5 });

const service = new TransactionsService(client);

service
  .listPortfolioTransactions(
    { portfolioId, limit: 100 },
    { maxPages: 20, maxItems: 1000 }
  )
  .then((transactions) => {
    console.dir(transactions, { depth: null });

    transactions
      .fetchAll(undefined, (page, totalItems) => {
        console.log('page', page);
        console.log('totalItems', totalItems);
      })
      .then((allTransactions) => {
        console.log('complete total', allTransactions.length);
        console.dir(allTransactions, { depth: null });
      });
  });
