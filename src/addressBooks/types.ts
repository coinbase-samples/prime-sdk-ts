import { GetPortfolioAddressBookResponse } from '../model/GetPortfolioAddressBookResponse';
import { CreatePortfolioAddressBookEntryRequest } from '../model/CreatePortfolioAddressBookEntryRequest';
import { CreatePortfolioAddressBookEntryResponse } from '../model/CreatePortfolioAddressBookEntryResponse';
import { Pagination } from '../shared/pagination';

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
