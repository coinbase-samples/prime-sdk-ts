import { VisibilityStatus } from './enums/VisibilityStatus';
import { Web3Asset } from './Web3Asset';

export type Web3Balance = {
  asset?: Web3Asset;
  /**
   * The total amount in whole units with full precision.
   */
  amount?: string;
  visibilityStatus?: VisibilityStatus;
};
