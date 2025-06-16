# Coinbase Prime API TypeScript SDK

## Overview

Welcome to the Coinbase Prime API TypeScript SDK. This TypeScript project was created to allow developers to easily plug into the [Coinbase Prime API](https://docs.cdp.coinbase.com/prime/docs/welcome).

---

## License

The _Prime Typescript SDK_ sample library is free and open source and released under the [Apache License, Version 2.0](LICENSE).

The application and code are only available for demonstration purposes.

## Pagination

When creating the client, you can now specify a maxItems and maxPages to help manage paginated responses.

```
const client = new CoinbasePrimeClient(credentials, undefined, { maxPages: 5, maxItems: 1000 });
```

These values can also be added on a per paginated request, such as:

```
const client = new CoinbasePrimeClient(credentials);

const service = new TransactionsService(client);

service
  .listPortfolioTransactions(
    { portfolioId, limit: 100 },
    { maxPages: 20, maxItems: 1000 }
  )
```

## Usage

Here are a few examples requests:

**[List Portfolios](https://docs.cdp.coinbase.com/prime/reference/primerestapi_getportfolios)**

```
client
    .listPortfolios()
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error.message);
    });
```

**[Get Assets](https://docs.cdp.coinbase.com/prime/reference/primerestapi_getentityassets)**

```
client
    .listAssets({entityId: "somePortfolioId"})
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error.message);
    });
```

**[Create Order](https://docs.cdp.coinbase.com/prime/reference/primerestapi_createorder)**

_$10 Market Buy on BTC-USD_

```
client
    .createOrder({
        portfolioId: "somePortfolioId",
        productId: "BTC-USD",
        side: OrderSide.BUY,
        type: OrderType.Market,
        baseQuantity: "0.0001"
    })
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error.message);
    });
```

## Development Installation

```bash
npm install
```

---

## Build and Use

To build the project, run the following command:

```bash
npm run build
```

_Note: To avoid potential issues, do not forget to build your project again after making any changes to it._

After building the project, each `.ts` file will have its `.js` counterpart generated.

To run a file, use the following command:

```
node dist/{INSERT-FILENAME}.js
```

For example, a `main.ts` file would be run like:

```bash
node dist/main.js
```

---
