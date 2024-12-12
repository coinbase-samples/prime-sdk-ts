import { Action } from './enums/Action';

export type UserAction = {
  action?: Action;
  /**
   * Id of the user who executed the action
   */
  userId?: string;
  /**
   * Time the action was taken
   */
  timestamp?: string;
};
