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
 * Example: List Net Allocations
 *
 * This example demonstrates how to retrieve net allocations by netting ID
 * using the Allocations service.
 *
 * Usage:
 *   node examples/allocations/listNetAllocations.js <nettingId> [allocationIds]
 *
 * Examples:
 *   node examples/allocations/listNetAllocations.js netting-123
 *   node examples/allocations/listNetAllocations.js netting-123 allocation-456,allocation-789
 */

// #docs operationId: rimeRESTAPI_GetAllocationsByClientNettingId
// #docs operationName: List Net Allocations

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;
const nettingId = process.argv[2];
const allocationId = process.argv[3];

if (!nettingId) {
  console.error(
    `
    Error: Netting ID is required
    Usage: node examples/allocations/listNetAllocations.js <nettingId> [allocationId]
    
    Examples:
      node examples/allocations/listNetAllocations.js netting-123
      node examples/allocations/listNetAllocations.js netting-123 allocation-456,allocation-789
    `
  );
  return;
}

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

async function listNetAllocationsExample() {
  try {
    let requestMessage = `📋 Listing net allocations - Portfolio ID: ${portfolioId} - Netting ID: ${nettingId}`;
    if (allocationId) requestMessage += ` - Allocation IDs: ${allocationId}`;
    console.log(requestMessage);

    const request = {
      portfolioId,
      nettingId,
      allocations: allocationId ? allocationId.split(',') : undefined,
    };

    const response = await client.allocations.listNetAllocations(request);

    console.dir(response, { depth: null });
  } catch (error) {
    console.error(error);
  }
}

listNetAllocationsExample();
