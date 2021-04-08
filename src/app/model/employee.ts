export class Employee {

    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    role: Role;
    salary: number;
    dob: Date;
    gender: Gender;
    mobileNumber: string;
    email: string;
    address: string;
    maritalStatus: MaritalStatus;

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
    FEMALE = "Female"
}

export enum MaritalStatus {
    MARRIED = "Married",
    UNMARRIED = "Un Married"
}
