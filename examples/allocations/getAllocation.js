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
 * Example: Get Allocation Details
 *
 * This example demonstrates how to retrieve detailed information about a specific allocation
 * using the Allocations service.
 *
 * Usage:
 *   node examples/allocations/getAllocation.js <allocationId>
 *
 * Example:
 *   node examples/allocations/getAllocation.js allocation-123
 */

// #docs operationId: PrimeRESTAPI_GetAllocation
// #docs operationName: Get Allocation

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;
const allocationId = process.argv[2];

if (!allocationId) {
  console.error(
    `
    Error: Allocation ID is required
    Usage: node examples/allocations/getAllocation.js <allocationId>
    
    Example:
      node examples/allocations/getAllocation.js allocation-123
    `
  );
  return;
}

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

async function getAllocationExample() {
  try {
    console.log(
      `🔍 Fetching allocation details - Portfolio ID: ${portfolioId} - Allocation ID: ${allocationId}`
    );

    const allocation = await client.allocations.getAllocation({
      portfolioId,
      allocationId,
    });

    console.dir(allocation, { depth: null });
  } catch (error) {
    console.error(error);
  }
}

getAllocationExample();
