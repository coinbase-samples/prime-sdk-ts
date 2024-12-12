export type CreateAllocationResponseBody = {
  /**
   * The success boolean for the post allocation
   */
  success: boolean;
  /**
   * The allocation id for the post allocation
   */
  allocationId: string;
  /**
   * The failure reason for the post allocation
   */
  failureReason: string;
};
