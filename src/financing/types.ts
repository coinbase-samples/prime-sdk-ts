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
import { GetExistingLocatesResponse } from '../model/GetExistingLocatesResponse';
import { GetInterestAccrualsResponse } from '../model/GetInterestAccrualsResponse';
import { GetLocateAvailabilitiesResponse } from '../model/GetLocateAvailabilitiesResponse';
import { GetMarginConversionsResponse } from '../model/GetMarginConversionsResponse';
import { GetMarginSummariesResponse } from '../model/GetMarginSummariesResponse';
import { GetMarginInformationResponse as internalGetMarginInformationResponse } from '../model/GetMarginInformationResponse';
import { GetBuyingPowerResponse } from '../model/GetBuyingPowerResponse';
import { GetPostTradeCreditResponse } from '../model/GetPostTradeCreditResponse';
import { GetTFTieredPricingFeesResponse } from '../model/GetTFTieredPricingFeesResponse';
import { GetWithdrawalPowerResponse } from '../model/GetWithdrawalPowerResponse';
import { CreateNewLocatesResponse as internalCreateNewLocatesResponse } from '../model/CreateNewLocatesResponse';

export type ListExistingLocatesRequest = {
  portfolioId: string;
  locateIds?: string[];
  conversionDate?: string;
  locateDate?: string;
};

export type ListExistingLocatesResponse = GetExistingLocatesResponse;

export type ListInterestAccrualsRequest = {
  entityId: string;
  portfolioId?: string;
  startDate?: string;
  endDate?: string;
};

export type ListInterestAccrualsResponse = GetInterestAccrualsResponse;

export type ListPortfolioInterestAccrualsRequest = {
  portfolioId: string;
  startDate?: string;
  endDate?: string;
};

export type ListPortfolioInterestAccrualsResponse = GetInterestAccrualsResponse;

export type ListMarginCallSummariesRequest = {
  entityId: string;
  startDate?: string;
  endDate?: string;
};

export type ListMarginCallSummariesResponse = GetMarginSummariesResponse;

export type ListMarginConversionsRequest = {
  portfolioId: string;
  startDate?: string;
  endDate?: string;
};

export type ListMarginConversionsResponse = GetMarginConversionsResponse;

export type GetEntityLocateAvailabilitiesRequest = {
  entityId: string;
  locateDate?: string;
};

export type GetEntityLocateAvailabilitiesResponse =
  GetLocateAvailabilitiesResponse;

export type GetMarginInformationRequest = {
  entityId: string;
};

export type GetMarginInformationResponse = internalGetMarginInformationResponse;

export type GetPortfolioBuyingPowerRequest = {
  portfolioId: string;
  baseCurrency: string;
  quoteCurrency: string;
};

export type GetPortfolioBuyingPowerResponse = GetBuyingPowerResponse;

export type GetPortfolioCreditInformationRequest = {
  portfolioId: string;
};

export type GetPortfolioCreditInformationResponse = GetPostTradeCreditResponse;

export type GetPortfolioWithdrawalPowerRequest = {
  portfolioId: string;
  symbol: string;
};

export type GetPortfolioWithdrawalPowerResponse = GetWithdrawalPowerResponse;

export type GetTieredPricingFeesRequest = {
  entityId: string;
  effectiveAt?: string;
};

export type GetTieredPricingFeesResponse = GetTFTieredPricingFeesResponse;

export type CreateNewLocatesRequest = {
  portfolioId: string;
  symbol?: string;
  amount?: string;
  locateDate?: string;
};

export type CreateNewLocatesResponse = internalCreateNewLocatesResponse;
