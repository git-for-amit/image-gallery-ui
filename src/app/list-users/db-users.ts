

export interface DBUser {
    id?: number,
    username?: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    email?: string;
    roles?: string [];
    approved?: string;
}