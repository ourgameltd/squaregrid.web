/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AssociationStaffTypes } from '../models/AssociationStaffTypes';
import type { AssociationStaffTypes_NoPK } from '../models/AssociationStaffTypes_NoPK';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AssociationStaffTypesService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Returns an entity.
     * @param id 
     * @returns any OK
     * @throws ApiError
     */
    public getAssociationStaffTypesId(
id: string,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/AssociationStaffTypes/Id/{Id}',
            path: {
                'Id': id,
            },
            errors: {
                400: `BadRequest`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `NotFound`,
            },
        });
    }

    /**
     * Replace or create entity.
     * @param id 
     * @param requestBody 
     * @returns any OK
     * @throws ApiError
     */
    public putAssociationStaffTypesId(
id: string,
requestBody: AssociationStaffTypes_NoPK,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/AssociationStaffTypes/Id/{Id}',
            path: {
                'Id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `BadRequest`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `NotFound`,
            },
        });
    }

    /**
     * Update or create entity.
     * @param id 
     * @param requestBody 
     * @returns any OK
     * @throws ApiError
     */
    public patchAssociationStaffTypesId(
id: string,
requestBody: AssociationStaffTypes_NoPK,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/AssociationStaffTypes/Id/{Id}',
            path: {
                'Id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `BadRequest`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `NotFound`,
            },
        });
    }

    /**
     * Delete entity.
     * @param id 
     * @returns void 
     * @throws ApiError
     */
    public deleteAssociationStaffTypesId(
id: string,
): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/AssociationStaffTypes/Id/{Id}',
            path: {
                'Id': id,
            },
            errors: {
                400: `BadRequest`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `NotFound`,
            },
        });
    }

    /**
     * Returns entities.
     * @returns any OK
     * @throws ApiError
     */
    public getAssociationStaffTypes(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/AssociationStaffTypes',
            errors: {
                400: `BadRequest`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `NotFound`,
            },
        });
    }

    /**
     * Create entity.
     * @param requestBody 
     * @returns any Created
     * @throws ApiError
     */
    public postAssociationStaffTypes(
requestBody: AssociationStaffTypes,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/AssociationStaffTypes',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `BadRequest`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `NotFound`,
                409: `Conflict`,
            },
        });
    }

}
