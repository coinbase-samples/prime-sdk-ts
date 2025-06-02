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
import { CoinbaseCallOptions, Method } from '@coinbase-sample/core-ts';
import { CoinbasePrimeClient } from '../client';

import {
  CreateStakeRequest,
  CreateStakeResponse,
  CreateUnstakeRequest,
  CreateUnstakeResponse,
} from './types';

export interface IStakingService {
  createStake(
    request: CreateStakeRequest,
    options?: CoinbaseCallOptions
  ): Promise<CreateStakeResponse>;
  createUnstake(
    request: CreateUnstakeRequest,
    options?: CoinbaseCallOptions
  ): Promise<CreateUnstakeResponse>;
}

export class StakingService implements IStakingService {
  private client: CoinbasePrimeClient;

  constructor(client: CoinbasePrimeClient) {
    this.client = client;
  }

  async createStake(
    request: CreateStakeRequest,
    options?: CoinbaseCallOptions
  ): Promise<CreateStakeResponse> {
    const bodyParams = {
      ...request,
      portfolioId: undefined,
      walletId: undefined,
    };
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/wallets/${request.walletId}/staking/initiate`,
      method: Method.POST,
      bodyParams,
      callOptions: options,
    });

    return response.data as CreateStakeResponse;
  }

  async createUnstake(
    request: CreateUnstakeRequest,
    options?: CoinbaseCallOptions
  ): Promise<CreateUnstakeResponse> {
    const bodyParams = {
      ...request,
      portfolioId: undefined,
      walletId: undefined,
    };
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/wallets/${request.walletId}/staking/unstake`,
      method: Method.POST,
      bodyParams,
      callOptions: options,
    });

    return response.data as CreateUnstakeResponse;
  }
}
