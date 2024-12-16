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
