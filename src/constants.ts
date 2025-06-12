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
export const VERSION = '0.1.0';
export const API_BASE_PATH = 'https://api.prime.coinbase.com/v1/';
export const USER_AGENT = 'coinbase-prime-ts/' + VERSION;
export const CB_ACCESS_KEY_HEADER = 'X-CB-ACCESS-KEY';
export const CB_ACCESS_PHRASE_HEADER = 'X-CB-ACCESS-PASSPHRASE';
export const CB_ACCESS_SIGNATURE_HEADER = 'X-CB-ACCESS-SIGNATURE';
export const CB_ACCESS_TIMESTAMP_HEADER = 'X-CB-ACCESS-TIMESTAMP';
export const DEFAULT_PAGINATION_LIMIT = 25;
export const DEFAULT_MAX_PAGES = 100;
export const DEFAULT_MAX_ITEMS = 10000;
