import { CoinbaseCallOptions, Method } from '../../../core-ts/dist';
import { CoinbasePrimeClient } from '../client';
import {
  CoinbasePrimeClientException,
  CoinbasePrimeException,
} from '../errors';
import {
  ListAddressBooksRequest,
  ListAddressBooksResponse,
  CreateAddressBookRequest,
  CreateAddressBookResponse,
} from './types';

export interface AddressBooksService {
  listAddressBooks(
    request: ListAddressBooksRequest
  ): Promise<
    | ListAddressBooksResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;

  createAddressBook(
    request: CreateAddressBookRequest
  ): Promise<
    | CreateAddressBookResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;
}

export class AddressBooksService implements AddressBooksService {
  private client: CoinbasePrimeClient;

  constructor(client: CoinbasePrimeClient) {
    this.client = client;
  }

  async listAddressBooks(
    request: ListAddressBooksRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListAddressBooksResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const queryParams = { ...request, portfolioId: undefined };
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/address_book`,
      queryParams,
      callOptions: options,
    });

    return response.data as ListAddressBooksResponse;
  }

  async createAddressBook(
    request: CreateAddressBookRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | CreateAddressBookResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const bodyParams = { ...request, portfolioId: undefined };
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/address_book`,
      bodyParams,
      method: Method.POST,
      callOptions: options,
    });

    return response.data as CreateAddressBookResponse;
  }
}
