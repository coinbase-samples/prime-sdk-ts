require('dotenv').config();
const { CoinbasePrimeClient, PortfolioService } = require('../dist');

const creds = JSON.parse(process.env.PRIME_CREDENTIALS);
const portfolioId = process.env.PORTFOLIO_ID;

const client = new CoinbasePrimeClient(
  creds.AccessKey,
  creds.SecretKey,
  creds.Passphrase
);

const portfolioService = new PortfolioService(client);
portfolioService
  .getPortfolio({ portfolioId: portfolioId })
  .then((portfolio) => {
    console.log(portfolio);
  })
  .catch((err) => console.log(err));
