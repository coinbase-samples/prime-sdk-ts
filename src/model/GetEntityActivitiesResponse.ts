import { Activity } from './Activity';
import { PaginatedResponse } from './PaginatedResponse';

export type GetEntityActivitiesResponse = {
  activities: Array<Activity>;
  pagination: PaginatedResponse;
};
