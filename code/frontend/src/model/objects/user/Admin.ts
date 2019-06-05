import {User} from "./User";

export class Admin extends User {

    constructor(
        username: string,
        firstName: string,
        lastName: string,
        id: number = 0,
    ) {
        super(username, firstName, lastName, "ADMIN", id);
    }
}