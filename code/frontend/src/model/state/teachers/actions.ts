import {StudentGroup} from "../../objects/user/Student";
import {
    ADD_NEW_STUDENT_GROUP,
    AddNewStudentGroup,
    RECEIVE_STUDENT_GROUPS,
    ReceiveStudentGroupsAction,
    REQUEST_STUDENT_GROUPS,
    RequestStudentGroupsAction
} from "./types";

export function doReceiveStudentGroups(groups: StudentGroup[]): ReceiveStudentGroupsAction {
    return {
        type: RECEIVE_STUDENT_GROUPS,
        payload:{
            data: groups
        }
    }
}

export function doRequestStudentGroups(): RequestStudentGroupsAction {
    return {
        type: REQUEST_STUDENT_GROUPS
    }
}

export function doAddStudentGroup(newGroup: StudentGroup): AddNewStudentGroup {
    return {
        type: ADD_NEW_STUDENT_GROUP,
        payload: {
            newGroup: newGroup
        }
    }
}