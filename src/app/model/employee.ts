export class Employee {

    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    role:Role;
    salary:number;
    dob: Date;
    gender: Gender;
    mobileNumber: number;
    email: string;
    address: string;
    pinCode: number;
    maritalStaus: MaritalStatus;

    constructor(){}

}

export enum Role{
	SE,
	SSE,
	TA,
	LEAD,
	MANAGER,
	CEO
}
export enum Gender {
    Male,
    Female
}

export enum MaritalStatus {
    Married,
    Unmarried
}
