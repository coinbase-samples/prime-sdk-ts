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
 * Example: Create Withdrawal
 *
 * This example demonstrates how to create a withdrawal transaction from a wallet
 * using the Transactions service. This withdraws cryptocurrency from a wallet to
 * an external destination (blockchain address, payment method, or counterparty).
 *
 * Usage:
 *   node examples/transactions/createWithdrawal.js [walletId] [amount] [currencySymbol] [destinationType] [destination]
 *
 * Examples:
 *   node examples/transactions/createWithdrawal.js abc123-def456 1.5 BTC BLOCKCHAIN_ADDRESS 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
 *   node examples/transactions/createWithdrawal.js wallet-id 1000 USDC PAYMENT_METHOD payment-method-id
 *
 * Environment Variables Required:
 *   - PORTFOLIO_ID: The ID of the portfolio containing the wallet
 */

// #docs operationId: PrimeRESTAPI_CreateWalletWithdrawal
// #docs operationName: Create Withdrawal

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const portfolioId = process.env.PORTFOLIO_ID;
const walletId = process.argv[2];
const amount = process.argv[3] || '1.0';
const currencySymbol = process.argv[4] || 'eth';
const destinationType = process.argv[5] || 'DESTINATION_BLOCKCHAIN';
const destination = process.argv[6];

if (!portfolioId) {
  console.error('Error: PORTFOLIO_ID environment variable is required');
  return;
}

if (!walletId) {
  console.error('Error: WALLET_ID command line argument is required');
  console.error(
    'Usage: node examples/transactions/createWithdrawal.js [walletId] [amount] [currencySymbol] [destinationType] [destination]'
  );
  return;
}

async function createWithdrawalExample() {
  try {
    console.log(
      `💰 Creating withdrawal - Portfolio ID: ${portfolioId}, Wallet ID: ${walletId}
        Amount: ${amount} ${currencySymbol}
        Destination Type: ${destinationType}
        Destination: ${destination}`
    );

    const request = {
      portfolioId,
      walletId,
      amount,
      currencySymbol,
      destinationType,
      idempotencyKey: crypto.randomUUID(),
    };

    // Add destination details based on type
    if (destinationType === 'DESTINATION_BLOCKCHAIN') {
      request.blockchainAddress = { address: destination };
    } else if (destinationType === 'DESTINATION_PAYMENT_METHOD') {
      request.paymentMethod = { id: destination };
    } else if (destinationType === 'DESTINATION_COUNTERPARTY') {
      request.counterparty = { id: destination };
    }

    console.dir(request, { depth: null });

    const withdrawalResponse =
      await client.transactions.createWithdrawal(request);

    console.dir(withdrawalResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error creating withdrawal:', error);
  }
}

createWithdrawalExample();
