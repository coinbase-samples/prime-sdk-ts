import { CoinbaseCallOptions, Method } from '../../../core-ts/dist';
import { CoinbasePrimeClient } from '../client';
import {
  CoinbasePrimeClientException,
  CoinbasePrimeException,
} from '../errors';
import {
  ListOpenOrdersResponse,
  ListOpenOrdersRequest,
  ListOrderFillsRequest,
  ListOrderFillsResponse,
  ListPortfolioOrdersResponse,
  ListPortfolioOrdersRequest,
  GetOrderResponse,
  GetOrderRequest,
  ListPortfolioFillsRequest,
  ListPortfolioFillsResponse,
  CreateOrderPreviewRequest,
  CreateOrderPreviewResponse,
  CancelOrderRequest,
  CancelOrderResponse,
  CreateOrderRequest,
  CreateOrderResponse,
} from './types';

export interface OrdersService {
  getOrder(
    request: GetOrderRequest
  ): Promise<
    GetOrderResponse | CoinbasePrimeClientException | CoinbasePrimeException
  >;

  listPortfolioFills(
    request: ListPortfolioFillsRequest
  ): Promise<
    | ListPortfolioFillsResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;

  listPortfolioOrders(
    request: ListPortfolioOrdersRequest
  ): Promise<
    | ListPortfolioOrdersResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;

  listOrderFills(
    request: ListOrderFillsRequest
  ): Promise<
    | ListOrderFillsResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;

  listOpenOrders(
    request: ListOpenOrdersRequest
  ): Promise<
    | ListOpenOrdersResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;

  createOrderPreview(
    request: CreateOrderPreviewRequest
  ): Promise<
    | CreateOrderPreviewResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;

  cancelOrder(
    request: CancelOrderRequest
  ): Promise<
    CancelOrderResponse | CoinbasePrimeClientException | CoinbasePrimeException
  >;

  createOrder(
    request: CreateOrderRequest
  ): Promise<
    CreateOrderResponse | CoinbasePrimeClientException | CoinbasePrimeException
  >;
}

export class OrdersService implements OrdersService {
  private client: CoinbasePrimeClient;

  constructor(client: CoinbasePrimeClient) {
    this.client = client;
  }

  async getOrder(
    request: GetOrderRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    GetOrderResponse | CoinbasePrimeClientException | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/orders/${request.orderId}`,
      callOptions: options,
    });

    return response.data as GetOrderResponse;
  }

  async listPortfolioFills(
    request: ListPortfolioFillsRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListPortfolioFillsResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const queryParams = { ...request, portfolioId: undefined };
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/fills`,
      queryParams,
      callOptions: options,
    });

    return response.data as ListPortfolioFillsResponse;
  }

  async listPortfolioOrders(
    request: ListPortfolioOrdersRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListPortfolioOrdersResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const queryParams = { ...request, portfolioId: undefined };
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/orders`,
      queryParams,
      callOptions: options,
    });
    return response.data as ListPortfolioOrdersResponse;
  }

  async listOrderFills(
    request: ListOrderFillsRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListOrderFillsResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const queryParams = {
      ...request,
      portfolioId: undefined,
      orderId: undefined,
    };
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/orders/${request.orderId}/fills`,
      queryParams,
      callOptions: options,
    });
    return response.data as ListOrderFillsResponse;
  }

  async listOpenOrders(
    request: ListOpenOrdersRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListOpenOrdersResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const queryParams = { ...request, portfolioId: undefined };
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/open_orders`,
      queryParams,
      callOptions: options,
    });
    return response.data as ListOpenOrdersResponse;
  }

  async createOrderPreview(
    request: CreateOrderPreviewRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | CreateOrderPreviewResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const bodyParams = { ...request, portfolioId: undefined };
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/orders_preview`,
      method: Method.POST,
      bodyParams,
      callOptions: options,
    });
    return response.data as CreateOrderPreviewResponse;
  }

  async cancelOrder(
    request: CancelOrderRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    CancelOrderResponse | CoinbasePrimeClientException | CoinbasePrimeException
  > {
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/orders/${request.orderId}/cancel`,
      method: Method.POST,
      callOptions: options,
    });
    return response.data as CancelOrderResponse;
  }

  async createOrder(
    request: CreateOrderRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    CreateOrderResponse | CoinbasePrimeClientException | CoinbasePrimeException
  > {
    const bodyParams = { ...request, portfolioId: undefined };
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/orders`,
      method: Method.POST,
      bodyParams,
      callOptions: options,
    });
    return response.data as CreateOrderResponse;
  }
}
