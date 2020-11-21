export interface ICurrentUser {
    token: string;
    expiration: Date;
    userName: string;
    role: Number;
}
