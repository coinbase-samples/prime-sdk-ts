/**
 * Copyright 2026-present Coinbase Global, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Example: Update Funding Settings (Beta)
 *
 * This example demonstrates how to set FCM funding configuration for an entity,
 * including designating a funding portfolio, enabling automatic USDC conversion,
 * automatic loans, automatic excess margin return, and setting a weekend buying
 * power target amount. This creates a PCS proposal that requires approval.
 *
 * Usage:
 *   node examples/financing/setFundingSettings.js
 *
 * Environment Variables Required:
 *   - ENTITY_ID: The Prime Entity ID
 *   - DESIGNATED_FUNDING_PORTFOLIO_ID: The portfolio ID to use for FCM margin funding
 *
 * Optional Environment Variables:
 *   - EXCESS_FUNDS_TARGET_AMOUNT: Weekend buying power target (default: "0.00")
 */

// #docs operationId: PrimeBeta_SetFundingSettings
// #docs operationName: Update Funding Settings

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const entityId = process.env.ENTITY_ID;
const designatedFundingPortfolioId = process.env.DESIGNATED_FUNDING_PORTFOLIO_ID;

if (!entityId) {
  console.error('Error: ENTITY_ID environment variable is required');
  process.exit(1);
}

if (!designatedFundingPortfolioId) {
  console.error(
    'Error: DESIGNATED_FUNDING_PORTFOLIO_ID environment variable is required'
  );
  process.exit(1);
}

async function setFundingSettingsExample() {
  try {
    console.log(`Setting funding settings - Entity ID: ${entityId}`);

    const request = {
      entityId,
      designatedFundingPortfolioId,
      automaticConversionEnabled: false,
      automaticLoanEnabled: false,
      automaticExcessReturnEnabled: false,
      excessFundsTargetAmount: process.env.EXCESS_FUNDS_TARGET_AMOUNT || '0.00',
    };

    const response = await client.financing.setFundingSettings(request);

    console.dir(response, { depth: null });
  } catch (error) {
    console.error('Error:', error);
  }
}

setFundingSettingsExample();
