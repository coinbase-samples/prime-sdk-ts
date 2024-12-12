import { EntityUser } from './EntityUser';
import { PaginatedResponse } from './PaginatedResponse';

export type GetEntityUsersResponse = {
  /**
   * The entity users.
   */
  users?: Array<EntityUser>;
  pagination?: PaginatedResponse;
};
