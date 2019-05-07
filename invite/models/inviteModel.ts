export enum InvitePageTiles {
    Organisation = 'Organisation',
    Employee = 'Employee',
}

export enum InvitePaths {
    Employee = '/invite-employee',
    Organisation = '/invite-organisation',
}

export const InviteNavigationTabs = [
    { key: InvitePaths.Organisation, name: InvitePageTiles.Organisation },
    { key: InvitePaths.Employee, name: InvitePageTiles.Employee },
];

export interface InviteByEmail {
    firstName?: string;
    lastName?: string;
    email: string;
    phoneNumber?: string;
    department?: number;
}

export interface ChangeTileProp {
    changeTile(form: string): void;
}
