import { OrderSide } from './enums/OrderSide';
import { OrderType } from './enums/OrderType';
import { TimeInForceType } from './enums/TimeInForceType';

export type PostOrderPreviewResponse = {
  /**
   * The ID of the portfolio that owns the order
   */
  portfolioId?: string;
  /**
   * The ID of the product being traded by the order
   */
  productId?: string;
  side?: OrderSide;
  type?: OrderType;
  /**
   * Order size in base asset units (either `base_quantity` or `quote_value` is required)
   */
  baseQuantity?: string;
  /**
   * Order size in quote asset units, i.e. the amount the user wants to spend (when buying) or receive (when selling); the quantity in base units will be determined based on the market liquidity and indicated `quote_value`. Either `base_quantity` or `quote_value` is required
   */
  quoteValue?: string;
  /**
   * The limit price (required for TWAP, VWAP, LIMIT, and STOP_LIMIT orders)
   */
  limitPrice?: string;
  /**
   * The start time of the order in UTC (only applies to TWAP orders.)
   */
  startTime?: Date;
  /**
   * The expiry time of the order in UTC (TWAP, VWAP, LIMIT and STOP_LIMIT GTD only). Required for TWAP and VWAP orders if historical_pov is unspecified
   */
  expiryTime?: Date;
  timeInForce?: TimeInForceType;
  /**
   * Indicate the total commission paid on this order in quote currency - only applicable if the order has any fills
   */
  commission?: string;
  /**
   * How much slippage is expected
   */
  slippage?: string;
  /**
   * Current best bid for order book
   */
  bestBid?: string;
  /**
   * Current best ask for order book
   */
  bestAsk?: string;
  /**
   * Indicate expected average filled price based on the current order book
   */
  averageFilledPrice?: string;
  /**
   * Order quantity + fees
   */
  orderTotal?: string;
  /**
   * The estimated participation rate for a TWAP/VWAP order. This field can be specified instead of expiry time, and will be used to compute the expiry time of the order based on historical participation rate.
   */
  historicalPov?: string;
};
