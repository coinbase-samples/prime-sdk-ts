import { OrderSide } from '../model/enums/OrderSide';
import { OrderStatus } from '../model/enums/OrderStatus';
import { OrderType } from '../model/enums/OrderType';
import { GetOpenOrdersResponse } from '../model/GetOpenOrdersResponse';
import { GetOrderFillsResponse } from '../model/GetOrderFillsResponse';
import { GetOrderResponse as internalGet } from '../model/GetOrderResponse';
import { GetOrdersResponse } from '../model/GetOrdersResponse';
import { GetPortfolioFillsResponse } from '../model/GetPortfolioFillsResponse';
import { OrderPreviewRequest } from '../model/OrderPreviewRequest';
import { PostOrderPreviewResponse } from '../model/PostOrderPreviewResponse';
import { CancelOrderResponse as internalCancel } from '../model/CancelOrderResponse';
import { CreateOrderResponse as internalCreateResp } from '../model/CreateOrderResponse';
import { CreateOrderRequest as internalCreate } from '../model/CreateOrderRequest';
import { Pagination } from '../shared/pagination';

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
  orderStatuses?: OrderStatus[];
  productIds?: string[];
  orderTypes?: OrderType;
  orderSide?: OrderSide;
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
