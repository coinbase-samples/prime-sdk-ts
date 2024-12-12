import { PaginatedResponse } from './PaginatedResponse';
import { PortfolioUser } from './PortfolioUser';

export type GetPortfolioUsersResponse = {
  /**
   * The portfolio users.
   */
  users?: Array<PortfolioUser>;
  pagination?: PaginatedResponse;
};
