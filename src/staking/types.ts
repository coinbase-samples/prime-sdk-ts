/**
 * Copyright 2025-present Coinbase Global, Inc.
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
import { Brand } from 'src/shared/brand';
import {
  StakingInitiateResponse,
  StakingInitiateRequest,
  StakingUnstakeResponse,
} from 'src/model/';

export type CreateStakeRequest = StakingInitiateRequest & {
  portfolioId: string;
  walletId: string;
};

export type CreateStakeResponse = Brand<
  StakingInitiateResponse,
  'CreateStakeResponse'
>;

// Staking Initiate Request is same for unstake, double check this when updating models if need to split
export type CreateUnstakeRequest = StakingInitiateRequest & {
  portfolioId: string;
  walletId: string;
};

export type CreateUnstakeResponse = Brand<
  StakingUnstakeResponse,
  'CreateUnstakeResponse'
>;
