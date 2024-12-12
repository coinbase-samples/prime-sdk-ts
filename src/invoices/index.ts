import { CoinbaseCallOptions } from '../../../core-ts/dist';
import { CoinbasePrimeClient } from '../client';
import {
  CoinbasePrimeClientException,
  CoinbasePrimeException,
} from '../errors';
import {
  ListInvoicesRequest,
  ListInvoicesResponse,
} from '../model/services/invoiceService';

export interface InvoicesService {
  listInvoicess(
    request: ListInvoicesRequest
  ): Promise<
    ListInvoicesResponse | CoinbasePrimeClientException | CoinbasePrimeException
  >;
}

export class InvoicesService implements InvoicesService {
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
