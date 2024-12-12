import { GetPortfolioAddressBookResponse } from '../GetPortfolioAddressBookResponse';
import { CreatePortfolioAddressBookEntryRequest } from '../CreatePortfolioAddressBookEntryRequest';
import { CreatePortfolioAddressBookEntryResponse } from '../CreatePortfolioAddressBookEntryResponse';
import { Pagination } from './pagination';

export type ListAddressBooksRequest = Pagination & {
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
