import { OrderSide } from './enums/OrderSide';

export type Fill = {
  /**
   * The unique ID of the fill
   */
  id?: string;
  /**
   * The order ID of the fill
   */
  orderId?: string;
  /**
   * The product ID of the fill
   */
  productId?: string;
  side?: OrderSide;
  /**
   * Filled size (in base asset units)
   */
  filledQuantity?: string;
  /**
   * Filled value (in quote asset units)
   */
  filledValue?: string;
  /**
   * The price of the fill
   */
  price?: string;
  /**
   * The date and time of the fill
   */
  time?: Date;
  /**
   * The commission incurred for the fill
   */
  commission?: string;
  /**
   * The name of the venue
   */
  venue?: string;
};
