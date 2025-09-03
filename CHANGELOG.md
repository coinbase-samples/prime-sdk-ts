# Changelog

## [0.6.4] - 2025-SEP-03

### Fixed

- Updated core-ts to improve query param array handling
- Fixed query param naming of symbol to symbols for ListPortfolioBalancesRequest
- Fixed GetPaymentMethodRequest type to include paymentMethodId

### Added

#### 📚 Comprehensive Service Examples
- **Complete SDK Examples**: Added 50+ working examples across all services
  - Full CRUD operations for portfolios, futures, orders, transactions, and more
  - Consistent error handling and multiline console output formatting
  - Flexible CLI arguments with sensible defaults and environment variable support

## [0.6.3] - 2025-AUG-19

### Added

#### 🚀 New Modular Client Architecture
- **CoinbasePrimeClientWithServices**: New client with lazy-loaded service getters for optimal bundle size
  - Services accessed via clean `client.services.method()` syntax
  - Lazy initialization reduces initial bundle size by up to 75%
  - Built-in tree-shaking for unused services

#### 📦 Modular Export System
- **Multiple Entry Points**: Optimized imports for different use cases
  - `@coinbase-sample/prime-sdk-ts/manual` - Manual service instantiation (comprehensive exports)
  - `@coinbase-sample/prime-sdk-ts/modular` - Lazy-loaded services (minimal bundle)
  - `@coinbase-sample/prime-sdk-ts/services` - Service classes only (94% smaller bundles)
  - `@coinbase-sample/prime-sdk-ts/client` - Client classes only (97% smaller bundles)
  - `@coinbase-sample/prime-sdk-ts/types` - Types only (0kb runtime, perfect for shared libraries)

#### 🏗️ Enhanced Configuration System  
- **Unified Configuration**: `CoinbasePrimeClientConfig` interface for both clients
  - Extends `CoinbaseHttpClientRetryOptions` with Prime-specific pagination options
  - Consistent configuration across traditional and modular clients
- **Environment Factories**: 
  - `CoinbasePrimeClient.fromEnv()` - Load credentials from environment variables
  - `CoinbasePrimeClientWithServices.fromEnv()` - Enhanced client with env loading
- **Shared Utilities**: `createCredentialsFromEnv()` with automatic `.env` file support

### Changed

#### 🔧 Developer Experience
- **Consistent API**: Both clients now use the same configuration interface
- **Factory Methods**: Convenient creation patterns for common scenarios
- **Enhanced Documentation**: Comprehensive guides for different import strategies

### Fixed

- **Dependency Management**: Centralized core-ts imports to prevent version conflicts
- **Module Resolution**: Improved import paths for better IDE support and faster resolution

### Migration Guide

#### Backward Compatibility
**No migration required!** Existing code continues to work unchanged:

```typescript
// This still works exactly the same in 0.6.3
import { CoinbasePrimeClient, OrdersService } from '@coinbase-sample/prime-sdk-ts';

const client = new CoinbasePrimeClient(credentials);
const orders = new OrdersService(client);
```

#### New Optimization Options (Optional)
If you want to optimize bundle size, you can choose from new entry points:

```typescript
// Option 1: Manual client (similar API, comprehensive exports)
import { CoinbasePrimeClient, OrdersService } from '@coinbase-sample/prime-sdk-ts/manual';

// Option 2: Modular client (new, 75% smaller initial bundle)
import { CoinbasePrimeClientWithServices } from '@coinbase-sample/prime-sdk-ts/modular';
const client = CoinbasePrimeClientWithServices.fromEnv();
client.orders.createOrder(request); // Lazy-loaded service

// Option 3: Services only (85% smaller bundles)
import {CoinbasePrimeClient } from '@coinbase-sample/prime-sdk-ts/client-only'
import { OrdersService } from '@coinbase-sample/prime-sdk-ts/services';

```

#### Bundle Size Optimization
Users can now choose their import strategy based on bundle size requirements:
- **Full SDK**: `@coinbase-sample/prime-sdk-ts` (~100kb)
- **Manual Client**: `@coinbase-sample/prime-sdk-ts/manual` (~90kb)  
- **Modular Client**: `@coinbase-sample/prime-sdk-ts/modular` (~25kb)
- **Services Only**: `@coinbase-sample/prime-sdk-ts/services` (~15kb)

## [0.5.0] - 2025-JUN-17

### Fixes

- Fix path error in listInvoices

## Added

- Add pagination functions to list resources where possible
  - List responses are expanded to have a .next and .fetchAll
  - maxItems and maxPages can be set at the client or request level to better control pagination
- Updated endpoints with new query parameters
  - listPortfolioActivities
  - listEntityActivities
- New endpoints
  - listWalletAddresses
  - createWalletDepositAddress

## [0.4.1] - 2025-JUN-02

### Added

- Adding missing query parameters to listProducts
- Modify staking post parameters

## [0.4.0] - 2025-APR-30

### Added

- Exporting types changes
  - Moved all child types to explictly named, and importable from root package

## [0.3.1] - 2025-APR-30

### Added

- New Service and endpoints
  - CreateStake and CreateUnstake

## [0.3.0] - 2025-APR-10

### Added

- Adding support for Prime Financing endpoints
  - listExistingLocations
  - listInterestAccruals
  - listPortfolioInterestAccruals
  - listMarginCallSummaries
  - listMarginConversions
  - getEntityLocateAvailabilities
  - getMarginInformation
  - getPortfolioBuyingPower
  - getPortfolioCreditInformation
  - getPortfolioWithdrawalPower
  - getTieredPricingFees
  - createNewLocates
- Adding support for various other new endpoints
  - BalanceService
    - listEntityBalances
  - PositionsService
    - listAggregateEntityPositions
    - listEntityPositions
  - WalletService
    - listWalletAddresses
    - createWalletAddress
- Moved Request and Response types to Named Exports

## [0.2.1] - 2025-FEB-28

### Added

- Adding support for Order's create quote and accept quote

## [0.1.0] - 2024-DEC-12

### Added

- Support for all Coinbase Prime API REST endpoints
