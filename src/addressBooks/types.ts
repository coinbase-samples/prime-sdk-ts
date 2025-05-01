/**
 * Copyright 2024-present Coinbase Global, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Brand } from 'src/shared/brand';
import {
  GetPortfolioAddressBookResponse,
  CreatePortfolioAddressBookEntryRequest,
  CreatePortfolioAddressBookEntryResponse,
} from '../model/';
import { Pagination } from '../shared/pagination';

export type ListAddressBooksRequest = Pagination & {
  portfolioId: string;
  currencySymbol?: string;
  search?: string;
};

export type ListAddressBooksResponse = Brand<
  GetPortfolioAddressBookResponse,
  'ListAddressBooksResponse'
>;

export type CreateAddressBookRequest =
  CreatePortfolioAddressBookEntryRequest & {
    portfolioId: string;
  };

export type CreateAddressBookResponse = Brand<
  CreatePortfolioAddressBookEntryResponse,
  'CreateAddressBookResponse'
>;
