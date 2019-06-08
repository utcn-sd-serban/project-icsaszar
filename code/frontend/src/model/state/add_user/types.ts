import {Action} from "redux";
import {UserRole} from "../../objects/user/User";
import {StudentGroup} from "../../objects/user/Student";

export const CHANGE_ADD_USER_FIELD = "[ADD USER] CHANGE FIELD";
export const SET_NEW_USER_ROLE = "[ADD USER] SET ROLE";
export const CHANGE_SELECTED_GROUP_ID = "[ADD USER] CHANGE STUDENT FIELD";

export interface AddUserState {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    role: UserRole;

    selectedGroupId: number;
}

export interface StudentExtraInfo {
    group: StudentGroup
}

export interface AdminExtraInfo {
}

export interface TeacherExtraInfo {
}

export type ExtraUserInfo = StudentExtraInfo | AdminExtraInfo | TeacherExtraInfo

export type AddUserStateField = keyof Pick<AddUserState, "firstName" | "lastName" | "username" | "password" | "role">;

export interface ChangeAddUserFieldAction extends Action{
    type: typeof CHANGE_ADD_USER_FIELD
    payload: {
        field: AddUserStateField
        value: string
    }
}

export type AddStudentStateField = keyof Pick<AddUserState, "selectedGroupId">;

export interface ChangeSelectedGroupId extends Action{
    type: typeof CHANGE_SELECTED_GROUP_ID
    payload: {
        value: number
    }
}

export interface SetNewUserRole extends Action{
    type: typeof SET_NEW_USER_ROLE
    payload: {
        role: UserRole
    }
}

export type AddUserActions = ChangeAddUserFieldAction | SetNewUserRole | ChangeSelectedGroupId;
