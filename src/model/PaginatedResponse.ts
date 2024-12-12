import { SortDirection } from './enums/SortDirection';

export type PaginatedResponse = {
  /**
   * Cursor to navigate to next page
   */
  nextCursor: string;
  sortDirection: SortDirection;
  /**
   * A boolean value indicating whether there are more items to paginate through
   */
  hasNext: boolean;
};
