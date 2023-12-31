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
  AssociationStaff,
} from '../models/index';
import {
    AssociationStaffFromJSON,
    AssociationStaffToJSON,
} from '../models/index';

export interface AddAssociationStaffRequest {
    associationStaff?: AssociationStaff;
}

export interface DeleteAssociationStaffRequest {
    id?: string;
}

export interface FindAssociationStaffRequest {
    id?: string;
}

export interface SearchAssociationStaffsRequest {
    page?: string;
    take?: string;
}

export interface UpdateAssociationStaffRequest {
    id?: string;
    associationStaff?: AssociationStaff;
}

/**
 * 
 */
export class AssociationStaffsApi extends runtime.BaseAPI {

    /**
     * Add a new associationstaff to the databsse
     * Add a associationstaffs
     */
    async addAssociationStaffRaw(requestParameters: AddAssociationStaffRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AssociationStaff>> {
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
            path: `/associationstaff`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: AssociationStaffToJSON(requestParameters.associationStaff),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AssociationStaffFromJSON(jsonValue));
    }

    /**
     * Add a new associationstaff to the databsse
     * Add a associationstaffs
     */
    async addAssociationStaff(requestParameters: AddAssociationStaffRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AssociationStaff> {
        const response = await this.addAssociationStaffRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Delete a associationstaff from its database ID.
     * Delete a associationstaff
     */
    async deleteAssociationStaffRaw(requestParameters: DeleteAssociationStaffRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
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
            path: `/associationstaff/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Delete a associationstaff from its database ID.
     * Delete a associationstaff
     */
    async deleteAssociationStaff(requestParameters: DeleteAssociationStaffRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteAssociationStaffRaw(requestParameters, initOverrides);
    }

    /**
     * Gets a associationstaff from its database ID.
     * Get a associationstaff
     */
    async findAssociationStaffRaw(requestParameters: FindAssociationStaffRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AssociationStaff>> {
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
            path: `/associationstaff/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AssociationStaffFromJSON(jsonValue));
    }

    /**
     * Gets a associationstaff from its database ID.
     * Get a associationstaff
     */
    async findAssociationStaff(requestParameters: FindAssociationStaffRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AssociationStaff> {
        const response = await this.findAssociationStaffRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Search for associationstaffs paged
     * Search all associationstaffs
     */
    async searchAssociationStaffsRaw(requestParameters: SearchAssociationStaffsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<AssociationStaff>>> {
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
            path: `/associationstaff`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(AssociationStaffFromJSON));
    }

    /**
     * Search for associationstaffs paged
     * Search all associationstaffs
     */
    async searchAssociationStaffs(requestParameters: SearchAssociationStaffsRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<AssociationStaff>> {
        const response = await this.searchAssociationStaffsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update a associationstaff in the database
     * Update a associationstaffs
     */
    async updateAssociationStaffRaw(requestParameters: UpdateAssociationStaffRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AssociationStaff>> {
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
            path: `/associationstaff/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AssociationStaffToJSON(requestParameters.associationStaff),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AssociationStaffFromJSON(jsonValue));
    }

    /**
     * Update a associationstaff in the database
     * Update a associationstaffs
     */
    async updateAssociationStaff(requestParameters: UpdateAssociationStaffRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AssociationStaff> {
        const response = await this.updateAssociationStaffRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
