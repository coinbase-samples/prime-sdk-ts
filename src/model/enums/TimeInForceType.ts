/**
 * - UNKNOWN_TIME_IN_FORCE: nil value  - GOOD_UNTIL_DATE_TIME: Expires at a certain date/time  - GOOD_UNTIL_CANCELLED: Order stays on the books until cancelled  - IMMEDIATE_OR_CANCEL: Order is executed immediately at submission or is cancelled  - FILL_OR_KILL: Order is executed immediately and fully at submission or is cancelled
 */
export enum TimeInForceType {
  UnknownTimeInForce = 'UNKNOWN_TIME_IN_FORCE',
  GoodUntilDateTime = 'GOOD_UNTIL_DATE_TIME',
  GoodUntilCancelled = 'GOOD_UNTIL_CANCELLED',
  ImmediateOrCancel = 'IMMEDIATE_OR_CANCEL',
  FillOrKill = 'FILL_OR_KILL',
}
