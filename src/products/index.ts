import { CoinbaseCallOptions } from '../../../core-ts/dist';
import { CoinbasePrimeClient } from '../client';
import {
  CoinbasePrimeClientException,
  CoinbasePrimeException,
} from '../errors';
import { ListProductsRequest, ListProductsResponse } from './types';

export interface ProductsService {
  listProducts(
    request: ListProductsRequest
  ): Promise<
    ListProductsResponse | CoinbasePrimeClientException | CoinbasePrimeException
  >;
}

export class ProductsService implements ProductsService {
  private client: CoinbasePrimeClient;

  constructor(client: CoinbasePrimeClient) {
    this.client = client;
  }

  async listProducts(
    request: ListProductsRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    ListProductsResponse | CoinbasePrimeClientException | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/products`,
      callOptions: options,
    });

    return response.data as ListProductsResponse;
  }
}
