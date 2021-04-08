export class User {
    id: number;
    userId: string;
    name: string;
    password: string;
    email: string;
    mobileNumber: string;
    accessTypes: AccessType[];
}

export enum AccessType {
    ADMIN = "Admin",
    ADD = "Add",
    VIEW = "View",
    EDIT = "Edit",
    DELETE = "Delete"
}
