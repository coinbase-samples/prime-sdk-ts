import { AssetChange } from './AssetChange';
import { EstimatedNetworkFees } from './EstimatedNetworkFees';
import { TransactionMetadata } from './TransactionMetadata';
import { TransactionStatus } from './enums/TransactionStatus';
import { TransactionType } from './enums/TransactionType';
import { TransferLocation } from './TransferLocation';

export type Transaction = {
  /**
   * The ID of the transaction
   */
  id?: string;
  /**
   * The wallet ID of the transaction
   */
  walletId?: string;
  /**
   * The portfolio ID of the transaction
   */
  portfolioId?: string;
  type?: TransactionType;
  status?: TransactionStatus;
  /**
   * The asset symbol
   */
  symbol?: string;
  /**
   * The transaction creation time (as a UTC timestamp)
   */
  createdAt?: Date;
  /**
   * The transaction completion time (as a UTC timestamp)
   */
  completedAt?: Date;
  /**
   * The transaction amount in whole units
   */
  amount?: string;
  transferFrom?: TransferLocation;
  transferTo?: TransferLocation;
  /**
   * The blockchain network fees (in whole units) required in order to broadcast the transaction
   */
  networkFees?: string;
  /**
   * The fees that the customer paid for the transaction (in whole units)
   */
  fees?: string;
  /**
   * The asset in which fees will be paid
   */
  feeSymbol?: string;
  /**
   * The cryptocurrency network transaction hashes/IDs generated upon broadcast
   */
  blockchainIds?: Array<string>;
  /**
   * The 8 character alphanumeric short form id for the transaction
   */
  transactionId?: string;
  /**
   * The destination asset symbol
   */
  destinationSymbol?: string;
  estimatedNetworkFees?: EstimatedNetworkFees;
  /**
   * The network name
   */
  network?: string;
  /**
   * The estimated asset changes (web3)
   */
  estimatedAssetChanges?: Array<AssetChange>;
  metadata?: TransactionMetadata;
  /**
   * The idempotency key associated with the transaction creation request
   */
  idempotencyKey?: string;
};
