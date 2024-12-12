require('dotenv').config();
const { CoinbasePrimeClient, TransactionsService } = require('../dist');

const creds = JSON.parse(process.env.PRIME_CREDENTIALS);
const portfolioId = process.env.PORTFOLIO_ID;
const walletId = process.env.WALLET_ID;

const client = new CoinbasePrimeClient(
  creds.AccessKey,
  creds.SecretKey,
  creds.Passphrase
);

const service = new TransactionsService(client);
service
  .listWalletTransactions({ portfolioId, walletId })
  .then((transactions) => {
    console.log(transactions);
  })
  .catch((err) => console.log(err));
