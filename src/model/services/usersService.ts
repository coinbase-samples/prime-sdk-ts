import { GetEntityUsersResponse } from '../GetEntityUsersResponse';

export type ListUsersRequest = {
  entityId: string;
};

export type ListUsersResponse = GetEntityUsersResponse;

export type ListPortfolioUsersRequest = {
  portfolioId: string;
};

export type ListPortfolioUsersResponse = GetEntityUsersResponse;
