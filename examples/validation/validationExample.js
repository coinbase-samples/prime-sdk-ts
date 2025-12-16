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
 * Validation Example
 *
 * This example demonstrates how the SDK validates request parameters
 * and reports multiple validation errors at once.
 */

const {
  PrimeClient,
  CoinbasePrimeClientException,
  CoinbasePrimeException,
} = require('@coinbase-sample/prime-sdk-ts');

// Example 1: Single Invalid Parameter
async function singleInvalidParameter() {
  console.log('\n=== Example 1: Single Invalid Parameter ===\n');

  const client = PrimeClient.fromEnv();

  try {
    await client.orders.getOrder({
      portfolioId: 'not-a-valid-uuid',
      orderId: '123e4567-e89b-12d3-a456-426614174000',
    });
  } catch (error) {
    if (error instanceof CoinbasePrimeClientException) {
      console.error('Validation Error:\n', error.message);
      // Output:
      // getOrder request validation failed:
      //   - portfolioId: must be a valid UUID (received: 'not-a-valid-uuid')
    }
  }
}

// Example 2: Multiple Invalid Parameters
async function multipleInvalidParameters() {
  console.log('\n=== Example 2: Multiple Invalid Parameters ===\n');

  const client = PrimeClient.fromEnv();

  try {
    await client.orders.getOrder({
      portfolioId: '', // Empty string
      orderId: 'invalid-uuid', // Invalid format
    });
  } catch (error) {
    if (error instanceof CoinbasePrimeClientException) {
      console.error('Validation Error:\n', error.message);
      // Output:
      // getOrder request validation failed:
      //   - portfolioId: is required and cannot be empty (received: '')
      //   - orderId: must be a valid UUID (received: 'invalid-uuid')
    }
  }
}

// Example 3: Missing Required Parameters
async function missingRequiredParameters() {
  console.log('\n=== Example 3: Missing Required Parameters ===\n');

  const client = PrimeClient.fromEnv();

  try {
    await client.orders.getOrder({
      portfolioId: undefined,
      orderId: null,
    });
  } catch (error) {
    if (error instanceof CoinbasePrimeClientException) {
      console.error('Validation Error:\n', error.message);
      // Output:
      // getOrder request validation failed:
      //   - portfolioId: is required and cannot be empty
      //   - orderId: is required and cannot be empty
    }
  }
}

// Example 4: Whitespace-Only Parameters
async function whitespaceParameters() {
  console.log('\n=== Example 4: Whitespace-Only Parameters ===\n');

  const client = PrimeClient.fromEnv();

  try {
    await client.onchainAddressBook.deleteOnchainAddressBook({
      portfolioId: '   ', // Whitespace only
      addressGroupId: '\t\n', // Whitespace only
    });
  } catch (error) {
    if (error instanceof CoinbasePrimeClientException) {
      console.error('Validation Error:\n', error.message);
      // Output:
      // deleteOnchainAddressBook request validation failed:
      //   - portfolioId: cannot be empty or whitespace only (received: '   ')
      //   - addressGroupId: cannot be empty or whitespace only (received: '...')
    }
  }
}

// Example 5: Valid Parameters (No Error)
async function validParameters() {
  console.log('\n=== Example 5: Valid Parameters ===\n');

  const client = PrimeClient.fromEnv();

  try {
    // These are valid UUIDs - validation passes
    // (May fail with API error if IDs don't exist, but validation succeeds)
    await client.orders.getOrder({
      portfolioId: '123e4567-e89b-12d3-a456-426614174000',
      orderId: '550e8400-e29b-41d4-a716-446655440000',
    });
    console.log('Validation passed! Request was sent to API.');
  } catch (error) {
    if (error instanceof CoinbasePrimeClientException) {
      // This won't be called for valid UUIDs
      console.error('Validation Error:', error.message);
    } else if (error instanceof CoinbasePrimeException) {
      // API returned an error (e.g., order not found)
      console.log(
        'Validation passed, but API returned error:',
        error.statusCode
      );
    }
  }
}

// Example 6: Proper Error Handling Pattern
async function properErrorHandling(portfolioId, orderId) {
  console.log('\n=== Example 6: Proper Error Handling ===\n');

  const client = PrimeClient.fromEnv();

  try {
    const order = await client.orders.getOrder({ portfolioId, orderId });
    console.log('Success! Order retrieved:', order.orderId);
    return { success: true, data: order };
  } catch (error) {
    // Handle client-side validation errors
    if (error instanceof CoinbasePrimeClientException) {
      console.error('❌ Invalid request parameters:');
      console.error(error.message);
      return {
        success: false,
        error: 'validation',
        message: 'Please provide valid UUIDs for portfolioId and orderId',
      };
    }

    // Handle API errors
    if (error instanceof CoinbasePrimeException) {
      console.error('❌ API Error:', error.statusCode);
      console.error(error.message);
      return {
        success: false,
        error: 'api',
        statusCode: error.statusCode,
        message: error.message,
      };
    }

    // Handle unexpected errors
    console.error('❌ Unexpected error:', error);
    throw error;
  }
}

// Run all examples
async function main() {
  console.log('========================================');
  console.log('Prime SDK Validation Examples');
  console.log('========================================');

  await singleInvalidParameter();
  await multipleInvalidParameters();
  await missingRequiredParameters();
  await whitespaceParameters();
  await validParameters();

  // Test proper error handling with invalid data
  await properErrorHandling('invalid-id', 'also-invalid');

  console.log('\n========================================');
  console.log('Examples completed!');
  console.log('========================================\n');
}

// Run if executed directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  singleInvalidParameter,
  multipleInvalidParameters,
  missingRequiredParameters,
  whitespaceParameters,
  validParameters,
  properErrorHandling,
};
