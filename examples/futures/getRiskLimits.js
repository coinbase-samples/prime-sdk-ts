/**
 * Copyright 2025-present Coinbase Global, Inc.
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
 * Example: Get FCM Risk Limits
 *
 * This example demonstrates how to retrieve the risk limits for an entity
 * using the Futures service. This provides information about the risk limits
 * set for a client, including limit utilization and total margin requirements.
 *
 * Usage:
 *   node examples/futures/getRiskLimits.js
 *
 * Environment Variables Required:
 *   - ENTITY_ID: The ID of the entity to get risk limits for
 */

// #docs operationId: PrimeRESTAPI_GetFcmRiskLimits
// #docs operationName: Get FCM Risk Limits

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const entityId = process.env.ENTITY_ID;

if (!entityId) {
  console.error('Error: ENTITY_ID environment variable is required');
  return;
}

async function getRiskLimitsExample() {
  try {
    console.log(
      `📊 Getting entity futures risk limits - Entity ID: ${entityId}`
    );

    const request = {
      entityId,
    };

    const riskLimitsResponse = await client.futures.getRiskLimits(request);

    console.log('✅ Risk limits retrieved successfully:');
    console.dir(riskLimitsResponse, { depth: null });

    // Display key information
    if (riskLimitsResponse.cfmRiskLimit) {
      console.log(`\n📋 Risk Limit: ${riskLimitsResponse.cfmRiskLimit}`);
    }
    if (riskLimitsResponse.cfmRiskLimitUtilization) {
      console.log(
        `📈 Risk Limit Utilization: ${riskLimitsResponse.cfmRiskLimitUtilization}`
      );
    }
    if (riskLimitsResponse.cfmTotalMargin) {
      console.log(`💰 Total Margin: ${riskLimitsResponse.cfmTotalMargin}`);
    }
  } catch (error) {
    console.error('❌ Error getting entity futures risk limits:', error);
  }
}

getRiskLimitsExample();


