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
import { CoinbasePrimeCredentials } from '../credentials';

/**
 * Shared utility function to create credentials from environment variables
 * Used by both CoinbasePrimeClient and CoinbasePrimeClientWithServices
 *
 * Automatically attempts to load .env file if dotenv is available.
 * If dotenv is not installed or .env file doesn't exist, falls back to
 * using environment variables set directly.
 *
 * @advanced For custom scenarios. Most users should use Client.fromEnv() instead.
 * @example
 * ```typescript
 * // Basic usage (recommended)
 * const client = CoinbasePrimeClient.fromEnv();
 *
 * // Advanced usage (custom scenarios)
 * const credentials = createCredentialsFromEnv();
 * const client = new CoinbasePrimeClient(credentials, 'custom-url');
 * ```
 */
export function createCredentialsFromEnv(): CoinbasePrimeCredentials {
  // Try to load .env file if dotenv is available (optional)
  try {
    require('dotenv').config();
  } catch (error) {
    // dotenv not installed or .env file doesn't exist - that's fine
    // Environment variables might be set directly via shell, Docker, CI/CD, etc.
  }

  const credsJson = process.env.PRIME_CREDENTIALS;
  if (!credsJson) {
    throw new Error(
      'PRIME_CREDENTIALS environment variable is required. ' +
        'Set it to a JSON string with AccessKey, SecretKey, and Passphrase. ' +
        'You can set it directly (export PRIME_CREDENTIALS=\'{"AccessKey":"...","SecretKey":"...","Passphrase":"..."}\') ' +
        'or create a .env file with PRIME_CREDENTIALS={"AccessKey":"...","SecretKey":"...","Passphrase":"..."}.'
    );
  }

  let creds;
  try {
    creds = JSON.parse(credsJson);
  } catch (error) {
    throw new Error(
      'PRIME_CREDENTIALS must be valid JSON with AccessKey, SecretKey, and Passphrase fields.'
    );
  }

  if (!creds.AccessKey || !creds.SecretKey || !creds.Passphrase) {
    throw new Error(
      'PRIME_CREDENTIALS must contain AccessKey, SecretKey, and Passphrase fields.'
    );
  }

  return new CoinbasePrimeCredentials(
    creds.AccessKey,
    creds.SecretKey,
    creds.Passphrase
  );
}
