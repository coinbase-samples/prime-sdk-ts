import { OrderSide } from '../enums/OrderSide';
import { OrderStatus } from '../enums/OrderStatus';
import { OrderType } from '../enums/OrderType';
import { GetOpenOrdersResponse } from '../GetOpenOrdersResponse';
import { GetOrderFillsResponse } from '../GetOrderFillsResponse';
import { GetOrderResponse as internalGet } from '../GetOrderResponse';
import { GetOrdersResponse } from '../GetOrdersResponse';
import { GetPortfolioFillsResponse } from '../GetPortfolioFillsResponse';
import { OrderPreviewRequest } from '../OrderPreviewRequest';
import { PostOrderPreviewResponse } from '../PostOrderPreviewResponse';
import { CancelOrderResponse as internalCancel } from '../CancelOrderResponse';
import { CreateOrderResponse as internalCreateResp } from '../CreateOrderResponse';
import { CreateOrderRequest as internalCreate } from '../CreateOrderRequest';
import { Pagination } from './pagination';

export type GetOrderRequest = {
  portfolioId: string;
  orderId: string;
};

export type GetOrderResponse = internalGet;

export type ListPortfolioFillsRequest = Pagination & {
  portfolioId: string;
  startDate?: string;
  endDate?: string;
};

export type ListPortfolioFillsResponse = GetPortfolioFillsResponse;

export type ListPortfolioOrdersRequest = Pagination & {
  portfolioId: string;
  orderStatuses: OrderStatus[];
  productIds: string[];
  orderTypes: OrderType;
  orderSider: OrderSide;
  startDate?: string;
  endDate?: string;
};

export type ListPortfolioOrdersResponse = GetOrdersResponse;

export type ListOrderFillsRequest = Pagination & {
  portfolioId: string;
  orderId: string;
};

export type ListOrderFillsResponse = GetOrderFillsResponse;

export type ListOpenOrdersRequest = Pagination & {
  portfolioId: string;
  productIds?: string[];
  orderType?: OrderType;
  orderSide?: OrderSide;
  startDate?: string;
  endDate: string;
};

export type ListOpenOrdersResponse = GetOpenOrdersResponse;

export type CreateOrderPreviewRequest = OrderPreviewRequest & {
  portfolioId: string;
};

export type CreateOrderPreviewResponse = PostOrderPreviewResponse;

export type CancelOrderRequest = {
  portfolioId: string;
  orderId: string;
};

export type CancelOrderResponse = internalCancel;

export type CreateOrderRequest = internalCreate & {
  portfolioId: string;
};
export type CreateOrderResponse = internalCreateResp;
