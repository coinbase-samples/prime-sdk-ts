import { TransferLocationType } from './enums/TransferLocationType';

export type TransferLocation = {
  type?: TransferLocationType;
  /**
   * The value of the transfer location: payment method ID, wallet ID or crypto address
   */
  value?: string;
};
