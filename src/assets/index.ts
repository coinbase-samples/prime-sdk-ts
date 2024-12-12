import { CoinbaseCallOptions } from '../../../core-ts/dist';
import { CoinbasePrimeClient } from '../client';
import {
  CoinbasePrimeClientException,
  CoinbasePrimeException,
} from '../errors';
import {
  ListAssetsRequest,
  ListAssetsResponse,
} from '../model/services/assetService';

export interface AssetsService {
  listAssets(
    request: ListAssetsRequest
  ): Promise<
    ListAssetsResponse | CoinbasePrimeClientException | CoinbasePrimeException
  >;
}

export class AssetsService implements AssetsService {
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
