require('dotenv').config();
const { CoinbasePrimeClient, OrdersService } = require('../dist');

const creds = JSON.parse(process.env.PRIME_CREDENTIALS);
const portfolioId = process.env.PORTFOLIO_ID;

const client = new CoinbasePrimeClient(
  creds.AccessKey,
  creds.SecretKey,
  creds.Passphrase
);

const ordersService = new OrdersService(client);
ordersService
  .listOpenOrders({ portfolioId })
  .then((assets) => {
    console.log(assets);
  })
  .catch((err) => console.log(err));
