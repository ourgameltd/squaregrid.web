/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FixtureOfficialAppointments } from '../models/FixtureOfficialAppointments';
import type { FixtureOfficialAppointments_NoPK } from '../models/FixtureOfficialAppointments_NoPK';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class FixtureOfficialAppointmentsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Returns an entity.
     * @param id 
     * @returns any OK
     * @throws ApiError
     */
    public getFixtureOfficialAppointmentsId(
id: string,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/FixtureOfficialAppointments/Id/{Id}',
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
    public putFixtureOfficialAppointmentsId(
id: string,
requestBody: FixtureOfficialAppointments_NoPK,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/FixtureOfficialAppointments/Id/{Id}',
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
    public patchFixtureOfficialAppointmentsId(
id: string,
requestBody: FixtureOfficialAppointments_NoPK,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/FixtureOfficialAppointments/Id/{Id}',
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
    public deleteFixtureOfficialAppointmentsId(
id: string,
): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/FixtureOfficialAppointments/Id/{Id}',
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
    public getFixtureOfficialAppointments(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/FixtureOfficialAppointments',
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
    public postFixtureOfficialAppointments(
requestBody: FixtureOfficialAppointments,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/FixtureOfficialAppointments',
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
