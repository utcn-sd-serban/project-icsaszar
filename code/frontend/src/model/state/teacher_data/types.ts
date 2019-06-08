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
