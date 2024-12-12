import { InvoiceType } from './enums/InvoiceType';

export type InvoiceItem = {
  description?: string;
  currencySymbol?: string;
  invoiceType?: InvoiceType;
  rate?: number;
  quantity?: number;
  price?: number;
  averageAuc?: number;
  total?: number;
};
