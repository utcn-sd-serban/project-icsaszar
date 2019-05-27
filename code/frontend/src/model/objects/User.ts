

export type UserRole = "STUDENT" | "TEACHER" | "ADMIN"

export class User {

    constructor(
        readonly username: string,
        readonly firstName: string,
        readonly lastName: string,
        readonly role: UserRole
    ) {}

}