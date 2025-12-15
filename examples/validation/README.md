# Validation Examples

This directory contains examples demonstrating the Prime SDK's request validation system.

## Overview

The Prime SDK validates URL path parameters (like `portfolioId`, `orderId`, etc.) to ensure they are valid UUIDs before making API requests. When validation fails, all errors are collected and reported together in a single, clear error message.

## Running the Examples

```bash
# From the prime-sdk-ts directory
node examples/validation/validationExample.js
```

**Note:** Make sure you have the `PRIME_CREDENTIALS` environment variable set, or the examples will fail when trying to create the client.

## What These Examples Demonstrate

### Example 1: Single Invalid Parameter
Shows how a single invalid UUID is caught and reported with a clear error message.

### Example 2: Multiple Invalid Parameters
Demonstrates how multiple validation errors are collected and reported together in a single exception.

### Example 3: Missing Required Parameters
Shows validation of `undefined` and `null` parameters.

### Example 4: Whitespace-Only Parameters
Demonstrates that whitespace-only strings are caught and reported as validation errors.

### Example 5: Valid Parameters
Shows that valid UUIDs pass validation successfully (though they may still fail at the API level if resources don't exist).

### Example 6: Proper Error Handling
Demonstrates the recommended pattern for handling both validation errors and API errors.

## Key Takeaways

1. **All errors at once** - Instead of failing on the first error, all validation issues are reported together
2. **Clear error messages** - Each error shows the parameter name, what's wrong, and the received value
3. **Immediate feedback** - No HTTP request is made if validation fails
4. **Consistent error type** - All validation errors throw `CoinbasePrimeClientException`

## Example Output

When you run the examples, you'll see output like:

```
========================================
Prime SDK Validation Examples
========================================

=== Example 1: Single Invalid Parameter ===

Validation Error:
 getOrder request validation failed:
  - portfolioId: must be a valid UUID (received: 'not-a-valid-uuid')

=== Example 2: Multiple Invalid Parameters ===

Validation Error:
 getOrder request validation failed:
  - portfolioId: is required and cannot be empty (received: '')
  - orderId: must be a valid UUID (received: 'invalid-uuid')

...
```

## Integration in Your Code

Use the same error handling pattern in your application:

```javascript
const { CoinbasePrimeClientException, CoinbasePrimeException } = require('@coinbase-sample/prime-sdk-ts');

async function yourFunction(portfolioId, orderId) {
  try {
    const order = await client.orders.getOrder({ portfolioId, orderId });
    return { success: true, data: order };
  } catch (error) {
    if (error instanceof CoinbasePrimeClientException) {
      // Client-side validation error - fix your inputs
      console.error('❌ Invalid request:', error.message);
      return { success: false, error: 'validation' };
    }
    
    if (error instanceof CoinbasePrimeException) {
      // Server-side API error
      console.error('❌ API error:', error.statusCode);
      return { success: false, error: 'api' };
    }
    
    // Unexpected error
    throw error;
  }
}
```

## Further Reading

- [Full Validation Documentation](../../docs/validation.md)
- [Validation Implementation Summary](../../VALIDATION_IMPLEMENTATION_SUMMARY.md)

