import { ProductPermissions } from './enums/ProductPermissions';

export type Product = {
  /**
   * The product ID, written as `BASE-QUOTE`
   */
  id?: string;
  /**
   * The smallest permitted unit of denomination for the base asset (varies by product)
   */
  baseIncrement?: string;
  /**
   * The smallest permitted unit of denomination for the quote asset (varies by product)
   */
  quoteIncrement?: string;
  /**
   * The minimum size (in base asset units) for which an order can be placed
   */
  baseMinSize?: string;
  /**
   * The minimum size (in quote asset units) for which an order can be placed
   */
  quoteMinSize?: string;
  /**
   * The maximum size (in base asset units) for which an order can be placed
   */
  baseMaxSize?: string;
  /**
   * The maximum size (in quote asset units) for which an order can be placed
   */
  quoteMaxSize?: string;
  /**
   * Permissions given to the user for a product
   */
  permissions?: Array<ProductPermissions>;
  /**
   * The smallest permitted price increment for the product
   */
  priceIncrement?: string;
};
