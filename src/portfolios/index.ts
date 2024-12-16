import { CoinbaseCallOptions } from '../../../core-ts/dist';
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
} from './types';

export interface IPortfoliosService {
  getPortfolio(
    request: GetPortfolioRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    GetPortfolioResponse | CoinbasePrimeClientException | CoinbasePrimeException
  >;

  getPortfolioCredit(
    request: GetPortfolioCreditRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | GetPortfolioCreditResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;

  listPortfolios(
    options?: CoinbaseCallOptions
  ): Promise<
    | ListPortfoliosResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;
}

export class PortfoliosService implements IPortfoliosService {
  private client: CoinbasePrimeClient;

  constructor(client: CoinbasePrimeClient) {
    this.client = client;
  }

  async getPortfolio(
    request: GetPortfolioRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetPortfolioResponse> {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}`,
      callOptions: options,
    });

    return response.data as GetPortfolioResponse;
  }

  async getPortfolioCredit(
    request: GetPortfolioCreditRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetPortfolioCreditResponse> {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/credit`,
      callOptions: options,
    });

    return response.data as GetPortfolioCreditResponse;
  }

  async listPortfolios(
    options?: CoinbaseCallOptions
  ): Promise<ListPortfoliosResponse> {
    const response = await this.client.request({
      url: `portfolios`,
      callOptions: options,
    });

    return response.data as ListPortfoliosResponse;
  }
}
