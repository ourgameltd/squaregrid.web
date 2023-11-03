/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompetitionSeasons } from '../models/CompetitionSeasons';
import type { CompetitionSeasons_NoPK } from '../models/CompetitionSeasons_NoPK';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class CompetitionSeasonsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Returns an entity.
     * @param id 
     * @returns any OK
     * @throws ApiError
     */
    public getCompetitionSeasonsId(
id: string,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/CompetitionSeasons/Id/{Id}',
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
    public putCompetitionSeasonsId(
id: string,
requestBody: CompetitionSeasons_NoPK,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/CompetitionSeasons/Id/{Id}',
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
    public patchCompetitionSeasonsId(
id: string,
requestBody: CompetitionSeasons_NoPK,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/CompetitionSeasons/Id/{Id}',
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
    public deleteCompetitionSeasonsId(
id: string,
): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/CompetitionSeasons/Id/{Id}',
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
    public getCompetitionSeasons(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/CompetitionSeasons',
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
    public postCompetitionSeasons(
requestBody: CompetitionSeasons,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/CompetitionSeasons',
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
