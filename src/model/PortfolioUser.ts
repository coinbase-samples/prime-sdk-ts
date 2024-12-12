import { UserRole } from './enums/UserRole';

export type PortfolioUser = {
  /**
   * The unique ID of the user.
   */
  id?: string;
  /**
   * The name of the user.
   */
  name?: string;
  /**
   * The email of the user.
   */
  email?: string;
  /**
   * The portfolio to which this user and associated permissions are identified.
   */
  portfolioId?: string;
  /**
   * The entity to which this user and associated permissions are identified.
   */
  entityId?: string;
  role?: UserRole;
};
