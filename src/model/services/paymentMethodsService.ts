import { GetEntityPaymentMethodsResponse } from '../GetEntityPaymentMethodsResponse';
import { GetEntityPaymentMethodDetailsResponse } from '../GetEntityPaymentMethodDetailsResponse';

export type ListEntityPaymentMethodsRequest = {
  entityId: string;
};

export type ListEntityPaymentMethodsResponse = GetEntityPaymentMethodsResponse;

export type GetPaymentMethodRequest = {
  entityId: string;
};

export type GetPaymentMethodResponse = GetEntityPaymentMethodDetailsResponse;
