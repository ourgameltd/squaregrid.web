/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FixtureStaffs } from '../models/FixtureStaffs';
import type { FixtureStaffs_NoPK } from '../models/FixtureStaffs_NoPK';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class FixtureStaffsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Returns an entity.
     * @param id 
     * @returns any OK
     * @throws ApiError
     */
    public getFixtureStaffsId(
id: string,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/FixtureStaffs/Id/{Id}',
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
    public putFixtureStaffsId(
id: string,
requestBody: FixtureStaffs_NoPK,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/FixtureStaffs/Id/{Id}',
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
    public patchFixtureStaffsId(
id: string,
requestBody: FixtureStaffs_NoPK,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/FixtureStaffs/Id/{Id}',
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
    public deleteFixtureStaffsId(
id: string,
): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/FixtureStaffs/Id/{Id}',
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
    public getFixtureStaffs(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/FixtureStaffs',
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
    public postFixtureStaffs(
requestBody: FixtureStaffs,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/FixtureStaffs',
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
