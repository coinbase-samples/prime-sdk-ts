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
import {
  createValidator,
  isValidUUID,
  validateRequiredUUID,
  validateOptionalUUID,
  validateRequiredString,
  validateOptionalString,
  ValidationResult,
} from '../validation';
import { CoinbasePrimeClientException } from '../../errors';

describe('validation', () => {
  describe('isValidUUID', () => {
    it('should return true for valid UUIDs', () => {
      expect(isValidUUID('123e4567-e89b-12d3-a456-426614174000')).toBe(true);
      expect(isValidUUID('550e8400-e29b-41d4-a716-446655440000')).toBe(true);
      expect(isValidUUID('ABCDEF12-3456-7890-ABCD-EF1234567890')).toBe(true);
    });

    it('should return false for invalid UUIDs', () => {
      expect(isValidUUID('not-a-uuid')).toBe(false);
      expect(isValidUUID('123e4567-e89b-12d3-a456')).toBe(false);
      expect(isValidUUID('123e4567e89b12d3a456426614174000')).toBe(false);
      expect(isValidUUID('')).toBe(false);
      expect(isValidUUID('12345678-1234-1234-1234-12345678901g')).toBe(false); // 'g' is not hex
    });
  });

  describe('ValidationResult', () => {
    let validator: ValidationResult;

    beforeEach(() => {
      validator = createValidator();
    });

    it('should start with no errors', () => {
      expect(validator.hasErrors()).toBe(false);
      expect(validator.getErrors()).toEqual([]);
    });

    it('should accumulate errors', () => {
      validator.addError('field1', 'is required');
      validator.addError('field2', 'must be a valid UUID', 'invalid-value');

      expect(validator.hasErrors()).toBe(true);
      expect(validator.getErrors()).toHaveLength(2);
      expect(validator.getErrors()[0]).toEqual({
        paramName: 'field1',
        message: 'is required',
      });
      expect(validator.getErrors()[1]).toEqual({
        paramName: 'field2',
        message: 'must be a valid UUID',
        value: 'invalid-value',
      });
    });

    it('should throw with formatted error message when there are errors', () => {
      validator.addError('portfolioId', 'must be a valid UUID', 'bad-id');
      validator.addError('orderId', 'is required');

      expect(() => validator.throwIfInvalid()).toThrow(
        CoinbasePrimeClientException
      );
      expect(() => validator.throwIfInvalid()).toThrow(
        /Request validation failed:\n  - portfolioId: must be a valid UUID \(received: 'bad-id'\)\n  - orderId: is required/
      );
    });

    it('should not throw when there are no errors', () => {
      expect(() => validator.throwIfInvalid()).not.toThrow();
    });

    it('should include custom context message', () => {
      validator.addError('field1', 'is invalid');

      expect(() => validator.throwIfInvalid('Custom operation failed')).toThrow(
        /Custom operation failed:/
      );
    });
  });

  describe('validateRequiredUUID', () => {
    let validator: ValidationResult;

    beforeEach(() => {
      validator = createValidator();
    });

    it('should not add error for valid UUID', () => {
      validateRequiredUUID(
        validator,
        '123e4567-e89b-12d3-a456-426614174000',
        'testId'
      );
      expect(validator.hasErrors()).toBe(false);
    });

    it('should add error for undefined', () => {
      validateRequiredUUID(validator, undefined, 'testId');
      expect(validator.hasErrors()).toBe(true);
      expect(validator.getErrors()[0].message).toContain('required');
    });

    it('should add error for null', () => {
      validateRequiredUUID(validator, null, 'testId');
      expect(validator.hasErrors()).toBe(true);
      expect(validator.getErrors()[0].message).toContain('required');
    });

    it('should add error for empty string', () => {
      validateRequiredUUID(validator, '', 'testId');
      expect(validator.hasErrors()).toBe(true);
      expect(validator.getErrors()[0].message).toContain('required');
    });

    it('should add error for whitespace-only string', () => {
      validateRequiredUUID(validator, '   ', 'testId');
      expect(validator.hasErrors()).toBe(true);
      expect(validator.getErrors()[0].message).toContain('whitespace');
    });

    it('should add error for invalid UUID format', () => {
      validateRequiredUUID(validator, 'not-a-uuid', 'testId');
      expect(validator.hasErrors()).toBe(true);
      expect(validator.getErrors()[0].message).toContain('valid UUID');
    });
  });

  describe('validateOptionalUUID', () => {
    let validator: ValidationResult;

    beforeEach(() => {
      validator = createValidator();
    });

    it('should not add error for valid UUID', () => {
      validateOptionalUUID(
        validator,
        '123e4567-e89b-12d3-a456-426614174000',
        'testId'
      );
      expect(validator.hasErrors()).toBe(false);
    });

    it('should not add error for undefined', () => {
      validateOptionalUUID(validator, undefined, 'testId');
      expect(validator.hasErrors()).toBe(false);
    });

    it('should not add error for null', () => {
      validateOptionalUUID(validator, null, 'testId');
      expect(validator.hasErrors()).toBe(false);
    });

    it('should not add error for empty string', () => {
      validateOptionalUUID(validator, '', 'testId');
      expect(validator.hasErrors()).toBe(false);
    });

    it('should add error for invalid UUID format', () => {
      validateOptionalUUID(validator, 'not-a-uuid', 'testId');
      expect(validator.hasErrors()).toBe(true);
      expect(validator.getErrors()[0].message).toContain('valid UUID');
    });
  });

  describe('validateRequiredString', () => {
    let validator: ValidationResult;

    beforeEach(() => {
      validator = createValidator();
    });

    it('should not add error for valid string', () => {
      validateRequiredString(validator, 'valid-string', 'testField');
      expect(validator.hasErrors()).toBe(false);
    });

    it('should add error for undefined', () => {
      validateRequiredString(validator, undefined, 'testField');
      expect(validator.hasErrors()).toBe(true);
      expect(validator.getErrors()[0].message).toContain('required');
    });

    it('should add error for null', () => {
      validateRequiredString(validator, null, 'testField');
      expect(validator.hasErrors()).toBe(true);
      expect(validator.getErrors()[0].message).toContain('required');
    });

    it('should add error for empty string', () => {
      validateRequiredString(validator, '', 'testField');
      expect(validator.hasErrors()).toBe(true);
      expect(validator.getErrors()[0].message).toContain('required');
    });

    it('should add error for whitespace-only string', () => {
      validateRequiredString(validator, '   ', 'testField');
      expect(validator.hasErrors()).toBe(true);
      expect(validator.getErrors()[0].message).toContain('whitespace');
    });
  });

  describe('validateOptionalString', () => {
    let validator: ValidationResult;

    beforeEach(() => {
      validator = createValidator();
    });

    it('should not add error for valid string', () => {
      validateOptionalString(validator, 'valid-string', 'testField');
      expect(validator.hasErrors()).toBe(false);
    });

    it('should not add error for undefined', () => {
      validateOptionalString(validator, undefined, 'testField');
      expect(validator.hasErrors()).toBe(false);
    });

    it('should not add error for null', () => {
      validateOptionalString(validator, null, 'testField');
      expect(validator.hasErrors()).toBe(false);
    });

    it('should add error for whitespace-only when not empty', () => {
      validateOptionalString(validator, '   ', 'testField');
      expect(validator.hasErrors()).toBe(true);
      expect(validator.getErrors()[0].message).toContain('whitespace');
    });
  });

  describe('multiple field validation', () => {
    it('should collect all validation errors before throwing', () => {
      const validator = createValidator();

      // Simulate validating multiple fields at once
      validateRequiredUUID(validator, undefined, 'portfolioId');
      validateRequiredUUID(validator, 'invalid-uuid', 'orderId');
      validateRequiredString(validator, '', 'productId');

      expect(validator.hasErrors()).toBe(true);
      expect(validator.getErrors()).toHaveLength(3);

      expect(() =>
        validator.throwIfInvalid('getOrder request validation failed')
      ).toThrow(CoinbasePrimeClientException);

      try {
        validator.throwIfInvalid('getOrder request validation failed');
      } catch (error) {
        if (error instanceof CoinbasePrimeClientException) {
          expect(error.message).toContain('portfolioId');
          expect(error.message).toContain('orderId');
          expect(error.message).toContain('productId');
        }
      }
    });
  });
});
