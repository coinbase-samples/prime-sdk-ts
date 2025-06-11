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
  WalletsService,
} = require('../dist');

const creds = JSON.parse(process.env.PRIME_CREDENTIALS);
const portfolioId = process.env.PORTFOLIO_ID;
const baseUrl = process.env.BASE_URL;

const credentials = new CoinbasePrimeCredentials(
  creds.AccessKey,
  creds.SecretKey,
  creds.Passphrase
);

const client = new CoinbasePrimeClient(credentials, baseUrl);

const walletId = process.argv[2] || process.env.WALLET_ID;
const networkId = process.argv[3] || 'ripple-testnet';
const service = new WalletsService(client);
for (let i = 0; i < 200; i++) {
  service
    .createWalletDepositAddress({
      portfolioId,
      walletId,
      networkId,
    })
    .then((portfolio) => {
      console.dir(portfolio, { depth: null });
    })
    .catch((err) => console.log(err));
}
