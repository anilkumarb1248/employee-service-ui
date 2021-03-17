export class User {
    id: number;
    userId: string;
    fullName: string;
    password: string;
    email: string;
    mobileNumber: string;
    accessTypes: AccessType[];
}

export enum AccessType {
    Admin, Add, View, Edit, Delete
}
