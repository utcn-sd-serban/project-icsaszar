import {
    ADD_NEW_TEACHER, AddNewTeacher,
    RECEIVE_TEACHERS,
    ReceiveTeachersAction,
    REQUEST_TEACHERS,
    RequestTeachersAction
} from "./types";
import {Teacher} from "../../objects/user/Teacher";

export function doReceiveTeachers(teachers: Teacher[]): ReceiveTeachersAction {
    return {
        type: RECEIVE_TEACHERS,
        payload:{
            data: teachers
        }
    }
}

export function doRequestTeachers(): RequestTeachersAction {
    return {
        type: REQUEST_TEACHERS
    }
}

export function doAddTeacher(newTeacher: Teacher): AddNewTeacher {
    return {
        type: ADD_NEW_TEACHER,
        payload: {
            newTeacher: newTeacher
        }
    }
}