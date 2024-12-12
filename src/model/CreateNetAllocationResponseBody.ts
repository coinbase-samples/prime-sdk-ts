export type CreateNetAllocationResponseBody = {
  /**
   * The success boolean for the post net allocation
   */
  success: boolean;
  /**
   * The netting_id for the post net allocation
   */
  nettingId: string;
  /**
   * The allocation id of the buy allocation in net allocation
   */
  buyAllocationId: string;
  /**
   * The allocation id of the sell allocation in net allocation
   */
  sellAllocationId: string;
  /**
   * The failure reason for the post net allocation
   */
  failureReason: string;
};
