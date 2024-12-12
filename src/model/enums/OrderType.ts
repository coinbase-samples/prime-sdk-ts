/**
 * - UNKNOWN_ORDER_TYPE: nil value  - MARKET: A [market order](https://en.wikipedia.org/wiki/Order_(exchange)#Market_order)  - LIMIT: A [limit order](https://en.wikipedia.org/wiki/Order_(exchange)#Limit_order)  - TWAP: A [time-weighted average price order](https://en.wikipedia.org/wiki/Time-weighted_average_price)  - BLOCK: A [block trade](https://en.wikipedia.org/wiki/Block_trade)  - VWAP: A [volume-weighted average price order](https://en.wikipedia.org/wiki/Volume-weighted_average_price)  - STOP_LIMIT: A [conditional order combined of stop order and limit order](https://en.wikipedia.org/wiki/Order_(exchange)#Stop-limit_order)
 */
export enum OrderType {
  UnknownOrderType = 'UNKNOWN_ORDER_TYPE',
  Market = 'MARKET',
  Limit = 'LIMIT',
  Twap = 'TWAP',
  Block = 'BLOCK',
  Vwap = 'VWAP',
  StopLimit = 'STOP_LIMIT',
}
