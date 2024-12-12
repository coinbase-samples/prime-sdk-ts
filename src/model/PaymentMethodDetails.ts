import { PaymentMethodType } from './enums/PaymentMethodType';

export type PaymentMethodDetails = {
  id?: string;
  symbol?: string;
  paymentMethodType?: PaymentMethodType;
  name?: string;
  accountNumber?: string;
  bankCode?: string;
};
