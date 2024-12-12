export type Balance = {
  /**
   * The display symbol for the asset
   */
  symbol?: string;
  /**
   * The total amount in whole units with full precision. Includes the `holds` amount.
   */
  amount?: string;
  /**
   * Amount that is currently held in obligation to an open order\'s position or a pending withdrawal
   */
  holds?: string;
  /**
   * Amount that is currently locked due to bonding/staking, potentially subject to an unbonding period, in whole units
   */
  bondedAmount?: string;
  /**
   * Amount that must remain in the wallet due to the protocol, in whole units
   */
  reservedAmount?: string;
  /**
   * Amount that is in the process of unbonding, in whole units
   */
  unbondingAmount?: string;
  /**
   * Unrealized amount subject to a vesting schedule, in whole units
   */
  unvestedAmount?: string;
  /**
   * Pending bonding/staking rewards that have not yet been realized, in whole units
   */
  pendingRewardsAmount?: string;
  /**
   * Previously realized bonding/staking rewards, in whole units
   */
  pastRewardsAmount?: string;
  /**
   * Amount available for bonding/staking, in whole units
   */
  bondableAmount?: string;
  /**
   * Amount available to withdraw, in whole units
   */
  withdrawableAmount?: string;
  /**
   * The total amount in fiat unit
   */
  fiatAmount?: string;
};
