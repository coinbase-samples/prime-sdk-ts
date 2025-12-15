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
import { IPrimeApiClient, CoinbaseCallOptions } from '../clients';
import { validate } from '../shared/validation';

import {
  ListExistingLocatesRequest,
  ListExistingLocatesResponse,
  ListInterestAccrualsRequest,
  ListInterestAccrualsResponse,
  ListPortfolioInterestAccrualsRequest,
  ListPortfolioInterestAccrualsResponse,
  ListMarginCallSummariesRequest,
  ListMarginCallSummariesResponse,
  ListMarginConversionsRequest,
  ListMarginConversionsResponse,
  GetEntityLocateAvailabilitiesRequest,
  GetEntityLocateAvailabilitiesResponse,
  GetMarginInformationRequest,
  GetMarginInformationResponse,
  GetPortfolioBuyingPowerRequest,
  GetPortfolioBuyingPowerResponse,
  GetPortfolioCreditInformationRequest,
  GetPortfolioCreditInformationResponse,
  GetPortfolioWithdrawalPowerRequest,
  GetPortfolioWithdrawalPowerResponse,
  GetTieredPricingFeesRequest,
  GetTieredPricingFeesResponse,
  GetFcmMarginCallDetailsRequest,
  GetFcmMarginCallDetailsResponse,
  GetFcmRiskLimitsRequest,
  GetFcmRiskLimitsResponse,
  CreateNewLocatesRequest,
  CreateNewLocatesResponse,
  GetCrossMarginOverviewRequest,
  GetCrossMarginOverviewResponse,
  ListTFObligationsRequest,
  ListTFObligationsResponse,
  ListFinancingEligibleAssetsRequest,
  ListFinancingEligibleAssetsResponse,
} from './types';

export interface IFinancingService {
  listExistingLocates(
    request: ListExistingLocatesRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListExistingLocatesResponse>;
  listInterestAccruals(
    request: ListInterestAccrualsRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListInterestAccrualsResponse>;
  listPortfolioInterestAccruals(
    request: ListPortfolioInterestAccrualsRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListPortfolioInterestAccrualsResponse>;
  listMarginCallSummaries(
    request: ListMarginCallSummariesRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListMarginCallSummariesResponse>;
  listMarginConversions(
    request: ListMarginConversionsRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListMarginConversionsResponse>;

  getEntityLocateAvailabilities(
    request: GetEntityLocateAvailabilitiesRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetEntityLocateAvailabilitiesResponse>;
  getMarginInformation(
    request: GetMarginInformationRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetMarginInformationResponse>;
  getPortfolioBuyingPower(
    request: GetPortfolioBuyingPowerRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetPortfolioBuyingPowerResponse>;
  getPortfolioCreditInformation(
    request: GetPortfolioCreditInformationRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetPortfolioCreditInformationResponse>;
  getPortfolioWithdrawalPower(
    request: GetPortfolioWithdrawalPowerRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetPortfolioWithdrawalPowerResponse>;
  getTieredPricingFees(
    request: GetTieredPricingFeesRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetTieredPricingFeesResponse>;
  getFcmMarginCallDetails(
    request: GetFcmMarginCallDetailsRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetFcmMarginCallDetailsResponse>;
  getFcmRiskLimits(
    request: GetFcmRiskLimitsRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetFcmRiskLimitsResponse>;

  createNewLocates(
    request: CreateNewLocatesRequest,
    options?: CoinbaseCallOptions
  ): Promise<CreateNewLocatesResponse>;

  getCrossMarginOverview(
    request: GetCrossMarginOverviewRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetCrossMarginOverviewResponse>;

  listTFObligations(
    request: ListTFObligationsRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListTFObligationsResponse>;

  listFinancingEligibleAssets(
    request?: ListFinancingEligibleAssetsRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListFinancingEligibleAssetsResponse>;
}

export class FinancingService implements IFinancingService {
  private client: IPrimeApiClient;

  constructor(client: IPrimeApiClient) {
    this.client = client;
  }

  async listExistingLocates(
    request: ListExistingLocatesRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListExistingLocatesResponse> {
    validate(request)
      .requiredUUID((r) => r.portfolioId)
      .check();

    const { portfolioId, ...queryParams } = request;
    const response = await this.client.request({
      url: `portfolios/${portfolioId}/locates`,
      queryParams,
      callOptions: options,
    });

    return response.data as ListExistingLocatesResponse;
  }

  async listInterestAccruals(
    request: ListInterestAccrualsRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListInterestAccrualsResponse> {
    validate(request)
      .requiredUUID((r) => r.entityId)
      .check();

    const { entityId, ...queryParams } = request;
    const response = await this.client.request({
      url: `entities/${entityId}/accruals`,
      callOptions: options,
      queryParams,
    });

    return response.data as ListInterestAccrualsResponse;
  }

  async listPortfolioInterestAccruals(
    request: ListPortfolioInterestAccrualsRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListPortfolioInterestAccrualsResponse> {
    validate(request)
      .requiredUUID((r) => r.portfolioId)
      .check();

    const queryParams = {
      ...request,
      portfolioId: undefined,
    };
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/accruals`,
      callOptions: options,
      queryParams,
    });

    return response.data as ListPortfolioInterestAccrualsResponse;
  }

  async listMarginCallSummaries(
    request: ListMarginCallSummariesRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListMarginCallSummariesResponse> {
    validate(request)
      .requiredUUID((r) => r.entityId)
      .check();

    const queryParams = {
      ...request,
      entityId: undefined,
    };
    const response = await this.client.request({
      url: `entities/${request.entityId}/margin_summaries`,
      callOptions: options,
      queryParams,
    });

    return response.data as ListMarginCallSummariesResponse;
  }

  async listMarginConversions(
    request: ListMarginConversionsRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListMarginConversionsResponse> {
    validate(request)
      .requiredUUID((r) => r.portfolioId)
      .check();

    const queryParams = {
      ...request,
      portfolioId: undefined,
    };
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/margin_conversions`,
      callOptions: options,
      queryParams,
    });

    return response.data as ListMarginConversionsResponse;
  }

  async getEntityLocateAvailabilities(
    request: GetEntityLocateAvailabilitiesRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetEntityLocateAvailabilitiesResponse> {
    validate(request)
      .requiredUUID((r) => r.entityId)
      .check();

    const queryParams = {
      ...request,
      entityId: undefined,
    };
    const response = await this.client.request({
      url: `entities/${request.entityId}/locates_availability`,
      callOptions: options,
      queryParams,
    });

    return response.data as GetEntityLocateAvailabilitiesResponse;
  }

  async getMarginInformation(
    request: GetMarginInformationRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetMarginInformationResponse> {
    validate(request)
      .requiredUUID((r) => r.entityId)
      .check();

    const response = await this.client.request({
      url: `entities/${request.entityId}/margin`,
      callOptions: options,
    });

    return response.data as GetMarginInformationResponse;
  }

  async getPortfolioBuyingPower(
    request: GetPortfolioBuyingPowerRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetPortfolioBuyingPowerResponse> {
    validate(request)
      .requiredUUID((r) => r.portfolioId)
      .requiredString((r) => r.baseCurrency)
      .requiredString((r) => r.quoteCurrency)
      .check();

    const queryParams = {
      ...request,
      portfolioId: undefined,
    };
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/buying_power`,
      callOptions: options,
      queryParams,
    });

    return response.data as GetPortfolioBuyingPowerResponse;
  }

  async getPortfolioCreditInformation(
    request: GetPortfolioCreditInformationRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetPortfolioCreditInformationResponse> {
    validate(request)
      .requiredUUID((r) => r.portfolioId)
      .check();

    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/credit`,
      callOptions: options,
    });

    return response.data as GetPortfolioCreditInformationResponse;
  }

  async getPortfolioWithdrawalPower(
    request: GetPortfolioWithdrawalPowerRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetPortfolioWithdrawalPowerResponse> {
    validate(request)
      .requiredUUID((r) => r.portfolioId)
      .requiredString((r) => r.symbol)
      .check();

    const queryParams = {
      ...request,
      portfolioId: undefined,
    };
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/withdrawal_power`,
      callOptions: options,
      queryParams,
    });

    return response.data as GetPortfolioWithdrawalPowerResponse;
  }

  async getTieredPricingFees(
    request: GetTieredPricingFeesRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetTieredPricingFeesResponse> {
    validate(request)
      .requiredUUID((r) => r.entityId)
      .check();

    const queryParams = {
      ...request,
      entityId: undefined,
    };
    const response = await this.client.request({
      url: `entities/${request.entityId}/tf_tiered_fees`,
      callOptions: options,
      queryParams,
    });

    return response.data as GetTieredPricingFeesResponse;
  }

  async getFcmMarginCallDetails(
    request: GetFcmMarginCallDetailsRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetFcmMarginCallDetailsResponse> {
    validate(request)
      .requiredUUID((r) => r.entityId)
      .check();

    const response = await this.client.request({
      url: `entities/${request.entityId}/futures/margin_call_details`,
      callOptions: options,
    });

    return response.data as GetFcmMarginCallDetailsResponse;
  }

  async getFcmRiskLimits(
    request: GetFcmRiskLimitsRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetFcmRiskLimitsResponse> {
    validate(request)
      .requiredUUID((r) => r.entityId)
      .check();

    const response = await this.client.request({
      url: `entities/${request.entityId}/futures/risk_limits`,
      callOptions: options,
    });

    return response.data as GetFcmRiskLimitsResponse;
  }

  async createNewLocates(
    request: CreateNewLocatesRequest,
    options?: CoinbaseCallOptions
  ): Promise<CreateNewLocatesResponse> {
    validate(request)
      .requiredUUID((r) => r.portfolioId)
      .check();

    const bodyParams = {
      ...request,
      portfolioId: undefined,
    };
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/locates`,
      callOptions: options,
      bodyParams,
    });

    return response.data as CreateNewLocatesResponse;
  }

  async getCrossMarginOverview(
    request: GetCrossMarginOverviewRequest,
    options?: CoinbaseCallOptions
  ): Promise<GetCrossMarginOverviewResponse> {
    validate(request)
      .requiredUUID((r) => r.entityId)
      .check();

    const response = await this.client.request({
      url: `entities/${request.entityId}/cross_margin`,
      callOptions: options,
    });

    return response.data as GetCrossMarginOverviewResponse;
  }

  async listTFObligations(
    request: ListTFObligationsRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListTFObligationsResponse> {
    validate(request)
      .requiredUUID((r) => r.entityId)
      .check();

    const response = await this.client.request({
      url: `entities/${request.entityId}/tf_obligations`,
      callOptions: options,
    });

    return response.data as ListTFObligationsResponse;
  }

  async listFinancingEligibleAssets(
    request?: ListFinancingEligibleAssetsRequest,
    options?: CoinbaseCallOptions
  ): Promise<ListFinancingEligibleAssetsResponse> {
    const response = await this.client.request({
      url: `financing/eligible-assets`,
      callOptions: options,
    });

    return response.data as ListFinancingEligibleAssetsResponse;
  }
}
