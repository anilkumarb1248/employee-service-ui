import { User } from "src/app/model/user";

export class SessionDetails {
    loggedInUserData: User;
    token: string;
    keepLogin:boolean = false;
}
