import { Pagination } from '../shared/pagination';
import { ActivityCategory } from '../model/enums/ActivityCategory';
import { ActivityStatus } from '../model/enums/ActivityStatus';
import { GetActivityResponse as internalGet } from '../model/GetActivityResponse';
import { GetEntityActivitiesResponse } from '../model/GetEntityActivitiesResponse';
import { GetPortfolioActivitiesResponse } from '../model/GetPortfolioActivitiesResponse';
import { GetPortfolioActivityResponse as internalGetPortAct } from '../model/GetPortfolioActivityResponse';

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
