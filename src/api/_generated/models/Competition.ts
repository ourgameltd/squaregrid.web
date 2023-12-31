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

import { exists, mapValues } from '../runtime';
import type { Association } from './Association';
import {
    AssociationFromJSON,
    AssociationFromJSONTyped,
    AssociationToJSON,
} from './Association';
import type { CompetitionSeason } from './CompetitionSeason';
import {
    CompetitionSeasonFromJSON,
    CompetitionSeasonFromJSONTyped,
    CompetitionSeasonToJSON,
} from './CompetitionSeason';
import type { CompetitionType } from './CompetitionType';
import {
    CompetitionTypeFromJSON,
    CompetitionTypeFromJSONTyped,
    CompetitionTypeToJSON,
} from './CompetitionType';

/**
 * 
 * @export
 * @interface Competition
 */
export interface Competition {
    /**
     * 
     * @type {string}
     * @memberof Competition
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof Competition
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof Competition
     */
    shortName?: string;
    /**
     * 
     * @type {string}
     * @memberof Competition
     */
    badge?: string;
    /**
     * 
     * @type {string}
     * @memberof Competition
     */
    associationId?: string;
    /**
     * 
     * @type {string}
     * @memberof Competition
     */
    competitionTypeId?: string;
    /**
     * 
     * @type {Association}
     * @memberof Competition
     */
    association?: Association;
    /**
     * 
     * @type {Array<CompetitionSeason>}
     * @memberof Competition
     */
    competitionSeasons?: Array<CompetitionSeason>;
    /**
     * 
     * @type {CompetitionType}
     * @memberof Competition
     */
    competitionType?: CompetitionType;
}

/**
 * Check if a given object implements the Competition interface.
 */
export function instanceOfCompetition(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function CompetitionFromJSON(json: any): Competition {
    return CompetitionFromJSONTyped(json, false);
}

export function CompetitionFromJSONTyped(json: any, ignoreDiscriminator: boolean): Competition {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'shortName': !exists(json, 'shortName') ? undefined : json['shortName'],
        'badge': !exists(json, 'badge') ? undefined : json['badge'],
        'associationId': !exists(json, 'associationId') ? undefined : json['associationId'],
        'competitionTypeId': !exists(json, 'competitionTypeId') ? undefined : json['competitionTypeId'],
        'association': !exists(json, 'association') ? undefined : AssociationFromJSON(json['association']),
        'competitionSeasons': !exists(json, 'competitionSeasons') ? undefined : ((json['competitionSeasons'] as Array<any>).map(CompetitionSeasonFromJSON)),
        'competitionType': !exists(json, 'competitionType') ? undefined : CompetitionTypeFromJSON(json['competitionType']),
    };
}

export function CompetitionToJSON(value?: Competition | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'shortName': value.shortName,
        'badge': value.badge,
        'associationId': value.associationId,
        'competitionTypeId': value.competitionTypeId,
        'association': AssociationToJSON(value.association),
        'competitionSeasons': value.competitionSeasons === undefined ? undefined : ((value.competitionSeasons as Array<any>).map(CompetitionSeasonToJSON)),
        'competitionType': CompetitionTypeToJSON(value.competitionType),
    };
}

