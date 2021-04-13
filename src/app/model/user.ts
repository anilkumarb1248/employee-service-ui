export class User {
    id: number;
    userName: string;
    password: string;
    email: string;
    mobileNumber: string;
    userRole:UserRole;
    active:boolean = true;
    accountExpired:boolean = false;
    accountLocked:boolean = false;
    credentialsExpired:boolean = false;
}

export enum UserRole {
    ADMIN = "Admin",
    USER = "User",
}
