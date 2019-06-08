import {StudentGroup} from "../../objects/user/Student";
import {Action} from "redux";


export const REQUEST_STUDENT_GROUPS = "[STUDENT GROUP] REQUEST GROUPS";
export const RECEIVE_STUDENT_GROUPS = "[STUDENT GROUP] RECEIVE GROUPS";
export const ADD_NEW_STUDENT_GROUP = "[STUDENT GROUP] ADD NEW GROUP";

export interface StudentGroupState {
    readonly groups: StudentGroup[];
    readonly isFetching: boolean;
}

export interface RequestStudentGroupsAction extends Action{
    type: typeof REQUEST_STUDENT_GROUPS
}

export interface ReceiveStudentGroupsAction extends Action{
    type: typeof RECEIVE_STUDENT_GROUPS
    payload: {
        data: StudentGroup[]
    }
}

export interface AddNewStudentGroup extends Action{
    type: typeof ADD_NEW_STUDENT_GROUP
    payload: {
        newGroup: StudentGroup
    }
}

export type StudentGroupActions = RequestStudentGroupsAction | ReceiveStudentGroupsAction | AddNewStudentGroup;
