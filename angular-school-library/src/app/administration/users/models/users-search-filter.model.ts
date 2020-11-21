export interface IUserSearchFilter {
    fullName: string;
    email: string;
    address: string;
    userRoles: IUserRoleSearch[];
}

export interface IUserRoleSearch {
    id: number;
    name: string;
    selected: boolean;
}
