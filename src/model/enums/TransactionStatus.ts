/**
 * - UNKNOWN_TRANSACTION_STATUS: An Unknown Transaction status  - TRANSACTION_CREATED: The Transaction has been created and is awaiting Consensus approval This is a non-terminal status  - TRANSACTION_REQUESTED: The Transaction has reached User Consensus and is awaiting Coinbase Prime approval This is a non-terminal status  - TRANSACTION_APPROVED: The Transaction has been authorized by Coinbase Prime This is a non-terminal status  - TRANSACTION_GASSING: The transaction is awaiting blockchain resources for broadcast This is a non-terminal status  - TRANSACTION_GASSED: The transaction has received blockchain resources for broadcasting This is a non-terminal status  - TRANSACTION_PROVISIONED: The transaction has been provisioned and is awaiting planning This is a non-terminal status  - TRANSACTION_PLANNED: The transaction has been constructed.  This is a non-terminal status  - TRANSACTION_PROCESSING: The transaction is currently processing and awaiting finalization This is a non-terminal status  - TRANSACTION_RESTORED: The transaction has been broadcasted to the network. This is a non-terminal status  - TRANSACTION_DONE: The transaction has confirmed on-chain and finished.  This is a terminal status  - TRANSACTION_IMPORT_PENDING: The transaction deposit has been detected and is awaiting finalization. This is a non-terminal status  - TRANSACTION_IMPORTED: The transaction deposit and reward has been detected. This is a terminal status  - TRANSACTION_CANCELLED: The transaction has been cancelled This is a terminal status  - TRANSACTION_REJECTED: The transaction was rejected before construction and broadcasting. This is a terminal status  - TRANSACTION_DELAYED: The transaction s taking longer than expected to confirm on-chain. This is a non-terminal status  - TRANSACTION_RETRIED: The transaction has been recreated and retried, this occurs when network congestion results in transfers becoming extremely delayed due to insufficient fees or network resources such as CPU, RAM, or NET This is a terminal status  - TRANSACTION_FAILED: The transaction failed on-chain (the fee was spent but the operation failed). This is a terminal status  - TRANSACTION_EXPIRED: The transaction has expired. This is a terminal status  - TRANSACTION_BROADCASTING: The transaction is currently broadcasting to the cryptocurrency network. This is a non-terminal status  - OTHER_TRANSACTION_STATUS: The transaction has reached an OTHER status. This is a non-terminal status  - TRANSACTION_CONSTRUCTED: The transaction  bctx is constructed but not yet broadcasting on chain This is a non-terminal status
 */
export enum TransactionStatus {
  UnknownTransactionStatus = 'UNKNOWN_TRANSACTION_STATUS',
  TransactionCreated = 'TRANSACTION_CREATED',
  TransactionRequested = 'TRANSACTION_REQUESTED',
  TransactionApproved = 'TRANSACTION_APPROVED',
  TransactionGassing = 'TRANSACTION_GASSING',
  TransactionGassed = 'TRANSACTION_GASSED',
  TransactionProvisioned = 'TRANSACTION_PROVISIONED',
  TransactionPlanned = 'TRANSACTION_PLANNED',
  TransactionProcessing = 'TRANSACTION_PROCESSING',
  TransactionRestored = 'TRANSACTION_RESTORED',
  TransactionDone = 'TRANSACTION_DONE',
  TransactionImportPending = 'TRANSACTION_IMPORT_PENDING',
  TransactionImported = 'TRANSACTION_IMPORTED',
  TransactionCancelled = 'TRANSACTION_CANCELLED',
  TransactionRejected = 'TRANSACTION_REJECTED',
  TransactionDelayed = 'TRANSACTION_DELAYED',
  TransactionRetried = 'TRANSACTION_RETRIED',
  TransactionFailed = 'TRANSACTION_FAILED',
  TransactionExpired = 'TRANSACTION_EXPIRED',
  TransactionBroadcasting = 'TRANSACTION_BROADCASTING',
  OtherTransactionStatus = 'OTHER_TRANSACTION_STATUS',
  TransactionConstructed = 'TRANSACTION_CONSTRUCTED',
}