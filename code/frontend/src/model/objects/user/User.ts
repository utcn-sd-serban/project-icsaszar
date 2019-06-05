export const USER_ROLES = ['STUDENT', 'TEACHER', 'ADMIN'] as const;
type UserRoleTuple = typeof USER_ROLES;

// easy to add new values and iterate over values using USER_ROLES
// the compiler infers type: 'STUDENT' | 'TEACHER' | 'ADMIN'
export type UserRole = UserRoleTuple[number]

export class User {

    constructor(
        readonly username: string,
        readonly firstName: string,
        readonly lastName: string,
        readonly role: UserRole,
        readonly id: number = 0
    ) {
    }

}