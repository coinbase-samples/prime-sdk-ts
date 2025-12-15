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
import { CoinbasePrimeClientException } from '../errors';

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Represents a validation error for a specific parameter
 */
export interface ValidationError {
  paramName: string;
  message: string;
  value?: any;
}

/**
 * Validation result that accumulates errors with fluent/builder pattern support
 */
export class ValidationResult {
  private errors: ValidationError[] = [];

  /**
   * Add a validation error
   */
  addError(paramName: string, message: string, value?: any): void {
    this.errors.push({ paramName, message, value });
  }

  /**
   * Check if there are any validation errors
   */
  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  /**
   * Get all validation errors
   */
  getErrors(): ValidationError[] {
    return [...this.errors];
  }

  /**
   * Validates that a required UUID parameter is present and valid.
   * Returns this for method chaining.
   *
   * @example
   * ```typescript
   * validator
   *   .validateRequiredUUID(request.portfolioId, 'portfolioId')
   *   .validateRequiredUUID(request.orderId, 'orderId')
   *   .check();
   * ```
   */
  validateRequiredUUID(
    value: string | undefined | null,
    paramName: string
  ): this {
    if (value === undefined || value === null || value === '') {
      this.addError(paramName, 'is required and cannot be empty', value);
      return this;
    }

    const trimmedValue = typeof value === 'string' ? value.trim() : value;
    if (trimmedValue === '') {
      this.addError(paramName, 'cannot be empty or whitespace only', value);
      return this;
    }

    if (!isValidUUID(trimmedValue)) {
      this.addError(paramName, 'must be a valid UUID', value);
    }

    return this;
  }

  /**
   * Validates that an optional UUID parameter is valid if provided.
   * Returns this for method chaining.
   */
  validateOptionalUUID(
    value: string | undefined | null,
    paramName: string
  ): this {
    if (value === undefined || value === null || value === '') {
      return this; // Optional, so undefined/null/empty is valid
    }

    const trimmedValue = typeof value === 'string' ? value.trim() : value;
    if (trimmedValue !== '' && !isValidUUID(trimmedValue)) {
      this.addError(paramName, 'must be a valid UUID if provided', value);
    }

    return this;
  }

  /**
   * Validates that a required string parameter is present and not empty.
   * Returns this for method chaining.
   */
  validateRequiredString(
    value: string | undefined | null,
    paramName: string
  ): this {
    if (value === undefined || value === null || value === '') {
      this.addError(paramName, 'is required and cannot be empty', value);
      return this;
    }

    const trimmedValue = typeof value === 'string' ? value.trim() : value;
    if (trimmedValue === '') {
      this.addError(paramName, 'cannot be empty or whitespace only', value);
    }

    return this;
  }

  /**
   * Validates that an optional string parameter is not empty if provided.
   * Returns this for method chaining.
   */
  validateOptionalString(
    value: string | undefined | null,
    paramName: string
  ): this {
    if (value === undefined || value === null) {
      return this; // Optional, so undefined/null is valid
    }

    if (typeof value === 'string') {
      const trimmedValue = value.trim();
      if (value !== '' && trimmedValue === '') {
        this.addError(
          paramName,
          'cannot be whitespace only if provided',
          value
        );
      }
    }

    return this;
  }

  /**
   * Throw an exception if there are validation errors.
   * Automatically detects the calling method name if no context is provided.
   *
   * @param contextMessage - Optional context message. If not provided, attempts to detect method name.
   * @throws {CoinbasePrimeClientException} if there are validation errors
   *
   * @example
   * ```typescript
   * const validator = createValidator();
   * validateRequiredUUID(validator, request.id, 'id');
   * validator.throwIfInvalid(); // Automatically detects calling method
   * ```
   */
  throwIfInvalid(contextMessage?: string): void {
    if (this.hasErrors()) {
      const errorDetails = this.errors
        .map((err) => {
          const valueInfo =
            err.value !== undefined ? ` (received: '${err.value}')` : '';
          return `  - ${err.paramName}: ${err.message}${valueInfo}`;
        })
        .join('\n');

      const prefix = contextMessage || this.getCallerContext();
      throw new CoinbasePrimeClientException(`${prefix}:\n${errorDetails}`);
    }
  }

  /**
   * Alias for throwIfInvalid() - more natural for fluent/builder pattern.
   * Throw an exception if there are validation errors.
   *
   * @param contextMessage - Optional context message. If not provided, attempts to detect method name.
   * @throws {CoinbasePrimeClientException} if there are validation errors
   *
   * @example
   * ```typescript
   * validator
   *   .validateRequiredUUID(request.portfolioId, 'portfolioId')
   *   .validateRequiredUUID(request.orderId, 'orderId')
   *   .check(); // ✅ Fluent pattern
   * ```
   */
  check(contextMessage?: string): void {
    this.throwIfInvalid(contextMessage);
  }

  /**
   * Attempts to extract the calling method name from the stack trace.
   * This provides automatic context for validation errors.
   * Falls back to 'Request validation failed' if method name cannot be determined.
   */
  private getCallerContext(): string {
    try {
      const stack = new Error().stack;
      if (stack) {
        // Parse stack to find the calling method
        const lines = stack.split('\n');
        // Stack trace format:
        // Line 0: Error
        // Line 1: getCallerContext
        // Line 2: throwIfInvalid
        // Line 3: actual calling method (e.g., getOrder, listOnchainAddressBook)
        const callerLine = lines[3];

        // Try to match various stack trace formats
        // Format: "at ClassName.methodName" or "at methodName" or "methodName@file.ts"
        let match = callerLine.match(/at (?:\w+\.)?(\w+)/);
        if (!match) {
          // Try Firefox/Safari format: methodName@file.ts:line:col
          match = callerLine.match(/^(\w+)@/);
        }

        if (match && match[1]) {
          const methodName = match[1];
          // Filter out common internal/utility method names
          if (!['async', 'Function', 'Object'].includes(methodName)) {
            return `${methodName} request validation failed`;
          }
        }
      }
    } catch (e) {
      // Silently fail - stack parsing is best-effort
      // This might happen in different JavaScript engines or minified code
    }
    return 'Request validation failed';
  }
}

/**
 * Validates that a string is a valid UUID v4 format
 */
export function isValidUUID(value: string): boolean {
  return UUID_REGEX.test(value);
}

/**
 * Validates that a required UUID parameter is present and valid
 */
export function validateRequiredUUID(
  validator: ValidationResult,
  value: string | undefined | null,
  paramName: string
): void {
  if (value === undefined || value === null || value === '') {
    validator.addError(paramName, 'is required and cannot be empty', value);
    return;
  }

  const trimmedValue = typeof value === 'string' ? value.trim() : value;
  if (trimmedValue === '') {
    validator.addError(paramName, 'cannot be empty or whitespace only', value);
    return;
  }

  if (!isValidUUID(trimmedValue)) {
    validator.addError(paramName, 'must be a valid UUID', value);
  }
}

/**
 * Validates that an optional UUID parameter is valid if provided
 */
export function validateOptionalUUID(
  validator: ValidationResult,
  value: string | undefined | null,
  paramName: string
): void {
  if (value === undefined || value === null || value === '') {
    return; // Optional, so undefined/null/empty is valid
  }

  const trimmedValue = typeof value === 'string' ? value.trim() : value;
  if (trimmedValue !== '' && !isValidUUID(trimmedValue)) {
    validator.addError(paramName, 'must be a valid UUID if provided', value);
  }
}

/**
 * Validates that a required string parameter is present and not empty
 */
export function validateRequiredString(
  validator: ValidationResult,
  value: string | undefined | null,
  paramName: string
): void {
  if (value === undefined || value === null || value === '') {
    validator.addError(paramName, 'is required and cannot be empty', value);
    return;
  }

  const trimmedValue = typeof value === 'string' ? value.trim() : value;
  if (trimmedValue === '') {
    validator.addError(paramName, 'cannot be empty or whitespace only', value);
  }
}

/**
 * Validates that an optional string parameter is not empty if provided
 */
export function validateOptionalString(
  validator: ValidationResult,
  value: string | undefined | null,
  paramName: string
): void {
  if (value === undefined || value === null) {
    return; // Optional, so undefined/null is valid
  }

  if (typeof value === 'string') {
    const trimmedValue = value.trim();
    if (value !== '' && trimmedValue === '') {
      validator.addError(
        paramName,
        'cannot be whitespace only if provided',
        value
      );
    }
  }
}

/**
 * Convenience function to create a new ValidationResult
 */
export function createValidator(): ValidationResult {
  return new ValidationResult();
}

/**
 * Creates a validator with property accessor support for automatic field name inference.
 *
 * @param source - The source object containing the fields to validate
 *
 * @example
 * ```typescript
 * validate(request)
 *   .requiredUUID(r => r.portfolioId)
 *   .requiredUUID(r => r.orderId)
 *   .check();
 * ```
 */
export function validate<T extends Record<string, any>>(
  source: T
): PropertyValidator<T> {
  return new PropertyValidator(source);
}

/**
 * Validator with property accessor support for automatic field name inference.
 * Uses Proxy to track property accesses and extract field names automatically.
 */
export class PropertyValidator<T extends Record<string, any>> {
  private validator: ValidationResult;
  private source: T;

  constructor(source: T) {
    this.validator = new ValidationResult();
    this.source = source;
  }

  /**
   * Validates that a required UUID field is present and valid.
   * Automatically extracts the field name from the property accessor.
   *
   * @example
   * ```typescript
   * validate(request)
   *   .requiredUUID(r => r.portfolioId)
   *   .check();
   * ```
   */
  requiredUUID(accessor: (source: T) => string | undefined | null): this {
    const { propertyName, value } = this.extractProperty(accessor);
    this.validator.validateRequiredUUID(value, propertyName);
    return this;
  }

  /**
   * Validates that an optional UUID field is valid if provided.
   */
  optionalUUID(accessor: (source: T) => string | undefined | null): this {
    const { propertyName, value } = this.extractProperty(accessor);
    this.validator.validateOptionalUUID(value, propertyName);
    return this;
  }

  /**
   * Validates that a required string field is present and not empty.
   */
  requiredString(accessor: (source: T) => string | undefined | null): this {
    const { propertyName, value } = this.extractProperty(accessor);
    this.validator.validateRequiredString(value, propertyName);
    return this;
  }

  /**
   * Validates that an optional string field is not empty if provided.
   */
  optionalString(accessor: (source: T) => string | undefined | null): this {
    const { propertyName, value } = this.extractProperty(accessor);
    this.validator.validateOptionalString(value, propertyName);
    return this;
  }

  /**
   * Validates that a required array field is present and not empty.
   */
  requiredArray(accessor: (source: T) => any[] | undefined | null): this {
    const { propertyName, value } = this.extractProperty(accessor);
    if (value === undefined || value === null) {
      this.validator.addError(propertyName, `${propertyName} is required`);
    } else if (!Array.isArray(value)) {
      this.validator.addError(propertyName, `${propertyName} must be an array`);
    } else if (value.length === 0) {
      this.validator.addError(
        propertyName,
        `${propertyName} must not be an empty array`
      );
    }
    return this;
  }

  /**
   * Validates that a required boolean field is present.
   */
  requiredBoolean(accessor: (source: T) => boolean | undefined | null): this {
    const { propertyName, value } = this.extractProperty(accessor);
    if (value === undefined || value === null) {
      this.validator.addError(propertyName, `${propertyName} is required`);
    } else if (typeof value !== 'boolean') {
      this.validator.addError(
        propertyName,
        `${propertyName} must be a boolean`
      );
    }
    return this;
  }

  /**
   * Throws if there are validation errors.
   * Automatically detects the calling method name.
   */
  check(contextMessage?: string): void {
    this.validator.throwIfInvalid(contextMessage);
  }

  /**
   * Alias for check() for backward compatibility.
   */
  throwIfInvalid(contextMessage?: string): void {
    this.validator.throwIfInvalid(contextMessage);
  }

  /**
   * Extracts the property name and value from a property accessor function.
   * Uses a Proxy to track which property was accessed.
   */
  private extractProperty(accessor: (source: T) => any): {
    propertyName: string;
    value: any;
  } {
    let accessedProperty: string | undefined;

    // Create a Proxy that tracks property accesses
    const proxy = new Proxy(this.source, {
      get(target, prop: string | symbol) {
        if (typeof prop === 'string') {
          accessedProperty = prop;
          return target[prop];
        }
        return undefined;
      },
    });

    // Call the accessor to trigger the Proxy
    const value = accessor(proxy as T);

    if (!accessedProperty) {
      throw new Error(
        'Unable to extract property name. Ensure the accessor accesses a property directly (e.g., r => r.fieldName)'
      );
    }

    return { propertyName: accessedProperty, value };
  }
}
