import { PaymentMethodType } from './enums/PaymentMethodType';

export type PaymentMethodSummary = {
  id?: string;
  symbol?: string;
  paymentMethodType?: PaymentMethodType;
  bankName?: string;
  accountNumber?: string;
  bankName2?: string;
};
