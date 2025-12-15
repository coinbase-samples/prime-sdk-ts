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
import { isValidUUID, validate } from '../validation';
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
      expect(isValidUUID('12345678-1234-1234-1234-12345678901g')).toBe(false);
    });
  });

  describe('PropertyValidator', () => {
    it('should start with no errors', () => {
      const validator = validate({});
      expect(validator.hasErrors()).toBe(false);
      expect(validator.getErrors()).toEqual([]);
    });

    it('should accumulate errors', () => {
      const validator = validate({});
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
      const validator = validate({});
      validator.addError('portfolioId', 'must be a valid UUID', 'bad-id');
      validator.addError('orderId', 'is required');

      expect(() => validator.check()).toThrow(CoinbasePrimeClientException);
      expect(() => validator.check()).toThrow(
        /Request validation failed:\n  - portfolioId: must be a valid UUID \(received: 'bad-id'\)\n  - orderId: is required/
      );
    });

    it('should not throw when there are no errors', () => {
      const validator = validate({});
      expect(() => validator.check()).not.toThrow();
    });

    it('should include custom context message', () => {
      const validator = validate({});
      validator.addError('field1', 'is invalid');

      expect(() => validator.check('Custom operation failed')).toThrow(
        /Custom operation failed:/
      );
    });
  });

  describe('requiredUUID', () => {
    it('should not throw for valid UUID', () => {
      const request = { testId: '123e4567-e89b-12d3-a456-426614174000' };
      expect(() =>
        validate(request)
          .requiredUUID((r) => r.testId)
          .check()
      ).not.toThrow();
    });

    it('should throw for undefined', () => {
      const request = { testId: undefined };
      expect(() =>
        validate(request)
          .requiredUUID((r) => r.testId)
          .check()
      ).toThrow(/required/);
    });

    it('should throw for null', () => {
      const request = { testId: null };
      expect(() =>
        validate(request)
          .requiredUUID((r) => r.testId)
          .check()
      ).toThrow(/required/);
    });

    it('should throw for empty string', () => {
      const request = { testId: '' };
      expect(() =>
        validate(request)
          .requiredUUID((r) => r.testId)
          .check()
      ).toThrow(/required/);
    });

    it('should throw for whitespace-only string', () => {
      const request = { testId: '   ' };
      expect(() =>
        validate(request)
          .requiredUUID((r) => r.testId)
          .check()
      ).toThrow(/whitespace/);
    });

    it('should throw for invalid UUID format', () => {
      const request = { testId: 'not-a-uuid' };
      expect(() =>
        validate(request)
          .requiredUUID((r) => r.testId)
          .check()
      ).toThrow(/valid UUID/);
    });
  });

  describe('optionalUUID', () => {
    it('should not throw for valid UUID', () => {
      const request = { testId: '123e4567-e89b-12d3-a456-426614174000' };
      expect(() =>
        validate(request)
          .optionalUUID((r) => r.testId)
          .check()
      ).not.toThrow();
    });

    it('should not throw for undefined', () => {
      const request = { testId: undefined };
      expect(() =>
        validate(request)
          .optionalUUID((r) => r.testId)
          .check()
      ).not.toThrow();
    });

    it('should not throw for null', () => {
      const request = { testId: null };
      expect(() =>
        validate(request)
          .optionalUUID((r) => r.testId)
          .check()
      ).not.toThrow();
    });

    it('should not throw for empty string', () => {
      const request = { testId: '' };
      expect(() =>
        validate(request)
          .optionalUUID((r) => r.testId)
          .check()
      ).not.toThrow();
    });

    it('should throw for invalid UUID format', () => {
      const request = { testId: 'not-a-uuid' };
      expect(() =>
        validate(request)
          .optionalUUID((r) => r.testId)
          .check()
      ).toThrow(/valid UUID/);
    });
  });

  describe('requiredString', () => {
    it('should not throw for valid string', () => {
      const request = { testField: 'valid-string' };
      expect(() =>
        validate(request)
          .requiredString((r) => r.testField)
          .check()
      ).not.toThrow();
    });

    it('should throw for undefined', () => {
      const request = { testField: undefined };
      expect(() =>
        validate(request)
          .requiredString((r) => r.testField)
          .check()
      ).toThrow(/required/);
    });

    it('should throw for null', () => {
      const request = { testField: null };
      expect(() =>
        validate(request)
          .requiredString((r) => r.testField)
          .check()
      ).toThrow(/required/);
    });

    it('should throw for empty string', () => {
      const request = { testField: '' };
      expect(() =>
        validate(request)
          .requiredString((r) => r.testField)
          .check()
      ).toThrow(/required/);
    });

    it('should throw for whitespace-only string', () => {
      const request = { testField: '   ' };
      expect(() =>
        validate(request)
          .requiredString((r) => r.testField)
          .check()
      ).toThrow(/whitespace/);
    });
  });

  describe('optionalString', () => {
    it('should not throw for valid string', () => {
      const request = { testField: 'valid-string' };
      expect(() =>
        validate(request)
          .optionalString((r) => r.testField)
          .check()
      ).not.toThrow();
    });

    it('should not throw for undefined', () => {
      const request = { testField: undefined };
      expect(() =>
        validate(request)
          .optionalString((r) => r.testField)
          .check()
      ).not.toThrow();
    });

    it('should not throw for null', () => {
      const request = { testField: null };
      expect(() =>
        validate(request)
          .optionalString((r) => r.testField)
          .check()
      ).not.toThrow();
    });

    it('should throw for whitespace-only when not empty', () => {
      const request = { testField: '   ' };
      expect(() =>
        validate(request)
          .optionalString((r) => r.testField)
          .check()
      ).toThrow(/whitespace/);
    });
  });

  describe('requiredArray', () => {
    it('should not throw for valid array', () => {
      const request = { items: ['a', 'b', 'c'] };
      expect(() =>
        validate(request)
          .requiredArray((r) => r.items)
          .check()
      ).not.toThrow();
    });

    it('should throw for undefined', () => {
      const request = { items: undefined };
      expect(() =>
        validate(request)
          .requiredArray((r) => r.items)
          .check()
      ).toThrow(/required/);
    });

    it('should throw for empty array', () => {
      const request = { items: [] };
      expect(() =>
        validate(request)
          .requiredArray((r) => r.items)
          .check()
      ).toThrow(/empty array/);
    });
  });

  describe('requiredBoolean', () => {
    it('should not throw for true', () => {
      const request = { flag: true };
      expect(() =>
        validate(request)
          .requiredBoolean((r) => r.flag)
          .check()
      ).not.toThrow();
    });

    it('should not throw for false', () => {
      const request = { flag: false };
      expect(() =>
        validate(request)
          .requiredBoolean((r) => r.flag)
          .check()
      ).not.toThrow();
    });

    it('should throw for undefined', () => {
      const request = { flag: undefined };
      expect(() =>
        validate(request)
          .requiredBoolean((r) => r.flag)
          .check()
      ).toThrow(/required/);
    });
  });

  describe('multiple field validation', () => {
    it('should collect all validation errors before throwing', () => {
      const request = {
        portfolioId: undefined,
        orderId: 'invalid-uuid',
        productId: '',
      };

      expect(() =>
        validate(request)
          .requiredUUID((r) => r.portfolioId)
          .requiredUUID((r) => r.orderId)
          .requiredString((r) => r.productId)
          .check('getOrder request validation failed')
      ).toThrow(CoinbasePrimeClientException);

      try {
        validate(request)
          .requiredUUID((r) => r.portfolioId)
          .requiredUUID((r) => r.orderId)
          .requiredString((r) => r.productId)
          .check('getOrder request validation failed');
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
