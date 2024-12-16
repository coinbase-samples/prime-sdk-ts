import { CoinbaseCallOptions, Method } from '../../../core-ts/dist';
import { CoinbasePrimeClient } from '../client';
import {
  CoinbasePrimeClientException,
  CoinbasePrimeException,
} from '../errors';
import {
  ListWalletsRequest,
  ListWalletsResponse,
  GetWalletRequest,
  GetWalletResponse,
  GetWalletDepositInstructionsRequest,
  GetWalletDepositInstructionsResponse,
  CreateWalletRequest,
  CreateWalletResponse,
} from './types';

export interface IWalletsService {
  listWallets(
    request: ListWalletsRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    ListWalletsResponse | CoinbasePrimeClientException | CoinbasePrimeException
  >;

  getWallet(
    request: GetWalletRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    GetWalletResponse | CoinbasePrimeClientException | CoinbasePrimeException
  >;

  getWalletDepositInstructions(
    request: GetWalletDepositInstructionsRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | GetWalletDepositInstructionsResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;

  createWallet(
    request: CreateWalletRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    CreateWalletResponse | CoinbasePrimeClientException | CoinbasePrimeException
  >;
}

export class WalletsService implements IWalletsService {
  private client: CoinbasePrimeClient;

  constructor(client: CoinbasePrimeClient) {
    this.client = client;
  }

  async listWallets(
    request: ListWalletsRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    ListWalletsResponse | CoinbasePrimeClientException | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/wallets`,
      callOptions: options,
    });

    return response.data as ListWalletsResponse;
  }

  async getWallet(
    request: GetWalletRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    GetWalletResponse | CoinbasePrimeClientException | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/wallets/${request.walletId}`,
      callOptions: options,
    });

    return response.data as GetWalletResponse;
  }

  async getWalletDepositInstructions(
    request: GetWalletDepositInstructionsRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | GetWalletDepositInstructionsResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/wallets/${request.walletId}/deposit_instructions`,
      callOptions: options,
    });

    return response.data as GetWalletDepositInstructionsResponse;
  }

  async createWallet(
    request: CreateWalletRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    CreateWalletResponse | CoinbasePrimeClientException | CoinbasePrimeException
  > {
    const bodyParams = { ...request, portfolioId: undefined };
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/wallets`,
      bodyParams,
      method: Method.POST,
      callOptions: options,
    });

    return response.data as CreateWalletResponse;
  }
}
