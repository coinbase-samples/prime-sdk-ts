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
 * Example: Get FCM Margin Call Details
 *
 * This example demonstrates how to retrieve the margin call details for an entity
 * using the Futures service. This provides information about current margin calls,
 * including amounts, states, deadlines, and other margin call details.
 *
 * Usage:
 *   node examples/futures/getMarginCallDetails.js
 *
 * Environment Variables Required:
 *   - ENTITY_ID: The ID of the entity to get margin call details for
 */

// #docs operationId: PrimeRESTAPI_GetFcmMarginCallDetails
// #docs operationName: Get FCM Margin Call Details

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const entityId = process.env.ENTITY_ID;

if (!entityId) {
  console.error('Error: ENTITY_ID environment variable is required');
  return;
}

async function getMarginCallDetailsExample() {
  try {
    console.log(
      `📞 Getting entity futures margin call details - Entity ID: ${entityId}`
    );

    const request = {
      entityId,
    };

    const marginCallResponse =
      await client.futures.getMarginCallDetails(request);

    console.log('✅ Margin call details retrieved successfully:');
    console.dir(marginCallResponse, { depth: null });

    // Display margin call information
    if (
      marginCallResponse.marginCalls &&
      marginCallResponse.marginCalls.length > 0
    ) {
      console.log(
        `\n📋 Found ${marginCallResponse.marginCalls.length} margin call(s):`
      );

      marginCallResponse.marginCalls.forEach((marginCall, index) => {
        console.log(`\n--- Margin Call ${index + 1} ---`);
        if (marginCall.marginCallType) {
          console.log(`Type: ${marginCall.marginCallType}`);
        }
        if (marginCall.marginCallState) {
          console.log(`State: ${marginCall.marginCallState}`);
        }
        if (marginCall.initialMarginCallAmount) {
          console.log(`Initial Amount: ${marginCall.initialMarginCallAmount}`);
        }
        if (marginCall.remainingMarginCallAmount) {
          console.log(
            `Remaining Amount: ${marginCall.remainingMarginCallAmount}`
          );
        }
        if (marginCall.marginCallOpenDate) {
          console.log(`Open Date: ${marginCall.marginCallOpenDate}`);
        }
        if (marginCall.marginCallDeadline) {
          console.log(`Deadline: ${marginCall.marginCallDeadline}`);
        }
      });
    } else {
      console.log('\n✅ No active margin calls found');
    }
  } catch (error) {
    console.error(
      '❌ Error getting entity futures margin call details:',
      error
    );
  }
}

getMarginCallDetailsExample();


