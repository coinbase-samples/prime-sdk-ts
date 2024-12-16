import { GetEntityPaymentMethodsResponse } from '../model/GetEntityPaymentMethodsResponse';
import { GetEntityPaymentMethodDetailsResponse } from '../model/GetEntityPaymentMethodDetailsResponse';

export type ListEntityPaymentMethodsRequest = {
  entityId: string;
};

export type ListEntityPaymentMethodsResponse = GetEntityPaymentMethodsResponse;

export type GetPaymentMethodRequest = {
  entityId: string;
};

export type GetPaymentMethodResponse = GetEntityPaymentMethodDetailsResponse;
