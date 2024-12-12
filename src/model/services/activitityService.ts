import { Pagination } from './pagination';
import { ActivityCategory } from '../enums/ActivityCategory';
import { ActivityStatus } from '../enums/ActivityStatus';
import { GetActivityResponse as internalGet } from '../GetActivityResponse';
import { GetEntityActivitiesResponse } from '../GetEntityActivitiesResponse';
import { GetPortfolioActivitiesResponse } from '../GetPortfolioActivitiesResponse';
import { GetPortfolioActivityResponse as internalGetPortAct } from '../GetPortfolioActivityResponse';

export type ActivityFilters = Pagination & {
  symbols?: string[];
  categories?: ActivityCategory[];
  statuses?: ActivityStatus[];
  startTime?: string;
  endTime?: string;
};

export type GetActivityRequest = {
  activityId: string;
};

export type GetActivityResponse = internalGet;

export type ListEntityActivitiesRequest = Pagination &
  ActivityFilters & {
    entityId: string;
    activityLevel?: string;
  };

export type ListEntityActivitiesResponse = GetEntityActivitiesResponse;

export type ListPortfolioActivitiesRequest = Pagination &
  ActivityFilters & {
    portfolioId: string;
  };

export type ListPortfolioActivitiesResponse = GetPortfolioActivitiesResponse;

export type GetPortfolioActivitiesRequest = {
  portfolioId: string;
  activityId: string;
};

export type GetPortfolioActivityResponse = internalGetPortAct;
