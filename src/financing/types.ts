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
import { Brand } from '../shared/brand';
import {
  GetExistingLocatesResponse,
  GetInterestAccrualsResponse,
  GetLocateAvailabilitiesResponse,
  GetMarginConversionsResponse,
  GetMarginSummariesResponse,
  GetMarginInformationResponse as internalGetMarginInformationResponse,
  GetBuyingPowerResponse,
  GetPostTradeCreditResponse,
  GetTFTieredPricingFeesResponse,
  GetWithdrawalPowerResponse,
  CreateNewLocatesResponse as internalCreateNewLocatesResponse,
} from '../model/';

export type ListExistingLocatesRequest = {
  portfolioId: string;
  locateIds?: string[];
  conversionDate?: string;
  locateDate?: string;
};

export type ListExistingLocatesResponse = Brand<
  GetExistingLocatesResponse,
  'ListExistingLocatesResponse'
>;

export type ListInterestAccrualsRequest = {
  entityId: string;
  portfolioId?: string;
  startDate?: string;
  endDate?: string;
};

export type ListInterestAccrualsResponse = Brand<
  GetInterestAccrualsResponse,
  'ListInterestAccrualsResponse'
>;

export type ListPortfolioInterestAccrualsRequest = {
  portfolioId: string;
  startDate?: string;
  endDate?: string;
};

export type ListPortfolioInterestAccrualsResponse = Brand<
  GetInterestAccrualsResponse,
  'ListPortfolioInterestAccrualsResponse'
>;

export type ListMarginCallSummariesRequest = {
  entityId: string;
  startDate?: string;
  endDate?: string;
};

export type ListMarginCallSummariesResponse = Brand<
  GetMarginSummariesResponse,
  'ListMarginCallSummariesResponse'
>;

export type ListMarginConversionsRequest = {
  portfolioId: string;
  startDate?: string;
  endDate?: string;
};

export type ListMarginConversionsResponse = Brand<
  GetMarginConversionsResponse,
  'ListMarginConversionsResponse'
>;

export type GetEntityLocateAvailabilitiesRequest = {
  entityId: string;
  locateDate?: string;
};

export type GetEntityLocateAvailabilitiesResponse = Brand<
  GetLocateAvailabilitiesResponse,
  'GetEntityLocateAvailabilitiesResponse'
>;

export type GetMarginInformationRequest = {
  entityId: string;
};

export type GetMarginInformationResponse = Brand<
  internalGetMarginInformationResponse,
  'GetMarginInformationResponse'
>;

export type GetPortfolioBuyingPowerRequest = {
  portfolioId: string;
  baseCurrency: string;
  quoteCurrency: string;
};

export type GetPortfolioBuyingPowerResponse = Brand<
  GetBuyingPowerResponse,
  'GetPortfolioBuyingPowerResponse'
>;

export type GetPortfolioCreditInformationRequest = {
  portfolioId: string;
};

export type GetPortfolioCreditInformationResponse = Brand<
  GetPostTradeCreditResponse,
  'GetPortfolioCreditInformationResponse'
>;

export type GetPortfolioWithdrawalPowerRequest = {
  portfolioId: string;
  symbol: string;
};

export type GetPortfolioWithdrawalPowerResponse = Brand<
  GetWithdrawalPowerResponse,
  'GetPortfolioWithdrawalPowerResponse'
>;

export type GetTieredPricingFeesRequest = {
  entityId: string;
  effectiveAt?: string;
};

export type GetTieredPricingFeesResponse = Brand<
  GetTFTieredPricingFeesResponse,
  'GetTieredPricingFeesResponse'
>;

export type CreateNewLocatesRequest = {
  portfolioId: string;
  symbol?: string;
  amount?: string;
  locateDate?: string;
};

export type CreateNewLocatesResponse = Brand<
  internalCreateNewLocatesResponse,
  'CreateNewLocatesResponse'
>;
