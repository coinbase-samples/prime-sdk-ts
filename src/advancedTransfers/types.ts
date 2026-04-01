/**
 * Copyright 2026-present Coinbase Global, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Brand } from '../shared/brand';
import { AdvancedTransferState, AdvancedTransferType } from '../model/enums';
import {
  AdvancedTransfer,
  ListAdvancedTransfersResponse as internalListAdvancedTransfersResponse,
  CreateAdvancedTransferResponse as internalCreateAdvancedTransferResponse,
  CancelAdvancedTransferResponse as internalCancelAdvancedTransferResponse,
  ListAdvancedTransferTransactionsResponse as internalListAdvancedTransferTransactionsResponse,
} from '../model';
import { Pagination } from '../shared/pagination';
import {
  PaginatedResponseMethods,
  BasePaginatedRequest,
} from '../shared/paginatedResponse';

export type ListAdvancedTransfersRequest = Pagination & {
  portfolioId: string;
  state?: AdvancedTransferState;
  type?: AdvancedTransferType;
  startTime?: string;
  endTime?: string;
  referenceId?: string;
};

type BaseListAdvancedTransfersResponse = Brand<
  internalListAdvancedTransfersResponse,
  'ListAdvancedTransfersResponse'
>;

export type ListAdvancedTransfersResponse =
  BaseListAdvancedTransfersResponse &
    PaginatedResponseMethods<
      ListAdvancedTransfersRequest & BasePaginatedRequest,
      BaseListAdvancedTransfersResponse,
      AdvancedTransfer
    >;

export type CreateAdvancedTransferRequest = {
  portfolioId: string;
  advancedTransfer: AdvancedTransfer;
};

export type CreateAdvancedTransferResponse = Brand<
  internalCreateAdvancedTransferResponse,
  'CreateAdvancedTransferResponse'
>;

export type CancelAdvancedTransferRequest = {
  portfolioId: string;
  advancedTransferId: string;
};

export type CancelAdvancedTransferResponse = Brand<
  internalCancelAdvancedTransferResponse,
  'CancelAdvancedTransferResponse'
>;

export type ListAdvancedTransferTransactionsRequest = {
  portfolioId: string;
  advancedTransferId: string;
};

export type ListAdvancedTransferTransactionsResponse = Brand<
  internalListAdvancedTransferTransactionsResponse,
  'ListAdvancedTransferTransactionsResponse'
>;
