import { Activity } from './Activity';
import { PaginatedResponse } from './PaginatedResponse';

export type GetPortfolioActivitiesResponse = {
  activities: Array<Activity>;
  pagination: PaginatedResponse;
};
