import { ActivityCategory } from './enums/ActivityCategory';
import { ActivityMetadataAccount } from './ActivityMetadataAccount';
import { ActivityMetadataTransactions } from './ActivityMetadataTransactions';
import { ActivitySecondaryType } from './enums/ActivitySecondaryType';
import { ActivityStatus } from './enums/ActivityStatus';
import { ActivityType } from './enums/ActivityType';
import { HierarchyType } from './enums/HierarchyType';
import { UserAction } from './UserAction';

export type Activity = {
  /**
   * A unique id for the account activity
   */
  id?: string;
  /**
   * A reference for orders and transactions, n/a for other category types
   */
  referenceId?: string;
  category?: ActivityCategory;
  type?: ActivityType;
  secondaryType?: ActivitySecondaryType;
  status?: ActivityStatus;
  /**
   * Id of user who created the activity
   */
  createdBy?: string;
  /**
   * Title of the activity
   */
  title?: string;
  /**
   * Description detail of the activity
   */
  description?: string;
  /**
   * Actions related to the Activity
   */
  userActions?: Array<UserAction>;
  transactionsMetadata?: ActivityMetadataTransactions;
  accountMetadata?: ActivityMetadataAccount;
  ordersMetadata?: object;
  /**
   * List of currencies included in an activity
   */
  symbols?: Array<string>;
  /**
   * Time activity was created at
   */
  createdAt?: string;
  /**
   * Time for latest status update of account activity
   */
  updatedAt?: string;
  hierarchyType?: HierarchyType;
};
