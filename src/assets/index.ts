import { CoinbaseCallOptions } from '../../../core-ts/dist';
import { CoinbasePrimeClient } from '../client';
import {
  CoinbasePrimeClientException,
  CoinbasePrimeException,
} from '../errors';
import { ListAssetsRequest, ListAssetsResponse } from './types';

export interface IAssetsService {
  listAssets(
    request: ListAssetsRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    ListAssetsResponse | CoinbasePrimeClientException | CoinbasePrimeException
  >;
}

export class AssetsService implements IAssetsService {
  private client: CoinbasePrimeClient;

  constructor(client: CoinbasePrimeClient) {
    this.client = client;
  }

  async listAssets(
    request: ListAssetsRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    ListAssetsResponse | CoinbasePrimeClientException | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `entities/${request.entityId}/assets`,
      callOptions: options,
    });

    return response.data as ListAssetsResponse;
  }
}
