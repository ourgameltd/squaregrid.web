export interface Principal {
    userId: string;
    userRoles: string[];
    claims: any[];
    identityProvider: string;
    userDetails: string;
}

export interface User {
    clientPrincipal: Principal;
    initials: string;
}
