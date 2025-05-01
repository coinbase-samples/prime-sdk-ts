# Changelog

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
