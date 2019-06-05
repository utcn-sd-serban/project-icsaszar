import {
    AddStudentStateField,
    AddUserStateField,
    CHANGE_ADD_USER_FIELD, CHANGE_SELECTED_GROUP_ID,
    ChangeAddUserFieldAction, ChangeSelectedGroupId,
    ExtraUserInfo,
    SET_NEW_USER_ROLE,
    SetNewUserRole,
    StudentExtraInfo
} from "./types";
import {UserRole} from "../../objects/user/User";
import {ThunkResult} from "../store";
import RestClient from "../../../rest/RestClient";
import {Student} from "../../objects/user/Student";
import {Admin} from "../../objects/user/Admin";
import {Teacher} from "../../objects/user/Teacher";

export function doSetAddUserField(field: AddUserStateField, value: string): ChangeAddUserFieldAction {
    return {
        type: CHANGE_ADD_USER_FIELD,
        payload: {
            field: field,
            value: value
        }
    }
}

export function doSetNewUserRole(role: UserRole): SetNewUserRole {
    return {
        type: SET_NEW_USER_ROLE,
        payload: {
            role: role
        }
    }
}

export function doSetAddStudentField(value: number): ChangeSelectedGroupId{
    return {
        type: CHANGE_SELECTED_GROUP_ID,
        payload: {
            value: value
        }
    }
}

export function addUser(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    role: UserRole,
    extraInfo: ExtraUserInfo
): ThunkResult<Promise<void>> {
    return async function(dispatch) {
        switch (role) {
            case "ADMIN":
                let admin = new Admin(username, firstName, lastName);
                await RestClient.sendAdmin(admin, password);
                break;
            case "STUDENT":
                let studentExtraInfo = extraInfo as StudentExtraInfo;
                let student = new Student(username, firstName, lastName, studentExtraInfo.group);
                await RestClient.sendStudent(student, password);
                break;
            case "TEACHER":
                let teacher = new Teacher(username, firstName, lastName);
                await RestClient.sendTeacher(teacher, password);
                break;
        }
    }
}