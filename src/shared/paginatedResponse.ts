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

import { CoinbaseCallOptions, IPrimeApiClient } from '../clients';
import { DEFAULT_MAX_ITEMS, DEFAULT_MAX_PAGES } from '../constants';
import { SortDirection } from '../model/enums/SortDirection';

/**
 * Base type for paginated requests
 */
export type BasePaginatedRequest = {
  cursor?: string;
  limit?: number;
  sortDirection?: SortDirection.Asc | SortDirection.Desc | undefined;
};

/**
 * API call signature for paginated endpoints
 */
export type ApiCall<TRequest extends BasePaginatedRequest, TResponse> = (
  request: TRequest,
  options?: CoinbaseCallOptions
) => Promise<TResponse>;

/**
 * Configuration for pagination behavior
 */
export interface PaginationConfig {
  defaultLimit?: number;
  maxPages?: number;
  maxItems?: number;
}

/**
 * Function to extract data array from response
 */
export type DataExtractor<TResponse, TData> = (response: TResponse) => TData[];

/**
 * Interface for pagination methods that will be added to response objects
 */
export interface PaginatedResponseMethods<
  TRequest extends BasePaginatedRequest,
  TResponse,
  TData,
> {
  __apiCall: ApiCall<
    TRequest,
    TResponse & PaginatedResponseMethods<TRequest, TResponse, TData>
  >;
  __baseRequest: Omit<TRequest, 'cursor'>;
  __dataExtractor: DataExtractor<TResponse, TData>;
  __config: PaginationConfig;
  __currentPage: number;
  __totalItemsFetched: number;

  /**
   * Check if there are more pages available
   */
  hasNext(): boolean;

  /**
   * Get the next cursor
   */
  getNextCursor(): string | undefined;

  /**
   * Fetch the next page
   */
  next(
    options?: CoinbaseCallOptions
  ): Promise<
    (TResponse & PaginatedResponseMethods<TRequest, TResponse, TData>) | null
  >;

  /**
   * Fetch all remaining pages and return combined data
   */
  fetchAll(
    options?: CoinbaseCallOptions,
    progressCallback?: (page: number, totalItems: number) => void
  ): Promise<TData[]>;
}

/**
 * Validates that a number is a positive integer
 */
function validatePositiveInteger(
  value: number | undefined | null,
  defaultValue: number
): number {
  if (value === undefined || value === null) return defaultValue;
  const num = Number(value);
  if (!Number.isInteger(num) || num <= 0) {
    throw new Error(`Value must be a positive integer, got: ${value}`);
  }
  return num;
}

/**
 * Factory function to create enhanced response objects with pagination methods
 */
export function createPaginatedResponse<
  TRequest extends BasePaginatedRequest,
  TResponse,
  TData,
>(
  responseData: TResponse,
  apiCall: ApiCall<
    TRequest,
    TResponse & PaginatedResponseMethods<TRequest, TResponse, TData>
  >,
  baseRequest: Omit<TRequest, 'cursor'>,
  dataExtractor: DataExtractor<TResponse, TData>,
  options?: CoinbaseCallOptions
): TResponse & PaginatedResponseMethods<TRequest, TResponse, TData> {
  const paginationMethods: PaginatedResponseMethods<
    TRequest,
    TResponse,
    TData
  > = {
    __apiCall: apiCall,
    __baseRequest: baseRequest,
    __dataExtractor: dataExtractor,
    __config: {
      defaultLimit: 25,
      maxPages: options?.maxPages ?? DEFAULT_MAX_PAGES,
      maxItems: options?.maxItems ?? DEFAULT_MAX_ITEMS,
    },
    __currentPage: 1,
    __totalItemsFetched: 0,

    hasNext(): boolean {
      const pagination = (this as any).pagination;
      const hasApiNext = pagination?.has_next ?? pagination?.hasNext ?? false;

      // Check if API has more pages
      if (!hasApiNext) {
        return false;
      }

      // Check if we've reached the max pages limit
      if (this.__currentPage >= (this.__config.maxPages ?? DEFAULT_MAX_PAGES)) {
        return false;
      }

      // Check if we've reached the max items limit
      if (
        this.__totalItemsFetched >=
        (this.__config.maxItems ?? DEFAULT_MAX_ITEMS)
      ) {
        return false;
      }

      return true;
    },

    getNextCursor(): string | undefined {
      const pagination = (this as any).pagination;
      return pagination?.nextCursor;
    },

    async next(options?: CoinbaseCallOptions) {
      if (options?.maxPages) {
        this.__config.maxPages = validatePositiveInteger(
          options.maxPages,
          DEFAULT_MAX_PAGES
        );
      }
      if (options?.maxItems) {
        this.__config.maxItems = validatePositiveInteger(
          options.maxItems,
          DEFAULT_MAX_ITEMS
        );
      }

      if (!this.hasNext()) {
        return null;
      }

      const request = {
        ...this.__baseRequest,
        cursor: this.getNextCursor(),
        limit: this.__baseRequest?.limit ?? this.__config.defaultLimit,
      } as TRequest;

      const nextResponse = await this.__apiCall(request, options);

      if (nextResponse) {
        // Update pagination tracking
        nextResponse.__currentPage = this.__currentPage + 1;
        const nextData = this.__dataExtractor(nextResponse as any);
        nextResponse.__totalItemsFetched =
          this.__totalItemsFetched + nextData.length;
      }

      return nextResponse;
    },

    async fetchAll(
      options?: CoinbaseCallOptions,
      progressCallback?: (page: number, totalItems: number) => void
    ) {
      const allData: TData[] = [];
      let currentResponse = this;
      let pageCount = 1;
      let totalItems = 0;

      if (options?.maxPages) {
        this.__config.maxPages = validatePositiveInteger(
          options.maxPages,
          DEFAULT_MAX_PAGES
        );
      }
      if (options?.maxItems) {
        this.__config.maxItems = validatePositiveInteger(
          options.maxItems,
          DEFAULT_MAX_ITEMS
        );
      }

      // Add current page data
      const currentData = this.__dataExtractor(currentResponse as any);
      allData.push(...currentData);
      totalItems += currentData.length;

      progressCallback?.(pageCount, totalItems);

      // Fetch remaining pages
      while (
        currentResponse.hasNext() &&
        pageCount < (this.__config.maxPages ?? DEFAULT_MAX_PAGES) &&
        totalItems < (this.__config.maxItems ?? DEFAULT_MAX_ITEMS)
      ) {
        const nextResponse = await currentResponse.next(this.__config);

        if (!nextResponse) break;

        pageCount++;
        const nextData = this.__dataExtractor(nextResponse as any);
        allData.push(...nextData);
        totalItems += nextData.length;

        progressCallback?.(pageCount, totalItems);
        currentResponse = nextResponse;
      }

      return allData;
    },
  };

  // Initialize tracking for the first page
  const currentPageData = dataExtractor(responseData);
  paginationMethods.__totalItemsFetched = currentPageData.length;

  return Object.assign(responseData as any, paginationMethods) as TResponse &
    PaginatedResponseMethods<TRequest, TResponse, TData>;
}

/**
 * Common data extractors for typical API responses
 */
export const ResponseExtractors = {
  activities: <T>(response: { activities?: T[] }): T[] =>
    response.activities || [],
  addresses: <T>(response: { addresses?: T[] }): T[] =>
    response.addresses || [],
  allocations: <T>(response: { allocations?: T[] }): T[] =>
    response.allocations || [],
  balances: <T>(response: { balances?: T[] }): T[] => response.balances || [],
  fills: <T>(response: { fills?: T[] }): T[] => response.fills || [],
  invoices: <T>(response: { invoices?: T[] }): T[] => response.invoices || [],
  orders: <T>(response: { orders?: T[] }): T[] => response.orders || [],
  positions: <T>(response: { positions?: T[] }): T[] =>
    response.positions || [],
  products: <T>(response: { products?: T[] }): T[] => response.products || [],
  portfolios: <T>(response: { portfolios?: T[] }): T[] =>
    response.portfolios || [],
  transactions: <T>(response: { transactions?: T[] }): T[] =>
    response.transactions || [],
  users: <T>(response: { users?: T[] }): T[] => response.users || [],
  wallets: <T>(response: { wallets?: T[] }): T[] => response.wallets || [],
};

/**
 * Get the default pagination options for a client
 */
export function getDefaultPaginationOptions(
  client: IPrimeApiClient,
  options: CoinbaseCallOptions | undefined
): CoinbaseCallOptions {
  return {
    ...options,
    maxPages: options?.maxPages ?? client.getMaxPages(),
    maxItems: options?.maxItems ?? client.getMaxItems(),
  };
}

export function getQueryParams(
  client: IPrimeApiClient,
  request: BasePaginatedRequest
): Record<string, string | number | string[]> {
  let queryParams: Record<string, string | number | string[]> = {};
  if (request.limit) {
    queryParams.limit = request.limit;
  }
  if (request.cursor) {
    queryParams.cursor = request.cursor;
  }
  if (request.sortDirection) {
    queryParams.sortDirection = request.sortDirection;
  }
  if (!queryParams.limit) {
    queryParams.limit = client.getDefaultPaginationLimit();
  }
  return queryParams;
}
