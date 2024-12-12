/**
 * - TRANSACTION_TYPE_UNKNOWN: An unknown transaction type  - DEPOSIT: A fiat or crypto deposit  - WITHDRAWAL: A fiat or crypto withdrawal  - INTERNAL_DEPOSIT: An internal fiat or crypto deposit  - INTERNAL_WITHDRAWAL: An internal fiat or crypto withdrawal  - SWEEP_DEPOSIT: Internal automated deposit to a cold address from a restored address  - SWEEP_WITHDRAWAL: Internal automated withdrawal from a restored address to a cold address  - PROXY_DEPOSIT: On-chain deposit of funds into proxy contract from cold address  - PROXY_WITHDRAWAL: On-chain withdrawal of funds from proxy contract to cold address  - BILLING_WITHDRAWAL: Coinbase Prime automated invoice settlement payment  - REWARD: Reward payment to an associated address for a staked asset  - COINBASE_REFUND: Coinbase Prime refund for the leftover amount for a CPFP (child pays for parent) transaction  - TRANSACTION_TYPE_OTHER: An OTHER type of transaction  - WITHDRAWAL_ADJUSTMENT: A manual adjustment withdrawal transaction  - DEPOSIT_ADJUSTMENT: A manual adjustment deposit transaction  - KEY_REGISTRATION: An on-chain registration for an address  - DELEGATION: An on-chain delegation transaction  - UNDELEGATION: An on-chain undelegation transaction  - RESTAKE: On-chain restaking transaction  - COMPLETE_UNBONDING: On-chain unbonding event transaction  - WITHDRAW_UNBONDED: On-chain event indicating unbonding period is over  - STAKE_ACCOUNT_CREATE: On-chain transaction to begin staking from an address  - CHANGE_VALIDATOR: On-chain transaction alter validator  - STAKE: On-chain transaction to begin staking in Cryptocurrency network  - UNSTAKE: On-chain transaction to stop staking in Cryptocurrency network  - REMOVE_AUTHORIZED_PARTY: On-chain transaction to remove a party from a multi-signature wallet  - STAKE_AUTHORIZE_WITH_SEED: On-chain transaction to begin staking from a seed account  - SLASH: On-chain transaction indicating a slash event has occurred  - COINBASE_DEPOSIT: On-chain transaction deposit for the purpose of transaction operations  - CONVERSION: Internal conversion between two assets  - CLAIM_REWARDS: On-chain transaction to claim rewards from Vote Account  - VOTE_AUTHORIZE: On-chain transaction to transfer the reward claiming permission to other pubkey  - WEB3_TRANSACTION: On-chain transaction initiated with Prime Onchain Wallet
 */
export enum TransactionType {
  TransactionTypeUnknown = 'TRANSACTION_TYPE_UNKNOWN',
  Deposit = 'DEPOSIT',
  Withdrawal = 'WITHDRAWAL',
  InternalDeposit = 'INTERNAL_DEPOSIT',
  InternalWithdrawal = 'INTERNAL_WITHDRAWAL',
  SweepDeposit = 'SWEEP_DEPOSIT',
  SweepWithdrawal = 'SWEEP_WITHDRAWAL',
  ProxyDeposit = 'PROXY_DEPOSIT',
  ProxyWithdrawal = 'PROXY_WITHDRAWAL',
  BillingWithdrawal = 'BILLING_WITHDRAWAL',
  Reward = 'REWARD',
  CoinbaseRefund = 'COINBASE_REFUND',
  TransactionTypeOther = 'TRANSACTION_TYPE_OTHER',
  WithdrawalAdjustment = 'WITHDRAWAL_ADJUSTMENT',
  DepositAdjustment = 'DEPOSIT_ADJUSTMENT',
  KeyRegistration = 'KEY_REGISTRATION',
  Delegation = 'DELEGATION',
  Undelegation = 'UNDELEGATION',
  Restake = 'RESTAKE',
  CompleteUnbonding = 'COMPLETE_UNBONDING',
  WithdrawUnbonded = 'WITHDRAW_UNBONDED',
  StakeAccountCreate = 'STAKE_ACCOUNT_CREATE',
  ChangeValidator = 'CHANGE_VALIDATOR',
  Stake = 'STAKE',
  Unstake = 'UNSTAKE',
  RemoveAuthorizedParty = 'REMOVE_AUTHORIZED_PARTY',
  StakeAuthorizeWithSeed = 'STAKE_AUTHORIZE_WITH_SEED',
  Slash = 'SLASH',
  CoinbaseDeposit = 'COINBASE_DEPOSIT',
  Conversion = 'CONVERSION',
  ClaimRewards = 'CLAIM_REWARDS',
  VoteAuthorize = 'VOTE_AUTHORIZE',
  Web3Transaction = 'WEB3_TRANSACTION',
}
