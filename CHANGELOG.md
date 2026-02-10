# Changelog

## [0.8.2] - 2026-FEB-3

### Added

#### 🆕 New API Endpoints

**Transactions Service**
- **`submitDepositTravelRule()`**: Submit travel rule data for an existing deposit transaction
  - Provide originator and beneficiary information for travel rule compliance
  - Supports self-transfer flag and ownership verification opt-out

**Staking Service**
- **`getStakingStatus()`**: Get staking status for a wallet
  - Retrieve estimated completion times for active staking requests
  - Returns validator staking information with status details

## [0.8.1] - 2025-DEC-15

### Added

#### ✅ Request Validation

**Comprehensive Input Validation Across All Services**
- Added client-side validation for required path parameters (UUIDs) across all services
- Added validation for required query parameters (e.g., `productId`, `startTime`, `endTime`, `granularity` in `listProductCandles`)
- Added validation for required body parameters in create/update endpoints
- Validation errors throw `CoinbasePrimeClientException` with clear, actionable error messages

## [0.8.0] - 2025-DEC-11

### Added

#### 🆕 New API Endpoints

**Futures Service**
- **`getFcmSettings()`**: Get FCM settings for an entity
  - Retrieve target derivatives excess configuration
- **`setFcmSettings()`**: Update FCM settings for an entity
  - Set target derivatives excess amount

**Financing Service**
- **`listTFObligations()`**: List Trade Finance obligations for an entity
  - Retrieve trade finance loans with amount due, notional amounts, and due dates
- **`listFinancingEligibleAssets()`**: List assets eligible for Trade Finance
  - Get all assets with their asset and liability adjustment factors

**Staking Service**
- **`previewUnstake()`**: Preview an unstaking operation
  - Get estimated amount that would be unstaked before initiating (ETH only)
- **`getUnstakingStatus()`**: Get unstaking status for a wallet
  - Retrieve estimated completion times for active unstaking requests

#### 📝 New Request Fields

**Transactions**
- `listPortfolioTransactions()` now supports:
  - `getNetworkUnifiedTransactions`: Flag to retrieve all transactions across all networks for a given symbol
  - `travelRuleStatus`: Filter by travel rule status (Alpha)

**Activities**
- `listEntityActivities()` and `listPortfolioActivities()` now support:
  - `getNetworkUnifiedActivities`: Flag to retrieve all activities across all networks for a given symbol

**Wallets**
- `listWallets()` now supports:
  - `getNetworkUnifiedWallets`: Flag to retrieve all wallets across all networks for a given symbol

#### 🔄 Updated Types

- New order type: `PEG` - Pegged orders that dynamically adjust based on market conditions
- New transaction types: `PORTFOLIO_STAKE`, `PORTFOLIO_UNSTAKE` - Portfolio-level staking operations
- New Travel Rule types for compliance: `TravelRuleEntry`, `TravelRuleParty`, `VASP`, `TravelRuleStatus`
- New staking types: `PreviewUnstakeResponse`, `GetUnstakingStatusResponse`, `ValidatorUnstakingInfo`, `UnstakingStatus`
- Candle granularity enum fixes: `THIRTY_MINUTE` → `THIRTY_MINUTES`, `TWO_HOUR` → `TWO_HOURS`, `FOUR_HOUR` → `FOUR_HOURS`

## [0.7.1] - 2025-OCT-17

### Added

#### 🆕 New API Endpoints

**Products Service**
- **`listProductCandles()`**: Get historical candle data for a product (Beta)
  - Retrieve time-series market data with open, high, low, close, and volume
  - Support for multiple granularities (1min, 5min, 15min, 30min, 1hr, 2hr, 4hr, 6hr, 1day)
  - Includes example with default 24-hour time range

## [0.7.0] - 2025-OCT-09

### Added

#### 🆕 New API Endpoints

**Staking Service**
- **`queryTransactionValidators()`**: Query ETH 0x02 validators associated with wallet-level stake transactions

**Financing Service**
- **`getCrossMarginOverview()`**: Retrieve live Cross Margin (XM) data for XM customers

**Orders Service**
- **`editOrder()`**: Edit an existing open order (Beta)
  - Modify limit price, base quantity, quote value, and other order parameters

### Changed

#### 📝 NPM Scripts
- **`fetch-spec`**: New script to download the latest OpenAPI spec from Coinbase Prime API
- **`update-spec`**: Enhanced to include fetching the latest spec before generating types

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
