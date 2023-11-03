/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { FetchHttpRequest } from './core/FetchHttpRequest';

import { AdjustmentTypesService } from './services/AdjustmentTypesService';
import { AssociationsService } from './services/AssociationsService';
import { AssociationStaffsService } from './services/AssociationStaffsService';
import { AssociationStaffTypesService } from './services/AssociationStaffTypesService';
import { AssociationTeamsService } from './services/AssociationTeamsService';
import { ClubsService } from './services/ClubsService';
import { CompetitionsService } from './services/CompetitionsService';
import { CompetitionSeasonsService } from './services/CompetitionSeasonsService';
import { CompetitionTypesService } from './services/CompetitionTypesService';
import { FixtureEventsService } from './services/FixtureEventsService';
import { FixtureOfficialAppointmentsService } from './services/FixtureOfficialAppointmentsService';
import { FixturePlayersService } from './services/FixturePlayersService';
import { FixturesService } from './services/FixturesService';
import { FixtureStaffsService } from './services/FixtureStaffsService';
import { OffenceCodesService } from './services/OffenceCodesService';
import { OfficialsService } from './services/OfficialsService';
import { OfficialTypesService } from './services/OfficialTypesService';
import { SeasonsService } from './services/SeasonsService';
import { StaffTypesService } from './services/StaffTypesService';
import { StageRulesetsService } from './services/StageRulesetsService';
import { StagesService } from './services/StagesService';
import { StageTeamsService } from './services/StageTeamsService';
import { TeamFixtureResultsService } from './services/TeamFixtureResultsService';
import { TeamPlayersService } from './services/TeamPlayersService';
import { TeamsService } from './services/TeamsService';
import { TeamStaffsService } from './services/TeamStaffsService';
import { UsersService } from './services/UsersService';
import { VenuesService } from './services/VenuesService';
import { VenueTypesService } from './services/VenueTypesService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class DataApi {

    public readonly adjustmentTypes: AdjustmentTypesService;
    public readonly associations: AssociationsService;
    public readonly associationStaffs: AssociationStaffsService;
    public readonly associationStaffTypes: AssociationStaffTypesService;
    public readonly associationTeams: AssociationTeamsService;
    public readonly clubs: ClubsService;
    public readonly competitions: CompetitionsService;
    public readonly competitionSeasons: CompetitionSeasonsService;
    public readonly competitionTypes: CompetitionTypesService;
    public readonly fixtureEvents: FixtureEventsService;
    public readonly fixtureOfficialAppointments: FixtureOfficialAppointmentsService;
    public readonly fixturePlayers: FixturePlayersService;
    public readonly fixtures: FixturesService;
    public readonly fixtureStaffs: FixtureStaffsService;
    public readonly offenceCodes: OffenceCodesService;
    public readonly officials: OfficialsService;
    public readonly officialTypes: OfficialTypesService;
    public readonly seasons: SeasonsService;
    public readonly staffTypes: StaffTypesService;
    public readonly stageRulesets: StageRulesetsService;
    public readonly stages: StagesService;
    public readonly stageTeams: StageTeamsService;
    public readonly teamFixtureResults: TeamFixtureResultsService;
    public readonly teamPlayers: TeamPlayersService;
    public readonly teams: TeamsService;
    public readonly teamStaffs: TeamStaffsService;
    public readonly users: UsersService;
    public readonly venues: VenuesService;
    public readonly venueTypes: VenueTypesService;

    public readonly request: BaseHttpRequest;

    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? '/rest',
            VERSION: config?.VERSION ?? 'PREVIEW',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });

        this.adjustmentTypes = new AdjustmentTypesService(this.request);
        this.associations = new AssociationsService(this.request);
        this.associationStaffs = new AssociationStaffsService(this.request);
        this.associationStaffTypes = new AssociationStaffTypesService(this.request);
        this.associationTeams = new AssociationTeamsService(this.request);
        this.clubs = new ClubsService(this.request);
        this.competitions = new CompetitionsService(this.request);
        this.competitionSeasons = new CompetitionSeasonsService(this.request);
        this.competitionTypes = new CompetitionTypesService(this.request);
        this.fixtureEvents = new FixtureEventsService(this.request);
        this.fixtureOfficialAppointments = new FixtureOfficialAppointmentsService(this.request);
        this.fixturePlayers = new FixturePlayersService(this.request);
        this.fixtures = new FixturesService(this.request);
        this.fixtureStaffs = new FixtureStaffsService(this.request);
        this.offenceCodes = new OffenceCodesService(this.request);
        this.officials = new OfficialsService(this.request);
        this.officialTypes = new OfficialTypesService(this.request);
        this.seasons = new SeasonsService(this.request);
        this.staffTypes = new StaffTypesService(this.request);
        this.stageRulesets = new StageRulesetsService(this.request);
        this.stages = new StagesService(this.request);
        this.stageTeams = new StageTeamsService(this.request);
        this.teamFixtureResults = new TeamFixtureResultsService(this.request);
        this.teamPlayers = new TeamPlayersService(this.request);
        this.teams = new TeamsService(this.request);
        this.teamStaffs = new TeamStaffsService(this.request);
        this.users = new UsersService(this.request);
        this.venues = new VenuesService(this.request);
        this.venueTypes = new VenueTypesService(this.request);
    }
}
