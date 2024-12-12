export type Portfolio = {
  /**
   * The unique ID of the portfolio
   */
  id?: string;
  /**
   * The name of the portfolio
   */
  name?: string;
  /**
   * The ID of the entity to which the portfolio is associated
   */
  entityId?: string;
  /**
   * The ID of the organization to which the portfolio is associated
   */
  organizationId?: string;
  /**
   * The name of the entity to which the portfolio is associated
   */
  entityName?: string;
};
