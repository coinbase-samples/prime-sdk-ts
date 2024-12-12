/**
 * - UNKNOWN_ORDER_STATUS: nil value  - OPEN: The order is open but unfilled  - FILLED: The order was filled  - CANCELLED: The order was cancelled  - EXPIRED: The order has expired  - FAILED: Order submission failed  - PENDING: The order has been sent but is not yet confirmed
 */
export enum OrderStatus {
  UnknownOrderStatus = 'UNKNOWN_ORDER_STATUS',
  Open = 'OPEN',
  Filled = 'FILLED',
  Cancelled = 'CANCELLED',
  Expired = 'EXPIRED',
  Failed = 'FAILED',
  Pending = 'PENDING',
}
