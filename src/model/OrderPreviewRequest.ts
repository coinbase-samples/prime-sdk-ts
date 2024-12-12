import { OrderSide } from './enums/OrderSide';
import { OrderType } from './enums/OrderType';
import { TimeInForceType } from './enums/TimeInForceType';

export type OrderPreviewRequest = {
  productId: string;
  side: OrderSide;
  type: OrderType;
  baseQuantity?: string;
  quoteValue?: string;
  limitPrice?: string;
  startTime?: Date;
  expiryTime?: Date;
  timeInForce?: TimeInForceType;
  isRaiseExact?: boolean;
  historicalPov?: string;
  stopPrice?: string;
};
