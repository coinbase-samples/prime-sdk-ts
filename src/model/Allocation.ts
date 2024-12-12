import { AllocationStatus } from './enums/AllocationStatus';
import { DestinationAlloc } from './DestinationAlloc';
import { OrderSide } from './enums/OrderSide';

export type Allocation = {
  /**
   * The ID that ties together an allocation and all of its legs.
   */
  rootId?: string;
  /**
   * The ID of the allocation if this allocation is a reversal. In this case, the root_id would be the original allocation ID.
   */
  reversalId?: string;
  /**
   * Time the final leg of the root allocation was completed.
   */
  allocationCompletedAt?: Date;
  /**
   * The ID of the user that created the allocation.
   */
  userId?: string;
  /**
   * The ID of the product of the orders allocated.
   */
  productId?: string;
  side?: OrderSide;
  /**
   * Price the allocation was done at.
   */
  avgPrice?: string;
  /**
   * Amount allocated in base asset units.
   */
  baseQuantity?: string;
  /**
   * Amount allocated in quote asset units.
   */
  quoteValue?: string;
  /**
   * Fees from original trade execution allocated in quote asset units.
   */
  feesAllocated?: string;
  status?: AllocationStatus;
  /**
   * Portfolio ID of the source portfolio.
   */
  source?: string;
  /**
   * All order IDs that were aggregated to calculate the avg_price, quantity to allocate in each leg. Each order_id should tie back to the single allocation root_id.
   */
  orderIds?: Array<string>;
  /**
   * Array of objects, each containing the leg ID, destination portfolio ID and amount in chosen units allocated to each portfolio: [{leg_id, portfolio_id, allocation_base, allocation_quote}, {leg_id, portfolio_id, allocation_base, allocation_quote}...]
   */
  destinations?: Array<DestinationAlloc>;
  /**
   * The netting ID of the allocation, not empty if the allocation was submitted as part of a net allocation
   */
  nettingId?: string;
};
