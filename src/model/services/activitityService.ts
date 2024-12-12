import { PaginatedResponse } from '../PaginatedResponse';
import { ActivityCategory } from '../enums/ActivityCategory';
import { ActivityStatus } from '../enums/ActivityStatus';
import { GetActivityResponse as internalGet } from '../GetActivityResponse';
import { GetEntityActivitiesResponse } from '../GetEntityActivitiesResponse';
import { GetPortfolioActivitiesResponse } from '../GetPortfolioActivitiesResponse';
import { GetPortfolioActivityResponse as internalGetPortAct } from '../GetPortfolioActivityResponse';

export type ActivityFilters = PaginatedResponse & {
  symbols?: string[];
  categories?: ActivityCategory[];
  statuses?: ActivityStatus[];
  startTime: string;
  endTime?: string;
};

export type GetActivityRequest = {
  activityId: string;
};

export type GetActivityResponse = internalGet;

export type ListEntityActivitiesRequest = PaginatedResponse &
  ActivityFilters & {
    entityId: string;
    activityLevel?: string;
  };

export type ListEntityActivitiesResponse = GetEntityActivitiesResponse;

export type ListPortfolioActivitiesRequest = PaginatedResponse &
  ActivityFilters & {
    portfolioId: string;
    activityId: string;
  };

export type ListPortfolioActivitiesResponse = GetPortfolioActivitiesResponse;

export type GetPortfolioActivitiesRequest = {
  portfolioId: string;
  activityId: string;
};

export type GetPortfolioActivityResponse = internalGetPortAct;
