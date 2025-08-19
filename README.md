# Coinbase Prime API TypeScript SDK

[![npm version](https://badge.fury.io/js/%40coinbase-sample%2Fprime-sdk-ts.svg)](https://badge.fury.io/js/%40coinbase-sample%2Fprime-sdk-ts)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## Overview

Welcome to the Coinbase Prime API TypeScript SDK. This TypeScript project provides a comprehensive, type-safe interface to the [Coinbase Prime API](https://docs.cdp.coinbase.com/prime/docs/welcome) with multiple consumption patterns optimized for different use cases.

## License

The _Prime Typescript SDK_ sample library is free and open source and released under the [Apache License, Version 2.0](LICENSE).

The application and code are only available for demonstration purposes.

## 🚀 Quick Start

### Installation

```bash
npm install @coinbase-sample/prime-sdk-ts
```

### Basic Usage (Recommended)

The SDK provides a **modular client** with lazy-loaded services for the best developer experience:

```typescript
import { CoinbasePrimeClientWithServices } from '@coinbase-sample/prime-sdk-ts';

// Create client from environment variables
const client = CoinbasePrimeClientWithServices.fromEnv();

// Access services directly - no manual instantiation needed!
const portfolios = await client.portfolios.listPortfolios();
const orders = await client.orders.listPortfolioOrders({ portfolioId: 'your-id' });
const wallets = await client.wallets.listWallets({ portfolioId: 'your-id' });
```

### Environment Setup

Copy `env.example` to `.env` and populate with your values:

```bash
cp env.example .env
```

Then edit `.env` with your actual credentials:
```env
# API Credentials (JSON format)
PRIME_CREDENTIALS={"AccessKey":"your-access-key","SecretKey":"your-secret-key","Passphrase":"your-passphrase"}

# Required IDs
ENTITY_ID=your-entity-id
PORTFOLIO_ID=your-portfolio-id
WALLET_ID=your-wallet-id
```

## 📚 Usage Examples

### **List Portfolios**
```typescript
const portfolios = await client.portfolios.listPortfolios();
console.log(portfolios.portfolios);
```

### **Get Assets**
```typescript
const assets = await client.assets.listAssets({ 
  entityId: portfolioId 
});
console.log(assets.assets);
```

### **Create Order**
```typescript
import { OrderSide, OrderType } from '@coinbase-sample/prime-sdk-ts';

const order = await client.orders.createOrder({
  portfolioId: 'your-portfolio-id',
  productId: 'BTC-USD',
  side: OrderSide.BUY,
  type: OrderType.MARKET,
  baseQuantity: '0.001'
});
console.log(order.orderId);
```

See the example folder for more robust examples for many of the available services and endpoints. 

## 🔧 Configuration Options

### Pagination Control

The SDK provides powerful pagination controls at both the client and request level:

```typescript
const client = CoinbasePrimeClientWithServices.fromEnv(undefined, {
  maxPages: 5,        // Max pages to fetch automatically
  maxItems: 1000,     // Max total items across all pages
  defaultLimit: 100   // Items per page
});

// Or per-request
const response = await client.transactions.listPortfolioTransactions(
  { portfolioId, limit: 50 },
  { maxPages: 10, maxItems: 500 }
);
```

### Advanced Pagination Methods

All paginated responses include powerful methods for manual pagination control:

```typescript
// Get the first page
const firstPage = await client.transactions.listPortfolioTransactions({ portfolioId });

// Check if there are more pages
if (firstPage.hasNext()) {
  console.log('More data available');
}

// Get the next page manually
const secondPage = await firstPage.next();

// Fetch ALL remaining pages and combine the data
const allTransactions = await firstPage.fetchAll(
  undefined,  // options
  (page, totalItems) => console.log(`Fetched page ${page}, total items: ${totalItems}`)
);

// Example: Manual pagination loop
let currentPage = firstPage;
while (currentPage.hasNext()) {
  console.log(`Processing ${currentPage.transactions.length} transactions`);
  currentPage = await currentPage.next();
}
```

#### Pagination Methods

| Method | Description | Returns |
|--------|-------------|---------|
| **`hasNext()`** | Check if more pages are available | `boolean` |
| **`next()`** | Fetch the next page | `Promise<Response \| null>` |
| **`fetchAll()`** | Fetch all remaining pages and combine data | `Promise<DataArray[]>` |
| **`getNextCursor()`** | Get the next page cursor | `string \| undefined` |

## 📦 Alternative Import Patterns

While the **modular client** (`CoinbasePrimeClientWithServices`) is recommended for most use cases, the SDK provides additional import patterns optimized for specific scenarios:

### 🎯 For Bundle Size Optimization

#### **Manual Client** (`@coinbase-sample/prime-sdk-ts/manual`)
When you need full control over service instantiation:

```typescript
import { CoinbasePrimeClient, OrdersService, WalletsService } from '@coinbase-sample/prime-sdk-ts/manual';

const client = CoinbasePrimeClient.fromEnv();
const orders = new OrdersService(client);
const wallets = new WalletsService(client);

// Only the services you import are included in your bundle
```

#### **Ultra-Minimal Client** (`@coinbase-sample/prime-sdk-ts/client`)
For services-only patterns (97% smaller bundles):

```typescript
import { CoinbasePrimeClient } from '@coinbase-sample/prime-sdk-ts/client';
import { OrdersService } from '@coinbase-sample/prime-sdk-ts/services';

const client = CoinbasePrimeClient.fromEnv();
const orders = new OrdersService(client);
// Total bundle: ~3kb (perfect for microservices)
```

### 📊 Bundle Size Comparison

| Import Pattern | Bundle Size | Use Case |
|----------------|-------------|----------|
| **Modular Client** (recommended) | ~30kb | Best developer experience |
| **Manual Client** | ~90kb | Full control, all services available |
| **Services + Client** | ~6kb | Custom implementations |
| **Individual Service** | ~3kb | Microservices, Lambda functions |

### 🎨 Type-Only Imports

For shared libraries or type definitions:

```typescript
import type { CreateOrderRequest, OrderSide } from '@coinbase-sample/prime-sdk-ts/types';
// 0kb runtime - perfect for shared type libraries
```

## 🤔 When to Use Which?

- **🏆 Modular Client**: Default choice - best DX, good performance
- **⚡ Manual Client**: Need all services, want explicit control
- **🎯 Services-Only**: Microservices, custom clients, minimal bundles
- **📦 Individual Services**: Lambda functions, single-purpose apps
- **📝 Types-Only**: Shared libraries, type definitions

## 🛠️ Development

### Installation
```bash
git clone https://github.com/coinbase-samples/prime-sdk-ts.git
cd prime-sdk-ts
npm install
```

### Build
```bash
npm run build
```

### Run Examples
The SDK includes comprehensive examples in the `example/` directory:

```bash
# Set up environment (copy env.example to .env first)
cp env.example .env
# Edit .env with your actual entityId, portfolioId, and walletId

# Run examples
node example/listPortfolios.js
node example/createOrder.js
node example/listWallets.js TRADING
```

## 🧪 TypeScript Support

The SDK is built with TypeScript and provides full type safety:

```typescript
import { 
  CoinbasePrimeClientWithServices, 
  OrderSide, 
  OrderType,
  CreateOrderRequest 
} from '@coinbase-sample/prime-sdk-ts';

const client = CoinbasePrimeClientWithServices.fromEnv();

// Full IntelliSense and type checking
const request: CreateOrderRequest = {
  portfolioId: 'your-id',
  productId: 'BTC-USD',
  side: OrderSide.BUY,  // Enum with autocomplete
  type: OrderType.MARKET,
  baseQuantity: '0.001'
};

const order = await client.orders.createOrder(request);
// Response is fully typed - no manual type assertions needed
```
