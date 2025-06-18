/**
 * Copyright 2024-present Coinbase Global, Inc.
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
import { WalletType, WalletDepositInstructionType } from '../model/enums/';
import {
  GetWalletsResponse,
  GetWalletResponse as internalGet,
  GetWalletAddressesResponse as internalGetAddresses,
  GetWalletDepositInstructionsResponse as internalGetInstructs,
  CreateWalletRequest as internalCreate,
  CreateWalletResponse as internalCreateResp,
  BlockchainAddress,
} from '../model/';
import { Pagination } from '../shared/pagination';
import {
  BasePaginatedRequest,
  PaginatedResponseMethods,
} from '../shared/paginatedResponse';

export type ListWalletsRequest = Pagination & {
  portfolioId: string;
  type: WalletType;
  symbols?: string[];
};

export type BaseListWalletsResponse = Brand<
  GetWalletsResponse,
  'ListWalletsResponse'
>;

export type ListWalletsResponse = BaseListWalletsResponse &
  PaginatedResponseMethods<
    ListWalletsRequest & BasePaginatedRequest,
    BaseListWalletsResponse,
    any // Wallet type
  >;

export type GetWalletRequest = {
  portfolioId: string;
  walletId: string;
};

export type GetWalletResponse = Brand<internalGet, 'GetWalletResponse'>;

export type GetWalletDepositInstructionsRequest = {
  portfolioId: string;
  walletId: string;
  depositType: WalletDepositInstructionType;
  networkId?: string;
  networkType?: string;
};

export type GetWalletDepositInstructionsResponse = Brand<
  internalGetInstructs,
  'GetWalletDepositInstructionsResponse'
>;

export type ListWalletAddressesRequest = {
  portfolioId: string;
  walletId: string;
  networkId?: string;
  networkType?: string;
  cursor?: string;
  limit?: number;
};

export type BaseListWalletAddressesResponse = Brand<
  internalGetAddresses,
  'ListWalletAddressesResponse'
>;

export type ListWalletAddressesResponse = BaseListWalletAddressesResponse &
  PaginatedResponseMethods<
    ListWalletAddressesRequest & BasePaginatedRequest,
    BaseListWalletAddressesResponse,
    any // Address type
  >;

export type CreateWalletRequest = internalCreate & {
  portfolioId: string;
};

export type CreateWalletResponse = Brand<
  internalCreateResp,
  'CreateWalletResponse'
>;

export type CreateWalletDepositAddressRequest = {
  portfolioId: string;
  walletId: string;
  networkId: string;
};

export type CreateWalletDepositAddressResponse = Brand<
  BlockchainAddress,
  'CreateWalletDepositAddressResponse'
>;
