require('dotenv').config();
const { CoinbasePrimeClient, AssetService } = require('../dist');

const creds = JSON.parse(process.env.PRIME_CREDENTIALS);
const entityId = process.env.ENTITY_ID;

const client = new CoinbasePrimeClient(
  creds.AccessKey,
  creds.SecretKey,
  creds.Passphrase
);

const assetService = new AssetService(client);
assetService
  .listAssets({ entityId })
  .then((assets) => {
    console.log(assets);
  })
  .catch((err) => console.log(err));
