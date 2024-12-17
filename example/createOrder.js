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
  OrdersService,
} = require('../dist');

const creds = JSON.parse(process.env.PRIME_CREDENTIALS);
const portfolioId = process.env.PORTFOLIO_ID;

const sleep = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const createOrder = async (orderService, portfolioId) => {
  const order = {
    portfolioId,
    side: 'BUY',
    productId: 'ADA-USD',
    type: 'MARKET',
    baseQuantity: '2',
    clientOrderId: crypto.randomUUID(),
  };

  console.log('submitting order: ', order);
  const response = await orderService.createOrder(order);
  return response;
};

const credentials = new CoinbasePrimeCredentials(
  creds.AccessKey,
  creds.SecretKey,
  creds.Passphrase
);

const client = new CoinbasePrimeClient(credentials);

const ordersService = new OrdersService(client);

createOrder(ordersService, portfolioId)
  .then(async (response) => {
    console.log('Order created: ', response);
    await sleep(2000);
    const order = await ordersService.getOrder({
      orderId: response.orderId,
      portfolioId,
    });
    console.log('Order details: ', order);
  })
  .catch((err) => {
    console.log(err);
  });
