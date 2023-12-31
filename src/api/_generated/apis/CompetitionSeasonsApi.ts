/* tslint:disable */
/* eslint-disable */
/**
 * Our Game Api
 * Api calls and message processing functions for the Our Game app
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  CompetitionSeason,
} from '../models/index';
import {
    CompetitionSeasonFromJSON,
    CompetitionSeasonToJSON,
} from '../models/index';

export interface AddCompetitionSeasonRequest {
    competitionSeason?: CompetitionSeason;
}

export interface DeleteCompetitionSeasonRequest {
    id?: string;
}

export interface FindCompetitionSeasonRequest {
    id?: string;
}

export interface SearchCompetitionSeasonsRequest {
    page?: string;
    take?: string;
}

export interface UpdateCompetitionSeasonRequest {
    id?: string;
    competitionSeason?: CompetitionSeason;
}

/**
 * 
 */
export class CompetitionSeasonsApi extends runtime.BaseAPI {

    /**
     * Add a new competitionseason to the databsse
     * Add a competitionseasons
     */
    async addCompetitionSeasonRaw(requestParameters: AddCompetitionSeasonRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CompetitionSeason>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'text/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["code"] = this.configuration.apiKey("code"); // function_key authentication
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer_auth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/competitionseason`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: CompetitionSeasonToJSON(requestParameters.competitionSeason),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CompetitionSeasonFromJSON(jsonValue));
    }

    /**
     * Add a new competitionseason to the databsse
     * Add a competitionseasons
     */
    async addCompetitionSeason(requestParameters: AddCompetitionSeasonRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CompetitionSeason> {
        const response = await this.addCompetitionSeasonRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Delete a competitionseason from its database ID.
     * Delete a competitionseason
     */
    async deleteCompetitionSeasonRaw(requestParameters: DeleteCompetitionSeasonRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["code"] = this.configuration.apiKey("code"); // function_key authentication
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer_auth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/competitionseason/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Delete a competitionseason from its database ID.
     * Delete a competitionseason
     */
    async deleteCompetitionSeason(requestParameters: DeleteCompetitionSeasonRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteCompetitionSeasonRaw(requestParameters, initOverrides);
    }

    /**
     * Gets a competitionseason from its database ID.
     * Get a competitionseason
     */
    async findCompetitionSeasonRaw(requestParameters: FindCompetitionSeasonRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CompetitionSeason>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["code"] = this.configuration.apiKey("code"); // function_key authentication
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer_auth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/competitionseason/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CompetitionSeasonFromJSON(jsonValue));
    }

    /**
     * Gets a competitionseason from its database ID.
     * Get a competitionseason
     */
    async findCompetitionSeason(requestParameters: FindCompetitionSeasonRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CompetitionSeason> {
        const response = await this.findCompetitionSeasonRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Search for competitionseasons paged
     * Search all competitionseasons
     */
    async searchCompetitionSeasonsRaw(requestParameters: SearchCompetitionSeasonsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<CompetitionSeason>>> {
        const queryParameters: any = {};

        if (requestParameters.page !== undefined) {
            queryParameters['page'] = requestParameters.page;
        }

        if (requestParameters.take !== undefined) {
            queryParameters['take'] = requestParameters.take;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["code"] = this.configuration.apiKey("code"); // function_key authentication
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer_auth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/competitionseason`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(CompetitionSeasonFromJSON));
    }

    /**
     * Search for competitionseasons paged
     * Search all competitionseasons
     */
    async searchCompetitionSeasons(requestParameters: SearchCompetitionSeasonsRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<CompetitionSeason>> {
        const response = await this.searchCompetitionSeasonsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update a competitionseason in the database
     * Update a competitionseasons
     */
    async updateCompetitionSeasonRaw(requestParameters: UpdateCompetitionSeasonRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CompetitionSeason>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'text/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["code"] = this.configuration.apiKey("code"); // function_key authentication
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer_auth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/competitionseason/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CompetitionSeasonToJSON(requestParameters.competitionSeason),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CompetitionSeasonFromJSON(jsonValue));
    }

    /**
     * Update a competitionseason in the database
     * Update a competitionseasons
     */
    async updateCompetitionSeason(requestParameters: UpdateCompetitionSeasonRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CompetitionSeason> {
        const response = await this.updateCompetitionSeasonRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
