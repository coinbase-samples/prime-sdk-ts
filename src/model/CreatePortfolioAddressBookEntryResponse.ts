import { ActivityType } from './enums/ActivityType';

export type CreatePortfolioAddressBookEntryResponse = {
  activityType: ActivityType;
  numApprovalsRemaining: number;
  activityId: string;
};
