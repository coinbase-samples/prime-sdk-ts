import { GetPortfolioAddressBookResponse } from '../GetPortfolioAddressBookResponse';
import { CreatePortfolioAddressBookEntryRequest } from '../CreatePortfolioAddressBookEntryRequest';
import { CreatePortfolioAddressBookEntryResponse } from '../CreatePortfolioAddressBookEntryResponse';
import { PaginatedResponse } from '../PaginatedResponse';

export type ListAddressBooksRequest = PaginatedResponse & {
  portfolioId: string;
  currencySymbol?: string;
  search?: string;
};

export type ListAddressBooksResponse = GetPortfolioAddressBookResponse;

export type CreateAddressBookRequest =
  CreatePortfolioAddressBookEntryRequest & {
    portfolioId: string;
  };

export type CreateAddressBookResponse = CreatePortfolioAddressBookEntryResponse;
