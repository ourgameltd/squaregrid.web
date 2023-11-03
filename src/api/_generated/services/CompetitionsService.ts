/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Competitions } from '../models/Competitions';
import type { Competitions_NoPK } from '../models/Competitions_NoPK';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class CompetitionsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Returns an entity.
     * @param id 
     * @returns any OK
     * @throws ApiError
     */
    public getCompetitionsId(
id: string,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/Competitions/Id/{Id}',
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
    public putCompetitionsId(
id: string,
requestBody: Competitions_NoPK,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/Competitions/Id/{Id}',
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
    public patchCompetitionsId(
id: string,
requestBody: Competitions_NoPK,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/Competitions/Id/{Id}',
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
    public deleteCompetitionsId(
id: string,
): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/Competitions/Id/{Id}',
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
    public getCompetitions(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/Competitions',
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
    public postCompetitions(
requestBody: Competitions,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/Competitions',
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
