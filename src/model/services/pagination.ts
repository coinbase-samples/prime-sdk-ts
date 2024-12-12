import { SortDirection } from '../enums/SortDirection';

export type Pagination = {
  /**
   * Cursor to navigate to next page
   */
  cursor?: string;
  sortDirection?: SortDirection;
  limit?: number;
};
