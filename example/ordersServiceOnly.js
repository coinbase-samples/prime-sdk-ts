/**
 * Copyright 2024-present Coinbase Global, Inc.
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
 * Minimal Orders Service Example
 *
 * This demonstrates the ultra-minimal bundle approach:
 * - Import only OrdersService (~3kb bundle)
 * - Use with a minimal client implementation
 * - Perfect for microservices that only handle orders
 */

// Services-only import - ultra minimal bundle (~3kb)
const { OrdersService } = require('../dist/services');

// Import minimal client (no service classes, no service types, no model types)
const { CoinbasePrimeClient } = require('../dist/client-only');

require('dotenv').config();

async function minimalOrdersExample() {
  try {
    console.log('🎯 Ultra-Minimal Orders Service Example');
    console.log('Bundle size: ~3kb (orders service + minimal client)');

    // Create client using fromEnv (reads PRIME_CREDENTIALS automatically)
    const client = CoinbasePrimeClient.fromEnv();

    // Create only the orders service (no other services loaded)
    const orders = new OrdersService(client);

    const portfolioId = process.env.PORTFOLIO_ID;

    if (!portfolioId) {
      console.log(
        'ℹ️  Set PORTFOLIO_ID environment variable to test with real data'
      );
      console.log('🔧 Example: export PORTFOLIO_ID="your-portfolio-id"');
      return;
    }

    console.log(`📊 Fetching open orders for portfolio: ${portfolioId}`);

    // Use the orders service
    const openOrders = await orders.listOpenOrders({
      portfolioId,
      limit: 5, // Just get a few orders for the example
    });

    console.log(`✅ Found ${openOrders.orders?.length || 0} open orders`);

    if (openOrders.orders && openOrders.orders.length > 0) {
      console.log('\n📋 Sample order details:');
      const firstOrder = openOrders.orders[0];
      console.log(`   Order ID: ${firstOrder.orderId}`);
      console.log(`   Product: ${firstOrder.productId}`);
      console.log(`   Side: ${firstOrder.side}`);
      console.log(`   Type: ${firstOrder.type}`);
      console.log(`   Status: ${firstOrder.status}`);
    }

    console.log('\n💡 This example used only OrdersService');
    console.log('   - No WalletsService loaded');
    console.log('   - No PortfoliosService loaded');
    console.log('   - No other services loaded');
    console.log('   - Minimal memory footprint');
    console.log('   - Optimal for microservices');
  } catch (error) {
    console.error('❌ Error:', error.message);

    if (error.message.includes('PRIME_CREDENTIALS')) {
      console.log('\n🔧 Setup Instructions:');
      console.log('1. Set PRIME_CREDENTIALS as a JSON environment variable:');
      console.log(
        '   export PRIME_CREDENTIALS=\'{"AccessKey":"your-access-key","SecretKey":"your-secret-key","Passphrase":"your-passphrase"}\''
      );
      console.log('   export PORTFOLIO_ID="your-portfolio-id"');
      console.log('\n2. Or create a .env file with:');
      console.log(
        '   PRIME_CREDENTIALS={"AccessKey":"your-access-key","SecretKey":"your-secret-key","Passphrase":"your-passphrase"}'
      );
      console.log('   PORTFOLIO_ID=your-portfolio-id');
    }
  }
}

// Run the example
minimalOrdersExample();
