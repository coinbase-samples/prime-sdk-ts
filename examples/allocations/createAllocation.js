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
 * Example: Create Allocation
 *
 * This example demonstrates how to create a new allocation using the Allocations service.
 * Allocations are used to distribute shares of orders across multiple portfolios.
 *
 * Usage:
 *   node examples/allocations/createAllocation.js <sourcePortfolioId> <productId> <orderIdsCsv> <destinationPortfolioId> <amount>
 *
 * Examples:
 *   node examples/allocations/createAllocation.js portfolio-123 BTC-USD order-456 portfolio-789 100.50
 *   node examples/allocations/createAllocation.js portfolio-123 BTC-USD order-456,order-789,order-abc portfolio-def 250.75
 */

// #docs operationId: PrimeRESTAPI_CreateAllocation
// #docs operationName: Create Allocation

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const sourcePortfolioId = process.argv[2];
const productId = process.argv[3];
const orderIdsCsv = process.argv[4];
const destinationPortfolioId = process.argv[5];
const amount = process.argv[6];

if (
  !sourcePortfolioId ||
  !productId ||
  !orderIdsCsv ||
  !destinationPortfolioId ||
  !amount
) {
  console.error(
    `
    Error: Source portfolio ID, product ID, order IDs (CSV), destination portfolio ID, and amount are required
    Usage: node examples/allocations/createAllocation.js <sourcePortfolioId> <productId> <orderIdsCsv> <destinationPortfolioId> <amount>
    
    Examples:
      node examples/allocations/createAllocation.js portfolio-123 BTC-USD order-456 portfolio-789 100.50
      node examples/allocations/createAllocation.js portfolio-123 BTC-USD order-456,order-789,order-abc portfolio-dest 250.75
    `
  );
  return;
}

// Parse CSV order IDs and create allocation legs
const orderIds = orderIdsCsv.split(',').map((id) => id.trim());
const allocationLegs = [
  {
    allocationLegId: crypto.randomUUID(),
    destinationPortfolioId,
    amount,
  },
];

async function createAllocationExample() {
  try {
    console.log(
      `📝 Creating allocation - Source Portfolio: ${sourcePortfolioId} - Product: ${productId} - Orders: ${orderIds.join(', ')} - Destination: ${destinationPortfolioId} - Amount: ${amount}`
    );

    const request = {
      sourcePortfolioId,
      productId,
      orderIds,
      allocationLegs,
    };

    const allocationResponse =
      await client.allocations.createAllocation(request);

    console.dir(allocationResponse, { depth: null });
  } catch (error) {
    console.error(error);
  }
}

createAllocationExample();
