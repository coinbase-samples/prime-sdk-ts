import { CoinbaseCallOptions } from '@coinbase-sample/core-ts';
import { DEFAULT_MAX_ITEMS, DEFAULT_MAX_PAGES } from '../constants';

/**
 * Base type for paginated requests
 */
export type BasePaginatedRequest = {
  cursor?: string;
  limit?: number;
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
        this.__config.maxPages = options.maxPages;
      }
      if (options?.maxItems) {
        this.__config.maxItems = options.maxItems;
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
        this.__config.maxPages = options.maxPages;
      }
      if (options?.maxItems) {
        this.__config.maxItems = options.maxItems;
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
  balances: <T>(response: { balances?: T[] }): T[] => response.balances || [],
  positions: <T>(response: { positions?: T[] }): T[] =>
    response.positions || [],
  transactions: <T>(response: { transactions?: T[] }): T[] =>
    response.transactions || [],
  orders: <T>(response: { orders?: T[] }): T[] => response.orders || [],
  fills: <T>(response: { fills?: T[] }): T[] => response.fills || [],
  wallets: <T>(response: { wallets?: T[] }): T[] => response.wallets || [],
  activities: <T>(response: { activities?: T[] }): T[] =>
    response.activities || [],
  users: <T>(response: { users?: T[] }): T[] => response.users || [],
  allocations: <T>(response: { allocations?: T[] }): T[] =>
    response.allocations || [],
  products: <T>(response: { products?: T[] }): T[] => response.products || [],
};
