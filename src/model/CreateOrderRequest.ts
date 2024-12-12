import { OrderSide } from './enums/OrderSide';
import { OrderType } from './enums/OrderType';
import { TimeInForceType } from './enums/TimeInForceType';

export type CreateOrderRequest = {
  productId: string;
  side: OrderSide;
  clientOrderId: string;
  type: OrderType;
  baseQuantity?: string;
  quoteValue?: string;
  limitPrice?: string;
  startTime?: Date;
  expiryTime?: Date;
  timeInForce?: TimeInForceType;
  stpId?: string;
  displayQuoteSize?: string;
  displayBaseSize?: string;
  isRaiseExact?: boolean;
  historicalPov?: string;
  stopPrice?: string;
};
