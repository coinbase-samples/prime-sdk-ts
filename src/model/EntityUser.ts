import { UserRole } from './enums/UserRole';

export type EntityUser = {
  /**
   * The unique ID of the user
   */
  id?: string;
  /**
   * The name of the user
   */
  name?: string;
  /**
   * The email of the user
   */
  email?: string;
  /**
   * The entity to which this user and associated permissions are identified
   */
  entityId?: string;
  role?: UserRole;
};
