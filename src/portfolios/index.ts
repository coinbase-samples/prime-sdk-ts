import { CoinbasePrimeClient } from '../client';
import {
  CoinbasePrimeClientException,
  CoinbasePrimeException,
} from '../errors';
import {
  GetPortfolioRequest,
  GetPortfolioResponse,
  GetPortfolioCreditRequest,
  GetPortfolioCreditResponse,
  ListPortfoliosResponse,
} from '../model/services/portfolioService';

export interface PortfoliosService {
  getPortfolio(
    request: GetPortfolioRequest
  ): Promise<
    GetPortfolioResponse | CoinbasePrimeClientException | CoinbasePrimeException
  >;

  getPortfolioCredit(
    request: GetPortfolioCreditRequest
  ): Promise<
    | GetPortfolioCreditResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;

  listPortfolios(): Promise<
    | ListPortfoliosResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;
}

export class PortfoliosService implements PortfoliosService {
  private client: CoinbasePrimeClient;

  constructor(client: CoinbasePrimeClient) {
    this.client = client;
  }

  async getPortfolio(
    request: GetPortfolioRequest
  ): Promise<GetPortfolioResponse> {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}`,
    });

    return response.data as GetPortfolioResponse;
  }

  async getPortfolioCredit(
    request: GetPortfolioCreditRequest
  ): Promise<GetPortfolioCreditResponse> {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/credit`,
    });

    return response.data as GetPortfolioCreditResponse;
  }

  async listPortfolios(): Promise<ListPortfoliosResponse> {
    const response = await this.client.request({
      url: `portfolios`,
    });

    return response.data as ListPortfoliosResponse;
  }
}
