import { Address } from "./address";

export class Employee {

    employeeId: number;
    firstName: string;
    middleName: string;
    lastName: string;
    fatherName: string;
    motherName: string;
    gurdianName: string;
    role: Role;
    salary: number;
    dateOfBirth: Date;
    gender: Gender;
    mobileNumber: string;
    alternateNumber: string;
    email: string;
    maritalStatus: MaritalStatus;
    spouseName: string;
    addressList:Address[];

    constructor() { }

}

export enum Role {
    SE = "Software Engineer",
    SSE = "Senior Software Engineer",
    TA = "Technology Analyst",
    LEAD = "Lead",
    MANAGER = "Manager",
    CEO = "CEO",
}
export enum Gender {
    MALE = "Male",
    FEMALE = "Female",
    TRANSGENDER = "Transgender"
}

export enum MaritalStatus {
    MARRIED = "Married",
    UNMARRIED = "Un Married"
}
