<<<<<<< HEAD
import {Action} from "redux";
import {Teacher} from "../../objects/user/Teacher";


export const REQUEST_TEACHERS = "[TEACHERS] REQUEST TEACHERS";
export const RECEIVE_TEACHERS = "[TEACHERS] RECEIVE TEACHERS";
export const ADD_NEW_TEACHER =  "[TEACHERS] ADD NEW TEACHER";

export interface TeacherState {
    readonly teachers: Teacher[];
    readonly isFetching: boolean;
}

export interface RequestTeachersAction extends Action{
    type: typeof REQUEST_TEACHERS
}

export interface ReceiveTeachersAction extends Action{
    type: typeof RECEIVE_TEACHERS
    payload: {
        data: Teacher[]
    }
}

export interface AddNewTeacher extends Action{
    type: typeof ADD_NEW_TEACHER
    payload: {
        newTeacher: Teacher
    }
}

export type TeacherActions = ReceiveTeachersAction | RequestTeachersAction | AddNewTeacher;
=======
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
>>>>>>> a7a15c76daf5bb2356740bf1305efe2e07ad72e6
