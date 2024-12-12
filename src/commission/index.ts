import { CoinbaseCallOptions } from '../../../core-ts/dist';
import { CoinbasePrimeClient } from '../client';
import {
  CoinbasePrimeClientException,
  CoinbasePrimeException,
} from '../errors';
import {
  GetPortfolioCommissionRequest,
  GetPortfolioCommissionResponse,
} from '../model/services/commissionService';

export interface CommissionService {
  getPortfolioCommission(
    request: GetPortfolioCommissionRequest
  ): Promise<
    | GetPortfolioCommissionResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;
}

export class CommissionService implements CommissionService {
  private client: CoinbasePrimeClient;

  constructor(client: CoinbasePrimeClient) {
    this.client = client;
  }

  async getPortfolioCommission(
    request: GetPortfolioCommissionRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | GetPortfolioCommissionResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/commission`,
      callOptions: options,
    });

    return response.data as GetPortfolioCommissionResponse;
  }
}
