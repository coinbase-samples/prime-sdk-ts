/**
 * Copyright 2025-present Coinbase Global, Inc.
 *
 * This file is generated by Openapi Generator https://github.com/openapitools/openapi-generator
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *  Do not edit the class manually.
 */

import { OrderSide } from './enums/OrderSide';
import { OrderStatus } from './enums/OrderStatus';
import { OrderType } from './enums/OrderType';
import { TimeInForceType } from './enums/TimeInForceType';

export type Order = {
  /**
   * The unique order ID generated by Coinbase
   */
  id?: string;
  /**
   * The ID of the user that created the order
   */
  userId?: string;
  /**
   * The ID of the portfolio that owns the order
   */
  portfolioId?: string;
  /**
   * The ID of the product being traded by the order
   */
  productId?: string;
  side?: OrderSide;
  /**
   * A client-generated order ID used for reference purposes (note: order will be rejected if this ID is not unique among all currently active orders)
   */
  clientOrderId?: string;
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
   * The limit price (required for TWAP, VWAP, LIMIT and STOP_LIMIT orders)
   */
  limitPrice?: string;
  /**
   * The start time of the order in UTC (only applies to TWAP, VWAP orders.)
   */
  startTime?: Date;
  /**
   * The expiry time of the order in UTC (applies to TWAP, VWAP, LIMIT, and STOP_LIMIT orders with `time_in_force` set to `GTD`)
   */
  expiryTime?: Date;
  status?: OrderStatus;
  timeInForce?: TimeInForceType;
  /**
   * The order creation time as a UTC timestamp
   */
  createdAt?: Date;
  /**
   * Size filled (in base asset units)
   */
  filledQuantity?: string;
  /**
   * Market value filled (in quote asset units)
   */
  filledValue?: string;
  /**
   * Indicates the average `filled_price`
   */
  averageFilledPrice?: string;
  /**
   * Total commission paid on this order (in quote asset units) -- only applicable for partially- or fully-filled orders
   */
  commission?: string;
  /**
   * Fee charged by the exchange for Cost Plus commission configurations. Exchange fee will be 0 for All In commission configurations.
   */
  exchangeFee?: string;
  /**
   * historical pov for the order
   */
  historicalPov?: string;
  /**
   * Specifies the stop price at which the order activates. The order is activated if the last trade price on Coinbase Exchange crosses the stop price specified on the order
   */
  stopPrice?: string;
  /**
   * Indicates the average `filled_price` net of commissions and fees
   */
  netAverageFilledPrice?: string;
  /**
   * Indicates a user friendly message for regarding various aspects of the order such as cancellation or rejection reasons
   */
  userContext?: string;
};
