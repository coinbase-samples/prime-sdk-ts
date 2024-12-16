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
const { CoinbasePrimeClient, PortfoliosService } = require('../dist');

const creds = JSON.parse(process.env.PRIME_CREDENTIALS);
const portfolioId = process.env.PORTFOLIO_ID;

const client = new CoinbasePrimeClient(
  creds.AccessKey,
  creds.SecretKey,
  creds.Passphrase
);

client.addHeader('EXAMPLE', 'PROXY-HEADER');

const portfolioService = new PortfoliosService(client);
portfolioService
  .getPortfolio(
    { portfolioId: portfolioId },
    {
      transformRequest: (req) => {
        // logging to show added header
        console.log(req.headers);
        return req;
      },
    }
  )
  .then((portfolio) => {
    console.log(portfolio);
  })
  .catch((err) => console.log(err));
