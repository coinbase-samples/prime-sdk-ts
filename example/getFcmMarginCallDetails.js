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
const {
  CoinbasePrimeClient,
  CoinbasePrimeCredentials,
  FinancingService,
} = require('../dist');

const creds = JSON.parse(process.env.PRIME_CREDENTIALS);

const getFcmMarginCallDetails = async (financingService, entityId) => {
  const request = {
    entityId,
  };

  console.log('Getting FCM margin call details for entity: ', entityId);
  const response = await financingService.getFcmMarginCallDetails(request);
  return response;
};

const credentials = new CoinbasePrimeCredentials(
  creds.AccessKey,
  creds.SecretKey,
  creds.Passphrase
);

const client = new CoinbasePrimeClient(credentials);
const financingService = new FinancingService(client);

const entityId = process.env.ENTITY_ID;

getFcmMarginCallDetails(financingService, entityId)
  .then((response) => {
    console.dir(response, { depth: null });
  })
  .catch((err) => {
    console.dir(err, { depth: null });
  });
