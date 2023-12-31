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
import type { FixtureEvent } from './FixtureEvent';
import {
    FixtureEventFromJSON,
    FixtureEventFromJSONTyped,
    FixtureEventToJSON,
} from './FixtureEvent';
import type { FixtureOfficialAppointment } from './FixtureOfficialAppointment';
import {
    FixtureOfficialAppointmentFromJSON,
    FixtureOfficialAppointmentFromJSONTyped,
    FixtureOfficialAppointmentToJSON,
} from './FixtureOfficialAppointment';
import type { FixturePlayer } from './FixturePlayer';
import {
    FixturePlayerFromJSON,
    FixturePlayerFromJSONTyped,
    FixturePlayerToJSON,
} from './FixturePlayer';
import type { FixtureStaff } from './FixtureStaff';
import {
    FixtureStaffFromJSON,
    FixtureStaffFromJSONTyped,
    FixtureStaffToJSON,
} from './FixtureStaff';
import type { Stage } from './Stage';
import {
    StageFromJSON,
    StageFromJSONTyped,
    StageToJSON,
} from './Stage';
import type { Team } from './Team';
import {
    TeamFromJSON,
    TeamFromJSONTyped,
    TeamToJSON,
} from './Team';
import type { TeamFixtureResult } from './TeamFixtureResult';
import {
    TeamFixtureResultFromJSON,
    TeamFixtureResultFromJSONTyped,
    TeamFixtureResultToJSON,
} from './TeamFixtureResult';
import type { Venue } from './Venue';
import {
    VenueFromJSON,
    VenueFromJSONTyped,
    VenueToJSON,
} from './Venue';

/**
 * 
 * @export
 * @interface Fixture
 */
export interface Fixture {
    /**
     * 
     * @type {string}
     * @memberof Fixture
     */
    id?: string;
    /**
     * 
     * @type {Date}
     * @memberof Fixture
     */
    dateTime?: Date;
    /**
     * 
     * @type {string}
     * @memberof Fixture
     */
    tags?: string;
    /**
     * 
     * @type {string}
     * @memberof Fixture
     */
    venueId?: string;
    /**
     * 
     * @type {string}
     * @memberof Fixture
     */
    homeTeamId?: string;
    /**
     * 
     * @type {string}
     * @memberof Fixture
     */
    awayTeamId?: string;
    /**
     * 
     * @type {string}
     * @memberof Fixture
     */
    stageId?: string;
    /**
     * 
     * @type {number}
     * @memberof Fixture
     */
    state?: number | null;
    /**
     * 
     * @type {Team}
     * @memberof Fixture
     */
    awayTeam?: Team;
    /**
     * 
     * @type {Array<FixtureEvent>}
     * @memberof Fixture
     */
    fixtureEvents?: Array<FixtureEvent>;
    /**
     * 
     * @type {Array<FixtureOfficialAppointment>}
     * @memberof Fixture
     */
    fixtureOfficialAppointments?: Array<FixtureOfficialAppointment>;
    /**
     * 
     * @type {Array<FixturePlayer>}
     * @memberof Fixture
     */
    fixturePlayers?: Array<FixturePlayer>;
    /**
     * 
     * @type {Array<FixtureStaff>}
     * @memberof Fixture
     */
    fixtureStaffs?: Array<FixtureStaff>;
    /**
     * 
     * @type {Team}
     * @memberof Fixture
     */
    homeTeam?: Team;
    /**
     * 
     * @type {Stage}
     * @memberof Fixture
     */
    stage?: Stage;
    /**
     * 
     * @type {Array<TeamFixtureResult>}
     * @memberof Fixture
     */
    teamFixtureResults?: Array<TeamFixtureResult>;
    /**
     * 
     * @type {Venue}
     * @memberof Fixture
     */
    venue?: Venue;
}

/**
 * Check if a given object implements the Fixture interface.
 */
export function instanceOfFixture(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function FixtureFromJSON(json: any): Fixture {
    return FixtureFromJSONTyped(json, false);
}

export function FixtureFromJSONTyped(json: any, ignoreDiscriminator: boolean): Fixture {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'dateTime': !exists(json, 'dateTime') ? undefined : (new Date(json['dateTime'])),
        'tags': !exists(json, 'tags') ? undefined : json['tags'],
        'venueId': !exists(json, 'venueId') ? undefined : json['venueId'],
        'homeTeamId': !exists(json, 'homeTeamId') ? undefined : json['homeTeamId'],
        'awayTeamId': !exists(json, 'awayTeamId') ? undefined : json['awayTeamId'],
        'stageId': !exists(json, 'stageId') ? undefined : json['stageId'],
        'state': !exists(json, 'state') ? undefined : json['state'],
        'awayTeam': !exists(json, 'awayTeam') ? undefined : TeamFromJSON(json['awayTeam']),
        'fixtureEvents': !exists(json, 'fixtureEvents') ? undefined : ((json['fixtureEvents'] as Array<any>).map(FixtureEventFromJSON)),
        'fixtureOfficialAppointments': !exists(json, 'fixtureOfficialAppointments') ? undefined : ((json['fixtureOfficialAppointments'] as Array<any>).map(FixtureOfficialAppointmentFromJSON)),
        'fixturePlayers': !exists(json, 'fixturePlayers') ? undefined : ((json['fixturePlayers'] as Array<any>).map(FixturePlayerFromJSON)),
        'fixtureStaffs': !exists(json, 'fixtureStaffs') ? undefined : ((json['fixtureStaffs'] as Array<any>).map(FixtureStaffFromJSON)),
        'homeTeam': !exists(json, 'homeTeam') ? undefined : TeamFromJSON(json['homeTeam']),
        'stage': !exists(json, 'stage') ? undefined : StageFromJSON(json['stage']),
        'teamFixtureResults': !exists(json, 'teamFixtureResults') ? undefined : ((json['teamFixtureResults'] as Array<any>).map(TeamFixtureResultFromJSON)),
        'venue': !exists(json, 'venue') ? undefined : VenueFromJSON(json['venue']),
    };
}

export function FixtureToJSON(value?: Fixture | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'dateTime': value.dateTime === undefined ? undefined : (value.dateTime.toISOString()),
        'tags': value.tags,
        'venueId': value.venueId,
        'homeTeamId': value.homeTeamId,
        'awayTeamId': value.awayTeamId,
        'stageId': value.stageId,
        'state': value.state,
        'awayTeam': TeamToJSON(value.awayTeam),
        'fixtureEvents': value.fixtureEvents === undefined ? undefined : ((value.fixtureEvents as Array<any>).map(FixtureEventToJSON)),
        'fixtureOfficialAppointments': value.fixtureOfficialAppointments === undefined ? undefined : ((value.fixtureOfficialAppointments as Array<any>).map(FixtureOfficialAppointmentToJSON)),
        'fixturePlayers': value.fixturePlayers === undefined ? undefined : ((value.fixturePlayers as Array<any>).map(FixturePlayerToJSON)),
        'fixtureStaffs': value.fixtureStaffs === undefined ? undefined : ((value.fixtureStaffs as Array<any>).map(FixtureStaffToJSON)),
        'homeTeam': TeamToJSON(value.homeTeam),
        'stage': StageToJSON(value.stage),
        'teamFixtureResults': value.teamFixtureResults === undefined ? undefined : ((value.teamFixtureResults as Array<any>).map(TeamFixtureResultToJSON)),
        'venue': VenueToJSON(value.venue),
    };
}

