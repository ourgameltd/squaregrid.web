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
  Association,
} from '../models/index';
import {
    AssociationFromJSON,
    AssociationToJSON,
} from '../models/index';

export interface AddAssociationRequest {
    association?: Association;
}

export interface DeleteAssociationRequest {
    id?: string;
}

export interface FindAssociationRequest {
    id?: string;
}

export interface SearchAssociationsRequest {
    page?: string;
    take?: string;
}

export interface UpdateAssociationRequest {
    id?: string;
    association?: Association;
}

/**
 * 
 */
export class AssociationsApi extends runtime.BaseAPI {

    /**
     * Add a new association to the databsse
     * Add a associations
     */
    async addAssociationRaw(requestParameters: AddAssociationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Association>> {
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
            path: `/association`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: AssociationToJSON(requestParameters.association),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AssociationFromJSON(jsonValue));
    }

    /**
     * Add a new association to the databsse
     * Add a associations
     */
    async addAssociation(requestParameters: AddAssociationRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Association> {
        const response = await this.addAssociationRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Delete a association from its database ID.
     * Delete a association
     */
    async deleteAssociationRaw(requestParameters: DeleteAssociationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
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
            path: `/association/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Delete a association from its database ID.
     * Delete a association
     */
    async deleteAssociation(requestParameters: DeleteAssociationRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteAssociationRaw(requestParameters, initOverrides);
    }

    /**
     * Gets a association from its database ID.
     * Get a association
     */
    async findAssociationRaw(requestParameters: FindAssociationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Association>> {
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
            path: `/association/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AssociationFromJSON(jsonValue));
    }

    /**
     * Gets a association from its database ID.
     * Get a association
     */
    async findAssociation(requestParameters: FindAssociationRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Association> {
        const response = await this.findAssociationRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Search for associations paged
     * Search all associations
     */
    async searchAssociationsRaw(requestParameters: SearchAssociationsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Association>>> {
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
            path: `/association`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(AssociationFromJSON));
    }

    /**
     * Search for associations paged
     * Search all associations
     */
    async searchAssociations(requestParameters: SearchAssociationsRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Association>> {
        const response = await this.searchAssociationsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update a association in the database
     * Update a associations
     */
    async updateAssociationRaw(requestParameters: UpdateAssociationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Association>> {
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
            path: `/association/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AssociationToJSON(requestParameters.association),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AssociationFromJSON(jsonValue));
    }

    /**
     * Update a association in the database
     * Update a associations
     */
    async updateAssociation(requestParameters: UpdateAssociationRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Association> {
        const response = await this.updateAssociationRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
