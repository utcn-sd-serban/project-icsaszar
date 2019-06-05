import {User} from "./User";

export class StudentGroup {
    constructor(
        readonly name: string,
        readonly id: number = 0
    ) {
    }
}

export class Student extends User {

    constructor(
        username: string,
        firstName: string,
        lastName: string,
        readonly group: StudentGroup,
        id: number = 0
    ) {
        super(username, firstName, lastName, "STUDENT", id);
    }
}