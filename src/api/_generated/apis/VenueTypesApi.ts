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
  VenueType,
} from '../models/index';
import {
    VenueTypeFromJSON,
    VenueTypeToJSON,
} from '../models/index';

export interface AddVenueTypeRequest {
    venueType?: VenueType;
}

export interface DeleteVenueTypeRequest {
    id?: string;
}

export interface FindVenueTypeRequest {
    id?: string;
}

export interface SearchVenueTypesRequest {
    page?: string;
    take?: string;
}

export interface UpdateVenueTypeRequest {
    id?: string;
    venueType?: VenueType;
}

/**
 * 
 */
export class VenueTypesApi extends runtime.BaseAPI {

    /**
     * Add a new venuetype to the databsse
     * Add a venuetypes
     */
    async addVenueTypeRaw(requestParameters: AddVenueTypeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<VenueType>> {
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
            path: `/venuetype`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: VenueTypeToJSON(requestParameters.venueType),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => VenueTypeFromJSON(jsonValue));
    }

    /**
     * Add a new venuetype to the databsse
     * Add a venuetypes
     */
    async addVenueType(requestParameters: AddVenueTypeRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<VenueType> {
        const response = await this.addVenueTypeRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Delete a venuetype from its database ID.
     * Delete a venuetype
     */
    async deleteVenueTypeRaw(requestParameters: DeleteVenueTypeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
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
            path: `/venuetype/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Delete a venuetype from its database ID.
     * Delete a venuetype
     */
    async deleteVenueType(requestParameters: DeleteVenueTypeRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteVenueTypeRaw(requestParameters, initOverrides);
    }

    /**
     * Gets a venuetype from its database ID.
     * Get a venuetype
     */
    async findVenueTypeRaw(requestParameters: FindVenueTypeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<VenueType>> {
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
            path: `/venuetype/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => VenueTypeFromJSON(jsonValue));
    }

    /**
     * Gets a venuetype from its database ID.
     * Get a venuetype
     */
    async findVenueType(requestParameters: FindVenueTypeRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<VenueType> {
        const response = await this.findVenueTypeRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Search for venuetypes paged
     * Search all venuetypes
     */
    async searchVenueTypesRaw(requestParameters: SearchVenueTypesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<VenueType>>> {
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
            path: `/venuetype`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(VenueTypeFromJSON));
    }

    /**
     * Search for venuetypes paged
     * Search all venuetypes
     */
    async searchVenueTypes(requestParameters: SearchVenueTypesRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<VenueType>> {
        const response = await this.searchVenueTypesRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update a venuetype in the database
     * Update a venuetypes
     */
    async updateVenueTypeRaw(requestParameters: UpdateVenueTypeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<VenueType>> {
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
            path: `/venuetype/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: VenueTypeToJSON(requestParameters.venueType),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => VenueTypeFromJSON(jsonValue));
    }

    /**
     * Update a venuetype in the database
     * Update a venuetypes
     */
    async updateVenueType(requestParameters: UpdateVenueTypeRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<VenueType> {
        const response = await this.updateVenueTypeRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
