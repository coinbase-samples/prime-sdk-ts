import { CoinbaseCallOptions } from '../../../core-ts/dist';
import { CoinbasePrimeClient } from '../client';
import {
  CoinbasePrimeClientException,
  CoinbasePrimeException,
} from '../errors';
import { ListInvoicesRequest, ListInvoicesResponse } from './types';

export interface IInvoicesService {
  listInvoicess(
    request: ListInvoicesRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    ListInvoicesResponse | CoinbasePrimeClientException | CoinbasePrimeException
  >;
}

export class InvoicesService implements IInvoicesService {
  private client: CoinbasePrimeClient;

  constructor(client: CoinbasePrimeClient) {
    this.client = client;
  }

  async listInvoicess(
    request: ListInvoicesRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    ListInvoicesResponse | CoinbasePrimeClientException | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `entities/${request.entityId}/Invoicess`,
      callOptions: options,
    });

    return response.data as ListInvoicesResponse;
  }
}
