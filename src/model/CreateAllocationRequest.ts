import { AllocationLeg } from './AllocationLeg';
import { AllocationSizeType } from './enums/AllocationSizeType';

export type CreateAllocationRequest = {
  /**
   * The ID of the allocation
   */
  allocationId?: string;
  /**
   * The source portfolio id for the allocation
   */
  sourcePortfolioId?: string;
  /**
   * The product for the allocation
   */
  productId?: string;
  /**
   * The list of order ids in the allocation
   */
  orderIds?: Array<string>;
  /**
   * The list of allocation_legs for the allocation
   */
  allocationLegs?: Array<AllocationLeg>;
  sizeType?: AllocationSizeType;
  /**
   * The portfolio where to allocate the remainder of the size
   */
  remainderDestinationPortfolio?: string;
  /**
   * The ID to identify an in-flight net allocation.
   */
  nettingId?: string;
};
