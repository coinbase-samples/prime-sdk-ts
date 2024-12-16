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
import { CoinbaseClient } from '../../core-ts/dist';

import { API_BASE_PATH, USER_AGENT } from './constants';
import { CoinbasePrimeCredentials } from './credentials';

type AnyObject = { [key: string]: any };

function toCamelCase<T>(obj: T, seen = new WeakSet()): T {
  if (obj === null || typeof obj !== 'object') return obj; // Handle non-object values

  // Prevent circular references
  if (seen.has(obj)) {
    throw new Error('Circular reference detected');
  }

  seen.add(obj);

  if (Array.isArray(obj)) {
    // Recursively handle arrays
    return obj.map((item) => toCamelCase(item, seen)) as T;
  }

  return Object.entries(obj).reduce((acc, [key, value]) => {
    // Convert snake_case key to camelCase
    const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) =>
      letter.toUpperCase()
    );

    // Recursively process values if they are objects or arrays
    (acc as AnyObject)[camelCaseKey] = toCamelCase(value, seen);

    return acc;
  }, {} as T);
}

export class CoinbasePrimeClient extends CoinbaseClient {
  constructor(apiKey?: string, apiSecret?: string, signingKey?: string) {
    if (!apiKey || !apiSecret || !signingKey) {
      super(API_BASE_PATH, undefined, USER_AGENT);
    } else {
      super(
        API_BASE_PATH,
        new CoinbasePrimeCredentials(apiKey, apiSecret, signingKey),
        USER_AGENT
      );
    }
    // transform the data to camelCase
    this.addTransformResponse((response) => {
      return {
        ...response,
        data: toCamelCase(response.data),
      };
    });
  }
}
