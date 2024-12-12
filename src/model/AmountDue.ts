export type AmountDue = {
  /**
   * The currency this loan is due in
   */
  currency?: string;
  /**
   * The amount due
   */
  amount?: string;
  /**
   * The date this settlement is due, expressed in UTC
   */
  dueDate?: Date;
};
