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
 * Services-Only Example: Ultra-minimal bundle size (~6kb)
 *
 * This example demonstrates how to use individual services without importing
 * the full Prime client. This is ideal for:
 * - Microservices that only need specific functionality
 * - Custom client implementations
 * - Dependency injection frameworks
 * - Lambda functions with cold start optimization
 */

// Import only the services you need (no client classes)
const { OrdersService, WalletsService } = require('../../dist/services');

// Import minimal client (no service classes or service types)
const { CoinbasePrimeClient } = require('../../dist/client-only');

require('dotenv').config();

/**
 * Approach 1: Use services with the standard Prime client
 * This still gives you smaller bundles since you only import needed services
 */
async function standardClientExample() {
  console.log('\n=== Services-Only with Standard Client ===');

  try {
    // Create client using fromEnv (handles PRIME_CREDENTIALS automatically)
    const client = CoinbasePrimeClient.fromEnv();

    // Instantiate only the services you need
    const orders = new OrdersService(client);
    const wallets = new WalletsService(client);

    // Use the services
    const portfolioId = process.env.PORTFOLIO_ID;

    if (portfolioId) {
      // List open orders using the orders service
      const openOrders = await orders.listOpenOrders({ portfolioId });
      console.log('Open Orders:', openOrders.orders?.length || 0);

      // List wallets using the wallets service
      const walletsResponse = await wallets.listWallets({ portfolioId });
      console.log('Wallets:', walletsResponse.wallets?.length || 0);
    }
  } catch (error) {
    console.error('Standard client example error:', error.message);
  }
}

/**
 * Approach 2: Custom client implementation
 * This demonstrates the ultimate flexibility - you can implement your own client
 * that satisfies the IPrimeApiClient interface
 */
class CustomPrimeClient {
  constructor(credentials, baseUrl = 'https://api.prime.coinbase.com') {
    this.credentials = credentials;
    this.baseUrl = baseUrl;
  }

  async request(options) {
    // Your custom HTTP implementation
    // This is a simplified example - you'd implement proper HTTP handling,
    // authentication, error handling, etc.
    const url = `${this.baseUrl}/${options.url}`;

    console.log(`Custom client making request to: ${url}`);

    // For demo purposes, return a mock response
    // In real implementation, you'd make the actual HTTP request
    return {
      data: {
        message: 'This is a mock response from custom client',
        url: options.url,
        method: options.method || 'GET',
      },
    };
  }

  getDefaultPaginationLimit() {
    return 50; // Your custom default
  }

  getMaxPages() {
    return 10; // Your custom limit
  }

  getMaxItems() {
    return 500; // Your custom limit
  }
}

async function customClientExample() {
  console.log('\n=== Services-Only with Custom Client ===');

  try {
    // For custom client, we still need credentials but can get them from env
    const { createCredentialsFromEnv } = require('../../dist/shared/envUtils');
    const credentials = createCredentialsFromEnv();

    // Use your custom client implementation
    const customClient = new CustomPrimeClient(credentials);

    // Services work with any client that implements IPrimeApiClient
    const orders = new OrdersService(customClient);

    const portfolioId = process.env.PORTFOLIO_ID || 'mock-portfolio-id';

    // This will use your custom client's request method
    const result = await orders.listOpenOrders({ portfolioId });
    console.log('Custom client result:', result);
  } catch (error) {
    console.error('Custom client example error:', error.message);
  }
}

// Run all examples
async function runExamples() {
  console.log('🚀 Services-Only Import Examples');
  console.log('Bundle size: ~6kb (94% smaller than full SDK)');
  console.log('This approach imports only service classes, no client classes');

  await standardClientExample();
  await customClientExample();

  console.log('\n✅ All services-only examples completed!');
  console.log('\n💡 Key Benefits:');
  console.log('- Ultra-small bundle size (only specific services)');
  console.log('- Works with any client implementation');
  console.log('- Perfect for microservices architecture');
  console.log('- Great for dependency injection');
  console.log('- Optimal for Lambda/serverless functions');
}

// Only run if this file is executed directly
if (require.main === module) {
  runExamples().catch(console.error);
}

module.exports = {
  standardClientExample,
  customClientExample,
  CustomPrimeClient,
};
