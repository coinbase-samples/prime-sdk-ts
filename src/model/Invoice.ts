import { InvoiceItem } from './InvoiceItem';
import { InvoiceState } from './enums/InvoiceState';

export type Invoice = {
  id?: string;
  billingMonth?: number;
  billingYear?: number;
  dueDate?: string;
  invoiceNumber?: string;
  state?: InvoiceState;
  usdAmountPaid?: number;
  usdAmountOwed?: number;
  invoiceItems?: Array<InvoiceItem>;
};
