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
import { WalletType } from '../model/enums/WalletType';
import { Pagination } from '../shared/pagination';
import { GetWalletsResponse } from '../model/GetWalletsResponse';
import { GetWalletResponse as internalGet } from '../model/GetWalletResponse';
import { GetWalletAddressesResponse as internalGetAddresses } from '../model/GetWalletAddressesResponse';
import { GetWalletDepositInstructionsResponse as internalGetInstructs } from '../model/GetWalletDepositInstructionsResponse';
import { CreateWalletRequest as internalCreate } from '../model/CreateWalletRequest';
import { CreateWalletResponse as internalCreateResp } from '../model/CreateWalletResponse';
import { BlockchainAddress } from '../model/BlockchainAddress';

export type ListWalletsRequest = Pagination & {
  portfolioId: string;
  type: WalletType;
  symbols?: string[];
};

export type ListWalletsResponse = GetWalletsResponse;

export type GetWalletRequest = {
  portfolioId: string;
  walletId: string;
};

export type GetWalletResponse = internalGet;

export type GetWalletDepositInstructionsRequest = {
  portfolioId: string;
  walletId: string;
};

export type GetWalletDepositInstructionsResponse = internalGetInstructs;

export type ListWalletAddressesRequest = {
  portfolioId: string;
  walletId: string;
  networkId?: string;
  networkType?: string;
  cursor?: string;
  limit?: number;
};

export type ListWalletAddressesResponse = internalGetAddresses;

export type CreateWalletRequest = internalCreate & {
  portfolioId: string;
};

export type CreateWalletResponse = internalCreateResp;

export type CreateWalletDepositAddressRequest = {
  portfolioId: string;
  walletId: string;
  networkId?: string;
  networkType?: string;
};

export type CreateWalletDepositAddressResponse = BlockchainAddress;
