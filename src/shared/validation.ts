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
 * Validates that a string is a valid UUID v4 format
 */
export function isValidUUID(value: string): boolean {
  return UUID_REGEX.test(value);
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
  private errors: ValidationError[] = [];
  private source: T;

  constructor(source: T) {
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

    if (value === undefined || value === null || value === '') {
      this.addError(propertyName, 'is required and cannot be empty', value);
      return this;
    }

    const trimmedValue = typeof value === 'string' ? value.trim() : value;
    if (trimmedValue === '') {
      this.addError(propertyName, 'cannot be empty or whitespace only', value);
      return this;
    }

    if (!isValidUUID(trimmedValue)) {
      this.addError(propertyName, 'must be a valid UUID', value);
    }

    return this;
  }

  /**
   * Validates that an optional UUID field is valid if provided.
   */
  optionalUUID(accessor: (source: T) => string | undefined | null): this {
    const { propertyName, value } = this.extractProperty(accessor);

    if (value === undefined || value === null || value === '') {
      return this;
    }

    const trimmedValue = typeof value === 'string' ? value.trim() : value;
    if (trimmedValue !== '' && !isValidUUID(trimmedValue)) {
      this.addError(propertyName, 'must be a valid UUID if provided', value);
    }

    return this;
  }

  /**
   * Validates that a required string field is present and not empty.
   */
  requiredString(accessor: (source: T) => string | undefined | null): this {
    const { propertyName, value } = this.extractProperty(accessor);

    if (value === undefined || value === null || value === '') {
      this.addError(propertyName, 'is required and cannot be empty', value);
      return this;
    }

    const trimmedValue = typeof value === 'string' ? value.trim() : value;
    if (trimmedValue === '') {
      this.addError(propertyName, 'cannot be empty or whitespace only', value);
    }

    return this;
  }

  /**
   * Validates that an optional string field is not empty if provided.
   */
  optionalString(accessor: (source: T) => string | undefined | null): this {
    const { propertyName, value } = this.extractProperty(accessor);

    if (value === undefined || value === null) {
      return this;
    }

    if (typeof value === 'string') {
      const trimmedValue = value.trim();
      if (value !== '' && trimmedValue === '') {
        this.addError(
          propertyName,
          'cannot be whitespace only if provided',
          value
        );
      }
    }

    return this;
  }

  /**
   * Validates that a required array field is present and not empty.
   */
  requiredArray(accessor: (source: T) => any[] | undefined | null): this {
    const { propertyName, value } = this.extractProperty(accessor);

    if (value === undefined || value === null) {
      this.addError(propertyName, 'is required', value);
    } else if (!Array.isArray(value)) {
      this.addError(propertyName, 'must be an array', value);
    } else if (value.length === 0) {
      this.addError(propertyName, 'must not be an empty array', value);
    }

    return this;
  }

  /**
   * Validates that a required boolean field is present.
   */
  requiredBoolean(accessor: (source: T) => boolean | undefined | null): this {
    const { propertyName, value } = this.extractProperty(accessor);

    if (value === undefined || value === null) {
      this.addError(propertyName, 'is required', value);
    } else if (typeof value !== 'boolean') {
      this.addError(propertyName, 'must be a boolean', value);
    }

    return this;
  }

  /**
   * Throws if there are validation errors.
   */
  check(contextMessage?: string): void {
    if (this.errors.length > 0) {
      const errorDetails = this.errors
        .map((err) => {
          const valueInfo =
            err.value !== undefined ? ` (received: '${err.value}')` : '';
          return `  - ${err.paramName}: ${err.message}${valueInfo}`;
        })
        .join('\n');

      const prefix = contextMessage || 'Request validation failed';
      throw new CoinbasePrimeClientException(`${prefix}:\n${errorDetails}`);
    }
  }

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
   * Extracts the property name and value from a property accessor function.
   * Uses a Proxy to track which property was accessed.
   */
  private extractProperty(accessor: (source: T) => any): {
    propertyName: string;
    value: any;
  } {
    let accessedProperty: string | undefined;

    const proxy = new Proxy(this.source, {
      get(target, prop: string | symbol) {
        if (typeof prop === 'string') {
          accessedProperty = prop;
          return target[prop];
        }
        return undefined;
      },
    });

    const value = accessor(proxy as T);

    if (!accessedProperty) {
      throw new Error(
        'Unable to extract property name. Ensure the accessor accesses a property directly (e.g., r => r.fieldName)'
      );
    }

    return { propertyName: accessedProperty, value };
  }
}
