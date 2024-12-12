/**
 * - UNKNOWN_PAYMENT_METHOD_TYPE: nil value  - METHOD_WIRE: Wire transfer  - METHOD_SEN: Silvergate exchange network  - METHOD_SWIFT: Swift
 */
export enum PaymentMethodType {
  UnknownPaymentMethodType = 'UNKNOWN_PAYMENT_METHOD_TYPE',
  MethodWire = 'METHOD_WIRE',
  MethodSen = 'METHOD_SEN',
  MethodSwift = 'METHOD_SWIFT',
}
