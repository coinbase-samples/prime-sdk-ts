import { CoinbaseCallOptions } from '../../../core-ts/dist';
import { CoinbasePrimeClient } from '../client';
import {
  CoinbasePrimeClientException,
  CoinbasePrimeException,
} from '../errors';
import {
  ListEntityPaymentMethodsRequest,
  ListEntityPaymentMethodsResponse,
  GetPaymentMethodRequest,
  GetPaymentMethodResponse,
} from './types';

export interface PaymentMethodsService {
  listEntityPaymentMethods(
    request: ListEntityPaymentMethodsRequest
  ): Promise<
    | ListEntityPaymentMethodsResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;
  getPaymentMethod(
    request: GetPaymentMethodRequest
  ): Promise<
    | GetPaymentMethodResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;
}

export class PaymentMethodsService implements PaymentMethodsService {
  private client: CoinbasePrimeClient;

  constructor(client: CoinbasePrimeClient) {
    this.client = client;
  }

  async listEntityPaymentMethods(
    request: ListEntityPaymentMethodsRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListEntityPaymentMethodsResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `entities/${request.entityId}/payment-methods`,
      callOptions: options,
    });

    return response.data as ListEntityPaymentMethodsResponse;
  }

  async getPaymentMethod(
    request: GetPaymentMethodRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | GetPaymentMethodResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `entities/${request.entityId}/payment-methods`,
      callOptions: options,
    });

    return response.data as GetPaymentMethodResponse;
  }
}
